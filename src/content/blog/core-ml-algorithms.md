---
permalink: core-ml-algorithms
title: "Core Machine Learning Algorithms"
description: "Understand the math and logic behind regression, classification, ensemble methods, clustering, and SVMs."
date: 2026-05-31
tags: ["AI", "Data"]
secondaryTags: ["Machine Learning", "Algorithms", "Python"]
lang: en
---

A practical overview of the classic ML algorithms you need to know before moving to deep learning.

## ML Categories

```
Machine Learning
├── Supervised Learning (labeled data)
│   ├── Regression → predict a number
│   └── Classification → predict a category
├── Unsupervised Learning (no labels)
│   ├── Clustering → group similar items
│   └── Dimensionality Reduction → simplify data
└── Reinforcement Learning → learn by reward
```

## Regression

### Linear Regression

Predict a continuous value by fitting a line.

$$y = mx + b$$

- **m** = slope (weight)
- **b** = intercept (bias)

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

**Use cases:** Price prediction, sales forecasting.

**Metrics:** MSE (Mean Squared Error), R² Score.

## Classification

### Logistic Regression

Despite the name, it is for **classification**. It predicts probabilities using a sigmoid function.

$$P(y=1) = \frac{1}{1 + e^{-(mx+b)}}$$

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

**Use cases:** Spam detection, disease diagnosis (yes/no).

### Decision Trees

A tree of if/else conditions that splits data.

```
         [Age > 30?]
        /            \
    Yes               No
  [Income > 50K?]   [Student?]
   /       \         /      \
 Buy    Don't Buy  Buy   Don't Buy
```

```python
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(max_depth=5)
model.fit(X_train, y_train)
```

**Pros:** Easy to understand, no scaling needed.
**Cons:** Overfits easily.

### K-Nearest Neighbors (KNN)

Classify based on the K closest data points.

```python
from sklearn.neighbors import KNeighborsClassifier

model = KNeighborsClassifier(n_neighbors=5)
model.fit(X_train, y_train)
```

**Use cases:** Recommendation, image recognition.

## Ensemble Methods

Combine multiple models for better results.

### Random Forest

Many decision trees trained on random subsets → vote for the answer.

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)
```

**Why it works:** Each tree is slightly different. Together, they cancel out errors.

### Gradient Boosting

Trees are built one after another, each correcting the previous one's mistakes.

```python
from sklearn.ensemble import GradientBoostingClassifier

model = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1)
model.fit(X_train, y_train)
```

**Popular implementations:** XGBoost, LightGBM, CatBoost.

## Clustering

### K-Means

Group data into K clusters based on distance.

```
1. Pick K random centers
2. Assign each point to nearest center
3. Move centers to mean of assigned points
4. Repeat until stable
```

```python
from sklearn.cluster import KMeans

model = KMeans(n_clusters=3)
model.fit(X)
labels = model.labels_
```

**Use cases:** Customer segmentation, image compression.

## Support Vector Machines (SVM)

Find the best boundary (hyperplane) to separate classes, maximizing the margin.

```
  Class A: o o o  |  x x x :Class B
              o   |   x x
           o o    |    x
                  |
        ← margin →
```

```python
from sklearn.svm import SVC

model = SVC(kernel="rbf", C=1.0)
model.fit(X_train, y_train)
```

**Kernel trick:** Map data to higher dimensions where it becomes separable.

| Kernel | When to Use |
|--------|------------|
| linear | Linearly separable data |
| rbf | Non-linear data (default) |
| poly | Polynomial boundaries |

## Model Evaluation

### Classification Metrics

| Metric | What It Measures |
|--------|-----------------|
| **Accuracy** | % of correct predictions |
| **Precision** | Of predicted positives, how many are correct |
| **Recall** | Of actual positives, how many were found |
| **F1 Score** | Balance between precision and recall |

```python
from sklearn.metrics import classification_report
print(classification_report(y_test, predictions))
```

### Cross-Validation

```python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5)
```

## Summary

| Algorithm | Type | Best For |
|-----------|------|----------|
| Linear Regression | Regression | Predict numbers |
| Logistic Regression | Classification | Binary yes/no |
| Decision Tree | Both | Interpretable rules |
| Random Forest | Both | General purpose, robust |
| Gradient Boosting | Both | Competitions, best accuracy |
| K-Means | Clustering | Group unlabeled data |
| SVM | Classification | Small/medium datasets |
