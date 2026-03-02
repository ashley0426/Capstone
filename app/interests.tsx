import { View, Text, Pressable, StyleSheet, ScrollView, Platform } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { useState } from 'react';
import PageTitle from '@/components/PageTitle';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '@/components/BackButton';
import React from 'react';
import common from '@/components/styles/commonStyles';

// The InterestCard component accepts props for image source, name, checked state, and toggle function
function InterestCard({ imgSrc, name, checked, toggleChecked }: { imgSrc: any, name: any, checked: boolean, toggleChecked: () => void }) {
    return (
        // Wrap the entire card with Pressable to make the whole card clickable
        <Pressable testID={name} onPress={toggleChecked} style={styles.interestCardContainer}>
            <ImageBackground source={imgSrc} style={styles.imageBackground} contentFit="cover">
                {/* Checkbox container */}
                <View style={styles.checkboxContainer}>
                    <Text style={[styles.checkbox, checked && styles.checkboxChecked]}>
                        {checked ? '✓' : ''}
                    </Text>
                </View>
                {/* Display the name of the interest */}
                <Text style={styles.interestText}>{name}</Text>
            </ImageBackground>
        </Pressable>
    );
}

export default function Interests() {
    // State to track selected interests
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    // List of interests with their respective images
    const interests = [
        { name: 'Adventure', imgSrc: require('@/assets/images/interestImages/ADVENTURE.jpg') },
        { name: 'Deals', imgSrc: require('@/assets/images/interestImages/DEALS.jpg') },
        { name: 'Entertainment', imgSrc: require('@/assets/images/interestImages/ENTERTAINMENT.jpg') },
        { name: 'Fitness', imgSrc: require('@/assets/images/interestImages/FITNESS_2.jpeg') },
        { name: 'Health', imgSrc: require('@/assets/images/interestImages/HEALTH.jpeg') },
        { name: 'Games', imgSrc: require('@/assets/images/interestImages/PUZZLE IMAGE_3.jpg') },
        { name: 'Shopping', imgSrc: require('@/assets/images/interestImages/SHOPPING.jpeg') },
        { name: 'Travel', imgSrc: require('@/assets/images/interestImages/TRAVEL.jpeg') }
    ];

    // Function to toggle interest selection
    const toggleInterest = (name: string) => {
        setSelectedInterests(prev =>
            prev.includes(name)
                ? prev.filter(interest => interest !== name)
                : [...prev, name]
        );
    };

    const handleNext = async (skip?: boolean) => {
        // If skip selected, send empty, else send selected interests
        skip ?
            await AsyncStorage.setItem('selectedInterests', JSON.stringify([])) :
            await AsyncStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));

        // Navigate to the next screen
        router.push('/register');
    };


    return (
        <View>
            <Image style={common.backgroundImage} source={require('@/assets/images/BackgroundCircles.png')} />
            <View>
                <BackButton />
                <PageTitle text="Let's pick your interests!" />
            </View>
            <ScrollView>
                <View style={styles.container}>

                    {/* Display the interests in rows */}
                    <View style={styles.interestRow}>
                        <InterestCard
                            imgSrc={interests[0].imgSrc}
                            name={interests[0].name}
                            checked={selectedInterests.includes(interests[0].name)}
                            toggleChecked={() => toggleInterest(interests[0].name)}
                        />
                        <InterestCard
                            imgSrc={interests[1].imgSrc}
                            name={interests[1].name}
                            checked={selectedInterests.includes(interests[1].name)}
                            toggleChecked={() => toggleInterest(interests[1].name)}
                        />
                    </View>
                    <View style={styles.interestRow}>
                        <InterestCard
                            imgSrc={interests[2].imgSrc}
                            name={interests[2].name}
                            checked={selectedInterests.includes(interests[2].name)}
                            toggleChecked={() => toggleInterest(interests[2].name)}
                        />
                        <InterestCard
                            imgSrc={interests[3].imgSrc}
                            name={interests[3].name}
                            checked={selectedInterests.includes(interests[3].name)}
                            toggleChecked={() => toggleInterest(interests[3].name)}
                        />
                    </View>
                    <View style={styles.interestRow}>
                        <InterestCard
                            imgSrc={interests[4].imgSrc}
                            name={interests[4].name}
                            checked={selectedInterests.includes(interests[4].name)}
                            toggleChecked={() => toggleInterest(interests[4].name)}
                        />
                        <InterestCard
                            imgSrc={interests[5].imgSrc}
                            name={interests[5].name}
                            checked={selectedInterests.includes(interests[5].name)}
                            toggleChecked={() => toggleInterest(interests[5].name)}
                        />
                    </View>
                    <View style={styles.interestRow}>
                        <InterestCard
                            imgSrc={interests[6].imgSrc}
                            name={interests[6].name}
                            checked={selectedInterests.includes(interests[6].name)}
                            toggleChecked={() => toggleInterest(interests[6].name)}
                        />
                        <InterestCard
                            imgSrc={interests[7].imgSrc}
                            name={interests[7].name}
                            checked={selectedInterests.includes(interests[7].name)}
                            toggleChecked={() => toggleInterest(interests[7].name)}
                        />
                    </View>

                    {/* Buttons to navigate, passing the selected interests */}
                    <View style={styles.buttonRow}>
                        <Pressable style={styles.Button} onPress={() => handleNext(true)}>
                            <Text style={styles.ButtonText}>Skip</Text>
                        </Pressable>
                        <View style={{ width: "5%" }} />
                        <Pressable style={[styles.Button, { backgroundColor: '#1CA7AC' }]} onPress={() => handleNext()}>
                            <Text style={styles.ButtonText}>Next</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 50,
    },
    interestCardContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '45%',
    },
    interestRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    imageBackground: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    interestText: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
    },
    checkboxContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        fontSize: 18,
        color: 'black',
    },
    checkboxChecked: {
        color: 'green',
    },
    buttonRow: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        marginBottom: 80,
    },
    Button: {
        marginTop: 50,
        borderRadius: 8,
        backgroundColor: '#F89522',
        width: "50%",
        height: 52,
        justifyContent: 'center',
    },
    ButtonText: {
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
    },
});
