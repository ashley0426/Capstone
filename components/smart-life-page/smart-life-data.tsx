export interface BrainHealthData {
    id: number;
    name: string;
    link: string;
    image?: any; // can get rid of ?
}
export interface Courses {
    id: number;
    title: string;
    provider: string;
    link: string;
    image?: any;
}

export const BrainHealthCognitiveData: BrainHealthData[] = [
    {
        id: 1,
        name: "PHYSICAL AND COGNITIVE EVALUATION",
        link: "https://www.heraldopenaccess.us/openaccess/physical-and-cognitive-evaluation-of-a-neuroplasticity-exercise-program-a-pilot-study",
        image: require('../../assets/images/smart-life/brain-health/PHYSICAL-COGNITIVE.jpg'),
    },
    {
        id: 2,
        name: "COGNITIVE TESTING TOOL",
        link: " https://mocacognition.com/digitaltools/",
        image: require('../../assets/images/smart-life/brain-health/COLOURFUL-BRAIN.jpg'),
    },
    {
        id: 3,
        name: "REDUCING YOUR RISK OF DEMENTIA",
        link: "https://www.dementia.org.au/brain-health/reducing-your-risk-dementia/physical-exercise",
        image: require('../../assets/images/smart-life/brain-health/DEMENTIA-AUSTRALIA.jpg'),
    },
]
export const BrainHealthNutritionData: BrainHealthData[] = [
    {
        id: 1,
        name: "NUTRITION AUSTRALIA",
        link: "https://nutritionaustralia.org/",
        image: require('../../assets/images/smart-life/brain-health/NUTRITION-AUSTRALIA.jpg'),
    },
    {
        id: 2,
        name: "NUTRITION.GOV",
        link: "https://www.nutrition.gov/",
        image: require('../../assets/images/smart-life/brain-health/NUTRITION_GOV.jpg'),
    }
]
export const BrainHealthAndWellnessData: BrainHealthData[] = [
    {
        id: 1,
        name: "LIVE UP",
        link: "https://www.liveup.org.au/",
        image: require('../../assets/images/smart-life/brain-health/liveup.png'),
    },
    {
        id: 2,
        name: "NATIONAL INSTITUTE OF AGEING",
        link: "https://www.nia.nih.gov/",
        image: require('../../assets/images/smart-life/brain-health/NATIONAL-INSTITUTE-ON-AGING.jpg'),
    },
    {
        id: 3,
        name: "ONLINE MEDITATION",
        link: "https://www.mindfulnessassociation.net/latest-news/free-daily-online-meditation/",
        image: require('../../assets/images/smart-life/brain-health/MINDFULNESS-ASSOCIATION.jpg'),
    },
    {
        id: 4,
        name: "Mindful Meditation Australia",
        link: "https://www.mindfulmeditationaustralia.org.au/",
        image: require('../../assets/images/smart-life/brain-health/mindful.jpg'),
    },
    {
        id: 5,
        name: "APP – INSIGHT TIMER",
        link: "https://insighttimer.com/en-au",
        image: require('../../assets/images/smart-life/brain-health/Insight-Timer-Logo.png'),
    },
    {
        id: 6,
        name: "LAUGHTER",
        link: "https://www.helpguide.org/articles/mental-health/laughter-is-the-best-medicine.htm",
        image: require('../../assets/images/smart-life/brain-health/HELP-GUIDE_LAUGHTER.jpg'),
    },
    {
        id: 7,
        name: "ONLINE LAUGHTER CLUB",
        link: "https://www.youtube.com/watch?v=QycoyYHciH4",
        image: require('../../assets/images/smart-life/brain-health/LAUGH-ACTIVE.jpg'),
    }
]

export const CoursesData: Courses[] = [
    {
        id: 1,
        title: "Stanford Introduction to Food and Health",
        provider: "Stanford University",
        link: "https://www.coursera.org/learn/food-and-health",
        image: require('../../assets/images/smart-life/courses/stanford.png'),
    },
    {
        id: 2,
        title: "Introduction to Psychology",
        provider: "Yale University",
        link: "https://www.coursera.org/learn/introduction-psychology",
        image: require('../../assets/images/smart-life/courses/yale.png'),
    },
    {
        id: 3,
        title: "Write Your First Novel",
        provider: "Michigan State University",
        link: "https://www.coursera.org/learn/write-your-first-novel",
        image: require('../../assets/images/smart-life/courses/michigan.png'),
    },
    {
        id: 4,
        title: "Writing English at University",
        provider: "Lund university",
        link: "https://www.coursera.org/learn/writing-english-university",
        image: require('../../assets/images/smart-life/courses/lund.png'),
    },
    {
        id: 5,
        title: "Cybersecurity for Everyone",
        provider: "University of Maryland",
        link: "https://www.coursera.org/learn/cybersecurity-for-everyone",
        image: require('../../assets/images/smart-life/courses/maryland.png'),
    },
    {
        id: 6,
        title: "Financial Markets",
        provider: "Yale University",
        link: "https://www.coursera.org/learn/financial-markets-global",
        image: require('../../assets/images/smart-life/courses/yale.png'),
    },
    {
        id: 7,
        title: "Spanish",
        provider: "UC Davis",
        link: "https://www.coursera.org/specializations/learn-spanish",
        image: require('../../assets/images/smart-life/courses/ucdavis.png'),
    },
    {
        id: 8,
        title: "Chinese",
        provider: "Peking University",
        link: "https://www.coursera.org/learn/learn-chinese",
        image: require('../../assets/images/smart-life/courses/peking.png'),
    },



]