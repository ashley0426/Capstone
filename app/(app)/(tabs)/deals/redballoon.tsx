import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, ScrollView, Pressable, Linking, FlatList } from 'react-native';
import common from '@/components/styles/commonStyles';

import { ThemedText } from '@/components/ThemedText';
import SearchBar from "@/components/SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ImageBackground } from 'expo-image';
import { RedBalloonExperienceData } from '@/components/deals/redballoon-data';
import { Link } from 'expo-router';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedView } from '@/components/ThemedView';
// import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

export default function RedBalloon() {
	const insets = useSafeAreaInsets();

	const [searchText, setSearchText] = useState(''); // Initialize state for the search text
	const handleSearchChange = (text: string) => {
		setSearchText(text); // Update the state with the new text
		// console.log(`Searching for: ${text}`); // Example action: log the search text
		// Here you can add more logic for what happens when the search text changes
	};

	return (
		<ScrollView>
			<Image source={require("@/assets/images/deals/redballoon/redballoon_icon.png")} style={[common.image, {marginBottom: 20, borderRadius: 10, height: 200 }]} />
			<FlatList
				data={RedBalloonExperienceData}
				keyExtractor={(item) => item.id.toString()}
				// keyExtractor={(item) => item.id} 
				contentContainerStyle={styles.scrollView}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => {
						Linking.openURL(item.link);
					}}>
					<View style={styles.dealCard}>
						<Image source={item.image} style={styles.image} />
						<ThemedText type='card' style={[styles.destination, { textAlign: 'center' }]}>{item.name}</ThemedText>
					</View>
					</TouchableOpacity>
				)}
			/>

			{/* {/* <ThemedText style={[{ textAlign: 'center', fontWeight: 'bold', marginTop: insets.top + 10 }]}>Let's Explore!</ThemedText>
			<View style={styles.searchFilter}>
				{/* <TextInput style={styles.searchInput} placeholder="Search..." />
				<SearchBar searchText={searchText} onSearchChange={handleSearchChange} />
				<TouchableOpacity style={styles.filterButton}>
					<Icon name="filter-list" size={24} color="#000" />
				</TouchableOpacity>
				<ThemedText style={[{ marginLeft: 10 }]}>Filter</ThemedText>
			</View> */}
			{/* DISPLAY DEALS HERE */}
			{/* <Text style={[{ alignSelf: 'center', marginTop: 50, fontSize: ts50 }]}>COMING SOON!</Text> */}
		
			{/* gif for loading screen */}
			{/* <Image */}
				{/* source={require('@/assets/gif/loading.gif')} */}
				{/* style={{ width: width * .7, height: width * .7, alignSelf: 'center' }} */}
			{/* />
			<ThemedText type="title">Fitness:</ThemedText>
			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/Senior-Fitness-Men-Over-Exercises/dp/1797515365/ref=sr_1_5?crid=2Z4V9BIL5R7GJ&dib=eyJ2IjoiMSJ9.nL9UXeLPeBByszM3o1zhH5t4rWzQjo5dY8r8TcwcNKDneEK3gf9E9s1o1rc8BDhil9TcYsBq0npre1NuPhR5beFYv7Lwltk2QNoo53SDqpOKATyouvs_bjpUWAE2mqnJ7g5VwWMEkQvylOAf59i7wluh7vV7DXY5_ymrmw5DANDAv5bAv0zlsPf08S4ieVn6i-hqYR2bIlOvCwYYutZVvvAhokSyo-E3mMBNZWC1M6dxkGDq0Ft2iDBX-1iVzKdQqdmdVkitS5CsqF7C_g2-OvP6FbXwMsgUj9aPm3GHZlY.6At3VcjGLjgoGoJw2_O1Fg71zTcTQ1NdpvubiALJf2Y&dib_tag=se&keywords=seniors+fitness&qid=1748729988&sprefix=seniors+fitn%2Caps%2C242&sr=8-5')}
			style={common.buttonWithShadow}>
				<Image source={require("@/assets/images/deals/fitness-1.jpg")} contentFit="contain" style={common.image} />
				<View style={{ backgroundColor: "#aca2a28a", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
					<ThemedText style={common.dealCardText}>Senior Fitness (for Men Over 60)</ThemedText>
					<ThemedText style={common.dealCardText}>$17.64</ThemedText>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/Senior-Fitness-Ruth-Heidrich-ebook/dp/B007PS8KHK/ref=sr_1_6?crid=2Z4V9BIL5R7GJ&dib=eyJ2IjoiMSJ9.nL9UXeLPeBByszM3o1zhH5t4rWzQjo5dY8r8TcwcNKDneEK3gf9E9s1o1rc8BDhil9TcYsBq0npre1NuPhR5beFYv7Lwltk2QNoo53SDqpOKATyouvs_bjpUWAE2mqnJ7g5VwWMEkQvylOAf59i7wluh7vV7DXY5_ymrmw5DANDAv5bAv0zlsPf08S4ieVn6i-hqYR2bIlOvCwYYutZVvvAhokSyo-E3mMBNZWC1M6dxkGDq0Ft2iDBX-1iVzKdQqdmdVkitS5CsqF7C_g2-OvP6FbXwMsgUj9aPm3GHZlY.6At3VcjGLjgoGoJw2_O1Fg71zTcTQ1NdpvubiALJf2Y&dib_tag=se&keywords=seniors+fitness&qid=1748729988&sprefix=seniors+fitn%2Caps%2C242&sr=8-6')}
			style={common.buttonWithShadow}>
				<Image source={require("@/assets/images/deals/fitness-2.jpg")} contentFit="contain" style={common.image} />
				<View style={{ backgroundColor: "#aca2a28a", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
					<ThemedText style={common.dealCardText}>Senior Fitness</ThemedText>
					<ThemedText style={common.dealCardText}>$10.42</ThemedText>
				</View>
			</TouchableOpacity>

			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/s?k=seniors+fitness&crid=2Z4V9BIL5R7GJ&sprefix=seniors+fitn%2Caps%2C242&ref=nb_sb_ss_ts-doa-p_1_12')}
			style={common.buttonWithShadow}>
				<View style={{ backgroundColor: "#aca2a28a", borderRadius: 10 }}>
					<ThemedText style={common.dealCardText}>See more</ThemedText>
				</View>
			</TouchableOpacity>

			
			<ThemedText type="title">Useful Items:</ThemedText>
			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/Senior-Fitness-Ruth-Heidrich-ebook/dp/B007PS8KHK/ref=sr_1_6?crid=2Z4V9BIL5R7GJ&dib=eyJ2IjoiMSJ9.nL9UXeLPeBByszM3o1zhH5t4rWzQjo5dY8r8TcwcNKDneEK3gf9E9s1o1rc8BDhil9TcYsBq0npre1NuPhR5beFYv7Lwltk2QNoo53SDqpOKATyouvs_bjpUWAE2mqnJ7g5VwWMEkQvylOAf59i7wluh7vV7DXY5_ymrmw5DANDAv5bAv0zlsPf08S4ieVn6i-hqYR2bIlOvCwYYutZVvvAhokSyo-E3mMBNZWC1M6dxkGDq0Ft2iDBX-1iVzKdQqdmdVkitS5CsqF7C_g2-OvP6FbXwMsgUj9aPm3GHZlY.6At3VcjGLjgoGoJw2_O1Fg71zTcTQ1NdpvubiALJf2Y&dib_tag=se&keywords=seniors+fitness&qid=1748729988&sprefix=seniors+fitn%2Caps%2C242&sr=8-6')}
			style={common.buttonWithShadow}>
				<Image source={require("@/assets/images/deals/fitness-2.jpg")} contentFit="contain" style={common.image} />
				<View style={{ backgroundColor: "#aca2a28a", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
					<ThemedText style={common.dealCardText}>Senior Fitness</ThemedText>
					<ThemedText style={common.dealCardText}>$10.42</ThemedText>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/Senior-Fitness-Ruth-Heidrich-ebook/dp/B007PS8KHK/ref=sr_1_6?crid=2Z4V9BIL5R7GJ&dib=eyJ2IjoiMSJ9.nL9UXeLPeBByszM3o1zhH5t4rWzQjo5dY8r8TcwcNKDneEK3gf9E9s1o1rc8BDhil9TcYsBq0npre1NuPhR5beFYv7Lwltk2QNoo53SDqpOKATyouvs_bjpUWAE2mqnJ7g5VwWMEkQvylOAf59i7wluh7vV7DXY5_ymrmw5DANDAv5bAv0zlsPf08S4ieVn6i-hqYR2bIlOvCwYYutZVvvAhokSyo-E3mMBNZWC1M6dxkGDq0Ft2iDBX-1iVzKdQqdmdVkitS5CsqF7C_g2-OvP6FbXwMsgUj9aPm3GHZlY.6At3VcjGLjgoGoJw2_O1Fg71zTcTQ1NdpvubiALJf2Y&dib_tag=se&keywords=seniors+fitness&qid=1748729988&sprefix=seniors+fitn%2Caps%2C242&sr=8-6')}
			style={common.buttonWithShadow}>
				<Image source={require("@/assets/images/deals/fitness-2.jpg")} contentFit="contain" style={common.image} />
				<View style={{ backgroundColor: "#aca2a28a", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
					<ThemedText style={common.dealCardText}>Senior Fitness</ThemedText>
					<ThemedText style={common.dealCardText}>$10.42</ThemedText>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/Senior-Fitness-Ruth-Heidrich-ebook/dp/B007PS8KHK/ref=sr_1_6?crid=2Z4V9BIL5R7GJ&dib=eyJ2IjoiMSJ9.nL9UXeLPeBByszM3o1zhH5t4rWzQjo5dY8r8TcwcNKDneEK3gf9E9s1o1rc8BDhil9TcYsBq0npre1NuPhR5beFYv7Lwltk2QNoo53SDqpOKATyouvs_bjpUWAE2mqnJ7g5VwWMEkQvylOAf59i7wluh7vV7DXY5_ymrmw5DANDAv5bAv0zlsPf08S4ieVn6i-hqYR2bIlOvCwYYutZVvvAhokSyo-E3mMBNZWC1M6dxkGDq0Ft2iDBX-1iVzKdQqdmdVkitS5CsqF7C_g2-OvP6FbXwMsgUj9aPm3GHZlY.6At3VcjGLjgoGoJw2_O1Fg71zTcTQ1NdpvubiALJf2Y&dib_tag=se&keywords=seniors+fitness&qid=1748729988&sprefix=seniors+fitn%2Caps%2C242&sr=8-6')}
			style={common.buttonWithShadow}>
				<Image source={require("@/assets/images/deals/useful-1.jpg")} contentFit="contain" style={common.image} />
				<View style={{ backgroundColor: "#aca2a28a", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
					<ThemedText style={common.dealCardText}>BEZOX Angled Head Nail Clippers</ThemedText>
					<ThemedText style={common.dealCardText}>$19.99</ThemedText>
				</View>
			</TouchableOpacity>

			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/s?k=seniors&crid=3AEOV1U5O0AK0&qid=1748559980&sprefix=seniors%2Caps%2C244&xpid=i3kcIzOyBsmoq&ref=sr_pg_1')}
			style={common.buttonWithShadow}>
				<View style={{ backgroundColor: "#aca2a28a", borderRadius: 10 }}>
					<ThemedText style={common.dealCardText}>See more</ThemedText>
				</View>
			</TouchableOpacity>

			<ThemedText type="title">Games</ThemedText>
			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/RELAXING-BRAIN-ACTIVITIES-SENIORS-Activities/dp/B0BZB7XFLM/ref=sr_1_5?crid=2MIBOME466QHB&dib=eyJ2IjoiMSJ9.JyzimEjtxy8TOk5pNWZ8CST5nsAl2-1ARzau1Df_a1W9sN22mdwT89k2fQ2l_0QET3OCmR2wn8uT-F0yvpvThv5XWgZ5YZCZn1wZNkgdJspwvYT1WNMt2EpxM1J4OQUCuhLUs0l7T9anJ4xUtA3-Nuug8ZgH2FIaCLtHO2YSPenMr0mhriZXSwbPDsX2F5e6cYqG-5F6wlc4dLFN7eZXVOoBLO-5bfdXUiKXFkV4gWrxz5OKHQ_7Tp8nys4eD65u6G31gjd1xYGfMGyWbMhy04p2wdcoClQ171OYWV40e2k.YMJQVbSSNv5N23aNGeglJxMkLhOdF4ZB6_idKW8FZCQ&dib_tag=se&keywords=seniors+games&qid=1748729994&sprefix=seniors%2Caps%2C421&sr=8-5')}
			style={common.buttonWithShadow}>
				<Image source={require("@/assets/images/deals/games-1.jpg")} contentFit="contain" style={common.image} />
				<View style={{ backgroundColor: "#aca2a28a", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
					<ThemedText style={common.dealCardText}>Relaxing Brain Activities</ThemedText>
					<ThemedText style={common.dealCardText}>$17.60</ThemedText>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/Easy-Relaxing-Memory-Activity-Adults/dp/1988923182/ref=sr_1_6?crid=2MIBOME466QHB&dib=eyJ2IjoiMSJ9.JyzimEjtxy8TOk5pNWZ8CST5nsAl2-1ARzau1Df_a1W9sN22mdwT89k2fQ2l_0QET3OCmR2wn8uT-F0yvpvThv5XWgZ5YZCZn1wZNkgdJspwvYT1WNMt2EpxM1J4OQUCuhLUs0l7T9anJ4xUtA3-Nuug8ZgH2FIaCLtHO2YSPenMr0mhriZXSwbPDsX2F5e6cYqG-5F6wlc4dLFN7eZXVOoBLO-5bfdXUiKXFkV4gWrxz5OKHQ_7Tp8nys4eD65u6G31gjd1xYGfMGyWbMhy04p2wdcoClQ171OYWV40e2k.YMJQVbSSNv5N23aNGeglJxMkLhOdF4ZB6_idKW8FZCQ&dib_tag=se&keywords=seniors+games&qid=1748729994&sprefix=seniors%2Caps%2C421&sr=8-6')}
			style={common.buttonWithShadow}>
				<Image source={require("@/assets/images/deals/games-2.jpg")} contentFit="contain" style={common.image} />
				<View style={{ backgroundColor: "#aca2a28a", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
					<ThemedText style={common.dealCardText}>The Easy and Relaxing Memory Activity Book</ThemedText>
					<ThemedText style={common.dealCardText}>$160.44</ThemedText>
				</View>
			</TouchableOpacity>
			
			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/s?k=seniors+games&crid=2MIBOME466QHB&sprefix=seniors%2Caps%2C421&ref=nb_sb_ss_ts-doa-p_10_7')}
			style={common.buttonWithShadow}>
				<View style={{ backgroundColor: "#aca2a28a", borderRadius: 10 }}>
					<ThemedText style={common.dealCardText}>See more</ThemedText>
				</View>
			</TouchableOpacity> */}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    paddingBottom: '75%'
    // Styling for the FlatList content container.
  },
  dealCard: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#27c1aa1b',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
    // Styling for the page title.
  },
});