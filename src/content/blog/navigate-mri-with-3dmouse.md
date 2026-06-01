---
permalink: navigate-mri-with-3dmouse
title: "Navigating MRI Scans with a 3D Mouse"
description: "A medical imaging project that integrates a 3D SpaceMouse with 3D Slicer for intuitive navigation through MRI volumes."
date: 2026-01-04
tags: ["Projects"]
secondaryTags: ["Medical Imaging", "3D Slicer", "Python"]
thumbnail: "/images/blog/navigate-mri-thumbnail.svg"
lang: en
---

## The Problem

Radiologists and researchers spend hours navigating through volumetric MRI data. The standard workflow involves scrolling through 2D slices with a regular mouse — click, scroll, click, scroll. It works, but it's not intuitive for 3D data.

What if you could navigate a brain scan the same way you'd explore a 3D model — with natural, spatial movements?

## The Solution

This project integrates a **3D SpaceMouse** with **3D Slicer**, the open-source medical imaging platform. The SpaceMouse has six degrees of freedom (translate X/Y/Z, rotate X/Y/Z), making it ideal for navigating volumetric data.

The integration allows users to:

- **Pan** through slices by pushing the SpaceMouse forward/backward
- **Zoom** by pulling up/pushing down
- **Rotate** the 3D volume reconstruction with natural wrist movements
- **Scroll** through axial, sagittal, and coronal planes simultaneously

## Technical Implementation

The project works as a 3D Slicer extension that:

1. **Reads SpaceMouse input** — Captures the 6DOF input from the device driver
2. **Maps movements to navigation** — Translates physical movements into camera/slice transformations
3. **Updates views in real-time** — Provides smooth, responsive navigation across all viewport panels

```python
# Map SpaceMouse axes to 3D Slicer navigation
def on_spacemouse_event(tx, ty, tz, rx, ry, rz):
    # Translation controls slice position
    slice_node.SetSliceOffset(current_offset + tz * sensitivity)
    # Rotation controls 3D view camera
    camera.Azimuth(rx * rotation_speed)
    camera.Elevation(ry * rotation_speed)
```

## Use Cases

- **Radiology review** — Faster exploration of brain, spine, or abdominal MRI scans
- **Surgical planning** — Intuitive 3D navigation for pre-operative review
- **Research** — Efficient exploration of large volumetric datasets
- **Education** — More engaging way to teach anatomy from real scans

## What I Learned

- **Hardware integration** adds a surprising amount of complexity — driver compatibility, input mapping, sensitivity tuning.
- **Medical software** has high standards for reliability. Even a visualization tool needs to be predictable and responsive.
- Sometimes the best UX improvement is not a new UI — it's a better input device.

## Try It

The project is open source: [navigate-MRI-with-3Dmouse on GitHub](https://github.com/dumitrux/navigate-MRI-with-3Dmouse)
