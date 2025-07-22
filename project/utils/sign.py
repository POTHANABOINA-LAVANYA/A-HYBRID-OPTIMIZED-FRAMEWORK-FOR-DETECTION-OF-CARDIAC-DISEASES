import numpy as np
import matplotlib.pyplot as plt
from PIL import Image, ImageEnhance, ImageOps
from scipy.signal import find_peaks

def preprocess_ecg_image(image_path):
    image = Image.open(image_path).convert("L") 
    image = ImageEnhance.Contrast(image).enhance(2) 
    image = ImageOps.invert(image)
    return np.array(image)

def extract_ecg_signal(image_array):
    return np.mean(image_array, axis=1)

def detect_peaks(ecg_signal, sampling_rate=250):
    peaks, _ = find_peaks(ecg_signal, distance=sampling_rate//2, height=np.mean(ecg_signal))
    rr_intervals = np.diff(peaks) / sampling_rate 
    if len(rr_intervals) > 0:
        heart_rate = 60 / np.mean(rr_intervals)  
    else:
        heart_rate = 0
    return peaks, rr_intervals, heart_rate

def analyze_ecg(image_path):
    ecg_image = preprocess_ecg_image(image_path)
    ecg_signal = extract_ecg_signal(ecg_image)
    peaks, rr_intervals, heart_rate = detect_peaks(ecg_signal)
    print(f"Detected Heart Rate: {heart_rate:.2f} BPM")
    print(f"Number of detected beats: {len(peaks)}")
    print(f"Average RR Interval: {np.mean(rr_intervals) if len(rr_intervals) > 0 else 'N/A'} seconds")
    print(f"RR Interval Variability: {np.std(rr_intervals) if len(rr_intervals) > 0 else 'N/A'} seconds")
    plt.figure(figsize=(10, 5))
    plt.plot(ecg_signal, label="ECG Signal")
    plt.scatter(peaks, ecg_signal[peaks], color="red", label="Detected Peaks")
    plt.title(f"ECG Signal with Peaks (Heart Rate: {heart_rate:.2f} BPM)")
    plt.xlabel("Time (samples)")
    plt.ylabel("Amplitude")
    plt.legend()
    plt.show()
     
analyze_ecg("../data/p1/MI(2).jpg" )
