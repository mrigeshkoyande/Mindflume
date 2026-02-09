<div align="center">
<img width="1200" height="475" alt="GHBanner" src="/team alpha.jpg" />
</div>

# MindfulMe - Wellness Companion

A beautiful, interactive wellness application with AI-powered mental health support.

View your app in AI Studio: https://ai.studio/apps/drive/1FU1neXDxf1_KmXrKl6EKZq3vsWHpGhMe

## ✨ Features

- 🎨 **Interactive UI/UX**: Premium gradients, smooth animations, and responsive design
- 📅 **Daily Wisdom**: Rotating affirmations that change every day (25+ quotes)
- 💬 **AI Chat**: Powered by Google Gemini for empathetic wellness coaching
- 📊 **Dashboard**: Track your wellness journey with beautiful charts
- 🧘 **Digital Detox**: Guided breathing, meditation, and mindfulness exercises

## 🚀 Quick Start

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

## 📁 Project Structure

```
mindflume/
├── components/          # React components
│   ├── Button.tsx      # Interactive button with 5 variants
│   ├── Chat.tsx        # AI chat interface
│   ├── Dashboard.tsx   # Wellness dashboard
│   ├── ErrorBoundary.tsx # Error handling
│   └── Toast.tsx       # Notifications
├── services/
│   └── geminiService.ts # Gemini API integration
├── utils/
│   └── wisdom.ts       # Daily wisdom rotation
└── App.tsx             # Main app
```

## 🎨 UI/UX Highlights

- **Interactive Buttons**: Gradients, shadows, and shine effects on hover
- **Daily Wisdom**: Different inspirational quote every day
- **Enhanced Notifications**: Beautiful cards with smooth animations
- **Premium Chat**: Glowing input fields and satisfying button press effects
- **Responsive Design**: Touch-friendly on all devices

## 🛠️ Technologies

- **Frontend**: React + TypeScript + Vite
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts

## 📝 License

MIT
