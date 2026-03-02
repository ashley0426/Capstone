import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { Tour } from '@/interfaces/toursInterface';
import BackButton from '@/components/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const filterResult = () => {
	// before this page can work filter must serialize data
	// past to filter result as param to this page
	// then we need to extract data to use
	const insets = useSafeAreaInsets();
	const params = useLocalSearchParams();
	const { tourData } = params;
	// Convert the serialized string back into an array of objects
	const parsedTourData: Tour[] = typeof tourData === 'string' ? JSON.parse(tourData) : [];

	const renderSearchResultsText = (count: number) => {
		if (count === 1) {
			return `1 search result`;
		} else if (count === 0) {
			return `0 search results`;
		} else {
			return `${count} search results`;
		}
	}

	return (
		<View style={{ backgroundColor: "white" }}>
			<View style={styles.headerContainer}>
				<BackButton />
				<Text style={[styles.headerTextTop, { marginTop: insets.top + 10 }]}>Filter</Text>
			</View>

			{parsedTourData && parsedTourData.length > 0 ? (
				<>
					{/* display how many results we have */}
					<Text style={[{ textAlign: 'center', marginBottom: '3%' }]}>
						{renderSearchResultsText(parsedTourData.length)}
					</Text>
					<FlatList
						data={parsedTourData}
						keyExtractor={(item) => item.id.toString()}
						contentContainerStyle={styles.scrollView}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => {
								const serializedTourData = JSON.stringify(item);
								router.push({
									pathname: '/travel/tour-details',
									params: { tourData: serializedTourData }
								})
								return undefined;
							}}>
								<View style={styles.dealCard}>
									{item.thumbnail_image ? (
										<Image source={{ uri: item.thumbnail_image }} style={styles.image} />
									) : (
										<View style={styles.placeholderImage}>
											<Text>No Image</Text>
										</View>
									)}
									<Text style={styles.destination}>{item.tour_name}</Text>
								</View>
							</TouchableOpacity>
						)}
					/>
				</>

			) : (
				<View>
					{/* <EmptyIcon name="md-empty" size={30} color="#000" /> Replace "md-empty" with the actual icon name */}
					<Text style={[styles.header, { marginTop: insets.top + 10 }]}>No Tours Found</Text>
				</View>
			)}

		</View>
	)
}
const styles = StyleSheet.create({
	headerContainer: {
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: "red",
	},
	headerTextTop: {
		fontSize: 24,
		fontWeight: 'bold',
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: '10%',
		// Styling for the page title.
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		alignSelf: 'center',
		marginVertical: 20,
		// Styling for the page title.
	},
	scrollView: {
		marginHorizontal: 20,
		paddingBottom: '75%'
		// Styling for the FlatList content container.
	},
	dealCard: {
		marginBottom: 20,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: '#fff',
		elevation: 3,
		// Styling for each tour item container.
	},
	placeholderImage: {
		width: '100%',
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eee',
		// Styling for the placeholder image container.
	},
	destination: {
		fontSize: 18,
		fontWeight: 'bold',
		marginVertical: 5,
		marginHorizontal: 10,
		// Styling for the tour name.
	},
	description: {
		fontSize: 14,
		color: '#888',
		marginHorizontal: 10,
		marginBottom: 10,
		// Styling for the tour description.
	},
	image: {
		width: '100%',
		height: 150,
		// Styling for the tour image.
	},
});
export default filterResult