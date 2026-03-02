import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '@/components/BackButton';

const influencerDetails = () => {
    const insets = useSafeAreaInsets();
    return (
        <>
            <BackButton />
            <View style={{ marginBottom: insets.top + 30 }} />

            <ScrollView style={{ paddingHorizontal: 20, marginTop: '10%', }}>
                <Image source={require('@/assets/images/social/social-influencers/IMAGE_KEN JONES (Large).jpeg')}
                    style={{
                        width: '100%',
                        height: 300,
                        borderRadius: 10,
                        overflow: 'hidden',
                        alignSelf: 'center'
                    }} />

                <Text style={[styles.textStyle3, { fontWeight: 'bold' }]}>Ken Jones</Text>

                <Text style={styles.textStyle3}>Interests:</Text>


                <Text style={styles.textStyle1}>{`\u2022`} Fitness and exercise</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Road cycling</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Outrigger canoeing</Text>

                <Text style={styles.textStyle2}>On October 5th, 2022, I officially retired after a fulfilling career in advertising, advancing from commercial artist to running my own design business on the Sunshine Coast. But retirement isn’t about slowing down—I’m determined to live life to the fullest! While genetics help, maintaining good health takes effort. Exercise prevents illness like cancer and heart disease, so I stay active with daily walks, outrigger canoeing, and cycling. I began canoeing at 63, now coach, and have won medals, including first place at the National Championships. Join me in setting goals, staying active, and enjoying the journey with the 60 Plus community!</Text>
                <Text style={styles.textStyle2}>Over the years, I’ve come to understand that nothing is more crucial than your health. I’m fortunate to retire in excellent health, free of pain and medication. While good fortune and genetics play a role, maintaining this health has required effort, and I intend to keep it up. Getting older doesn’t mean getting weaker. Exercise is key to preventing illness and improving health, proven to be the best way to prevent cancer, heart disease, and even depression—without drugs. My routine includes daily walks, outrigging, and cycling, and I’m passionate about showing others how simple lifestyle changes can enhance both mental and physical well-being. I hope to inspire you to embrace a healthy lifestyle and join me in sharing this journey—complete with a few laughs along the way!</Text>

                <Text style={styles.textStyle3}>Weekly Routine:</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Monday: 5km walk around the beaches of Caloundra</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Tuesday: Outrigger race training (4pm - 6pm)</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Wednesday: 50km bike ride</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Thursday: Outrigger race training (4pm - 6pm)</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Friday: 42km bike ride</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Saturday: Outrigger race training (7pm - 9pm)</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Sunday: 58km bike ride</Text>

                <Text style={styles.textStyle2}>If you think this routine isn’t for you, remember that my goal is to inspire you to take control of your health and happiness. So, toss those slippers, cardigans, and rocking chairs, and let’s get active! With a background in major advertising roles and a deep commitment to fitness, I’m excited to share my journey and encourage you to be the healthiest and happiest version of yourself.</Text>
                <Text style={styles.textStyle2}>#60plusinfluencer #60plusinfluencers #60plusplayground #60plusplaygroundcommunity #timetoplay #retiredlife #retirement #outrigger #outriggers #cyclinglife #cyclingforhealth #activelife </Text>

                {/* bottom spacer for android ->  future change could be conditionally rendering for android only*/}
                <View style={{ marginBottom: 100 }} />
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    textStyle1: {
        fontSize: 16,
        marginTop: 5,
    },
    textStyle2: {
        fontSize: 16,
        marginTop: 10,
    },
    textStyle3: {
        fontSize: 20,
        marginTop: 20,
    },
});
export default influencerDetails