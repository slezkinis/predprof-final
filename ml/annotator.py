import numpy as np
import tensorflow as tf
import pickle
import sys

# =========================
# загрузка модели
# =========================

print("Loading model...")

model = tf.keras.models.load_model("planet_sound_model.h5")

with open("data/label_encoder.pkl", "rb") as f:
    encoder = pickle.load(f)

print("Model loaded")


if len(sys.argv) < 2:
    print("Usage: python annotator.py input_x.npy")
    exit()

file_path = sys.argv[1]

x = np.load(file_path)


y = np.load("data/valid_y.npy")

print("Input shape:", x.shape)


# если один звук
if len(x.shape) == 2:
    x = np.expand_dims(x, axis=0)

pred = model.predict(x)

class_ids = np.argmax(pred, axis=1)

labels = encoder.inverse_transform(class_ids)


c = 0
for i, label in enumerate(labels):
    confidence = np.max(pred[i])
    if label == y[i][32:]:
        c += 1
    print(f"Sample {i}: {label} (confidence {confidence:.3f}) Think: {y[i][32:]}")
print(c, "dsf")