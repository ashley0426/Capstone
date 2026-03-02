import { StyleSheet, View, ScrollView } from 'react-native';
// import CurvedHeader from '@/components/Header';
// import BackButton from '@/components/BackButton'; // Adjust the path as necessary
// import HomeButton from '@/components/HomeButton';
// import Carousel, { defaultStyles } from 'pinar';
import { BrainHealthCognitiveData, BrainHealthNutritionData, BrainHealthAndWellnessData } from '@/components/smart-life-page/smart-life-data';
import CarouselComponent from '@/components/smart-life-page/BrainHealthCarouselScreen';
import React from 'react';

export default function Resources() {

    return (
        <ScrollView>
            <View style={styles.sectionContainer}>
                <CarouselComponent
                    data={BrainHealthCognitiveData}
                    title="COGNITIVE"
                />
                <CarouselComponent
                    data={BrainHealthAndWellnessData}
                    title="HEALTH & WELLNESS"
                />
                <CarouselComponent
                    data={BrainHealthNutritionData}
                    title="NUTRITION"
                />
                <View style={{ marginBottom: 200 }} />
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 30,
    },
});