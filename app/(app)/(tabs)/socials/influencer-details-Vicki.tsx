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
                <Image source={require('@/assets/images/social/social-influencers/IMAGE_VICKI DOONAN (Large).jpg')}
                    style={{
                        width: '100%',
                        height: 300,
                        borderRadius: 10,
                        overflow: 'hidden',
                        alignSelf: 'center'
                    }} />

                <Text style={[styles.textStyle3, { fontWeight: 'bold' }]}>Vicki Doonan</Text>

                <Text style={styles.textStyle3}>Interests:</Text>


                <Text style={styles.textStyle1}>{`\u2022`} Ageless Grace: Brain health exercise with a focus on music, fun, and laughter</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Dementia care</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Sharing and educating on social media, including TikTok</Text>

                <Text style={styles.textStyle2}>Vicki Doonan, one of our fantastic 60 Plus Influencers, is inspiring the 60 Plus Playground communities with her new program, QUICK BRAINERS, and Cognitive Nourishments. She offers these on a daily, weekly, and monthly basis, providing valuable resources to support you as the years go by.</Text>
                <Text style={styles.textStyle2}>Vicki brings her wealth of knowledge, infectious energy, and sense of fun to our communities through brain cognitive training exercises. She offers resources that support the five key areas essential for maintaining brain health and more, showing her deep care for helping people live their best lives. Such a beautiful soul with so much to offer!</Text>
                <Text style={styles.textStyle2}>With seven years of experience as an Ageless Grace educator and trainer, Vicki has a knack for turning exercise into a fun and joyful experience. She blends laughter with nostalgic trips down memory lane, all set to uplifting music, making each session both enjoyable and engaging.</Text>
                <Text style={styles.textStyle2}>Vicki is also well-qualified in Dementia Communication, Dementia Live, Compassionate Touch, and Older Persons' Mental Health First Aid. Beyond her classes, she supports carers by hosting small group morning teas, where they can unwind and experience the soothing benefits of essential oils.</Text>

                {/* bottom spacer for android */}
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