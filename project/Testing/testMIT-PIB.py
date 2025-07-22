import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
class_labels = ["Normal","Atrial Fibrillation","Ventricular Tachycardia", "Myocardial Infarction","Bundle Branch Block","Other Arrhythmia"]
class CNNModel(nn.Module):
    def __init__(self, num_classes, device):
        super(CNNModel, self).__init__()

        self.cnn = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)

        num_ftrs = self.cnn.fc.in_features
        self.cnn.fc = nn.Linear(num_ftrs, num_classes)  
        
        self.device = device

    def forward(self, x):
        x = x.to(self.device)
        return self.cnn(x)

model_path = "../results/model_weights/cnn_model"  
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


num_classes = len(class_labels)  
model = CNNModel(num_classes=num_classes, device=device)


model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
model = model.to(device)
model.eval()

transform = transforms.Compose([
    transforms.Resize(224),  
    transforms.ToTensor(),   
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  
])

def predict(image_path, model, device):
    image = Image.open(image_path).convert("L")  
    image_tensor = transform(image).unsqueeze(0).to(device)  
    
    with torch.no_grad():  
        output = model(image_tensor)

    outputs = model(image_tensor)  
    _, predicted = torch.max(outputs, 1) 
    probs = torch.softmax(outputs, dim=1)
    print("pred L ",predicted)
    print(output[0])
    probabilities = torch.softmax(output, dim=1)[0]  
    predicted_class = torch.argmax(probabilities).item()
    predicted_label = class_labels[predicted_class]
    confidence = probabilities[predicted_class].item()

    if predicted_class == 0:
        disease_status = "No Heart Disease"
    else:
        disease_status = "Heart Disease Detected!"

    return predicted_class, predicted_label, confidence, disease_status, image
def highlight_features(image, predicted_label):
    image_array = np.array(image)
    gray_image = np.mean(image_array, axis=2)

    threshold = np.percentile(gray_image, 90)  
    high_intensity_area = gray_image > threshold

    plt.imshow(image, cmap="gray")
    plt.imshow(high_intensity_area, cmap="jet", alpha=0.5)  
    plt.title(f"Predicted: {predicted_label}")
    plt.axis('off')
    plt.show()

image_path = "../train/N/N100.png"  
predicted_class, predicted_label, confidence, disease_status, image = predict(image_path, model, device)

print(f"Predicted Class: {predicted_class} ({predicted_label})")
print(f"Confidence: {confidence:.2%}")
print(f"Disease Status: {disease_status}")
highlight_features(image, predicted_label)
