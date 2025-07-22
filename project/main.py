import tensorflow as tf
import numpy as np
from PIL import Image
import tensorflow as tf

loaded_model = tf.saved_model.load("../madan/models/final/models")

print("Available Signatures:", list(loaded_model.signatures.keys()))

serving_fn = loaded_model.signatures["serving_default"]
for key, tensor in serving_fn.structured_input_signature[1].items():
    print(f"Input '{key}' shape:", tensor.shape)

if not hasattr(loaded_model, "predict"):
    inference_func = loaded_model.signatures["serving_default"]
    
    def model_predict(image):
        input_tensor = tf.convert_to_tensor(image, dtype=tf.float32)
        output = inference_func(input_tensor)
        return output[list(output.keys())[0]].numpy()
else:
    def model_predict(image):
        return loaded_model.predict(image)
image = Image.open("../madan/data/p2/HB(101).jpg")

image = image.resize((256,182)) 
image = np.array(image, dtype=np.float32) / 255.0

image = np.expand_dims(image, axis=0)
predictions = model_predict(image)

print("predictions L ", predictions)
predicted_class = np.argmax(predictions, axis=1)
print("Predicted Class:", predicted_class)
