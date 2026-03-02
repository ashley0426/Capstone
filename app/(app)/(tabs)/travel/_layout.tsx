import { Stack } from 'expo-router';
import React from 'react';

export default function TravelLayout() {

    // This layout can be deferred because it's not the root layout.
    return (

        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="filter" options={{ headerShown: false }} />
            <Stack.Screen name="filter-result" options={{ headerShown: false }} />
            <Stack.Screen name="tour-details" options={{ headerShown: false }} />
        </Stack>

    );
}
