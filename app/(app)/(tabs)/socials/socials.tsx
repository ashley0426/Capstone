import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Carousel from 'pinar';
import { useRef, useState } from 'react';
import React from 'react';

const images = [
	{
		title: 'SOCIAL',
		name: 'Socials',
		description: 'Get to know 60 Plus Playground and explore our social media',
		img: require('@/assets/images/social/socials-main-large.jpeg'),
		route: 'socials-page'
	},
	{
		title: 'GET SOCIAL',
		name: 'Get Socials',
		description: 'Explore Australia’s diverse landscapes, discover new passions and emerging trends to enhance well being.',
		img: require('@/assets/images/social/get-social-main-image.jpg'),
		route: 'get-socials-page'
	},
	{
		title: 'GAMES',
		name: 'Games',
		description: 'Challenge your mind by diving into a fun puzzle, playing a game, or exploring a light-hearted joke.',
		img: require('@/assets/images/social/games-main-image.jpg'),
		route: 'games-page'
	}
]
type carousel = Carousel | null;

export default function Socials() {
    const insets = useSafeAreaInsets();
	let carouselRef = useRef<carousel>(null);
	const [carouselIndex, setCarouselIndex] = useState<number>(0);

	const chooseCarouselPage = (indexDesiredPage: number) => {
		carouselRef && carouselRef.current && carouselRef.current.scrollToIndex({
			index: indexDesiredPage,
			animated: true,
		})
	};

    return (
        <>
			<View >
				{/* Tabs */}
				<View style={styles.tabContainer}>
					<TouchableOpacity onPress={(): void | null => chooseCarouselPage(0)
					}>
						{carouselIndex === 0 ? (
							<View style={[styles.activeTabView]}>
								<Text style={[styles.tab, styles.activeTab]}>SOCIALS</Text>
							</View>
						) : (
							<Text style={[styles.tab]}>SOCIALS</Text>
						)}
					</TouchableOpacity>
					<TouchableOpacity onPress={(): void | null => chooseCarouselPage(1)
					}>
						{carouselIndex === 1 ? (
							<View style={[styles.activeTabView]}>
								<Text style={[styles.tab, styles.activeTab]}>GET SOCIAL</Text>
							</View>
						) : (
							<Text style={[styles.tab]}>GET SOCIAL</Text>
						)}
					</TouchableOpacity>
					<TouchableOpacity onPress={(): void | null => chooseCarouselPage(2)
					}>
						{carouselIndex === 2 ? (
							<View style={[styles.activeTabView]}>
								<Text style={[styles.tab, styles.activeTab]}>GAMES</Text>
							</View>
						) : (
							<Text style={[styles.tab]}>GAMES</Text>
						)}
					</TouchableOpacity>

				</View>
				<View style={styles.carouselContainer}>
					<Carousel
						style={styles.carousel}
						ref={carouselRef}
						// mergeStyles={true}
						showsControls={false}
						dotStyle={styles.dotStyle}
						activeDotStyle={[styles.dotStyle, { backgroundColor: '#FF9800' }]}
						onIndexChanged={({ index, total }): void => {
							setCarouselIndex(index)
						}}
					>
						{images.map((img) => (
							<View key={img.title}>
								<Image style={styles.image} source={img.img} key={img.title} />
								<Text style={styles.overlayTitle}>{img.title}</Text>
								<Text style={styles.overlayText}>{img.description}</Text>
								<TouchableOpacity style={styles.button} onPress={() => {
									if (img.route === 'socials-page') {
										router.push({
											pathname: `/(app)/(tabs)/socials/socials-page`,
										});
									}
									if (img.route === 'get-socials-page') {
										router.push({
											pathname: `/(app)/(tabs)/socials/get-socials-page`,
										});
									}
									if (img.route === 'games-page') {
										router.push({
											pathname: `/(app)/(tabs)/socials/games-page`,
										});
									}
								}}>
									<Text style={styles.buttonText}>Visit {img.name}</Text>
								</TouchableOpacity>
							</View>
						))}
					</Carousel>
				</View>
			</View>
		</>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	tabContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: '4%',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',

	},
	tab: {
		fontSize: 16,
		color: '#888',
		paddingHorizontal: '3%',
		paddingTop: '3%'
	},
	activeTab: {
		color: '#000',
		fontWeight: 'bold',
		// borderBottomWidth: 2,
		// borderBottomColor: '#FF9800',
		// paddingBottom: 5,
		// textDecorationLine: 'underline',
		// textDecorationColor: '#FF9800',
	},
	activeTabView: {
		borderBottomWidth: 2,
		borderBottomColor: '#FF9800',
		paddingBottom: 5,
		// textDecorationLine: 'underline',
		// textDecorationColor: '#FF9800',
	},
	contentContainer: {
		position: 'relative',
		alignItems: 'center',
		padding: 16,
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 10,

	},
	overlayTitle: {
		position: 'absolute',
		top: '5%',
		left: '5%',
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		backgroundColor: '#6f696996', // Add white background
		padding: '3%', // Add some space around the text
		borderRadius: 5, // Round the edges slightly
	},
	overlayText: {
		position: 'absolute',
		bottom: '22%',
		left: '5%',
		right: '5%',
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		backgroundColor: '#6f696996', // Add white background
		padding: '3%', // Add some space around the text
		borderRadius: 5, // Round the edges slightly
	},
	button: {
		position: 'absolute',
		bottom: '10%',
		left: '5%',
		backgroundColor: 'white',
		paddingVertical: '3%',
		paddingHorizontal: '5%',
		borderRadius: 5,
	},
	buttonText: {
		color: 'black',
		fontSize: 16,
		fontWeight: '700',
	},
	header: {
		fontSize: 30,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	dotStyle: {
		width: '10%',
		height: 4,
		backgroundColor: 'silver',
		marginHorizontal: 3,
		borderRadius: 3,
	},
	image2: {
		height: '100%',
		width: '100%',
		borderRadius: 20,
	},
	carousel: {
		height: '100%',
		width: '100%',
	},
	carouselContainer: {
		height: '75%',
		marginHorizontal: 10,
		marginTop: 10,
	},
});