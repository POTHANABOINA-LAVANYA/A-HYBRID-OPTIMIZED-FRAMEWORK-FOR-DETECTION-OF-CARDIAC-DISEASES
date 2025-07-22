import os
import numpy as np
import pandas as pd
from PIL import Image, ImageEnhance
import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.models import Model
from tensorflow.keras.callbacks import ModelCheckpoint
from tensorflow.keras.applications.resnet50 import ResNet50
from .vit import vit_block
from tf.keras.optimizers import Adam
from tf.keras.losses import SparseCategoricalCrossentropy
from tf.keras.metrics import SparseCategoricalAccuracy
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix
from tensorflow.keras import layers, models, regularizers
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import GridSearchCV


train_ds, val_ds = tf.keras.utils.image_dataset_from_directory(
    "./data",
    labels="inferred",
    label_mode="int",
    class_names=["p1",
                 "p2",
                 "p3",
                 "o4"],
    color_mode="rgb",
    batch_size=32,
    image_size=(182, 256),
    shuffle=True,
    seed=2,
    validation_split=0.1,
    subset="both",
    interpolation="area",
    crop_to_aspect_ratio=True,
 )

def flatten(x):
    pos_emb = tf.keras.layers.Embedding(input_dim=26 * 32, output_dim=512)
    pos_indices = tf.range(tf.shape(x)[1])
    x = x + pos_emb(pos_indices)
    
    
def advanced_objective(weights):
        weights = weights / np.sum(weights)
        combined = (weights[0] * 0.1 +
                    weights[1] * 0.5 +
                    weights[2] * 0.4)
        return accuracy_score(val_ds, np.argmax(combined, axis=1))

def normalize(image, labels):
  return (tf.cast(image, tf.float32)/255.0, labels)
norm_train_ds = train_ds.map(normalize)
norm_val_ds = val_ds.map(normalize)
i_2 = norm_train_ds.as_numpy_iterator()
image, label = i_2.next()
print(f"Image Shape: {image.shape}, Label Shape: {label.shape}")

input = tf.keras.Input(shape=(182, 256, 3)) 
x = tf.keras.layers.Conv2D(filters=512, kernel_size=(7, 8), strides=(7, 8))(input) 
x = tf.keras.layers.Reshape((26 * 32, 512))(x) 
def vit():
    for i in range(8): 
        x = vit_block(x)
    flatten(x)
    
    
class ImprovedWhaleOptimization:
    def __init__(self, objective_func, dim, lb, ub, max_iter=50, n_whales=20):
        self.objective_func = objective_func
        self.dim = dim
        self.lb = lb
        self.ub = ub
        self.max_iter = max_iter
        self.n_whales = n_whales
        self.positions = np.random.uniform(lb, ub, (n_whales, dim))
        self.best_score = -np.inf
        self.best_position = None
        self.convergence = []

    def optimize(self):
        for iter in range(self.max_iter):
            a = 2 - iter * (2 / self.max_iter)
            a2 = -1 + iter * (-1 / self.max_iter)
            
            for i in range(self.n_whales):
                fitness = self.objective_func(self.positions[i])
                if fitness > self.best_score:
                    self.best_score = fitness
                    self.best_position = self.positions[i].copy()
            
            self.convergence.append(self.best_score)
            
            for i in range(self.n_whales):
                r = np.random.rand()
                A = 2 * a * r - a
                C = 2 * r
                
                p = np.random.rand()
                if p < 0.5:
                    if abs(A) < 1:
                        D = abs(C * self.best_position - self.positions[i])
                        new_pos = self.best_position - A * D
                    else:
                        rand_idx = np.random.randint(0, self.n_whales)
                        rand_pos = self.positions[rand_idx]
                        D = abs(C * rand_pos - self.positions[i])
                        new_pos = rand_pos - A * D
                else:
                    L = np.random.randn(self.dim) * np.exp(a2)
                    D = abs(self.best_position - self.positions[i])
                    new_pos = D * np.exp(L) * np.cos(2 * np.pi * L) + self.best_position
                
                new_pos = np.clip(new_pos, self.lb, self.ub)
                self.positions[i] = new_pos
        
        return self.best_position, self.best_score, self.convergence
vit()
x = tf.keras.layers.LayerNormalization()(x) 
x = tf.keras.layers.GlobalAveragePooling1D()(x) 
x = tf.keras.layers.Dense(units=4, activation=None)(x) 
model = tf.keras.Model(inputs=input, outputs=x) 
model.summary()
model.compile(optimizer=Adam(learning_rate=1e-4, beta_2=.99, weight_decay=1e0),
              loss=SparseCategoricalCrossentropy(from_logits=True),
              metrics = [SparseCategoricalAccuracy()]
              )
checkpoint_callback = ModelCheckpoint(
    filepath='./CNN-CP/ckpt.h5',  
    save_best_only=False,           
    monitor='val_loss',              
    mode='min',                      
    save_weights_only=False,        
    save_freq=5                     
)

history = model.fit(norm_train_ds, epochs=50, callbacks=checkpoint_callback, validation_data=norm_val_ds)

iwo = ImprovedWhaleOptimization(
        advanced_objective,
        dim=3,
        lb=[0, 0, 0],
        ub=[1, 1, 1],
        max_iter=50,
        n_whales=25
    )
best_weights, best_score, convergence = iwo.optimize()
best_weights /= np.sum(best_weights)
print("\nEnhanced Model Performance:")
print(classification_report(norm_train_ds, train_ds, target_names=le.classes_))
print("Optimized Weights:", best_weights)

plt.figure(figsize=(10, 5))
plt.plot(convergence)
plt.title("Whale Optimization Convergence")
plt.xlabel("Iteration")
plt.ylabel("Best Score")
plt.savefig('optimization_convergence.png')
plt.show()
model.save('/complete/models.hdf5')
np.save('optimized_weights.npy', best_weights)
print("All enhanced models saved successfully!")
