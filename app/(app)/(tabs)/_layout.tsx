import { router, Tabs, useSegments } from 'expo-router';
import React from 'react';
import ProfileIcon from '@/assets/images/tabImages/profile.svg';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ICON_SIZE } from '@/constants/Constants';

import HomeIcon from '@/assets/images/tabImages/home.svg';
import SocialIcon from '@/assets/images/tabImages/social.svg';
import LivingIcon from '@/assets/images/tabImages/living.svg';
import TravelIcon from '@/assets/images/tabImages/travel.svg';
import DealsIcon from '@/assets/images/tabImages/deals.svg';
import { ThemedText } from '@/components/ThemedText';
import { BLUE, DARK, GREY, NAVY, ORANGE } from '@/components/theme';

export default function TabLayout() {
	const segments = useSegments();
	const insets = useSafeAreaInsets();
	
	// Hide tab bar for the following pages
	const hide = 
		segments.includes("edit-profile")||
		segments.includes("change-password-success") ||
		segments.includes("settings-and-privacy") ||
		segments.includes("notifications") ||
		segments.includes("security-and-permissions") ||
		segments.includes("support") ||
		segments.includes("terms-and-policies");
	
	return (
		<Tabs screenOptions={{
			tabBarShowLabel: true,
			tabBarActiveTintColor: 'black',
			tabBarInactiveTintColor: 'gray',
			tabBarActiveBackgroundColor: '#b1b1b150',
			headerShown: false,
			tabBarAccessibilityLabel: "navigation bar",
			tabBarTestID: "nav_bar",
			tabBarHideOnKeyboard: true,
			tabBarStyle: {
				display: hide ? "none" : "flex",
				height: ICON_SIZE * 2 + insets.bottom, 
				paddingBottom: insets.bottom,
				
			},
			tabBarItemStyle: {
				height: '100%',
			},
			tabBarIconStyle: {
				marginTop: 10,
				marginBottom: 15,
			},
		}}
		screenListeners={({ route }) => ({
			tabPress: e => {
			// Stop the default behaviour (which preserves stack)
			e.preventDefault();

			// Force navigate directly to the root index of that tab
			switch (route.name) {
				case 'home':
					router.replace('/(app)/(tabs)/home');
					break;
				case 'travel':
					router.replace('/(app)/(tabs)/travel');
					break;
				case 'deals':
					router.replace('/(app)/(tabs)/deals');
					break;
				case 'smartliving':
					router.replace('/(app)/(tabs)/smartliving');
					break;
				case 'socials':
					router.replace('/(app)/(tabs)/socials');
					break;
          		}
        	},
		})}>
			<Tabs.Screen name="home" options={{
				tabBarLabel: ({ focused }) => (
					<ThemedText style={{ color: DARK, paddingTop: 10 }}>HOME{"\n"}</ThemedText>
				),
				tabBarIcon: ({ focused }) => (
					<View style={[focused && styles.focusedIcon]}>
						<HomeIcon width={ICON_SIZE} height={ICON_SIZE} />
					</View>
				),
			}} />
			<Tabs.Screen name="travel" options={{
				tabBarLabel: ({ focused }) => (
					<ThemedText style={{ color: BLUE, paddingTop: 10 }}>TRAVEL{"\n"}</ThemedText>
				),
				tabBarIcon: ({ focused }) => (
					<View style={[focused && styles.focusedIcon]}>
						<TravelIcon width={ICON_SIZE} height={ICON_SIZE}/>
					</View>
				),
			}} />
			<Tabs.Screen name="deals" options={{
				tabBarLabel: ({ focused }) => (
					<ThemedText style={{ color: GREY, paddingTop: 10 }}>DEALS{"\n"}</ThemedText>
				),
				tabBarIcon: ({ focused }) => (
					<View style={[focused && styles.focusedIcon]}>
						<DealsIcon width={ICON_SIZE} height={ICON_SIZE} />
					</View>
				),
			}} />
			<Tabs.Screen name="smartliving" options={{
				tabBarLabel: ({ focused }) => (
					<ThemedText style={{ color: NAVY, textAlign: 'center' }}>SMART{"\n"}LIFE</ThemedText>
				),
				tabBarIcon: ({ focused }) => (
					
					<View style={[focused && styles.focusedIcon]}>
						<LivingIcon width={ICON_SIZE} height={ICON_SIZE} />
					</View>
				),
			}} />
			<Tabs.Screen name="socials" options={{
				tabBarLabel: ({ focused }) => (
					<ThemedText style={{ color: ORANGE, paddingTop: 10 }}>SOCIAL{"\n"}</ThemedText>
				),
				tabBarIcon: ({ focused }) => (
					<View style={[focused && styles.focusedIcon]}>
						<SocialIcon width={ICON_SIZE} height={ICON_SIZE} />
					</View>
				),
			}} />
			<Tabs.Screen name="profile" options={{
				href: null,
				tabBarIcon: ({ focused }) => (
					<View style={[focused && styles.focusedIcon]}>
						<ProfileIcon />
					</View>
				),
			}} />
		</Tabs>
	);
}
const styles = StyleSheet.create({
	focusedIcon: {
		transform: [{ scale: 1.1 }],
	},
	tabBar: {
		backgroundColor: '#fff',
	},
	indicator: {
		backgroundColor: '#F89522',
	},
});