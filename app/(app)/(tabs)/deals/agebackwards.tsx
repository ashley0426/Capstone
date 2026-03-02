import common from "@/components/styles/commonStyles";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { Dimensions, FlatList, Linking, Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { AgeBackwardsData } from "@/components/deals/deals-data";
import React from "react";
import { BLUE, GREY } from "@/components/theme";

const { width, height } = Dimensions.get('window');

export default function AgeBackwards () {
    return (
        <ScrollView>
            <Pressable onPress={() => Linking.openURL('http://bit.ly/46YWKMT')}>
                <Image source={require("@/assets/images/deals/agebackwards/ab_logo.png")} style={[common.image, {marginBottom: 20, borderRadius: 10, height: 200 }]} />
            </Pressable>
            <View style={{ borderRadius: 10, borderColor: GREY, borderWidth: 2, padding: 10 }}>
                <ThemedText>At Age Backwards, we believe getting older should feel like leveling up not slowing down. Our mission is to inspire and support people to feel strong, vibrant and full of life at every age.{"\n"}</ThemedText>
                <ThemedText>We focus on what truly matters for long-term health: restoring and supporting your nervous system, circulation, metabolism and the powerful connection between gut and brain health. Because when your body’s core systems are thriving, everything else starts to fall into place.  No more chasing symptoms or quick fixes. It’s time to reconnect with your body, fuel it wisely and make empowering choices that boost your clarity, energy and confidence.{"\n"}</ThemedText>
                <ThemedText>We’re here to educate, uplift and guide you to age better from the inside out. Because vitality isn’t a luxury—it’s your birthright.</ThemedText>
            </View>
            <Pressable onPress={() => Linking.openURL('http://bit.ly/46YWKMT')}>
                <View style={{ marginBottom: 50, padding: 10, backgroundColor: BLUE, borderRadius: 10, marginVertical: 10 }}>
                    <ThemedText type="subtitle">Learn more</ThemedText>
                </View>
            </Pressable>
        </ScrollView>
    )
}