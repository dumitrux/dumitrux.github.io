---
permalink: covid-tracking-on-campus
title: "Covid-Tracking on Campus"
description: "A hackathon-winning Android app that notifies students if they've been in close contact with a COVID-19 positive classmate, using Bluetooth Low Energy scanning."
date: 2020-12-20
tags: ["Projects"]
secondaryTags: ["Hackathon", "Android", "Python", "MongoDB", "BLE"]
thumbnail: "/images/blog/covid-tracking-on-campus-thumbnail.jpg"
lang: en
---

## Inspiration

With no prior experience in AI or machine learning, our team decided to tackle a more practical and impactful problem: **Covid-Tracking on Campus**. The goal was to help university students stay safe by alerting them if they had been near someone who tested positive for COVID-19.

## What It Does

If a user reports a positive COVID test, all their recent close contacts receive a notification about potential exposure. The app uses **Bluetooth Low Energy (BLE)** scanning to detect nearby devices, building a contact history without requiring GPS or location data.

## How We Built It

We split the project into two fronts:

1. **Frontend** — An Android app built with Android Studio that handles BLE scanning and the user interface.
2. **Backend** — A MongoDB database paired with a Python Flask API to manage user data, contact logs, and push notifications.

## Challenges

We discovered late in development that we couldn't directly access the MAC address of our own devices on newer Android versions — a security restriction we had to work around with alternative device identifiers.

## Accomplishments

- Successfully implemented BLE scanning for proximity detection
- Delivered a working full-stack project (frontend + backend) in just 40 hours
- **Won the "Challenge: Covid-Tracking on Campus" at BitsxLaMarató 2020**

## What We Learned

Fundamentally, we learned how to work with smartphones at a low level — BLE protocols, Android permissions, and the constraints of mobile development under time pressure.

## Links

- [DummyTracker on Devpost](https://devpost.com/software/dummy-tracker)
- [Source code on GitHub](https://github.com/Blaios/JamelgosCentrales.git)
