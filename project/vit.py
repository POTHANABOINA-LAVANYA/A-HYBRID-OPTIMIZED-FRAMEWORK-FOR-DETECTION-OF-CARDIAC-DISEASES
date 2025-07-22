import tensorflow as tf

def vit_block(x):
  prenorm = x
  x = tf.keras.layers.LayerNormalization()(x) 
  x = tf.keras.layers.MultiHeadAttention(num_heads=32, key_dim=16, value_dim=16)(x, x) 
  x = prenorm + x 
  prenorm2 = x 
  x = tf.keras.layers.LayerNormalization()(x) 
  x = mlp_block(x) + prenorm2 
  return x

def mlp_block(x):
  x = tf.keras.layers.Dense(units=2048, activation="relu")(x)
  x = tf.keras.layers.Dense(units=512, activation=None)(x)
  return x
