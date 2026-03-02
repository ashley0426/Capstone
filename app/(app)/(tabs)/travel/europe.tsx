import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchToursData, saveToAsyncStorage } from '@/components/apiService';
import { ThemedText } from '@/components/ThemedText';
import SearchBar from '@/components/SearchBar';
import { router } from 'expo-router';
import { Tour } from '@/interfaces/toursInterface';
import DisplayTours from '@/components/DisplayTours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BLUE } from '@/components/theme';

const { width, height } = Dimensions.get('window');

const defaultSearch = 'Australia';
const title = 'European';

export default function Tours() {
    const insets = useSafeAreaInsets();
	// const [isLoading, setIsLoading] = useState(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [tours, setTours] = useState<Tour[]>([]);
	const [searchAndFilteredTours, setSearchAndFilteredTours] = useState<Tour[]>([]);
	const [searchText, setSearchText] = useState(''); // Initialize state for the search text

	const filteredTours = useMemo(() => {
		return Array.isArray(tours) ? tours.filter(tour =>
			tour.start_city.city_name.toLowerCase().includes(searchText.toLowerCase()) ||
			tour.end_city.city_name.toLowerCase().includes(searchText.toLowerCase()) ||
			tour.start_city.country_name.toLowerCase().includes(searchText.toLowerCase()) ||
			tour.end_city.country_name.toLowerCase().includes(searchText.toLowerCase()) ||
			tour.destination_cities.some(destinationCity => destinationCity.toLocaleLowerCase().includes(searchText.toLowerCase()))
		) : [];
	}, [searchText, tours]); // Dependencies: text and tours 

	const handleSearchChange = (text: string) => {
		setSearchText(text); // Update the state with the new text
		// filter tours based on if searchbar text matches the name of any start or end citys and any start or end countries  
		setSearchAndFilteredTours(filteredTours);
	};
	const clearTextInput = () => {
		setSearchText('');
	};

	useEffect(() => {
		const getToursData = async () => {
			try {
				const data = await fetchToursData();
				// Calling the 'fetchToursData' function to fetch the tour data from the API.
				// Filter european doesn't work, so for now filter not Australian tours
				// Will only work while two options
				const filteredTours = data.filter((tour: Tour) =>
					!tour.start_city.country_name.toLowerCase().includes(defaultSearch.toLowerCase()) ||
					!tour.end_city.country_name.toLowerCase().includes(defaultSearch.toLowerCase())
				);

				setTours(filteredTours);
				setSearchAndFilteredTours(filteredTours);

				await AsyncStorage.setItem('tours', JSON.stringify(data));
				setIsLoading(false)
				// Updating the 'tours' state with the fetched data.
			} catch (error) {
				console.error('Error fetching tours data:', error);
				// Logging any errors encountered during the fetch operation.
			}
		};

		getToursData();
		// handleSearchChange(searchText);
		// Calling the 'getToursData' function when the component mounts.
	}, []);

    return (
        <View>
		 	<ThemedText type='title' style={{ textAlign: 'center' }}>
		 		{title.toUpperCase()} TOURS
		 	</ThemedText>
		 	<ThemedText type='subtitle' style={{ textAlign: 'center' }}>
		 		Let's Explore!
		 	</ThemedText>

		 	<View style={styles.searchFilter}>
		 		<SearchBar searchText={searchText == 'australia' ? '' : searchText} onSearchChange={handleSearchChange} clearText={clearTextInput} />

				<TouchableOpacity
					style={styles.filterButton}
					onPress={() => {
						router.push({
							pathname: '/(app)/(tabs)/travel/filter',
						});
					}}>
					<Icon name="filter-list" size={24} color="#000" />
				</TouchableOpacity>
				<ThemedText style={[{ marginLeft: 10 }]}>
					Filter
				</ThemedText>

			</View >

			{isLoading ? (
				<View style={{ height: "100%" }}>
					{/* gif for loading screen */}
					<Image
						source={require('@/assets/gif/loading.gif')}
						style={{ width: width * .7, height: width * .7, alignSelf: 'center' }}
					/>
				</View>
			) : (
				<DisplayTours searchText={searchText} tours={tours} searchAndFilteredTours={searchAndFilteredTours} />
			)}
		</View>
    );
}

const styles = StyleSheet.create({
	searchFilter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
		marginVertical: 10,
		// Flex container for search input and filter button, aligning them in a row.
	},
	searchInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		paddingHorizontal: 10,
		height: 40,
		// Styling for the search input field.
	},
	filterButton: {
		marginLeft: 10,
		padding: 10,
		backgroundColor: '#eee',
		borderRadius: 8,
		// Styling for the filter button.
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
	image: {
		width: '100%',
		height: 150,
		// Styling for the tour image.
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
	emptyState: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#cc1212',
	},

	backgroundImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		opacity: 0.4,
	},
	content: {
		flex: 1,
		paddingBottom: 80,
	},
	banner: {
		backgroundColor: BLUE,
		padding: 20,
		paddingTop: 40,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	card: {
		backgroundColor: '#fff',
		border: '2px solid black',
		borderRadius: 10,
		overflow: 'hidden',
		margin: 15,
		marginBottom: 0,
		padding: 20,
	},
	navbar: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		paddingVertical: 10,
		height: 60,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#ccc',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		zIndex: 10,
	},
	tabContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	tab: {
		fontSize: 16,
		color: '#888',
		width: 100,
		textAlign: 'center',
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
		borderBottomColor: '#000000',
		paddingBottom: 5,
		// textDecorationLine: 'underline',
		// textDecorationColor: '#FF9800',
	},
});