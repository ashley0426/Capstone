import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Pressable, ScrollView, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import EditProfilePageIcon from '@/components/ProfilePageIcons/EditProfileIcon';
import ChangePasswordIcon from '@/components/ProfilePageIcons/ChangePasswordIcon';
import SettingsAndPrivacyIcon from '@/components/ProfilePageIcons/SettingsAndPrivacyIcon';
import LogoutIcon from '@/components/ProfilePageIcons/LogoutIcon';
import { useSession } from '@/components/auth/ctx';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from 'react';
import { getValueFor } from '@/components/auth/secureStoreHelper';
import { resetPassword } from '@/functions/ForgetPassword Functions/resetPassword';
import React from 'react';
import { Image } from 'expo-image';
// https://icons.expo.fyi/Index/Feather/camera-off

import common from '@/components/styles/commonStyles';

const { width, height } = Dimensions.get('window');
const iconContainerSize = width * 0.15;
const buttonSpacing = 25;

export default function ProfileScreens() {
	const insets = useSafeAreaInsets();
	const logoSize = width * 0.45;
	const { signOut } = useSession();
	const [modalVisible, setModalVisible] = useState(false);
	const [resetPressed, setResetPressed] = useState(false);

	const [user, setUser] = useState({
		email: '',
		firstName: '',
		lastName: '',
	});
	useEffect(() => {
		const getUserData = async () => {
			try {
				const email = await getValueFor('email');
				const firstName = await getValueFor('firstName');
				const lastName = await getValueFor('lastName');

				if (email && firstName && lastName) {
					setUser({
						email: email,
						firstName: firstName,
						lastName: lastName,
					})
				}
			} catch (error) {
				console.error('Error accessing user data:', error);
			}
		};
		getUserData();
	}, []);

	const handleLogout = () => {
		setModalVisible(false);
		// potentially get rid of signOut() as its going through the session handler and idk what going on with it its causing problems
		// SESSION ERROR 
		// signOut();

		// potential solution but needs testing to ensure users cant get back into the old stack of pages with potentially old data of the previous user
		router.replace('/');
	}
	const handleResetPassword = async () => {
		setResetPressed(true);

		const email = await getValueFor('email');
		if (!email) {
			alert("Failed to retrieve email");
			setResetPressed(false);
			return;
		}

		try {
			const result = await resetPassword(email);
			if (result === 200) {
				router.push(`/profile/change-password-success`);
			} else {
				alert("Failed to reset password");
			}
		} catch (error) {
			// alert(`Error resetting password: ${error}`);
			console.error("Error resetting password:", error);
		} finally {
			setResetPressed(false);
		}
	};
	return (
		<>
			<Image style={common.background} source={require('@/assets/images/BackgroundCircles.png')} />
			<View style={{
				//make the circle
				alignSelf: "center",
				marginTop: insets.top + (width * 0.1),
				backgroundColor: 'rgba(255, 255, 255, 0.9)',
				width: logoSize, height: logoSize,
				borderRadius: 100,
				//align items within
				alignItems: 'center',
				justifyContent: 'center',
			}}>
				<Feather name="camera-off" size={logoSize * 0.5} color="black" />
			</View>

			<Text style={{
				fontSize: 15,
				fontWeight: "bold",
				alignSelf: "center",
				color: "black",
				marginTop: 10
			}}
			> {user.firstName} {user.lastName}</Text>
			<Text style={{
				fontSize: 15,
				alignSelf: "center",
				color: "black",
				marginTop: 10
			}}
			> {user.email} </Text>

			<ScrollView>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>

					<Pressable onPress={() => {
						router.push({
							pathname: '/(app)/(tabs)/profile/edit-profile'
						})
					}}
						style={ styles.button }>
						<EditProfilePageIcon style={[styles.iconContainer]} />

						<Text style={{
							textAlign: "center",
							fontWeight: 'bold'
						}}>Edit Profile Page</Text>
					</Pressable>

					<Pressable
						testID='Reset Password Button'
						onPress={handleResetPassword}
						disabled={resetPressed}
						style={[styles.button, { backgroundColor: resetPressed ? '#d3d3d330' : 'rgba(255, 255, 255, 0.9)' }]}
					>
						<ChangePasswordIcon style={[styles.iconContainer]} />

						<Text style={{
							textAlign: "center",
							fontWeight: 'bold'
						}}>Reset Password</Text>

					</Pressable>

					{/* settings and privacy button */}

					<Pressable onPress={() => {
						router.push({
							pathname: '/(app)/(tabs)/profile/settings-and-privacy'
						})
					}}
						style={[styles.button]}>
						<SettingsAndPrivacyIcon style={[styles.iconContainer]} />

						<Text style={{
							textAlign: "center",
							fontWeight: 'bold'
						}}>Setting and Privacy</Text>
					</Pressable>

					<Pressable onPress={() => setModalVisible(true)} style={ styles.button }>
						<LogoutIcon style={styles.iconContainer} />
						<Text style={{ textAlign: "center", fontWeight: 'bold' }}>Logout</Text>
					</Pressable>

					<Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
						<View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
							<View style={{ backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
								<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Are you sure you want to log out?</Text>

								<TouchableOpacity
									style={styles.modalButton}
									onPress={handleLogout}
								>
									<Text style={[styles.modalButtonText, { color: "black" }]}>Logout</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={[styles.modalButton, { backgroundColor: 'grey' }]}
									onPress={() => setModalVisible(false)}
								>
									<Text style={styles.modalButtonText}>Cancel</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		flexDirection: 'row',
		width: '80%',
		borderRadius: 15,
		marginVertical: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		alignItems: "center",
	},

	iconContainer: {
		width: iconContainerSize,
		height: iconContainerSize,
		borderRadius: 20,
		paddingHorizontal: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	modalButton: {
		backgroundColor: '#F89522',
		padding: 15,
		borderRadius: 10,
		width: '80%',
		alignItems: 'center',
		marginBottom: 10,
	},
	modalButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
});

