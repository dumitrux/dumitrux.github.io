---
permalink: deep-learning
title: "Deep Learning: CNNs, RNNs y Transfer Learning"
description: "Cómo construir redes neuronales con PyTorch, entender backpropagation y usar transfer learning para resultados prácticos."
date: 2026-05-31
tags: ["IA", "Data"]
secondaryTags: ["Deep Learning", "PyTorch", "Redes Neuronales"]
lang: es
---

El deep learning usa redes neuronales con muchas capas para aprender patrones complejos de los datos.

## Conceptos Básicos de Redes Neuronales

```
Capa de Entrada   Capas Ocultas    Capa de Salida
  [x1] ─────→  [h1] ─────→
  [x2] ─────→  [h2] ─────→    [salida]
  [x3] ─────→  [h3] ─────→
```

Cada conexión tiene un **peso**. Cada neurona aplica:

$$salida = activación(pesos \cdot entradas + sesgo)$$

### Funciones de Activación Comunes

| Función | Fórmula | Caso de Uso |
|---------|---------|-------------|
| ReLU | max(0, x) | Capas ocultas (por defecto) |
| Sigmoid | 1/(1+e⁻ˣ) | Salida binaria |
| Softmax | eˣᵢ/Σeˣ | Salida multi-clase |
| Tanh | (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) | Capas ocultas |

## Backpropagation

Cómo aprenden las redes neuronales:

```
1. Forward pass  → calcular predicción
2. Función de pérdida → medir error
3. Backward pass → calcular gradientes (regla de la cadena)
4. Actualizar pesos → gradient descent
↻ Repetir durante muchas epochs
```

**Funciones de pérdida:**
- MSE — regresión
- Cross-Entropy — clasificación
- Binary Cross-Entropy — clasificación binaria

## Conceptos Básicos de PyTorch

```python
import torch
import torch.nn as nn
import torch.optim as optim

# Definir modelo
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

# Entrenar
model = SimpleNet()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    for inputs, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()      # backpropagation
        optimizer.step()     # actualizar pesos
```

## CNNs — Redes Neuronales Convolucionales

Ideales para **imágenes**. Detectan patrones como bordes, formas y objetos.

```
Imagen → [Conv + ReLU] → [Pool] → [Conv + ReLU] → [Pool] → [Aplanar] → [FC] → Salida
```

### Capas Clave

| Capa | Qué Hace |
|------|----------|
| **Conv2d** | Aplica filtros para detectar características |
| **MaxPool2d** | Reduce tamaño, mantiene características importantes |
| **Flatten** | Convierte 2D a 1D para clasificación |
| **Linear** | Capa totalmente conectada para predicción final |

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
        x = x.view(x.size(0), -1)  # aplanar
        x = torch.relu(self.fc1(x))
        return self.fc2(x)
```

**Casos de uso:** Clasificación de imágenes, detección de objetos, imagen médica.

## RNNs — Redes Neuronales Recurrentes

Ideales para **secuencias** (texto, series temporales). Tienen memoria de entradas anteriores.

```
x₁ → [RNN] → h₁
       ↓
x₂ → [RNN] → h₂
       ↓
x₃ → [RNN] → h₃ → salida
```

### LSTM — Long Short-Term Memory

Resuelve el problema del gradiente que desaparece en RNNs básicas.

```python
class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        out, (h_n, c_n) = self.lstm(x)
        out = self.fc(out[:, -1, :])  # último paso temporal
        return out
```

**Casos de uso:** Generación de texto, análisis de sentimiento, predicción de series temporales.

## Transfer Learning

Usa un modelo pre-entrenado en datasets grandes y ajústalo para tu tarea.

```
Modelo pre-entrenado (ImageNet)
├── Capas de características ← CONGELAR (mantener)
└── Capa de clasificación ← REEMPLAZAR (entrenar)
```

```python
import torchvision.models as models

# Cargar ResNet pre-entrenado
model = models.resnet18(pretrained=True)

# Congelar todas las capas
for param in model.parameters():
    param.requires_grad = False

# Reemplazar última capa
model.fc = nn.Linear(512, num_classes)

# Entrenar solo la nueva capa
optimizer = optim.Adam(model.fc.parameters(), lr=0.001)
```

**Por qué funciona:**
- Los modelos pre-entrenados ya saben detectar bordes, formas, texturas
- Solo necesitas un dataset pequeño para tu tarea específica
- Mucho más rápido que entrenar desde cero

## Comparación de Frameworks

| Característica | PyTorch | TensorFlow |
|---------------|---------|------------|
| Estilo | Pythónico, dinámico | Basado en grafos, estático (v1) / eager (v2) |
| Depuración | Fácil (Python estándar) | Más difícil |
| Investigación | Preferido | También usado |
| Producción | TorchServe, ONNX | TF Serving, TF Lite |
| Comunidad | Creciendo rápido | Gran ecosistema |

## Resumen

| Arquitectura | Mejor Para | Idea Clave |
|-------------|------------|------------|
| **Feed-forward** | Datos tabulares | Capas de neuronas conectadas |
| **CNN** | Imágenes | Filtros convolucionales detectan características |
| **RNN/LSTM** | Secuencias | Memoria de entradas anteriores |
| **Transfer Learning** | Datasets pequeños | Reutilizar conocimiento pre-entrenado |
