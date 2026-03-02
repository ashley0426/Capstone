import { Image, StyleSheet, View, Pressable, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import common from '@/components/styles/commonStyles';
import { NAVY } from '@/components/theme';
import React from 'react';

export default function IndexHomeScreen() {
	return (
		<>
			<View style={ common.backgroundBase }>
				<Image style={[common.backgroundImage, {opacity: 100}]} source={require('@/assets/images/BackgroundCircles.png')} />
			</View>
			<View style={styles.logoContainer}>
				<Pressable
					onPress={() => { router.push('/sign-in'); }}
				>
					<View>
						<Image source={require('@/assets/images/logo.png')} style={styles.logoImage} />
					</View>
				</Pressable>

				<Pressable
					onPress={() => { router.push('/sign-in'); }}
					style={styles.NEOButton}
				>
					<ThemedText type="title" style={styles.buttonText}> Time to play !</ThemedText>
				</Pressable>
			</View >
		</>
	);
}

const styles = StyleSheet.create({
	NEOButton: {
		marginTop: '10%',
		borderRadius: 25,
		backgroundColor: NAVY,
		height: 80,
		width: 280,
		justifyContent: 'center',
	},
	button: {
		top: 91,
		borderRadius: 25,
		backgroundColor: '#F89522',
		width: 295,
		height: 55,
		justifyContent: 'center',
	},
	buttonText: {
		textAlign: 'center',
		color: 'white',
	},
	container: {
		flex: 1,
	},
	logoContainer: {
		flex: 1,
		alignItems: 'center', // Centers children horizontally
		justifyContent: 'center', // Centers children vertically
	},
	logoImage: {
		width: 250,
		height: 250,
		resizeMode: 'contain',
	},
});
