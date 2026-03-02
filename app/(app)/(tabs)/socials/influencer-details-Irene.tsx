import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '@/components/BackButton';

const influencerDetails = () => {
    const insets = useSafeAreaInsets();
    const openTravel2Next = () => {
        Linking.openURL('https://www.travel2next.com');
    };
    return (
        <>
            <BackButton />
            <View style={{ marginBottom: insets.top + 30 }} />

            <ScrollView style={{ paddingHorizontal: 20, marginTop: '10%', }}>
                <Image source={require('@/assets/images/social/social-influencers/IMAGE_IRENE KRAJEWSKA (Large).jpg')}
                    style={{
                        width: '100%',
                        height: 300,
                        borderRadius: 10,
                        overflow: 'hidden',
                        alignSelf: 'center'
                    }} />

                <Text style={[styles.textStyle3, { fontWeight: 'bold' }]}>Irene Krajewska</Text>

                <Text style={styles.textStyle3}>Interests:</Text>

                <Text style={styles.textStyle1}>{`\u2022`} Global travel, specialising in wildlife, voluntourism and underwater adventures</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Promoting awareness and conservation of our land and marine life</Text>
                <Text style={styles.textStyle1}>{`\u2022`} Photography, videography, photojournalism, and digital storytelling through social media</Text>

                <Text style={styles.textStyle2}>Irene and Tony Isaacson as a husband-and-wife team, share a lifelong passion for global travel especially wildlife adventures, voluntourism, and environmental conservation.</Text>
                <Text style={styles.textStyle2}>Together they have traveled across all seven continents and love to share their experiences as avid digital storytellers.</Text>
                <Text style={styles.textStyle2}>In her retirement as a Medical Specialist of 30 years, Irene enjoys exploring her creative side through travel, landscape, and wildlife photography.</Text>
                <Text style={styles.textStyle2}>As an amateur photojournalist, Irene has worked with Tourism Queensland, Tourism SA, and Wildlife Tourism Australia. Many of her articles can be seen on:</Text>

                <TouchableOpacity onPress={openTravel2Next}><Text style={styles.textStyle2}>{`\u2022`} Travel2Next.com</Text></TouchableOpacity>

                <Text style={styles.textStyle2}>She also has over 2000 travel reviews on TripAdvisor with a readership of 170k as a Level 7 Contributor.</Text>
                <Text style={styles.textStyle2}>Many of her images can be seen on her website  or on Instagram, as well as over 250 wildlife and travel videos on YouTube.</Text>
                <Text style={styles.textStyle2}>On a mission to make a difference, the pair share the same motto (adapted from Baba Dioum, 1968):</Text>

                <Text style={[styles.textStyle2, { fontWeight: 'bold', fontStyle: 'italic' }]}>‘In the end, we conserve only what we love, we love only what we understand, and we understand only what we can learn.’</Text>

                <Text style={[styles.textStyle3, { fontWeight: 'bold' }]}>Contact details:</Text>

                <Text style={styles.textStyle2} onPress={() => Linking.openURL('https://www.instagram.com/ireneisaacsonphotography')} >{`\u2022`} Instagram: @ireneisaacsonphotography</Text>
                <Text style={styles.textStyle2} onPress={() => Linking.openURL('https://www.facebook.com/ireneisaacsonphotography')} >{`\u2022`} Facebook: @ireneisaacsonphotography</Text>
                <Text style={styles.textStyle2} onPress={() => Linking.openURL('https://www.pinterest.com.au/ireneisaacsonphotography')} >{`\u2022`} Pinterest: @ireneisaacsonphotography</Text>
                <Text style={styles.textStyle2} onPress={() => Linking.openURL('mailto:ireneisaacsonphotography@gmail.com')} >{`\u2022`} Email: ireneisaacsonphotography@gmail.com</Text>
                <Text style={styles.textStyle2} onPress={() => Linking.openURL('tel:407 126 750')} >{`\u2022`} Mobile: +61 407 126 750</Text>
                {/* <Text onPress={() =>  Linking.openURL('https://www.ireneisaacsonphotography.com')}  style={{ fontSize: ts16, marginTop: 10, }}>{`\u2022`} Website: www.ireneisaacsonphotography.com</Text> */}

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