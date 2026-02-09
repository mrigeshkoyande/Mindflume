export const dailyWisdom = [
    {
        title: "Daily Wisdom",
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        title: "Mindful Moment",
        text: "In the midst of movement and chaos, keep stillness inside of you.",
        author: "Deepak Chopra"
    },
    {
        title: "Daily Affirmation",
        text: "I am worthy of love, peace, and happiness.",
        author: "Self-Compassion Practice"
    },
    {
        title: "Wellness Wisdom",
        text: "Take care of your body. It's the only place you have to live.",
        author: "Jim Rohn"
    },
    {
        title: "Mindful Reminder",
        text: "You don't have to control your thoughts. You just have to stop letting them control you.",
        author: "Dan Millman"
    },
    {
        title: "Daily Inspiration",
        text: "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
        author: "Buddha"
    },
    {
        title: "Peaceful Thought",
        text: "Peace comes from within. Do not seek it without.",
        author: "Buddha"
    },
    {
        title: "Growth Mindset",
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins"
    },
    {
        title: "Self-Care Reminder",
        text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
        author: "Buddha"
    },
    {
        title: "Mindful Living",
        text: "The present moment is the only time over which we have dominion.",
        author: "Thích Nhất Hạnh"
    },
    {
        title: "Inner Peace",
        text: "Nothing can bring you peace but yourself.",
        author: "Ralph Waldo Emerson"
    },
    {
        title: "Daily Courage",
        text: "Do not let what you cannot do interfere with what you can do.",
        author: "John Wooden"
    },
    {
        title: "Wellness Quote",
        text: "Health is a state of complete harmony of the body, mind and spirit.",
        author: "B.K.S. Iyengar"
    },
    {
        title: "Positive Energy",
        text: "Every day may not be good, but there is something good in every day.",
        author: "Alice Morse Earle"
    },
    {
        title: "Mental Strength",
        text: "The mind is everything. What you think you become.",
        author: "Buddha"
    },
    {
        title: "Daily Gratitude",
        text: "Gratitude turns what we have into enough.",
        author: "Aesop"
    },
    {
        title: "Mindful Breathing",
        text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
        author: "Thích Nhất Hạnh"
    },
    {
        title: "Self-Belief",
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        title: "Calm Mind",
        text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        author: "Marcus Aurelius"
    },
    {
        title: "Daily Progress",
        text: "Progress, not perfection, is what we should be asking of ourselves.",
        author: "Julia Cameron"
    },
    {
        title: "Wellness Journey",
        text: "Healing takes time, and asking for help is a courageous step.",
        author: "Mariska Hargitay"
    },
    {
        title: "Inner Strength",
        text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
        author: "A.A. Milne"
    },
    {
        title: "Mindful Choice",
        text: "Between stimulus and response there is a space. In that space is our power to choose our response.",
        author: "Viktor E. Frankl"
    },
    {
        title: "Self-Compassion",
        text: "Talk to yourself like you would to someone you love.",
        author: "Brené Brown"
    },
    {
        title: "Present Moment",
        text: "Realize deeply that the present moment is all you ever have.",
        author: "Eckhart Tolle"
    }
];

/**
 * Get daily wisdom based on current date
 * Returns a different quote each day
 */
export const getDailyWisdom = () => {
    // Use current date as seed for consistent daily rotation
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % dailyWisdom.length;

    return dailyWisdom[index];
};

/**
 * Get multiple random affirmations (excluding today's)
 */
export const getRandomAffirmations = (count: number = 3) => {
    const daily = getDailyWisdom();
    const others = dailyWisdom.filter(w => w.text !== daily.text);

    // Shuffle and take count items
    const shuffled = others.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
