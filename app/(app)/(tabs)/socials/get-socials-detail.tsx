import BackButton from '@/components/BackButton';
import { useLocalSearchParams } from 'expo-router';
import React from 'react'
import { ScrollView, Text, View, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SocialRegions } from '@/components/socials-page/get-social-data'

// PAGE TO DISPLAY the selected region
const getSocialsDetail = () => {
	const params = useLocalSearchParams();
	const idString = params?.id;
	let index = 0;
	if (idString && typeof idString === 'string') {
		index = parseInt(idString, 10);
	}
	return (
		<>
			<View style={{ height: '14%', backgroundColor: "white" }}>
				<BackButton />
			</View>
			<ScrollView style={{ paddingHorizontal: 20, paddingTop: '10%', backgroundColor: "white" }}>
				<Image source={SocialRegions[index].img}
					style={{
						width: '100%',
						height: 300,
						borderRadius: 10,
						overflow: 'hidden',
						alignSelf: 'center'
					}} />
				<Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: 20, }}>{SocialRegions[index].name}</Text>

				{/* Iterate over the SocialRegions Array items text Array*/}
				{SocialRegions[index].infoArray.map((item, index) => (
					<Text key={index} style={{ fontSize: 16, marginTop: 10, }}>{item}</Text>
				))}

				<TouchableOpacity style={styles.saveButton}
					onPress={() => {
						Linking.openURL(SocialRegions[index].link)
					}}
				>
					<Text style={styles.saveButtonText}>Find out more</Text>
				</TouchableOpacity>
				<View style={{ paddingBottom: 100 }} />
			</ScrollView>
		</>
	)
}
const styles = StyleSheet.create({
	saveButton: {
		width: "85%",
		height: 50,
		backgroundColor: '#FFA500',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginBottom: 15,
		marginTop: 20,
	},
	saveButtonText: {
		fontSize: 16,
		color: 'black',
		fontWeight: 'bold',
	},
});
export default getSocialsDetail

