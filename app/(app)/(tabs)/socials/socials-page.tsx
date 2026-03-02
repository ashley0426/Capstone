import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Linking } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as ScreenOrientation from 'expo-screen-orientation';

const { width, height } = Dimensions.get('window');

const openImage = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch (error) {
    console.error('Error opening URL:', error);
  }
};

// https://www.youtube.com/channel/UCgj4RjhgGaPkB0vMN-9C-Ew
// https://www.facebook.com/60PlusPlayGround/
// https://www.facebook.com/groups/60plusplaygroundcommunity
// https://60plusplayground.com.au/

const videoSourceIntro = require("./videos/intro.mp4");
const videoSourceIrene = require("./videos/irene.mp4");
const videoSourceTony = require("./videos/tony.mp4");
const videoSourceVicki = require("./videos/vicki.mp4");
const videoSourceKen = require("./videos/ken.mp4");

const socialsPage = () => {
  const insets = useSafeAreaInsets();
  const socialMediaImgSize = width * 0.15;

  const playerIntro = useVideoPlayer(videoSourceIntro);
  const playerIrene = useVideoPlayer(videoSourceIrene);
  const playerTony = useVideoPlayer(videoSourceTony);
  const playerVicki = useVideoPlayer(videoSourceVicki);
  const playerKen = useVideoPlayer(videoSourceKen);

  const onFullscreenEnter = async () => {
    await ScreenOrientation.unlockAsync();
  };
  const onFullscreenExit = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
  return (
    <>
      <View>
        <ThemedText style={[styles.header, { marginTop: insets.top + 10 }]}>SOCIALS</ThemedText>
      </View>

      <ScrollView style={{ paddingHorizontal: 20, marginTop: '10%', }}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={{ marginTop: 10, fontSize: 16 }}>Get to know 60 Plus Playground and explore our social media. Meet our important influencers!</Text>

        <Text style={[styles.title, { marginTop: 20, }]}>Visit our social media</Text>
        {/* row of social media logos -> clickable */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <TouchableOpacity onPress={() => { openImage('https://www.youtube.com/channel/UCgj4RjhgGaPkB0vMN-9C-Ew') }}>
            <Image source={require('@/assets/images/social/social-media-logo/instagram.png')}
              style={{ width: socialMediaImgSize, height: socialMediaImgSize, resizeMode: 'contain' }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { openImage('https://www.facebook.com/60PlusPlayGround/') }}>
            <Image source={require('@/assets/images/social/social-media-logo/facebook.png')}
              style={{ width: socialMediaImgSize, height: socialMediaImgSize, resizeMode: 'contain' }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { openImage('https://www.youtube.com/channel/UCgj4RjhgGaPkB0vMN-9C-Ew') }}>
            <Image source={require('@/assets/images/social/social-media-logo/youtube.png')}
              style={{ width: socialMediaImgSize, height: socialMediaImgSize, resizeMode: 'contain' }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { openImage('https://60plusplayground.com.au/') }}>
            <Image source={require('@/assets/images/social/social-media-logo/60PLUS-PLAYGROUND_LOGO-FOR-APP.png')}
              style={{ width: socialMediaImgSize, height: socialMediaImgSize, resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>

        {/* Main Intro Video */}
        <Text style={[styles.title, { marginTop: 10, }]}>Get to know our company!</Text>
        <View style={{
          width: "100%",
          height: width * .55,
          marginVertical: 15,
        }}>
          <VideoView
            style={styles.video}
            player={useVideoPlayer(videoSourceIntro)}
            onFullscreenEnter={onFullscreenEnter}
            onFullscreenExit={onFullscreenExit}
          />
        </View>
        <Text style={[styles.title, { marginTop: 20, }]}>Meet our influencers</Text>


        {/* INFLUENCER 1 */}
        <Text style={[styles.title, { marginTop: 20, }]}>Irene Krajewska</Text>
        <View style={{
          width: "100%",
          height: width * .55,
          marginVertical: 15,
        }}>
          <VideoView
            style={styles.video}
            player={useVideoPlayer(videoSourceIrene)}
            onFullscreenEnter={onFullscreenEnter}
            onFullscreenExit={onFullscreenExit}
          />
        </View>
        <Text style={styles.bio}>Irene Krajewska, a retired medical specialist with 30 years of experience, is now dedicated to her lifelong passions for global travel, wildlife adventures, voluntourism, and environmental conservation.</Text>

        <TouchableOpacity onPress={() => router.push({
          pathname: '/socials/influencer-details-Irene',
        })}>
          <Text style={styles.underlined}>view details</Text>
        </TouchableOpacity>

        {/* INFLUENCER 2 */}
        <Text style={[styles.title, { marginTop: 20, }]}>Tony Isaacson </Text>
        <View style={{
          width: "100%",
          height: width * .55,
          marginVertical: 15,
        }}>
          <VideoView
            style={styles.video}
            player={useVideoPlayer(videoSourceTony)}
            onFullscreenEnter={onFullscreenEnter}
            onFullscreenExit={onFullscreenExit}
          />
        </View>
        <Text style={styles.bio}>Tony is a retired marine science teacher and avid lifelong scuba diver. Not just a PADI Dive Instructor, he is also an Aware Shark Specialty and Rescue Diver. Whilst regularly posting to advocate for sharks, his sustainability, and ecotourism, he has also been an invited local shark expert on mainstream media including TV news and radio stations such as ABC.</Text>
        <TouchableOpacity onPress={() => router.push({
          pathname: `/socials/influencer-details-Tony`,
        })}>
          <Text style={styles.underlined}>view details</Text>
        </TouchableOpacity>




        {/* INFLUENCER 3 */}
        <Text style={[styles.title, { marginTop: 20, }]}>Vicki Doonan</Text>
        <View style={{
          width: "100%",
          height: width * .55,
          marginVertical: 15,
        }}>
          <VideoView
            style={styles.video}
            player={useVideoPlayer(videoSourceVicki)}
            onFullscreenEnter={onFullscreenEnter}
            onFullscreenExit={onFullscreenExit}
          />
        </View>
        <Text style={styles.bio}>Vicki Doonan, a dynamic 60 Plus Influencer, inspires the 60 Plus Playground communities with her "QUICK BRAINERS" program and Cognitive Nourishments, offering brain health resources regularly. Vicki combines fun, laughter, and uplifting music with cognitive exercises, making each session enjoyable and engaging. Additionally, she is well-qualified in Dementia Communication, Dementia Live, Compassionate Touch, and Older Persons' Mental Health First Aid.</Text>
        <TouchableOpacity onPress={() => router.push({
          pathname: `/socials/influencer-details-Vicki`,
        })}>
          <Text style={styles.underlined}>view details</Text>
        </TouchableOpacity>




        {/* INFLUENCER 4 */}
        <Text style={[styles.title, { marginTop: 20, }]}>Ken Jones</Text>
        <View style={{
          width: "100%",
          height: width * .55,
          marginVertical: 15,
        }}>
          <VideoView
            style={styles.video}
            player={useVideoPlayer(videoSourceKen)}
            onFullscreenEnter={onFullscreenEnter}
            onFullscreenExit={onFullscreenExit}
          />
        </View>
        <Text style={styles.bio}>Ken Jones, a seasoned professional with a career in major advertising agencies and his own design business on the Sunshine Coast, is dedicated to living life to the fullest in retirement. He believes in the power of exercise to maintain mental and physical well-being, emphasizing that getting older doesn’t have to mean getting weaker. Ken is passionate about inspiring others to take control of their health and happiness by making simple lifestyle changes, including regular exercise, a balanced diet, socializing, creativity, laughter, and proper rest.</Text>
        <TouchableOpacity onPress={() => router.push({
          pathname: `/socials/influencer-details-Ken`,
        })}>
          <Text style={styles.underlined}>view details</Text>
        </TouchableOpacity>


        {/* bottom spacer for android */}
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    // color:"white",
    marginVertical: 20,
    // Styling for the page title.
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttons: {
    margin: 16
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  bio: {
    marginTop: 10,
    fontSize: 16,
    paddingBottom: 10
  },
  underlined: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 10
  }
});
export default socialsPage