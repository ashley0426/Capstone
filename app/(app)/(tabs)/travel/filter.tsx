import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Switch, TextInput } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router/build/useNavigation'
import { router, useLocalSearchParams } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons';
import XBackButtonFilter from '@/components/XBackButtonFilter'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '@/components/SearchBar'
import { Tour } from '@/interfaces/toursInterface';
// import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { getTours } from '@/components/apiService'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const filter = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    let parsedTourData: Tour[];

    getTours().then((result) => {
        if (result) {
            parsedTourData = result;
            // Now you can use parsedTours in your component or wherever needed
        } else {
            console.error('Failed to retrieve or parse tours');
        }
    });
    // Now `parsedTourData` is available as an array of Tour objects
    const [searchText, setSearchText] = useState('');
    const [searchAndFilteredTours, setSearchAndFilteredTours] = useState<Tour[]>([]);

    // State management for regions
    const [isEuropeSelected, setIsEuropeSelected] = useState(false);
    const [isAustraliaSelected, setIsAustraliaSelected] = useState(false);
    const [isAsiaSelected, setIsAsiaSelected] = useState(false);
    const [isAmericaSelected, setIsAmericaSelected] = useState(false);

    // State management for travel types
    const [isGroupTravelSelected, setIsGroupTravelSelected] = useState(false);
    const [isGuidedToursSelected, setIsGuidedToursSelected] = useState(false);
    const [isSharedRoomSelected, setIsSharedRoomSelected] = useState(false);
    const [isPrivateRoomSelected, setIsPrivateRoomSelected] = useState(false);

    // State management for price, length, and rating inputs
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minLength, setMinLength] = useState('');
    const [maxLength, setMaxLength] = useState('');
    const [lengthError, setLengthError] = useState<string | null>(null);
    const [priceError, setPriceError] = useState<string | null>(null);
    // const [rating, setRating] = useState('');
    const [rating, setRating] = useState('Any');

    const handleSearchChange = (text: string) => {
        setSearchText(text); // Update the state with the new text
    };
    const clearTextInput = () => {
        setSearchText('');
    };

    // Function to clear all filters
    const clearFilters = () => {
        // clear search bar
        setSearchText('');

        // Reset regions
        setIsEuropeSelected(false);
        setIsAustraliaSelected(false);
        setIsAsiaSelected(false);
        setIsAmericaSelected(false);

        // Reset travel types
        setIsGroupTravelSelected(false);
        setIsGuidedToursSelected(false);
        setIsSharedRoomSelected(false);
        setIsPrivateRoomSelected(false);

        // Reset price, length, and rating
        setMinPrice('');
        setMaxPrice('');
        setMinLength('');
        setMaxLength('');
        // setRating('');
        setRating('Any');

    };
    const checkPrice = () => {
        if (parseFloat(maxPrice) === parseFloat(minPrice)) {
            setPriceError("Prices cannot be the same value");
            return;
        }
        if (parseFloat(maxPrice) === 0 || parseFloat(maxPrice) < 0) {
            setPriceError("Maximum price should be more than 0");
            return;
        }
        if (parseFloat(minPrice) <= 0) {
            setPriceError("Minimum price should be more than 0");
            return;
        }
        if (minPrice === '' || maxPrice === '') {
            if (setPriceError !== null) {
                setPriceError(null);
            }
            return;
        }
        if (minPrice !== '' || maxPrice !== '') {
            const minimumPrice = parseFloat(minPrice)
            const maximumPrice = parseFloat(maxPrice)

            if (minimumPrice > 0 && maximumPrice > minimumPrice) {
                if (setPriceError !== null) {
                    setPriceError(null);
                }
                return;
            }
            if (minimumPrice > maximumPrice) {
                setPriceError("Minimum price should be less than maximum price");
                return;
            }
            if (minimumPrice < 0) {
                setPriceError("Minimum price should be more than 0");
                return;
            }
            if (maximumPrice <= 0) {
                setPriceError("Maximum price should be more than 0");
                return;
            }
        }
    }
    const checkLength = () => {
        if (parseFloat(maxLength) === parseFloat(minLength)) {
            setLengthError("Lengths cannot be the same value");
            return;
        }
        if (parseFloat(maxLength) === 0 || parseFloat(maxLength) < 0) {
            setLengthError("Maximum length should be more than 0");
            return;
        }
        if (parseFloat(minLength) <= 0) {
            setLengthError("Minimum length should be more than 0");
            return;
        }
        if (minLength === '' || maxLength === '') {
            if (setLengthError !== null) {
                setLengthError(null);
            }
            return;
        }
        if (minLength !== '' || maxLength !== '') {
            const minimumLen = parseFloat(minLength)
            const maximumLen = parseFloat(maxLength)

            if (minimumLen > 0 && maximumLen > minimumLen) {
                if (setLengthError !== null) {
                    setLengthError(null);
                }
                return
            }
            if (minimumLen > maximumLen) {
                setLengthError("Minimum length should be less than maximum length");
            }
            if (minimumLen < 0) {
                setLengthError("Minimum length should be more than 0");
            }

            if (maximumLen <= 0) {
                setLengthError("Maximum length should be more than 0");
            }
        }
    }
    const isDisabled = () => lengthError !== null || priceError !== null;
    const filterTours = (tours: Tour[]): Tour[] => {
        return tours.filter(tour => {
            // Filter by search text
            // add logic -> check if   searchText === '' ? dont run serach filter : run fulter
            const isSearchMatch =
                searchText === '' ||
                tour.start_city.city_name.toLowerCase().includes(searchText.toLowerCase()) ||
                tour.end_city.city_name.toLowerCase().includes(searchText.toLowerCase()) ||
                tour.start_city.country_name.toLowerCase().includes(searchText.toLowerCase()) ||
                tour.end_city.country_name.toLowerCase().includes(searchText.toLowerCase()) ||
                tour.destination_cities.some(destinationCity => destinationCity.toLocaleLowerCase().includes(searchText.toLowerCase()))

            // Filter by region
            const isRegionMatch =
                (isEuropeSelected && tour.start_city.country_name.toLowerCase().includes('europe'.toLowerCase())) ||
                (isAustraliaSelected && tour.start_city.country_name.toLowerCase().includes('australia'.toLowerCase())) ||
                (isAsiaSelected && tour.start_city.country_name.toLowerCase().includes('asia'.toLowerCase())) ||
                (isAmericaSelected && tour.start_city.country_name.toLowerCase().includes('america'.toLowerCase())) ||
                (!isEuropeSelected && !isAustraliaSelected && !isAsiaSelected && !isAmericaSelected); // Matches if no regions are selected

            // Filter by travel type
            const isTravelTypeMatch =
                (isGroupTravelSelected && tour.categories.includes('Group')) ||
                (isGuidedToursSelected && tour.categories.includes('Fully Guided')) ||
                (isSharedRoomSelected && tour.categories.includes('Shared Room')) ||
                (isPrivateRoomSelected && tour.categories.includes('Private Room')) ||
                (!isGroupTravelSelected && !isGuidedToursSelected && !isSharedRoomSelected && !isPrivateRoomSelected); // Matches if no travel types are selected

            // Filter by price range
            const matchesPrice = (minPrice === '' || tour.price_total >= parseFloat(minPrice)) &&
                (maxPrice === '' || tour.price_total <= parseFloat(maxPrice));

            // Filter by length of trip
            const matchesLength = (minLength === '' || tour.tour_length_days >= parseInt(minLength)) &&
                (maxLength === '' || tour.tour_length_days <= parseInt(maxLength));

            // Filter by rating
            const matchesRating = rating === 'Any' || tour.rating >= parseFloat(rating.replace('>', ''));

            // Return true if all criteria are matched
            return isSearchMatch && isRegionMatch && isTravelTypeMatch &&
                matchesPrice && matchesLength && matchesRating;
        });
    };

    return (
        <>
            {/* Header */}
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.headerContainer}>
                    <XBackButtonFilter />
                    <Text style={[styles.headerTextTop, { marginTop: insets.top + 10 }]}>Filter</Text>
                </View>
                <View style={{ height: 45, marginHorizontal: 15, marginBottom: 5 }}>
                    <SearchBar searchText={searchText} onSearchChange={handleSearchChange} clearText={clearTextInput} />
                </View>
            </View>

            <ScrollView style={styles.container}>
                <View style={{ flexDirection: 'row', alignContent: 'stretch' }}>
                    <View style={styles.section}>
                        <Text style={styles.label}>Regions</Text>
                        <View style={styles.options}>
                            <View style={styles.optionItem}>
                                <Switch
                                    value={isAustraliaSelected}
                                    onValueChange={setIsAustraliaSelected}
                                />
                                <Text style={styles.optionText}>Australia</Text>
                            </View>
                            <View style={styles.optionItem}>
                                <Switch
                                    value={isEuropeSelected}
                                // onValueChange={setIsEuropeSelected} 
                                />
                                <Text style={[styles.optionText, styles.cancel]}>Europe</Text>
                            </View>
                            <View style={styles.optionItem}>
                                <Switch
                                    value={isAsiaSelected}
                                // onValueChange={setIsAsiaSelected} 
                                />
                                <Text style={[styles.optionText, styles.cancel]}>Asia</Text>
                            </View>
                            <View style={styles.optionItem}>
                                <Switch
                                    value={isAmericaSelected}
                                // onValueChange={setIsAmericaSelected} 
                                />
                                <Text style={[styles.optionText, styles.cancel]}>America</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Travel Preference</Text>
                        <View style={styles.options}>
                            <View style={styles.optionItem}>
                                <Switch
                                    value={isGroupTravelSelected}
                                    onValueChange={setIsGroupTravelSelected} />
                                <Text style={styles.optionText}>Group Travel</Text>
                            </View>
                            <View style={styles.optionItem}>
                                <Switch
                                    value={isGuidedToursSelected}
                                    onValueChange={setIsGuidedToursSelected} />
                                <Text style={styles.optionText}>Guided Tours</Text>
                            </View>
                            <View style={styles.optionItem}>
                                <Switch
                                    value={isSharedRoomSelected}
                                    onValueChange={setIsSharedRoomSelected} />
                                <Text style={styles.optionText}>Shared Room</Text>
                            </View>
                            <View style={styles.optionItem}>
                                <Switch
                                    value={isPrivateRoomSelected}
                                    onValueChange={setIsPrivateRoomSelected} />
                                <Text style={styles.optionText}>Private Room</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Price</Text>
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, { borderColor: priceError ? '#d90000' : '#ccc' }]}
                            placeholder="Min"
                            value={minPrice}
                            onChangeText={setMinPrice}
                            onEndEditing={checkPrice}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={[styles.input, { borderColor: priceError ? '#d90000' : '#ccc' }]}
                            placeholder="Max"
                            value={maxPrice}
                            onChangeText={setMaxPrice}
                            onEndEditing={checkPrice}
                            keyboardType="numeric"
                        />
                    </View>
                    {priceError && <Text style={{ color: "#C20000", fontSize: 18, fontWeight: "bold" }}>{priceError}</Text>}
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Length of trip</Text>
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, { borderColor: lengthError ? '#d90000' : '#ccc' }]}
                            placeholder="Min"
                            value={minLength}
                            onChangeText={setMinLength}
                            onEndEditing={checkLength}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={[styles.input, { borderColor: lengthError ? '#d90000' : '#ccc' }]}
                            placeholder="Max"
                            value={maxLength}
                            onChangeText={setMaxLength}
                            onEndEditing={checkLength}
                            keyboardType="numeric"
                        />
                    </View>
                    {lengthError && <Text style={{ color: "#C20000", fontSize: 18, fontWeight: "bold" }}>{lengthError}</Text>}
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Rating</Text>

                    <RNPickerSelect
                        placeholder={{ label: "Select rating...", value: "Any" }}
                        onValueChange={(itemValue) => setRating(itemValue)}
                        value={rating}
                        // style={pickerStyle}
                        style={pickerSelectStyles}
                        // activeItemStyle={{ backgroundColor: "#ff8400af" }}
                        // dropdownItemStyle={{ backgroundColor: "#b7b1b16a" }}
                        items={[
                            { label: "> 1", value: "> 1" },
                            { label: "> 2", value: "> 2" },
                            { label: "> 3", value: "> 3" },
                            { label: "> 4", value: "> 4" },
                        ]} />
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={clearFilters}>
                    <Text style={styles.clearFilterText}>Clear filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.saveButton, { backgroundColor: isDisabled() ? '#ffa60055' : '#FFA500' }]}
                    onPress={() => {
                        const finalFilter = filterTours(parsedTourData);
                        if (finalFilter) {
                            const serializedTourData = JSON.stringify(finalFilter);
                            router.push({
                                pathname: '/travel/filter-result',
                                params: { tourData: serializedTourData }
                            })
                        } else {
                        }
                    }}
                    disabled={isDisabled()}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

// Styles using StyleSheet.create
const styles = StyleSheet.create({
    headerContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        fontSize: 18,
    },
    searchInput: {
        height: 35,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    options: {
        flexDirection: 'column',
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: "5%",
    },
    optionText: {
        fontSize: 16,
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        width: '45%',
        height: 35,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 20,
        color: "#818181"
    },
    pickerInput: {
        borderColor: '#b8b8b8',
        borderWidth: 2,
        borderRadius: 20,

    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: "white",
    },
    clearFilterText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 15,
        textDecorationLine: 'underline',
    },
    saveButton: {
        width: "85%",
        height: 42,
        backgroundColor: '#FFA500',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    saveButtonText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
    },
    cancel: {
        textDecorationLine: 'line-through',
    }
});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        // borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 20,
        right: 10,
    },
    placeholder: {
        color: '#979797',
        fontSize: 12,
        fontWeight: 'bold',
    },
    viewContainer: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc'
    }
});

export default filter