import { pageThemes } from "@/components/theme";
import { Linking, Pressable, ScrollView, StyleSheet, View } from "react-native";
import common from "@/components/styles/commonStyles";
import { ThemedText } from "@/components/ThemedText";

import FacebookIcon from "@/assets/images/social/facebook.svg"
import InstagramIcon from "@/assets/images/social/instagram.svg"
import YoutubeIcon from "@/assets/images/social/youtube.svg"

import { ICON_SIZE } from '@/constants/Constants';
import React from "react";
import CarouselComponent from "@/components/smart-life-page/BrainHealthCarouselScreen";
import { BrainHealthCognitiveData } from "@/components/smart-life-page/smart-life-data";
import { SocialRegions } from "@/components/socials-page/get-social-data";

export default function SocialsBase () {
	const page = 'Socials.';
	const { ACTIVE_COLOR, SECONDARY_COLOR } = pageThemes[page] || {};

	return (
        <ScrollView>
            <View style={ common.banner }>
                <ThemedText type="title" style={{color: '#fff'}}>{page}</ThemedText>
            </View>

            <View style={ styles.cards }>
                <Pressable style={[common.card, {borderColor: SECONDARY_COLOR}]} onPress={() => Linking.openURL("https://www.mightynetworks.com")}>
                    <ThemedText type="card">Digital Playground!</ThemedText>
                </Pressable>
                {/* <Pressable style={[common.card, {borderColor: SECONDARY_COLOR}]} onPress={() => Linking.openURL("https://www.mightynetworks.com")}>
                    <ThemedText type="card">Chat to other 60 plus members</ThemedText>
                </Pressable> */}
                <View style={{marginVertical: 20, alignContent: 'center'}}>
                    <CarouselComponent
                        data={SocialRegions}
                        title="GET SOCIAL"
                    />
                </View>
                <View>
                    <View style={[common.card, styles.icons, {borderColor: SECONDARY_COLOR}]}>
                        {/* <ThemedText type="subtitle" style={{textAlign: "center"}}>Visit our socials:</ThemedText> */}
                        <Pressable onPress={() => Linking.openURL("https://www.facebook.com/60PlusPlayGround")}>
                            <FacebookIcon style={styles.icon} color={ACTIVE_COLOR}></FacebookIcon>
                        </Pressable>
                        <Pressable onPress={() => Linking.openURL("https://www.instagram.com/60plusplayground")}>
                            <InstagramIcon style={styles.icon} color={ACTIVE_COLOR}></InstagramIcon>
                        </Pressable>
                        <Pressable onPress={() => Linking.openURL("https://www.youtube.com/@60PlusPlayGround")}>
                            <YoutubeIcon style={styles.icon} color={ACTIVE_COLOR}></YoutubeIcon>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
	);
};

const styles = StyleSheet.create({
	cards:{
		flex: 1,
		// justifyContent: "space-between",
		marginBottom: 10,
	},
	icons: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	icon: {
		width: ICON_SIZE,
		height: ICON_SIZE,
	}
})