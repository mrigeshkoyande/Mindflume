# 🌿 MindFlume

*A mindful, local-first mental health & wellness companion*

---

## ✨ Overview

**MindFlume** is a comprehensive mental health and wellness Single Page Application (SPA) designed to support everyday emotional, mental, and physical wellbeing.

It blends a **premium glassmorphism UI**, **local AI-powered chat**, and **wellness dashboards** into a calm, privacy-first experience — running fully **without external AI APIs** in its current active mode.

> 💡 Built for learning, experimentation, and mindful daily use.

---

## 🧠 Core Philosophy

* **Local-first & private** – no required external AI calls
* **Gentle, non-clinical support** – wellness, not diagnosis
* **Teachable companion** – users can train the bot themselves
* **Aesthetic & calming UI** – glassmorphism + smooth motion

---

## 🚀 Tech Stack

| Layer      | Technology                                 |
| ---------- | ------------------------------------------ |
| Frontend   | React 19 + TypeScript                      |
| Build Tool | Vite                                       |
| Styling    | Tailwind CSS (Glassmorphism Design System) |
| Icons      | Lucide React                               |
| Charts     | Recharts                                   |
| State      | React Hooks + LocalStorage                 |

---

## 🧩 Application Features

### 🧠 Local AI Chat (No External APIs)

**File:** `components/Chat.tsx`

* Keyword-based conversational engine
* Runs entirely in the browser
* Uses `localStorage` as a knowledge base
* Stress detection via trigger words
* Suggests contextual actions (e.g. Breathing Exercise)

#### ✏️ Training Mode

Users can teach the bot directly:

1. Enable **Training Mode** in the chat header
2. Enter a **Trigger Phrase**
3. Enter a **Custom Response**
4. Save → persisted in LocalStorage

---

### 📊 Health Analysis Dashboard

**File:** `components/HealthAnalysis.tsx`

* Overall wellness score
* Physical vs Mental health toggle
* Weekly trend charts
* Insights & recommendations
* Uses **mock data** to simulate AI analysis

---

### 🧭 Main Dashboard

**File:** `components/Dashboard.tsx`

* Time-aware greeting (Morning / Evening)
* Daily wisdom & affirmations
* Stress vs Recovery trends
* Mood & wellness snapshots
* Recent insights overview

---

### 🌬️ Digital Detox

**File:** `components/DigitalDetox.tsx`

* Guided breathing exercises (4-4-8 cycle)
* Animated breath timing
* Screen-time awareness tools
* Activity cards & completion streaks

---

### 📱 Digital Wellbeing

**File:** `components/DigitalWellbeing.tsx`

* App usage statistics
* Weekly usage bar charts
* Screen habit awareness

---

### 🏃 Fitness Tracking

**File:** `components/FitnessTracking.tsx`

* Steps, water intake, heart rate
* Active minutes & daily goals
* Today vs Weekly visualizations
* Quick manual logging

---

### 🎮 Persona & Gamification

**File:** `components/Persona.tsx`

* User profile with XP & levels
* Habit streaks
* Focus mode
* Achievement-based motivation

---

### 🔔 Notifications System

**File:** `components/Toast.tsx`

* Local notification center
* Achievements & reminders
* Daily wisdom alerts

---

## 🧠 Chat Knowledge System

### How the Bot Works

MindFlume uses a **keyword-matching engine**, not a machine-learning model.

1. User message is scanned for known keywords
2. Matching response is selected
3. If none match → fallback supportive response
4. Custom-trained phrases override defaults

---

### Pre-Trained Keywords

MindFlume’s local AI bot responds using a curated, human-centered keyword system. Each trigger maps to a calm, validating response and—where helpful—guides users toward an appropriate wellness tool.

