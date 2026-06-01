---
permalink: deep-learning
title: "Deep Learning: CNNs, RNNs, and Transfer Learning"
description: "How to build neural networks with PyTorch, understand backpropagation, and use transfer learning for practical results."
date: 2026-05-31
tags: ["AI", "Data"]
secondaryTags: ["Deep Learning", "PyTorch", "Neural Networks"]
thumbnail: "/images/blog/deep-learning-thumbnail.svg"
lang: en
---

Deep learning uses neural networks with many layers to learn complex patterns from data.

## Neural Network Basics

```
Input Layer    Hidden Layers    Output Layer
  [x1] ─────→  [h1] ─────→
  [x2] ─────→  [h2] ─────→    [output]
  [x3] ─────→  [h3] ─────→
```

Each connection has a **weight**. Each neuron applies:

$$output = activation(weights \cdot inputs + bias)$$

### Common Activation Functions

| Function | Formula | Use Case |
|----------|---------|----------|
| ReLU | max(0, x) | Hidden layers (default) |
| Sigmoid | 1/(1+e⁻ˣ) | Binary output |
| Softmax | eˣᵢ/Σeˣ | Multi-class output |
| Tanh | (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) | Hidden layers |

## Backpropagation

How neural networks learn:

```
1. Forward pass  → compute prediction
2. Loss function → measure error
3. Backward pass → compute gradients (chain rule)
4. Update weights → gradient descent
↻ Repeat for many epochs
```

**Loss functions:**
- MSE — regression
- Cross-Entropy — classification
- Binary Cross-Entropy — binary classification

## PyTorch Basics

```python
import torch
import torch.nn as nn
import torch.optim as optim

# Define model
class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, 10)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.relu(self.fc2(x))
        x = self.fc3(x)
        return x

# Train
model = SimpleNet()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    for inputs, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()      # backpropagation
        optimizer.step()     # update weights
```

## CNNs — Convolutional Neural Networks

Best for **images**. They detect patterns like edges, shapes, and objects.

```
Image → [Conv + ReLU] → [Pool] → [Conv + ReLU] → [Pool] → [Flatten] → [FC] → Output
```

### Key Layers

| Layer | What It Does |
|-------|-------------|
| **Conv2d** | Applies filters to detect features |
| **MaxPool2d** | Reduces size, keeps important features |
| **Flatten** | Converts 2D to 1D for classification |
| **Linear** | Fully connected layer for final prediction |

```python
class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3)
        self.pool = nn.MaxPool2d(2)
        self.fc1 = nn.Linear(64 * 5 * 5, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = x.view(x.size(0), -1)  # flatten
        x = torch.relu(self.fc1(x))
        return self.fc2(x)
```

**Use cases:** Image classification, object detection, medical imaging.

## RNNs — Recurrent Neural Networks

Best for **sequences** (text, time series). They have memory of previous inputs.

```
x₁ → [RNN] → h₁
       ↓
x₂ → [RNN] → h₂
       ↓
x₃ → [RNN] → h₃ → output
```

### LSTM — Long Short-Term Memory

Solves the vanishing gradient problem in basic RNNs.

```python
class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        out, (h_n, c_n) = self.lstm(x)
        out = self.fc(out[:, -1, :])  # last time step
        return out
```

**Use cases:** Text generation, sentiment analysis, time series forecasting.

## Transfer Learning

Use a model pre-trained on large datasets and fine-tune it for your task.

```
Pre-trained model (ImageNet)
├── Feature layers ← FREEZE (keep)
└── Classification layer ← REPLACE (train)
```

```python
import torchvision.models as models

# Load pre-trained ResNet
model = models.resnet18(pretrained=True)

# Freeze all layers
for param in model.parameters():
    param.requires_grad = False

# Replace last layer
model.fc = nn.Linear(512, num_classes)

# Train only the new layer
optimizer = optim.Adam(model.fc.parameters(), lr=0.001)
```

**Why it works:**
- Pre-trained models already know how to detect edges, shapes, textures
- You only need a small dataset for your specific task
- Much faster than training from scratch

## Framework Comparison

| Feature | PyTorch | TensorFlow |
|---------|---------|------------|
| Style | Pythonic, dynamic | Graph-based, static (v1) / eager (v2) |
| Debugging | Easy (standard Python) | Harder |
| Research | Preferred | Also used |
| Production | TorchServe, ONNX | TF Serving, TF Lite |
| Community | Growing fast | Large ecosystem |

## Summary

| Architecture | Best For | Key Idea |
|-------------|----------|----------|
| **Feed-forward** | Tabular data | Layers of connected neurons |
| **CNN** | Images | Convolutional filters detect features |
| **RNN/LSTM** | Sequences | Memory of previous inputs |
| **Transfer Learning** | Small datasets | Reuse pre-trained knowledge |
