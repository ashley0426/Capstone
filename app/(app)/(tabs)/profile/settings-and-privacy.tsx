import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Pressable, ScrollView } from 'react-native';
import BackButton from '@/components/BackButton'; // Adjust the path as necessary
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import NotificationIcon from '@/components/icons/NotificationsIcon';
import SecurityAndPrivacyIcon from '@/components/icons/SecurityAndPrivacyIcon';
import SupportIcon from '@/components/icons/SupportIcon';
import PageTitle from '@/components/PageTitle';
import TermsAndPolicy from '@/components/icons/TermsAndPolicy';
import React from 'react';

import common from '@/components/styles/commonStyles';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');
const iconContainerSize = width * 0.15;

const settingsAndPrivacy = () => {

	const insets = useSafeAreaInsets();
	const logoSize = width * 0.33;

	/*
	Two top <Text> are place holders to get the correct structure while basic UI is created
	All Icons accessed from ProfilePageIcons folder. Not sure if there is a more efficient way to import all of them
	Difficult to find a neat way to centre the text inside the pressables, while the Icon is inside and centered left.
	*/

	return (
		<View>
			<Image style={common.background} source={require('@/assets/images/BackgroundCircles.png')} />

			<BackButton />
			<PageTitle text="Settings and Privacy" />


			<View style={styles.container}>

				<Text style={styles.label}>Preferences</Text>
				<Text style={[styles.settingText, { marginBottom: '20%', marginLeft: 0 }]}>Customise your experience</Text>

				<View style={styles.settingRow}>
					<NotificationIcon />
					<Pressable onPress={() => {
						router.push({
							pathname: '/(app)/(tabs)/profile/notifications'
						})
					}}>
						<Text style={styles.settingText}>Notifications</Text>
					</Pressable>
				</View>
				<View id="divider" style={styles.divider} />

				<Text style={[styles.label, { marginBottom: '10%' }]}>More info and support</Text>

				<View style={styles.settingRow}>
					<SecurityAndPrivacyIcon />
					<Pressable onPress={() => {
						router.push({
							pathname: '/(app)/(tabs)/profile/security-and-permissions'
						})
					}}>
						<Text style={styles.settingText}>Security & Permissions</Text>
					</Pressable>
				</View>

				<View style={styles.settingRow}>
					<SupportIcon />
					<Pressable onPress={() => {
						router.push({
							pathname: '/(app)/(tabs)/profile/support'
						})
					}}>
						<Text style={[styles.settingText, { marginLeft: '10%' }]}>Support</Text>
					</Pressable>
				</View>

				<View style={styles.settingRow}>
					<TermsAndPolicy />
					<Pressable onPress={() => {
						router.push({
							pathname: '/(app)/(tabs)/profile/terms-and-policies'
						})
					}}>
						<Text style={styles.settingText}>Terms and Policies</Text>
					</Pressable>
				</View>

			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// height: '100%',
		marginHorizontal: '15%',
		top: '10%',
		paddingBottom: 250,
	},
	label: {
		display: 'flex',
		fontSize: 17,
		fontWeight: 'bold'
	},
	settingRow: {
		marginVertical: 15,
		display: 'flex',
		flexDirection: 'row',
	},
	settingText: {
		fontSize: 17,
		marginLeft: '5%',
		lineHeight: 19,
		fontWeight: '500'
	},
	divider: {
		height: 1,
		backgroundColor: '#000',
		marginTop: '30%',
		marginBottom: '20%'
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F89522',
		borderRadius: 8,
		textAlign: 'center',
		paddingHorizontal: 20,
		width: '80%',
		justifyContent: 'flex-start',
	},

	iconContainer: {
		width: iconContainerSize,
		height: iconContainerSize,
		borderRadius: 20,
		paddingHorizontal: 20,
		justifyContent: "center",
		alignItems: "center"
	},


});

export default settingsAndPrivacy 