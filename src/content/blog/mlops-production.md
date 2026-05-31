---
permalink: mlops-production
title: "MLOps: Taking Models to Production"
description: "How to deploy and maintain ML models in production using Docker, Kubernetes, CI/CD, and experiment tracking. The operational side is the real work."
date: 2026-05-31
tags: ["AI", "DevOps"]
secondaryTags: ["MLOps", "Docker", "Kubernetes", "CI/CD"]
lang: en
---

Training a model is maybe 10% of the work. The other 90% is getting it to production and keeping it running. This is MLOps.

## The Reality of ML in Production

```
┌─────────────────────────────────────────────────────┐
│                  ML System in Production            │
│                                                     │
│  ┌──────────┐  Only a small fraction is the model   │
│  │ ML Code  │                                       │
│  └──────────┘                                       │
│  ┌─────────────────────────────────────────────┐    │
│  │ Data Collection, Verification, Feature       │    │
│  │ Engineering, Config, Serving Infrastructure, │    │
│  │ Monitoring, Testing, Process Management...   │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

## MLOps Lifecycle

```
Data → Feature Eng → Train → Evaluate → Package → Deploy → Monitor
  ↑                                                           │
  └───────────────────── Retrain ─────────────────────────────┘
```

## 1. Experiment Tracking

Track every training run so you can reproduce results.

**What to track:**
- Hyperparameters (learning rate, batch size, epochs)
- Metrics (accuracy, loss, F1)
- Dataset version
- Model artifacts
- Code version (git commit)

**Tools:** MLflow, Weights & Biases, Neptune, ClearML

```python
import mlflow

with mlflow.start_run():
    mlflow.log_param("learning_rate", 0.01)
    mlflow.log_param("epochs", 100)
    mlflow.log_metric("accuracy", 0.95)
    mlflow.sklearn.log_model(model, "model")
```

## 2. Containerization with Docker

Package your model and all dependencies into a Docker container.

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY model/ ./model/
COPY serve.py .

EXPOSE 8000
CMD ["uvicorn", "serve:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Why Docker:**
- Same environment everywhere (dev, staging, prod)
- No "works on my machine" problems
- Easy to scale and deploy

## 3. Model Serving

Expose your model as an API:

```python
from fastapi import FastAPI
import joblib

app = FastAPI()
model = joblib.load("model/model.pkl")

@app.post("/predict")
def predict(data: dict):
    features = preprocess(data)
    prediction = model.predict([features])
    return {"prediction": prediction[0]}
```

**Serving options:**
- FastAPI / Flask (custom API)
- TensorFlow Serving
- Triton Inference Server
- Seldon Core
- BentoML

## 4. Kubernetes for Scaling

Deploy model containers on Kubernetes for auto-scaling:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-model
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ml-model
  template:
    spec:
      containers:
      - name: model
        image: myregistry/ml-model:v1.2
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        ports:
        - containerPort: 8000
```

**Kubernetes gives you:**
- Auto-scaling based on traffic
- Rolling updates (zero downtime deploys)
- Health checks and auto-restart
- Resource management (CPU, GPU, memory)

## 5. CI/CD for ML

Automate the pipeline from code change to deployment:

```yaml
# .github/workflows/ml-pipeline.yml
name: ML Pipeline
on:
  push:
    branches: [main]

jobs:
  train-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Train model
        run: python train.py
      - name: Run tests
        run: pytest tests/
      - name: Build Docker image
        run: docker build -t ml-model:${{ github.sha }} .
      - name: Push to registry
        run: docker push myregistry/ml-model:${{ github.sha }}
      - name: Deploy to K8s
        run: kubectl set image deployment/ml-model model=myregistry/ml-model:${{ github.sha }}
```

## 6. Model Monitoring

Models degrade over time. You must monitor:

| What to Monitor | Why |
|----------------|-----|
| **Data drift** | Input data distribution changes |
| **Model drift** | Predictions become less accurate |
| **Latency** | Response time increases |
| **Throughput** | Requests per second |
| **Error rate** | Failed predictions |

**Tools:** Evidently AI, Whylabs, Prometheus + Grafana

## 7. Model Registry

Central place to store and version models:

```
Model Registry
├── fraud-detection
│   ├── v1.0 (archived)
│   ├── v1.1 (staging)
│   └── v1.2 (production) ← current
└── recommendation
    ├── v2.0 (production)
    └── v2.1 (staging)
```

**Tools:** MLflow Model Registry, SageMaker Model Registry, Vertex AI

## MLOps Maturity Levels

| Level | Description |
|-------|-------------|
| **0** | Manual everything — notebooks, manual deploys |
| **1** | Automated training pipeline |
| **2** | Automated training + CI/CD for deployment |
| **3** | Full automation + monitoring + auto-retraining |

## Summary

The majority of ML work in production is **not** model development. It is:

- Building reliable data pipelines
- Packaging and deploying models
- Monitoring performance
- Automating retraining
- Managing infrastructure

MLOps makes this repeatable and reliable.
