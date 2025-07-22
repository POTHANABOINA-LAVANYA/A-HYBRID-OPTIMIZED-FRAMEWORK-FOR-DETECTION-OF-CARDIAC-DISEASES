import os
import glob
import keras
from keras_vggface.vggface import VGGFace
from keras_vggface.utils import preprocess_input
from keras.models import load_model

Height = 182
Width  = 256
BatchSize = 32
__v = 1

baseDir   = 'E:/ECG-Data'
modelName = os.listdir(baseDir)
modelPath = '../models/final/models'

TrainPath = 'D:/ECG-Data/actual/' + str(__v) + '/train'
ValidPath = 'D:/ECG-Data/actual/' + str(__v) + '/valid'
TestPath  = 'D:/ECG-Data/actual/' + str(__v) + '/test'

print("Loading:", modelPath)
model = load_model(modelPath)

def preprocess_input_new(x):
    img = preprocess_input(keras.preprocessing.image.img_to_array(x), version = 2)
    return keras.preprocessing.image.array_to_img(img)

ValidGen = keras.preprocessing.image.ImageDataGenerator(
        preprocessing_function=preprocess_input_new).flow_from_directory(
        TestPath,
        target_size=(Height, Width),
        batch_size=BatchSize,
        shuffle=False)

results = model.evaluate_generator(ValidGen, verbose=0)
print(results)