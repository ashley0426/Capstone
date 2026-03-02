import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Linking } from 'react-native'
import { Image } from 'expo-image'
import React, { useCallback, useEffect, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Carousel, { defaultStyles } from 'pinar';
import { Jokes, JokesData } from '@/components/socials-page/get-social-data'

const { width, height } = Dimensions.get('window');

const gamesPage = () => {
	const insets = useSafeAreaInsets();
	const [randomJoke, setRandomJoke] = useState<JokesData | null>(null);
	const [showJoke, setShowJoke] = useState<boolean>(false);
	const getRandomValue = () => {
		const randomIndex = Math.floor(Math.random() * Jokes.length);
		setRandomJoke(Jokes[randomIndex]);
	};
	useEffect(() => {
		getRandomValue();
	}, []);
	const toggleJoke = useCallback(() => {
		setShowJoke(prevState => !prevState);
	}, []);
	return (
		<>
			<View>
				<ThemedText style={[styles.header, { marginTop: insets.top + 10 }]}>GAMES</ThemedText>
			</View>

			<ScrollView style={{ marginTop: '10%', paddingHorizontal: 20, }}>
				<Text style={{ fontSize: 16 }}>Take a moment today to challenge your mind and lift your spirits by diving into a fun puzzle, playing a game, or exploring a light-hearted joke. Engaging in these simple activities can spark joy, stimulate your brain, and provide a refreshing break from your daily routine to keep you feeling more positive and energized to boost your mood.</Text>
				<View style={{ width: '100%' }}>
					<TouchableOpacity onPress={toggleJoke}>
						<View style={{ marginTop: 20, alignSelf: 'center', width: '80%', height: 200, borderTopLeftRadius: 50, borderBottomRightRadius: 50, backgroundColor: '#1ca7ac' }}>
							<View style={{ margin: '10%' }}>
								{showJoke ? (
									<>
										<Text style={{ fontSize: 16 }}>{randomJoke?.answer}</Text>
										<Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>*Click to see hide answer*</Text>
									</>
								) : (
									<>
										<Text style={{ fontSize: 16 }}>{randomJoke?.joke}</Text>
										<Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>*Click to see answer*</Text>
									</>
								)}
							</View>
						</View>
					</TouchableOpacity>
					<Text style={styles.hahaTextTop}>HA</Text>
					<Text style={styles.hahaTextBottom}>HA</Text>
				</View>

				{/* Puzzle Section */}
				<View style={styles.sectionContainer}>
					<Text style={styles.sectionTitle}>Puzzles</Text>
					<Carousel style={{ height: 200 }}
						showsControls={true}
						mergeStyles={true}
						controlsButtonStyle={styles.controlsButtonStyle}
						controlsTextStyle={styles.controlsTextStyle}
						dotStyle={styles.dotStyle}
						activeDotStyle={[styles.dotStyle, { backgroundColor: '#FF9800' }]}
					>
						<TouchableOpacity onPress={() => Linking.openURL('https://simplydailypuzzles.com/daily-sudoku/')} style={styles.card}>
							<Image source={require('@/assets/images/social/games/SUDUKU.jpg')} style={styles.cardImage} />
							<Text style={styles.cardText}>Daily Sudoku Puzzle</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.card}>
							<Image source={require('@/assets/images/social/games/PUZZLE-IMAGE_1.jpg')} contentFit='contain' style={styles.cardImage} />
							<Text style={styles.cardText}>Killer Sudoku</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.card}>
							<Image source={require('@/assets/images/social/games/PUZZLE-IMAGE_2.jpg')} contentFit='contain' style={styles.cardImage} />
							<Text style={styles.cardText}>Jigsaw Sudoku</Text>
						</TouchableOpacity>

					</Carousel>
				</View>

				{/* Crossword Section */}
				<View style={styles.sectionContainer}>
					<Text style={styles.sectionTitle}>Crosswords</Text>

					<Carousel style={{ height: 200 }}
						showsControls={true}
						mergeStyles={true}
						controlsButtonStyle={styles.controlsButtonStyle}
						controlsTextStyle={styles.controlsTextStyle}
						dotStyle={styles.dotStyle}
						activeDotStyle={[styles.dotStyle, { backgroundColor: '#FF9800' }]}
					>
						<TouchableOpacity style={styles.card} onPress={() => Linking.openURL('https://simplydailypuzzles.com/daily-quick-crossword/')}>
							<Image source={require('@/assets/images/social/games/CROSSWORDS.jpg')} style={styles.cardImage} />
							<Text style={styles.cardText}>Today's Crossword</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.card} onPress={() => Linking.openURL('https://simplydailypuzzles.com/daily-cryptic/')}>
							<Image source={require('@/assets/images/social/games/CROSSWORDS.jpg')} style={styles.cardImage} />
							<Text style={styles.cardText}>Easy Cryptic Crossword</Text>
						</TouchableOpacity>
					</Carousel>
				</View>

			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({

	header: {
		fontSize: 30,
		fontWeight: 'bold',
		alignSelf: 'center',
		// color:"white",
		marginVertical: 20,
		// Styling for the page title.
	},
	hahaTextTop: {
		position: 'absolute',
		fontFamily: 'Cloud',
		top: 10,
		right: 10,
		color: '#000',
		fontSize: 24,
		transform: [{ rotate: '-20deg' }],
	},
	hahaTextBottom: {
		position: 'absolute',
		fontFamily: 'Cloud',
		top: 35,
		right: 5,
		color: '#000',
		fontSize: 24,
		transform: [{ rotate: '-20deg' }],
	},
	sectionContainer: {
		marginTop: 30,
	},
	cardContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	horizontalScrollView: {
		flexDirection: 'row',
	},
	card: {
		width: width * 0.68,
		// width: '85%',
		// marginRight: 15,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: '#ddd',
		alignSelf: 'center'
	},
	cardImage: {
		width: '100%',
		height: 100,
	},
	cardText: {
		textAlign: 'center',
		paddingVertical: 10,
		backgroundColor: '#4d4d4d',
		color: '#fff',
		fontWeight: 'bold',
	},
	arrowLeft: {
		position: 'absolute',
		left: 0,
		top: '50%',
	},
	arrowRight: {
		position: 'absolute',
		right: 0,
		top: '50%',
	},
	dotStyle: {
		width: '10%',
		height: 4,
		backgroundColor: 'silver',
		marginHorizontal: 3,
		borderRadius: 3,
	},
	controlsButtonStyle: {
		display: "flex",
		flexDirection: "row",
		bottom: '20%',
		alignItems: "center",
	},
	controlsTextStyle: {
		fontSize: 50,
		padding: 0
	}
});
export default gamesPage