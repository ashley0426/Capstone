import { StyleSheet, ScrollView, View, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ForgetPasswordBalloonSVG from '@/constants/ForgetPasswordBalloonSVG';
import SuccessCheckSVG from '@/constants/SuccessCheckSVG';
import { router } from 'expo-router';
import React from 'react';

export default function successPage() {

    const insets = useSafeAreaInsets();

    return (
        <>
            <View style={styles.background}>
                <ForgetPasswordBalloonSVG />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={[styles.header, { marginTop: insets.top + 10 }]}>Forgot Password</Text>
                    <Text style={styles.subTitle}> Success !</Text>
                    <View style={{ marginTop: 50, marginBottom: 10, alignSelf: 'center' }}>
                        <SuccessCheckSVG />
                    </View>
                    <Text style={styles.subText}>We sent a reset link to your email please check your inbox or spam folder for it</Text>

                    <Pressable style={styles.continueButton} onPress={() => {
                        router.replace('/sign-in');
                    }}>
                        <Text style={styles.continueButtonText}>Go back</Text>
                    </Pressable>

                </View>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        width: '80%',
        alignSelf: 'center'
    },
    background: {
        position: 'absolute'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    image: {
        alignSelf: "center",
        width: "80%"
    },
    subTitle: {
        fontWeight: '400',
        fontSize: 20,
        textAlign: 'center'

    },
    subText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '600'
    },
    otpTitle: {
        fontWeight: '500',
        fontSize: 20
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputBox: {
        backgroundColor: 'white',
        height: 64,
        width: 64,
        borderRadius: 8,
        borderColor: 'grey',
        borderWidth: 1,
        alignSelf: 'center'
    },
    continueButton: {
        marginTop: 50,
        borderRadius: 8,
        backgroundColor: '#F89522',
        width: 282,
        height: 52,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    continueButtonText: {
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
    },
});