| Category              | Keyword / Trigger    | Bot Response Logic                                                  |
| --------------------- | -------------------- | ------------------------------------------------------------------- |
| **Greetings**         | `hello`, `hi`, `hey` | Friendly greeting with an emotional check-in                        |
|                       | `good morning`       | “Good morning! I hope your day is off to a gentle start.”           |
|                       | `good night`         | Wishes you restful, peaceful sleep                                  |
| **Stress & Anxiety**  | `anxious`            | Validates feelings and suggests a **Breathing Exercise**            |
|                       | `stressed`           | Encourages taking it one step at a time; links to **Digital Detox** |
|                       | `panic`              | Grounding reassurance: “You are safe. Focus on your breathing…”     |
|                       | `overwhelmed`        | Prompts one small, manageable next step                             |
| **Sadness**           | `sad`                | Empathy and invitation to share more                                |
|                       | `lonely`             | Offers connection, presence, and listening                          |
|                       | `cry`                | Normalizes emotional release and self-compassion                    |
| **Positive Emotions** | `happy`              | Celebrates and asks about the best part of the day                  |
|                       | `excited`            | Reflects enthusiasm and curiosity                                   |
|                       | `proud`              | Encourages self-recognition and appreciation                        |
| **Physical Wellness** | `tired`              | Suggests rest and disconnecting; links to **Digital Detox**         |
|                       | `sleep`              | Mentions calming wind-down routines                                 |
|                       | `headache`           | Reminds hydration and reduced screen exposure                       |
| **Navigation / Help** | `dashboard`          | Explains wellness trends and links to **Dashboard**                 |
|                       | `breathe`            | Redirects to the **Breathing Exercise** space                       |
|                       | `who are you`        | Introduces MindFlume’s role and purpose                             |

---

----|--------|------------------|
| Greetings | hello, hi, hey | Friendly emotional check-in |
| Greetings | good morning | Gentle morning wish |
| Greetings | good night | Restful sleep encouragement |
| Stress | anxious | Validation + breathing exercise |
| Stress | stressed | One-step-at-a-time support |
| Stress | panic | Grounding & safety reassurance |
| Emotions | sad | Empathy + open listening |
| Emotions | lonely | Connection & presence |
| Positive | happy | Celebration & reflection |
| Positive | proud | Self-appreciation encouragement |
| Physical | tired | Digital detox suggestion |
| Physical | sleep | Wind-down routine guidance |
| Help | dashboard | Explains dashboard features |
| Help | breathe | Redirects to breathing exercise |
| Identity | who are you | Explains MindFlume’s purpose |

---

## 🗂️ Project Structure

```
src/
│
├── components/
│   ├── Chat.tsx
│   ├── Dashboard.tsx
│   ├── HealthAnalysis.tsx
│   ├── DigitalDetox.tsx
│   ├── DigitalWellbeing.tsx
│   ├── FitnessTracking.tsx
│   ├── Persona.tsx
│   ├── Sidebar.tsx
│   ├── Button.tsx
│   ├── Toast.tsx
│   └── ErrorBoundary.tsx
│
├── services/
│   ├── geminiService.ts   # Inactive
│   └── groqService.ts     # Inactive
│
├── utils/
│   └── wisdom.ts
│
├── App.tsx
├── index.tsx
└── index.html
```

---

## ⚙️ Environment & Setup

**Prerequisites:** Node.js 16+

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Your API Key**
   
   Edit `.env.local` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   Get a free API key at [Google AI Studio](https://aistudio.google.com/apikey)

3. **Run the App**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   
   Visit: [http://localhost:3000](http://localhost:3000)
```

---

## 🛡️ Privacy Notes

* No data leaves the browser in current mode
* All chat training stored locally
* Clearing browser storage resets memory

---

## 🌱 Future Enhancements

* Switchable Local ↔ Cloud AI mode
* Smarter intent detection
* Export / import trained knowledge
* Offline-first PWA support
* Wearable & real health data integration

---

## 💙 Final Note

MindFlume is not a replacement for professional care.
It is a **gentle companion** — here to listen, guide, and remind you to breathe.

> *"Small steps, taken consistently, create real change."*

