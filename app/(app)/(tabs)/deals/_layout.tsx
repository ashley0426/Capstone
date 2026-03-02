import { Stack } from 'expo-router';
import React from 'react';

export default function DealsLayout() {

    // This layout can be deferred because it's not the root layout.
    return (

        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/* <Stack.Screen name="program" options={{ headerShown: false }} />
            <Stack.Screen name="brain-health" options={{ headerShown: false }} />
            <Stack.Screen name="courses" options={{ headerShown: false }} /> */}
        </Stack>

    );
}
