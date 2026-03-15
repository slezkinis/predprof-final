import numpy as np
from sklearn.preprocessing import LabelEncoder
import pickle


train_y = np.load(input("Введите путь до train_y: "), allow_pickle=True)
labels = np.array([s[32:] for s in train_y])
encoder = LabelEncoder()
train_y_encoded = encoder.fit_transform(labels)
np.save("val_y_encoded.npy", train_y_encoded)
with open("val_encoder.pkl", "wb") as f:
    pickle.dump(encoder, f)

print("Готово!")
print("Созданные файлы:")
print("train_y_encoded.npy")
print("label_encoder.pkl")
print("Количество классов:", len(encoder.classes_))