// Imports removed as they are not used in the data structure
// import { Wind, Coffee, Activity, Sparkles, MessageCircle, Sun, CloudRain } from 'lucide-react';

export interface KnowledgeItem {
    id: string;
    question: string;
    answer: string;
    stressLevel?: 'low' | 'medium' | 'high';
    actions?: string[];
}

export const defaultKnowledgeBase: KnowledgeItem[] = [
    // --- Greetings & Basics ---
    { id: 'g01', question: "hello", answer: "Hello! It's so good to see you. How are you feeling right now?", stressLevel: 'low' },
    { id: 'g02', question: "hi", answer: "Hi there! I'm here for you. What's on your mind?", stressLevel: 'low' },
    { id: 'g03', question: "hey", answer: "Hey! I hope your day is going nicely. How can I support you?", stressLevel: 'low' },
    { id: 'g04', question: "good morning", answer: "Good morning! I hope you slept well. Ready to start the day with some mindfulness?", stressLevel: 'low' },
    { id: 'g05', question: "good afternoon", answer: "Good afternoon! Remember to take a small break if you haven't yet.", stressLevel: 'low' },
    { id: 'g06', question: "good night", answer: "Good night. May you have a restful and peaceful sleep.", stressLevel: 'low' },
    { id: 'g07', question: "who are you", answer: "I'm MindfulMe, your personal wellness companion. I'm here to listen, support, and help you thrive.", stressLevel: 'low' },
    { id: 'g08', question: "what can you do", answer: "I can chat with you about your feelings, guide you through breathing exercises, help you track your mood, and suggest wellness activities. Just ask!", stressLevel: 'low' },
    { id: 'g09', question: "thank you", answer: "You're very welcome. It's an honor to support you.", stressLevel: 'low' },
    { id: 'g10', question: "bye", answer: "Take care of yourself. Remember, I'm always here if you need to talk.", stressLevel: 'low' },

    // --- Emotions: Anxiety & Stress ---
    { id: 'e01', question: "anxious", answer: "I hear you, and it's okay to feel this way. Anxiety comes in waves. Shall we try a quick grounding exercise together?", stressLevel: 'medium', actions: ['Breathing Exercise'] },
    { id: 'e02', question: "anxiety", answer: "Anxiety can be really draining. You are safe here. Focus on your feet on the floor. Take a deep breath with me.", stressLevel: 'medium', actions: ['Breathing Exercise'] },
    { id: 'e03', question: "panic", answer: "You are safe. I'm right here. Focus on your breathing. Inhale deeply... hold... and exhale slowly. Let's do this together.", stressLevel: 'high', actions: ['Breathing Exercise'] },
    { id: 'e04', question: "stressed", answer: "Stress is a heavy weight to carry. It sounds like you're dealing with a lot. Have you been able to take a short break today?", stressLevel: 'high', actions: ['Digital Detox', 'Breathing Exercise'] },
    { id: 'e05', question: "overwhelmed", answer: "It's completely understandable to feel overwhelmed when things pile up. Let's pause. What is one small thing we can put aside for now?", stressLevel: 'high', actions: ['Digital Detox'] },
    { id: 'e06', question: "worried", answer: "Worrying shows that you care, but it can be exhausting. Is there something specific on your mind, or is it a general feeling?", stressLevel: 'medium' },
    { id: 'e07', question: "nervous", answer: "It's natural to feel nervous. Trust in your ability to handle whatever comes your way. You've got this.", stressLevel: 'medium' },
    { id: 'e08', question: "tension", answer: "I noticed you mentioned tension. Where do you feel it in your body? Sometimes a quick stretch or deep breath can help release it.", stressLevel: 'medium', actions: ['Breathing Exercise'] },

    // --- Emotions: Sadness & Low Mood ---
    { id: 'e09', question: "sad", answer: "I'm so sorry you're feeling sad. It's meaningful to honor those feelings. Do you want to vent, or would you prefer a distraction?", stressLevel: 'medium' },
    { id: 'e10', question: "depressed", answer: "I'm here for you. Dealing with low mood is incredibly hard. Please remember that you don't have to go through this alone.", stressLevel: 'high', actions: ['Dashboard'] },
    { id: 'e11', question: "lonely", answer: "Loneliness can feel very isolating. Even though I'm an AI, I'm here to keep you company. You are connected to the world in ways you might not see right now.", stressLevel: 'medium' },
    { id: 'e12', question: "cry", answer: "It's okay to cry. Tears are a way for your body to release emotions. Let it out; I'm here listening.", stressLevel: 'medium' },
    { id: 'e13', question: "hopeless", answer: "I know it feels dark right now, but feelings are like weather—they change. Please hold on. You are valuable.", stressLevel: 'high' },
    { id: 'e14', question: "tired", answer: "You sound exhausted. It's okay to rest. The world can wait while you recharge.", stressLevel: 'low', actions: ['Digital Detox'] },
    { id: 'e15', question: "unmotivated", answer: "Motivation comes and goes. Sometimes just doing the smallest possible task is enough. Be gentle with yourself.", stressLevel: 'medium' },

    // --- Emotions: Anger & Frustration ---
    { id: 'e16', question: "angry", answer: "It sounds like you're really frustrated. Anger is a valid emotion. Taking a few deep breaths can sometimes help cool the heat. Want to try?", stressLevel: 'medium', actions: ['Breathing Exercise'] },
    { id: 'e17', question: "mad", answer: "I hear that verify frustration. It's okay to vent here. Letting it out in a safe space can help.", stressLevel: 'medium' },
    { id: 'e18', question: "annoyed", answer: "Little things adding up? That's really common. Maybe stepping away for 5 minutes could give you a reset.", stressLevel: 'low', actions: ['Digital Detox'] },
    { id: 'e19', question: "hate", answer: "That's a very strong word. It sounds like you're in a lot of pain or frustration right now.", stressLevel: 'high' },

    // --- Positive Emotions ---
    { id: 'p01', question: "happy", answer: "That makes me so happy to hear! Hold onto this feeling. What's the best thing that happened today?", stressLevel: 'low' },
    { id: 'p02', question: "good", answer: "I'm glad to hear that! It's great when things are going well. How are you spending your day?", stressLevel: 'low' },
    { id: 'p03', question: "excited", answer: "That's fantastic! Excitement is such a great energy. Tell me more!", stressLevel: 'low' },
    { id: 'p04', question: "proud", answer: "You should be! Taking a moment to acknowledge your achievements is so healthy. Well done!", stressLevel: 'low' },
    { id: 'p05', question: "calm", answer: "Calm is a beautiful state. Enjoy this peace. It's great for your nervous system.", stressLevel: 'low' },
    { id: 'p06', question: "grateful", answer: "Gratitude is powerful. Focusing on the good things really shifts our perspective. Thanks for sharing that with me.", stressLevel: 'low' },

    // --- Physical Wellbeing ---
    { id: 'w01', question: "sleep", answer: "Sleep is so important. If you're having trouble, maybe try avoiding screens for an hour before bed. A 'Digital Detox' might help.", stressLevel: 'medium', actions: ['Digital Detox'] },
    { id: 'w02', question: "insomnia", answer: "Can't sleep? That's really tough. Sometimes focusing on your breath can help quiet the mind.", stressLevel: 'medium', actions: ['Breathing Exercise'] },
    { id: 'w03', question: "headache", answer: "Headaches are often signs of dehydration or eye strain. Have you had some water and a screen break recently?", stressLevel: 'medium', actions: ['Digital Detox'] },
    { id: 'w04', question: "sick", answer: "I'm sorry you're not feeling well. Please prioritize rest and hydration. Your body needs energy to heal.", stressLevel: 'medium' },
    { id: 'w05', question: "workout", answer: "Exercise is such a great mood booster! Even a short walk counts.", stressLevel: 'low', actions: ['Fitness'] },
    { id: 'w06', question: "tired", answer: "Listen to your body. If you're tired, it's asking for rest. Can you take a short nap or just close your eyes?", stressLevel: 'low' },

    // --- App Features & Navigation ---
    { id: 'f01', question: "dashboard", answer: "Your dashboard gives you a great overview of your wellness journey. You can track your mood trends there.", actions: ['Dashboard'] },
    { id: 'f02', question: "stats", answer: "I can take you to the dashboard to see your latest wellness stats.", actions: ['Dashboard'] },
    { id: 'f03', question: "breathe", answer: "Breathing is the anchor of mindfulness. Let's go to the breathing exercise section.", actions: ['Breathing Exercise'] },
    { id: 'f04', question: "meditate", answer: "Meditation is a great way to clear the mind. I can guide you to some breathing exercises to start.", actions: ['Breathing Exercise'] },
    { id: 'f05', question: "detox", answer: "Digital Detox is a great feature to help you unplug and reconnect with yourself. Shall we go there?", actions: ['Digital Detox'] },
    { id: 'f06', question: "tracking", answer: "You can track your fitness and health metrics in the Fitness section.", actions: ['Fitness'] },
    { id: 'f07', question: "steps", answer: "Keeping moving is key! Check your step count and activity in the Fitness tracker.", actions: ['Fitness'] },
    { id: 'f08', question: "health", answer: "Your health insights are available in the Health Analysis section.", actions: ['Health'] },

    // --- General/Casual ---
    { id: 'c01', question: "joke", answer: "Why did the scarecrow win an award? Because he was outstanding in his field! 😄", stressLevel: 'low' },
    { id: 'c02', question: "story", answer: "Once upon a time, there was a user who took a deep breath and realized everything was going to be okay. The End. Short, but true!", stressLevel: 'low' },
    { id: 'c03', question: "boring", answer: "Boredom can actually be a gateway to creativity! Or maybe it's a sign you need a change of pace. How about a quick walk?", stressLevel: 'low' },
    { id: 'c04', question: "love", answer: "Love is the most powerful force. Whether it's self-love or love for others, it heals.", stressLevel: 'low' },
    { id: 'c05', question: "life", answer: "Life is a journey with many twists and turns. The most important step is the one you're taking right now.", stressLevel: 'low' },
    { id: 'c06', question: "meaning", answer: "Meaning is often found in the connections we make and the small kindnesses we show. What gives your day meaning?", stressLevel: 'medium' },
    { id: 'c07', question: "weather", answer: "I can't see outside, but I hope the weather in your heart is sunny! ☀️", stressLevel: 'low' },

    // --- Conversational Checks ---
    { id: 'x01', question: "are you real", answer: "I am a virtual assistant, but my care for your wellbeing is genuine.", stressLevel: 'low' },
    { id: 'x02', question: "bot", answer: "Yes, I am a bot designed to help you practice mindfulness and track your wellness.", stressLevel: 'low' },
    { id: 'x03', question: "stupid", answer: "I'm still learning! You can help me improve by using the 'Training Mode'.", stressLevel: 'low' },
    { id: 'x04', question: "smart", answer: "Thank you! I try my best to be helpful.", stressLevel: 'low' },
];
