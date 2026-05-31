---
permalink: reinforcement-learning
title: "Reinforcement Learning: Reward-Based Learning"
description: "Understand reward-based learning methods, Q-tables, and Markov decision processes."
date: 2026-05-31
tags: ["AI", "Data"]
secondaryTags: ["Reinforcement Learning", "Q-Learning", "MDP"]
lang: en
---

Reinforcement Learning (RL) is about an agent learning to make decisions by interacting with an environment and receiving rewards.

## The RL Framework

```
       ┌──────────────┐
       │  Environment  │
       └──────┬───────┘
              │ State, Reward
              ↓
       ┌──────────────┐
       │    Agent      │
       └──────┬───────┘
              │ Action
              ↓
       ┌──────────────┐
       │  Environment  │ (next state)
       └──────────────┘
```

**Key elements:**
- **Agent** — the learner / decision maker
- **Environment** — the world the agent interacts with
- **State (s)** — current situation
- **Action (a)** — what the agent can do
- **Reward (r)** — feedback signal (positive or negative)
- **Policy (π)** — strategy mapping states to actions

**Goal:** Maximize cumulative reward over time.

## Markov Decision Process (MDP)

The mathematical framework behind RL. An MDP has:

- **States (S)** — all possible situations
- **Actions (A)** — all possible moves
- **Transition function T(s, a, s')** — probability of reaching state s' from state s with action a
- **Reward function R(s, a)** — reward for taking action a in state s
- **Discount factor (γ)** — how much to value future rewards (0 to 1)

**Markov property:** The future depends only on the current state, not on the history.

$$V(s) = \max_a \left[ R(s,a) + \gamma \sum_{s'} T(s,a,s') \cdot V(s') \right]$$

## Q-Learning

A model-free RL algorithm. The agent learns a Q-table that maps (state, action) pairs to expected rewards.

### Q-Table

```
              Action 1   Action 2   Action 3
State A       [ 0.5 ]    [ 0.8 ]    [ 0.2 ]
State B       [ 0.3 ]    [ 0.1 ]    [ 0.9 ]
State C       [ 0.7 ]    [ 0.4 ]    [ 0.6 ]
```

### Update Rule

$$Q(s,a) \leftarrow Q(s,a) + \alpha \left[ r + \gamma \max_{a'} Q(s',a') - Q(s,a) \right]$$

- **α** = learning rate (how fast to learn)
- **γ** = discount factor (importance of future rewards)

### Implementation

```python
import numpy as np

# Initialize Q-table
n_states = 16
n_actions = 4
Q = np.zeros((n_states, n_actions))

# Parameters
alpha = 0.1      # learning rate
gamma = 0.99     # discount factor
epsilon = 0.1    # exploration rate

for episode in range(1000):
    state = env.reset()

    while not done:
        # Epsilon-greedy: explore or exploit
        if np.random.random() < epsilon:
            action = env.action_space.sample()  # explore
        else:
            action = np.argmax(Q[state])        # exploit

        next_state, reward, done, _ = env.step(action)

        # Q-learning update
        Q[state, action] += alpha * (
            reward + gamma * np.max(Q[next_state]) - Q[state, action]
        )

        state = next_state
```

## Exploration vs Exploitation

The core dilemma:

- **Exploration** — try new actions to discover better rewards
- **Exploitation** — use the best known action

**Epsilon-greedy:** With probability ε explore randomly, otherwise exploit the best known action. Decrease ε over time.

## Key RL Methods

| Method | Description |
|--------|-------------|
| **Q-Learning** | Model-free, learns Q-values from experience |
| **SARSA** | Like Q-Learning but on-policy (uses actual next action) |
| **Deep Q-Network (DQN)** | Q-Learning with a neural network instead of a table |
| **Policy Gradient** | Directly learn the policy (no Q-table) |
| **Actor-Critic** | Combine policy gradient (actor) with value function (critic) |
| **PPO** | Popular, stable policy gradient method |

## Deep RL

When the state space is too large for a Q-table (e.g., images), use a neural network:

```
State (pixels) → Neural Network → Q-values for each action
```

```python
import torch.nn as nn

class DQN(nn.Module):
    def __init__(self, n_states, n_actions):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(n_states, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, n_actions),
        )

    def forward(self, x):
        return self.net(x)
```

## Real-World Applications

| Application | What RL Does |
|------------|-------------|
| Game playing | AlphaGo, Atari, Chess |
| Robotics | Learn to walk, grasp objects |
| Recommendation | Optimize long-term user engagement |
| Trading | Optimize portfolio decisions |
| Resource management | Cloud auto-scaling, traffic control |

## Summary

| Concept | Key Idea |
|---------|----------|
| MDP | Math framework: states, actions, rewards, transitions |
| Q-Learning | Learn a table of state-action values |
| Epsilon-greedy | Balance exploration and exploitation |
| Deep RL | Use neural networks for large state spaces |
| Policy Gradient | Directly learn the best strategy |
