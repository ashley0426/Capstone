// components/tabContent.tsx
import Amazon from "@/app/(app)/(tabs)/deals/amazon";
import Courses from "@/app/(app)/(tabs)/smartliving/courses";
import Programs from "@/app/(app)/(tabs)/smartliving/programs";
import Resources from "@/app/(app)/(tabs)/smartliving/resources";
import Playground from "@/app/(app)/(tabs)/socials/playground";
import Socials from "@/app/(app)/(tabs)/socials/socials";
import Australia from "@/app/(app)/(tabs)/travel/australia";
import Europe from "@/app/(app)/(tabs)/travel/europe";
import Audible from "@/app/(app)/(tabs)/deals/audible";
import RedBalloon from "@/app/(app)/(tabs)/deals/redballoon";
import AgeBackwards from "@/app/(app)/(tabs)/deals/agebackwards";
import React from "react";
import SocialsBase from "@/app/(app)/(tabs)/socials/base";
import { BasePage } from "./basePage";

export function PageBase({ page, focussedTab, setFocussedTab }) {
    if (page === 'Socials.') {
        return <SocialsBase />;
    }
    else {
        return <BasePage page={page} focussedTab={focussedTab} setFocussedTab={setFocussedTab} />;
    }
}

export function TabContent({ page, focussedTab }: { page: string; focussedTab: string }) {
    if (page === 'Smart Life.') {
        if (focussedTab === 'COURSES') return <Courses />;
        if (focussedTab === 'PROGRAMS') return <Programs />;
        if (focussedTab === 'RESOURCES') return <Resources />;
    }
    if (page === 'Socials.') {
        if (focussedTab === 'SOCIALS') return <Socials />;
        if (focussedTab === 'PLAYGROUND') return <Playground />;
    }
    if (page === 'Travel.') {
        if (focussedTab === 'AUSTRALIA') return <Australia />;
        if (focussedTab === 'EUROPE') return <Europe />;
    }
    if (page === 'Deals.') {
        if (focussedTab === 'AMAZON') return <Amazon />;
        if (focussedTab === 'AUDIBLE') return <Audible />;
        if (focussedTab === 'REDBALLOON') return <RedBalloon />;
        if (focussedTab === 'AGEBACKWARDS') return <AgeBackwards />;
    }

    return null;
}

export const TabItems = ({ page }: { page: string }) => {
    if (page === 'Smart Life.') {
        return [
            // { id: 'INDEX' as const, label: '← Back' },
            { id: 'COURSES' as const, label: 'Courses' },
            { id: 'PROGRAMS' as const, label: 'Programs' },
            { id: 'RESOURCES' as const, label: 'Resources' },
        ]
    }
    if (page === 'Socials.') {
        return [
            // { id: 'INDEX' as const, label: '← Back' },
            { id: 'SOCIALS' as const, label: 'Socials' },
            { id: 'PLAYGROUND' as const, label: 'Playground' },
        ]
    }
    if (page === 'Travel.') {
        return [
            // { id: 'INDEX' as const, label: '← Back' },
            { id: 'AUSTRALIA' as const, label: 'Australia' },
            { id: 'EUROPE' as const, label: 'Europe' },
        ]
    }
    if (page === 'Deals.') {
        return [
            // { id: 'INDEX' as const, label: '← Back' },
            { id: 'AMAZON' as const, label: 'Amazon' },
            { id: 'AUDIBLE' as const, label: 'Audible' },
            { id: 'REDBALLOON' as const, label: 'Red Balloon' },
            { id: 'AGEBACKWARDS' as const, label: 'Age Backwards' },
        ]
    }
    return null;
}