import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { useSession } from '../../components/auth/ctx';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Appearance, Platform } from 'react-native';

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();

  if (Platform.OS == 'android' || Platform.OS == 'ios') Appearance.setColorScheme('light');


  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
