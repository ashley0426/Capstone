import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as ScreenOrientation from 'expo-screen-orientation';
import React from 'react';
import { Image } from 'expo-image';
import common from '@/components/styles/commonStyles';
import { NAVY } from '@/components/theme';

const { width, height } = Dimensions.get('window');

const videoSource = require("@/assets/videos/smartlife/QB_INTRO.mp4");


export default function Programs() {
    const insets = useSafeAreaInsets();

    const onFullscreenEnter = async () => {
        await ScreenOrientation.unlockAsync();
    };
    const onFullscreenExit = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    return (
        <ScrollView>
            <Image source={require("@/assets/images/smart-life/brain-health/qb_logo.png")} style={[common.image, {marginBottom: 20, borderRadius: 10, height: 200 }]} />
            <View style={{ borderRadius: 10, borderColor: NAVY, borderWidth: 2, padding: 10}}>
                <ThemedText type="subtitle" style={{ textAlign: 'center' }}>🌟 Welcome, Quick Brainers!{"\n"}</ThemedText>
                <View style={{ width: "100%", height: width * .55, marginVertical: 15, }}>
                    <VideoView
                        style={styles.video}
                        player={useVideoPlayer(videoSource)}
                        onFullscreenEnter={onFullscreenEnter}
                        onFullscreenExit={onFullscreenExit}
                    />
                </View>
                <ThemedText>Get ready to give your brain the VIP treatment it deserves—every single day!{"\n"}</ThemedText>
                <ThemedText>The Quick Brainers Program sparks your mind in just 10 minutes a day with fun, science-backed activities using music, movement, and laughter to wake up your neurons.{"\n"}</ThemedText>
                <ThemedText>Each day, enjoy a short session in our private Facebook group, targeting Focus, Memory, Agility, Creativity, and Coordination—plus resources and a simple journal to track your progress.{"\n"}</ThemedText>
                <ThemedText>🧠 How It Works{"\n"}</ThemedText>
                <ThemedText>Each day you’ll enjoy a short video session in our private Facebook group, targeting the five key brain functions—Focus, Memory, Agility, Creativity, and Coordination. You’ll also get supportive resources and a simple daily journal to help track your progress.</ThemedText>
                <ThemedText>💥 Choose Your VIP Experience</ThemedText>
                <ThemedText>• One-Day Workshops – a powerful taste of what Quick Brainers can do.</ThemedText>
                <ThemedText>• 7-Week Introduction – build strong foundations for lifelong brain health.</ThemedText>
                <ThemedText>• 4-Week VIP Intensive – our ultimate brain-care immersion.</ThemedText>
                <ThemedText>• Ongoing Subscription – unlock all our resources and enjoy 10 minutes of Quick Brainers every day.{"\n"}</ThemedText>
                <ThemedText>Keep your brain happy, healthy, and resilient, reducing the risks of dementia, Alzheimer’s, and Parkinson’s.{"\n"}</ThemedText>
                <ThemedText>🌈 Ready to Join?</ThemedText>
                <ThemedText>Join our Quick Brainers Facebook Page and email hello@quickbrainers.com.au to get started.{"\n"}</ThemedText>
                <ThemedText>Spark your neurons, share the laughs, and shape your brain’s future!</ThemedText>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: height * .3,
    },
    saveButton: {
        width: "85%",
        height: 42,
        backgroundColor: '#f89522',
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
    video: {
        flex: 1,
        alignSelf: 'stretch',
    },
});
