import { Stack } from 'expo-router';
import React from 'react';

export default function ProfileLayout() {

    return (

        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
            <Stack.Screen name="change-password-success" options={{ headerShown: false }} />
            <Stack.Screen name="settings-and-privacy" options={{ headerShown: false }} />     
            <Stack.Screen name="notifications" options={{ headerShown: false }} /> 
            <Stack.Screen name="security-and-permissions" options={{ headerShown: false }} /> 
            <Stack.Screen name="support" options={{ headerShown: false }} /> 
            <Stack.Screen name="terms-and-policies" options={{ headerShown: false }} /> 
        </Stack>
    );
}