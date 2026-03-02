import { Image, StyleSheet, View, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, Button, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import React from 'react';

import common from '@/components/styles/commonStyles';

import ProfileIcon from '@/assets/images/tabImages/profile.svg';

import { useVisualCrossingWeather } from '@/assets/api/useVisualCrossingWeather';
import { useWeatherbitWeather } from '@/assets/api/useWeatherbitWeather';
import { ThemedText } from '@/components/ThemedText';
import { getValueFor } from '@/components/auth/secureStoreHelper';

const { width, height } = Dimensions.get('window');
const iconContainerSize = width * 0.15;


export default function HomeScreen() {
	const router = useRouter();
	const [userName, setUserName] = useState('');
	
	useEffect(() => {
		const getUserData = async () => {
			try {
				const firstName = await getValueFor('firstName');
				setUserName(`, ${firstName}`);
			} catch (error) {
				console.error('Error accessing user data:', error);
			}
		};

		getUserData();
	}, []);

  	// Weather API
	// TODO: get users current location
  	const [search, setSearch] = useState("Brisbane");
  	const [inputText, setInputText] = useState(search);
  	const [selectedApi, setSelectedApi] = useState('visualCrossing'); // 'visualCrossing', 'weatherbit', 'weatherapi'
	const [currentDateTime, setCurrentDateTime] = useState(new Date());

	useEffect(() => {
		// Update the time every second
		const timer = setInterval(() => {
			setCurrentDateTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	// Formate date and time
	const localDate = currentDateTime.toLocaleDateString();
	const localTime = currentDateTime.toLocaleTimeString();
  
	// Fetch data using the appropriate weather hook based on selectedApi
  	const visualCrossing = useVisualCrossingWeather(selectedApi === 'visualCrossing' ? search : null);
  	const weatherbit = useWeatherbitWeather(selectedApi === 'weatherbit' ? search : null);
  
  	const handleSearchSubmit = () => {
		if (inputText.trim()) {
		  	setSearch(inputText.trim())
		}
  	}
  
  	let loading, weatherData, error;
  
	  // Conditionally assign data based on selected API for weather display
  	if (selectedApi === 'visualCrossing') {
		loading = visualCrossing.loading;
		weatherData = visualCrossing.weatherData;
		error = visualCrossing.error;
  	} else if (selectedApi === 'weatherbit') {
		loading = weatherbit.loading;
		weatherData = weatherbit.weatherData;
		error = weatherbit.error;
	}

	return (
		<>
			<Image style={common.background} source={require('@/assets/images/BackgroundCircles.png')} />
			<ScrollView style={{ paddingHorizontal: 20, }}>
				{/* TODO: Username */}
				<View style={ styles.content }>
					<View style={styles.userCard}>
						<ThemedText type="title">Welcome{userName}!</ThemedText>
						<TouchableOpacity onPress={() => router.navigate('/profile')}>
							<ProfileIcon width={30} height={30} style={{ padding: 10, borderWidth: '1.5px', borderColor: 'black', borderRadius: 15}}></ProfileIcon>
						</TouchableOpacity>
					</View>
					<View style={ styles.card }>
						{loading && (
							<>
								<ActivityIndicator size="large" style={ styles.center } />
								<ThemedText>Loading weather data for { search }</ThemedText>
							</>
						)}
						{!loading && !error ? (weatherData && (
							<>
								<ThemedText type='subtitle' style={{ marginBottom: 10 }}>{weatherData.cityName}</ThemedText>
								<ThemedText>{weatherData.weatherDescription}, {weatherData.temp}°C</ThemedText>
							</>
						)) : (error && setSelectedApi('weatherbit'))}
					</View>
					<View style={ styles.card }>
						<ThemedText>{localTime}</ThemedText>
						<ThemedText>{localDate}</ThemedText>
					</View>
					{/* <View style={ styles.weatherCard }>
						<ThemedText>Change location:</ThemedText>
						<TextInput
							style={{ backgroundColor: "white", marginTop: 10 }}
							placeholder="Search city..."
							value={inputText}
							onChangeText={setInputText}
							onSubmitEditing={handleSearchSubmit}
							returnKeyType="search"
						/>
						<Pressable onPress={handleSearchSubmit} style={{ marginTop: 10 }}>
							<View><ThemedText>Submit</ThemedText></View>
						</Pressable>
					</View> */}
					<View style={ styles.card }>
						<ThemedText>Select a category below!</ThemedText>
					</View>
				</View>
			</ScrollView>
		</>
	);
}
		  
const styles = StyleSheet.create({
	banner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	content: {
		marginTop: 50,
	},
	userCard: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	logoContainer: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 50,
		alignItems: 'center',
	},
	stepContainer: {
		gap: 8,
		marginBottom: 45,
		marginHorizontal: 8,
		textAlign: 'center',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		paddingVertical: 20,
		paddingHorizontal: 0,
		width: 100,
		borderRadius: 25,
		elevation: 3,
		backgroundColor: 'grey'
	},
	buttonText: {
		color: 'white'
	},
	iconContainer: {
		width: iconContainerSize,
		height: iconContainerSize,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center"
	},
	video: {
		flex: 1,
		alignSelf: 'stretch',
	},
	card: {
		padding: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		borderRadius: 15,
		marginVertical: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		alignItems: "center",
	},
	weatherTemp: {
		fontSize: 18,
		marginBottom: 8,
	},
	weatherUpdated: {
		fontSize: 12,
		color: 'gray',
		marginTop: 10,
	},
});
