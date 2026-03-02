import { Stack } from 'expo-router';
import React from 'react';

export default function SocialsLayout() {

    // This layout can be deferred because it's not the root layout.
    return (

        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="playground" options={{ headerShown: false }} />
            <Stack.Screen name="socials" options={{ headerShown: false }} />
            <Stack.Screen name="socials-page" options={{ headerShown: false }} />
            <Stack.Screen name="get-socials-page" options={{ headerShown: false }} />
            <Stack.Screen name="get-socials-detail" options={{ headerShown: false }} />
            <Stack.Screen name="games-page" options={{ headerShown: false }} />
            <Stack.Screen name="influencer-details-Irene" options={{ headerShown: false }} />
            <Stack.Screen name="influencer-details-Tony" options={{ headerShown: false }} />
            <Stack.Screen name="influencer-details-Vicki" options={{ headerShown: false }} />
            <Stack.Screen name="influencer-details-Ken" options={{ headerShown: false }} />
        </Stack>

    );
}
