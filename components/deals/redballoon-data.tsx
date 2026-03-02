export interface RedBalloonData {
    id: number;
    name: string;
    link: string;
    image?: any;
}

export const RedBalloonExperienceData: RedBalloonData[] = [
    {
        id: 1,
        name: "RED BALLOON FLYING EXPERIENCES",
        link: "https://redballoon.pxf.io/e1zakO",
        image: require('@/assets/images/deals/redballoon/flying.png'),
    },
    {
        id: 2,
        name: "RED BALLOON DRIVING EXPERIENCES",
        link: "https://redballoon.pxf.io/GKWEEm",
        image: require('@/assets/images/deals/redballoon/driving.png'),
    },
    {
        id: 3,
        name: "RED BALLOON GETAWAY EXPERIENCES",
        link: "https://redballoon.pxf.io/o4MVVO",
        image: require('@/assets/images/deals/redballoon/getaways.png'),
    },
]
