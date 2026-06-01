---
permalink: architectural-style-recognition
title: "Architectural Style Recognition: Deep Learning Meets Architecture"
description: "A deep learning project that classifies architectural styles from photographs using convolutional neural networks — built before AI was cool."
date: 2026-01-03
tags: ["Projects", "AI/ML"]
secondaryTags: ["Deep Learning", "Computer Vision", "Python"]
thumbnail: "/images/blog/architectural-style-recognition-thumbnail.svg"
lang: en
---

## The Motivation

My partner has always been passionate about architecture. Walking through any city, she can name the style of almost any building — Gothic, Baroque, Art Deco, Modernist. I wanted to see if a neural network could learn the same skill.

This project was built before the current AI hype. No ChatGPT, no Stable Diffusion — just TensorFlow, a GPU, and a lot of patience.

## The Approach

The system uses a **convolutional neural network (CNN)** to classify architectural styles from photographs:

1. **Dataset Curation** — Collected and labeled images spanning multiple architectural styles: Gothic, Baroque, Art Deco, Modern, Neoclassical, and more.
2. **Model Architecture** — Transfer learning with a pre-trained network (ResNet/VGG) fine-tuned on the architectural dataset.
3. **Training & Evaluation** — Trained with data augmentation (rotations, flips, crops) to improve generalization.

```python
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D

base_model = ResNet50(weights='imagenet', include_top=False)
x = GlobalAveragePooling2D()(base_model.output)
x = Dense(256, activation='relu')(x)
predictions = Dense(num_styles, activation='softmax')(x)
```

## Challenges

- **Class imbalance** — Some styles (Modern) have far more examples online than others (Art Deco). Addressed with class weights and oversampling.
- **Subjectivity** — Architecture doesn't always fit neatly into one category. Many buildings blend styles. The model had to learn dominant features.
- **Image quality** — Training images ranged from professional photography to tourist snapshots. Aggressive augmentation helped the model generalize.

## Results

The model achieved solid accuracy on the test set, with the most confusion between visually similar styles (e.g., Baroque vs. Rococo). The strongest performance was on highly distinctive styles like Gothic and Art Deco.

## What I Learned

- **Transfer learning** is incredibly powerful for small datasets — pre-trained features from ImageNet transfer surprisingly well to architectural features.
- **Domain knowledge matters** — Understanding what makes each style unique (pointed arches for Gothic, geometric patterns for Art Deco) helped with error analysis.
- Building something for someone you care about is the best motivation.

## Try It

The project is open source: [architectural-style-recognition on GitHub](https://github.com/dumitrux/architectural-style-recognition)
