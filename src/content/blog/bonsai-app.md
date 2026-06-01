---
permalink: bonsai-app
title: "BonsaiApp: Cultivating Emotional Growth Through Technology"
description: "A mobile app built with React Native and Expo to help users develop emotional self-management skills and cope with loneliness."
date: 2026-04-20
tags: ["Projects", "Software"]
secondaryTags: ["React Native", "Expo", "Mobile", "Mental Health"]
thumbnail: "/images/blog/bonsai-app-thumbnail.svg"
lang: en
---

## The Idea

Loneliness — emotional and social — is one of the most widespread yet under-discussed challenges of modern life. I wanted to build something that could help, not with a quick fix, but with a slow, intentional approach to personal growth.

The metaphor of a **bonsai** felt right: growth takes patience, attention, and consistency. You can't rush it. The app mirrors this philosophy.

## What It Does

BonsaiApp is a mobile application designed to help users:

- **Track their emotional state** — Simple daily check-ins to build awareness over time
- **Practice self-reflection** — Guided journaling prompts that encourage honest introspection
- **Build healthy habits** — Small, consistent actions for emotional well-being
- **Visualize growth** — A bonsai that grows as you engage with the app, reinforcing consistency

## Tech Stack

Built with **React Native** and **Expo** for cross-platform mobile development:

```javascript
// App.js - Navigation setup
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Journal" component={JournalScreen} />
        <Tab.Screen name="Growth" component={GrowthScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

Key technical choices:

- **Expo** — Rapid development, easy testing on physical devices, no native build complexity
- **React Navigation** — Familiar tab-based navigation for mobile UX
- **Local storage** — Journal entries and emotional data stay on device for privacy
- **Clean, nature-inspired UI** — Soft greens and earth tones to create a calming experience

## Design Philosophy

The app is intentionally minimal. Mental health tools shouldn't feel overwhelming or gamified to the point of anxiety. Key principles:

- **No social features** — This is a personal, private space
- **No streaks or punishment** — Missing a day is fine, the bonsai doesn't die
- **Gentle nudges** — Notifications are optional and never guilt-inducing
- **Privacy first** — All data stays on device

## What I Learned

- **Designing for vulnerability** requires extra care — UI copy, colors, and interactions all affect how safe a user feels.
- **Expo** is fantastic for prototyping mobile apps quickly, especially when you don't need heavy native modules.
- The hardest part of building a wellness app isn't the code — it's making something people will actually use consistently.

## Try It

The project is open source: [BonsaiApp on GitHub](https://github.com/dumitrux/bonsaiApp)
