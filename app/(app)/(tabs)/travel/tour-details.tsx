import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { Tour } from '@/interfaces/toursInterface';
import BackButton from '@/components/BackButton';

const tourDetails = () => {
    const params = useLocalSearchParams();
    const { tourData } = params;
    // Convert the serialized string back into an array of objects
    const parsedTourData: Tour = typeof tourData === 'string' ? JSON.parse(tourData) : {};

    const openUrl = async () => {
        try {
            await Linking.openURL(parsedTourData.booking_url);
        } catch (error) {
            console.error('Error opening URL:', error);
        }
    }
    const openLastImage = async () => {
        try {
            await Linking.openURL(parsedTourData.images[parsedTourData.images.length - 1]);
        } catch (error) {
            console.error('Error opening image URL:', error);
        }
    };

    const openImage = async (url: string) => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            console.error('Error opening URL:', error);
        }
    };


    return (
        <>
            <View style={{ height: '14%', backgroundColor: "white" }}>
                <BackButton />
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Image */}
                <TouchableOpacity onPress={openLastImage}>
                    <Image
                        source={{ uri: parsedTourData.images[parsedTourData.images.length - 1] }}
                        style={styles.image}
                    />
                </TouchableOpacity>

                {/* Title and Description */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{parsedTourData.tour_name}</Text>
                    <Text style={styles.rating}>Rating: {parsedTourData.rating}⭐</Text>
                    <Text style={styles.description}>
                        {parsedTourData.description}
                    </Text>
                </View>

                {/* Trip Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.detail}>📍 {parsedTourData.start_city.city_name} to {parsedTourData.end_city.city_name}</Text>
                    <Text style={styles.detail}>Destination cities: {parsedTourData.destination_cities.map(city => city).join(', ')}</Text>
                    <Text style={styles.detail}>Duration: {parsedTourData.tour_length_days} days</Text>
                    <Text style={styles.detail}>Max group size: {parsedTourData.max_group}</Text>
                    <Text style={styles.price}>Price: ${parsedTourData.price_total} {parsedTourData.currency}/pp</Text>
                </View>

                {/* Button */}
                <TouchableOpacity style={styles.button} onPress={openUrl}>
                    <Text style={styles.buttonText}>Find out more</Text>
                </TouchableOpacity>

                {/* map all images EXCEPT the last one as that is the map being dispalyed at the top */}
                {parsedTourData.images.slice(0, -1).map((image, index) => (
                    <TouchableOpacity key={index} onPress={() => openImage(image)}>
                        <Image source={{ uri: image }} style={styles.imageBottom} />
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
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
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    imageBottom: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: '5%',
    },
    titleContainer: {
        marginTop: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    rating: {
        fontSize: 16,
        marginVertical: 8,
    },
    description: {
        fontSize: 16,
        color: '#555',
    },
    detailsContainer: {
        marginTop: 24,
    },
    detail: {
        fontSize: 16,
        marginVertical: 4,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 16,
    },
    button: {
        backgroundColor: '#FF9800',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 15,
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
export default tourDetails