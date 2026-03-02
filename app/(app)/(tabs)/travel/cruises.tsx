import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CurvedHeader from '@/components/Header';
// import BackButton from '@/components/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchToursData, saveToAsyncStorage } from '@/components/apiService';
import { ThemedText } from '@/components/ThemedText';
import SearchBar from '@/components/SearchBar';
import { router } from 'expo-router';
import { Tour } from '@/interfaces/toursInterface';
import DisplayTours from '@/components/DisplayTours';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function Cruises() {
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
                setTours(data);
                setSearchAndFilteredTours(data);

                await AsyncStorage.setItem('tours', JSON.stringify(data));
                setIsLoading(false)
                // Updating the 'tours' state with the fetched data.
            } catch (error) {
                console.error('Error fetching tours data:', error);
                // Logging any errors encountered during the fetch operation.
            }
        };

        getToursData();
        // Calling the 'getToursData' function when the component mounts.
    }, []);

    return (
        <ThemedText>View Cruises!</ThemedText>
        // <View style={styles.container}>
        // 	<CurvedHeader />
        // 	{/* <BackButton /> */}
        // 	<HomeButton />

        // 	<ThemedText style={[styles.header, { marginTop: insets.top + 10 }]}>
        // 		TRAVEL
        // 	</ThemedText>

        // 	<ThemedText style={[{ textAlign: 'center', fontWeight: 'bold', marginTop: insets.top }]}>
        // 		Let's Explore!
        // 	</ThemedText>

        // 	<View style={styles.searchFilter}>
        // 		<SearchBar searchText={searchText} onSearchChange={handleSearchChange} clearText={clearTextInput} />

        // 		<TouchableOpacity
        // 			style={styles.filterButton}
        // 			onPress={() => {
        // 				router.push({
        // 					pathname: '/(app)/(tabs)/travel/filter',
        // 				});
        // 			}}>
        // 			<Icon name="filter-list" size={24} color="#000" />
        // 		</TouchableOpacity>
        // 		<ThemedText style={[{ marginLeft: 10 }]}>
        // 			Filter
        // 		</ThemedText>

        // 	</View >

        // 	{isLoading ? (
        // 		<View style={{ height: "100%" }}>
        // 			{/* gif for loading screen */}
        // 			<Image
        // 				source={require('@/assets/gif/loading.gif')}
        // 				style={{ width: width * .7, height: width * .7, alignSelf: 'center' }}
        // 			/>
        // 		</View>
        // 	) : (
        // 		<DisplayTours searchText={searchText} tours={tours} searchAndFilteredTours={searchAndFilteredTours} />
        // 	)}
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        // Main container style with flex layout and white background.
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 20,
        // Styling for the page title.
    },
    searchFilter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: 20,
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
});