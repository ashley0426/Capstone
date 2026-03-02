export interface AgeBackwardsPackages {
    id: number;
    title: string;
    caption: string;
    description: string;
    link: string;
    image?: any;
}

export const AgeBackwardsData: AgeBackwardsPackages[] = [
    {
        id: 1,
        title: "Gut Health Package",
        caption: "Cleanse, Nourish & Rebalance",
        description: "Gut health supplements, natural digestion support, probiotics for bloating, reset gut health naturally.",
        link: "https://linkly.link/2GEFS",
        image: require('@/assets/images/deals/agebackwards/GUT-HEALTH-1.jpg'),
    },
    {
        id: 2,
        title: "Detox Package",
        caption: "Detoxification & Cellular Renewal",
        description: "The best detox supplements, natural cleanse for toxins, heavy metal detox, antioxidant cell support.",
        link: "https://linkly.link/2GEFS",
        image: require('@/assets/images/deals/agebackwards/DETOX-1.jpg'),
    },
    {
        id: 3,
        title: "Weight Loss Package",
        caption: "Weight Management & Metabolic Balance",
        description: "Natural weight loss support, protein for weight loss, hormone balance for fat loss, appetite control supplements.",
        link: "https://linkly.link/2GEFS",
        image: require('@/assets/images/deals/agebackwards/WEIGHT-LOSS-1.jpg'),
    },
    {
        id: 4,
        title: "Energy & Immunity Package",
        caption: "Energy, Focus & Performance",
        description: "Natural energy supplements, improve focus without caffeine crash, CoQ10 for heart health, brain and energy boosters.",
        link: "https://linkly.link/2GEFS",
        image: require('@/assets/images/deals/agebackwards/ENERGY-1.jpg'),
    }
]