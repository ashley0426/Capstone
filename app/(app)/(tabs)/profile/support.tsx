import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, Switch, Pressable, Linking } from 'react-native';
import BackButton from '@/components/BackButton'; // Adjust the path as necessary
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import PageTitle from '@/components/PageTitle';
import { useState } from 'react';
import React from 'react';


const { width, height } = Dimensions.get('window');
const iconContainerSize = width * 0.15;

const Support = () => {

    const [emailNotifications, setEmailNotification] = useState(true);
    const [appNotification, setAppNotification] = useState(true);

    const insets = useSafeAreaInsets();
    const logoSize = width * 0.33;

    return (
        <View>

            <BackButton />
            <PageTitle text="Support" />


            <View style={styles.container}>

                {/* Container for links */}
                <View style={styles.linkRow}>
                    <Text style={[styles.settingText, { marginLeft: '10%' }]}>FAQs</Text>
                    <Text style={{ fontWeight: '400', fontSize: 20, lineHeight: 23 }}>{">"}</Text>
                </View>

                <Pressable style={styles.linkRow} onPress={() => Linking.openURL('mailto:hello@60plusplayground.com.au')}>
                    <Text style={[styles.settingText, { marginLeft: '10%' }]}>Contact Us</Text>
                    <Text style={{ fontWeight: '400', fontSize: 20, lineHeight: 23 }}>{">"}</Text>
                </Pressable>

                <View style={styles.imageContainer}>
                    <Image source={require('@/assets/images/settingsImages/support.png')} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '15%',
        marginTop: '10%'
    },
    background: {
        flex: 1,
        position: 'absolute',
    },
    switchesContainer: {
        marginTop: '30%'
    },
    linkRow: {
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '8%',
    },
    switchText: {
        fontSize: 17,
        lineHeight: 45
    },
    label: {
        display: 'flex',
        fontSize: 17,
        fontWeight: 'bold'
    },
    imageContainer: {
        alignSelf: 'center',
        marginTop: '50%'
    },
    settingRow: {
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    settingText: {
        fontSize: 17,
        marginLeft: '5%',
        fontWeight: 'bold'
    },
    divider: {
        height: 1,
        backgroundColor: '#000',
        marginTop: '30%',
        marginBottom: '20%'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F89522',
        borderRadius: 8,
        textAlign: 'center',
        paddingHorizontal: 20,
        width: '80%',
        justifyContent: 'flex-start',
    },

    iconContainer: {
        width: iconContainerSize,
        height: iconContainerSize,
        borderRadius: 20,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center"
    },


});

export default Support; 