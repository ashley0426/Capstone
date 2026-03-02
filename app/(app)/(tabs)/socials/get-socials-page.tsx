import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchBar from '@/components/SearchBar';
import { router } from 'expo-router'
import { SocialRegions, GetSocialData } from '@/components/socials-page/get-social-data'

const getSocialsPage = () => {
	const insets = useSafeAreaInsets();
	const [searchText, setSearchText] = useState(''); // Initialize state for the search text
	const [filteredRegions, setFilteredRegions] = useState<GetSocialData[]>([]); // Initialize state for the search text

	const filterRegions = () => {
		return SocialRegions.filter(region =>
			region.name.toLowerCase().includes(searchText.toLowerCase())
		);
	}

	const handleSearchChange = (text: string) => {
		setSearchText(text); // Update the state with the new text
		setFilteredRegions(filterRegions)
	};
	const clearTextInput = () => {
		setSearchText('');
	};

	return (
		<>
			<View style={{ backgroundColor: "white" }}>
				<ThemedText style={[styles.header, { marginTop: insets.top + 10 }]}>GET SOCIALS</ThemedText>

				<ThemedText style={[{ textAlign: 'center', fontWeight: 'bold', marginTop: insets.top }]}>
					Find activities in your region!
				</ThemedText>
				<View style={{ height: 45, marginHorizontal: 15, marginBottom: 10, marginTop: 20, }}>
					<SearchBar searchText={searchText} onSearchChange={handleSearchChange} clearText={clearTextInput} />
				</View>

				{/* render data */}
				{searchText === '' ? (
					<FlatList
						data={SocialRegions}
						keyExtractor={(item) => item.name}
						contentContainerStyle={styles.scrollView}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									router.push({
										pathname: '/socials/get-socials-detail',
										params: { id: item.id }
									});
								}}>
								<View style={styles.card}>
									<Image source={item.img} style={styles.image} />
									<View style={styles.textContainer}>
										<Text style={styles.title}>{item.name}</Text>
										<Text style={styles.intro}>{item.intro}</Text>
									</View>
								</View>
							</TouchableOpacity>
						)}
					/>
				) : filteredRegions && filteredRegions.length > 0 ? (
					<FlatList
						data={filteredRegions}
						keyExtractor={(item) => item.name}
						contentContainerStyle={styles.scrollView}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									router.push({
										pathname: '/socials/get-socials-detail',
										params: { id: item.id }
									});
								}}>
								<View style={styles.card}>
									<Image source={item.img} style={styles.image} />
									<View style={styles.textContainer}>
										<Text style={styles.title}>{item.name}</Text>
										<Text style={styles.intro}>{item.intro}</Text>
									</View>
								</View>
							</TouchableOpacity>
						)}
					/>
				) : (
					<View style={{ height: "100%" }}>
						{/* <EmptyIcon name="md-empty" size={30} color="#000" /> Replace "md-empty" with the actual icon name */}
						<Text style={[styles.header, { marginTop: insets.top + 10 }]}>No Regions Found</Text>
						<Text style={styles.header}>For</Text>
						<Text style={[styles.header, { color: "#b71919" }]}>{searchText}</Text>
					</View>
				)

				}
			</View >
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
	searchFilter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
		marginBottom: 10,
		marginTop: 20,
		// Flex container for search input and filter button, aligning them in a row.
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
	card: {
		flexDirection: 'row',
		backgroundColor: '#f6b77422',
		borderRadius: 10,
		overflow: 'hidden',
		marginRight: 10,
		width: '100%',
		marginBottom: 10,
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 10,
	},
	textContainer: {
		padding: 10,
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	intro: {
		fontSize: 16,
		color: '#555',
	},

});
export default getSocialsPage