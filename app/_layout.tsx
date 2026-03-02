import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';
import 'react-native-reanimated';
import { Appearance, Platform, View } from 'react-native';
import { useColorScheme,} from '@/hooks/useColorScheme';
import { Slot } from 'expo-router';
import { SessionProvider } from '../components/auth/ctx';
import { LogBox } from 'react-native';
import React from 'react';


// hide errors

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Force ColorScheme to be light. There is no system theme for the web so apply for mobile app only.
if(Platform.OS == 'android' || Platform.OS == 'ios') Appearance.setColorScheme('light');

export default function RootLayout() {
	useColorScheme();

	const [fontsLoaded] = useFonts({
		'Figtree-Regular': require('../assets/fonts/Figtree-Regular.ttf'),
		'Figtree-Bold': require('../assets/fonts/Figtree-Bold.ttf'),
		'Figtree-Italic': require('../assets/fonts/Figtree-Italic.ttf'),
	});
	const [appIsReady, setAppIsReady] = useState(false);

	React.useEffect(() => {
		if (fontsLoaded) {
			setAppIsReady(true);
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);
	
	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}	

	return (
		// Custom component SessionProvider sets up authentication context to the entire app. Render our layout inside of it.
		<SessionProvider>
			<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
				<Slot />
			</View>
		</SessionProvider>
		
	)
}
