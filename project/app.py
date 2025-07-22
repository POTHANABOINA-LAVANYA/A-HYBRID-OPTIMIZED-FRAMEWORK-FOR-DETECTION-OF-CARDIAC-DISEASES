
import io
import os
from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
import numpy as np
from PIL import Image
import tensorflow as tf
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from PIL import Image, ImageEnhance, ImageOps
from scipy.signal import find_peaks

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

HEIGHT = 256
WIDTH = 182


def preprocess_ecg_image(image):
    if isinstance(image, np.ndarray):
        image = Image.fromarray(image.astype('uint8'))
        
    if not isinstance(image, Image.Image):
        raise ValueError("Input must be a PIL Image or convertible to one")
    image = image.convert("L")
    
    image = ImageEnhance.Contrast(image).enhance(2)
    image = ImageOps.invert(image)

    return np.array(image)

def extract_ecg_signal(image_array):
    return np.mean(image_array, axis=1)
def detect_peaks(ecg_signal, sampling_rate=250):
    mean_signal = np.mean(ecg_signal)
    std_signal = np.std(ecg_signal)
    threshold = mean_signal + (0.5 * std_signal)

    peaks, _ = find_peaks(ecg_signal, height=threshold, distance=sampling_rate//2)

    if len(peaks) > 1:
        rr_intervals = np.diff(peaks) / sampling_rate 
        avg_rr = np.mean(rr_intervals) if len(rr_intervals) > 0 else np.nan
        heart_rate = 60 / avg_rr if avg_rr > 0 else np.nan
    else:
        rr_intervals = []
        avg_rr = np.nan
        heart_rate = np.nan

    return peaks, rr_intervals, heart_rate


def analyze_ecg(ecg_image,save_path = 'uploads/ecg_plot.png'):
    ecg_image = preprocess_ecg_image(ecg_image)
    ecg_signal = extract_ecg_signal(ecg_image)
    peaks, rr_intervals, heart_rate = detect_peaks(ecg_signal)
    # print(f"Detected Heart Rate: {heart_rate:.2f} BPM")
    print(f"Number of detected beats: {len(peaks)}")
    print(f"Average RR Interval: {np.mean(rr_intervals) if len(rr_intervals) > 0 else 'N/A'} seconds")
    print(f"RR Interval Variability: {np.std(rr_intervals) if len(rr_intervals) > 0 else 'N/A'} seconds")
    plt.figure(figsize=(10, 5))
    plt.plot(ecg_signal, label="ECG Signal")
    plt.scatter(peaks, ecg_signal[peaks], color="red", label="Detected Peaks")
    plt.xlabel("Time (samples)")
    plt.ylabel("Amplitude")
    # plt.legend()
    # plt.show()
    
    plt.savefig(save_path, dpi=300)  
    plt.close() 
    avg_rr = np.mean(rr_intervals) if len(rr_intervals) > 0 else 'N/A'
    rr_intervals = np.std(rr_intervals) if len(rr_intervals) > 0 else 'N/A'
    
    return save_path, heart_rate, peaks , rr_intervals , avg_rr

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

import joblib
def load_model():
    try:
        with open("./risk-model.pkl", "rb") as f:
            model = joblib.load(f)
            print(f"Model loaded successfully: {type(model)}") 
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None


@app.route("/api/risk", methods=["POST"])
def risk():
    print("Received a POST request to /api/predict")
    try:
        data = request.get_json()
        age = float(data.get('age'))if data.get('age') is not None else 0.0
        sex = float(data.get('sex'))if data.get('sex') is not None else 0.0
        cp = float(data.get('cp'))if data.get('cp') is not None else 0.0
        trestbps = float(data.get('trestbps'))if data.get('trestbps') is not None else 0.0
        chol = float(data.get('chol'))if data.get('chol') is not None else 0.0
        fbs = float(data.get('fbs'))if data.get('fbs') is not None else 0.0
        restecg = float(data.get('restecg'))if data.get('restecg') is not None else 0.0
        thalach = float(data.get('thalach'))if data.get('thalach') is not None else 0.0
        exang = float(data.get('exang'))if data.get('exang') is not None else 0.0
        oldpeak = float(data.get('oldpeak'))if data.get('oldpeak') is not None else 0.0
        slope = float(data.get('slope'))if data.get('slope') is not None else 0.0
        ca = float(data.get('ca'))if data.get('ca') is not None else 0.0
        thal = float(data.get('thal'))if data.get('thal') is not None else 0.0

        input_data = np.array([[age, sex, cp, trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal]])  # Adjust with all features
        print("Input data:", input_data)
        aggregated_model = load_model()
        if aggregated_model is None:
            print("Model Not Available")
            return jsonify({'error': 'Failed to load model from disk'}), 500

        probabilities = aggregated_model.predict_proba(input_data)
        binary_prediction =float(probabilities[0][1])
        print("Post Prediction", binary_prediction)
        ans = str(binary_prediction)
        ans_goal = float(ans[:2])/10
        print("After Trunc : ",ans_goal)
        if ans_goal > 0.5 :
            ans_goal  = 1
        else:
            ans_goal  = 0
        print("after",ans_goal)
        return jsonify({'prediction': ans_goal})

    except Exception as e:
        print(f"Error predicting: {str(e)}")

        return jsonify({'error': 'Failed to make prediction'}), 500

@app.route('/predict', methods=['POST'])
def predict():
    loaded_model = tf.saved_model.load("./models/final/models")
    serving_fn = loaded_model.signatures["serving_default"]
    if 'file' not in request.files:
        return jsonify({"error": "No image uploaded!"}), 400

    image_file = request.files['file']
    print("Image Name : ",image_file)
    image = Image.open(io.BytesIO(image_file.read()))
    save_path,heart,peaks,rr,avg_rr = analyze_ecg(image)
    image = image.resize((256,182)) 
    image = np.array(image, dtype=np.float32) / 255.0

    image = np.expand_dims(image, axis=0)
    
    if not hasattr(loaded_model, "predict"):
        inference_func = loaded_model.signatures["serving_default"]
    
        def model_predict(image):
            input_tensor = tf.convert_to_tensor(image, dtype=tf.float32)
            output = inference_func(input_tensor)
            return output[list(output.keys())[0]].numpy()
    else:
        def model_predict(image):
            return loaded_model.predict(image)
    predictions = model_predict(image)
    print("predictions L ", predictions)
    predicted_class = int(np.argmax(predictions, axis=1))
    print("Predicted Class:", predicted_class)
    fine_name = "ecg_plot.png"

    image_url = f"http://localhost:5000/uploads/{fine_name}"
     
    ans = ""
    
    if predicted_class == 0:
        ans += 'Myocardial Infraction (Heart Attack)'
    elif predicted_class == 3:
        ans += 'Normal ECG (No Heart Attack)'
    elif predicted_class == 2:
        ans += 'ST Elevation Myocardial Infarction (STEMI) (Heart Attack)'
    else:
        ans += 'Abnormal ECG (Sivere Heart Attack)'
        
    return jsonify({
        "ans": ans,
        "image_url": f"http://localhost:5000/uploads/ecg_plot.png",
        "peaks": peaks.tolist(),     
        "rr_intervals": rr.tolist() if isinstance(rr, np.ndarray) else rr,
        "avg_rr": float(avg_rr) if isinstance(avg_rr, (np.float32, np.float64)) else avg_rr
    }) 
    
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)