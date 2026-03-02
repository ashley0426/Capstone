import { Image, StyleSheet, ScrollView, Platform, View, Pressable, Text, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import BackButton from '@/components/BackButton';
import { useState } from 'react';
import { errorMessages } from '@/constants/Forget Password';
import { validateEmail } from '@/functions/ForgetPassword Functions/validateEmail';
import { resetPassword } from '@/functions/ForgetPassword Functions/resetPassword';
import PageTitle from '@/components/PageTitle';
import React from 'react';


export default function InitalForgetPassword() {

    type IsValid = 'notTyped' | 'empty' | 'invalid' | 'valid' | 'failed';

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState<IsValid>('notTyped');
    const [buttonPressed, setButtonPressed] = useState(false);

    const insets = useSafeAreaInsets();
    const isiOS = Platform.OS === 'ios';

    async function handleButtonPress() {
        setButtonPressed(true);
        if (isValidEmail == 'valid' && !buttonPressed) {
            if (await resetPassword(email) == 200) router.replace('/success-page');
            else setIsValidEmail('failed');
        }
        setButtonPressed(false);
    }

    return (
        <>
            {isiOS ? (
                <View style={{ height: '10%', backgroundColor: "white" }}>
                    <BackButton />
                </View>
            ) : (
                null
            )}

            <ScrollView>
                <View id="Page Container" style={{ width: '80%', alignSelf: 'center' }}>
                    <PageTitle text='Forgot Password' />
                    <Image source={require('@/assets/images/ForgetPasswordImages/ForgetPerson.png')} style={styles.image} />

                    <View id="Title and text container" style={{ marginVertical: 40 }}>
                        <Text style={styles.subTitle}>Forgot your password?</Text>
                        <Text style={styles.subText}>Enter your email address and we'll email you a OTP to reset the password</Text>
                    </View>

                    <View id="Email Input Container">
                        <Text style={styles.text}>Email Address</Text>
                        <TextInput
                            style={[styles.inputBox, { borderColor: (isValidEmail == 'empty' || isValidEmail == 'invalid') ? 'red' : 'black' }]}
                            placeholder="Enter your email ..."
                            onChangeText={(value) => setEmail(value)}
                            onEndEditing={() => validateEmail(email, setIsValidEmail)}
                        />

                        {!(isValidEmail == 'valid') && <Text style={{ marginTop: 5, color: 'red', fontWeight: 500 }}>{errorMessages[isValidEmail]}</Text>}

                        <Pressable id="Reset button" style={[styles.continueButton, { opacity: buttonPressed ? 0.7 : 1 }]} onPress={() => {
                            handleButtonPress();
                        }}>
                            <Text style={styles.continueButtonText}>Reset password</Text>
                        </Pressable>
                    </View>

                </View>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        maxWidth: '90%'
    },
    text: {
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10
    },
    subText: {
        textAlign: 'center',
    },
    continueButton: {
        marginVertical: 20,
        borderRadius: 8,
        backgroundColor: '#F89522',
        width: '90%',
        height: 42,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    continueButtonText: {
        fontSize: 13,
        textAlign: 'center',
    },
    inputBox: {
        backgroundColor: 'white',
        height: 50,
        width: '100%',
        borderRadius: 8,
        borderColor: 'grey',
        borderWidth: 0.7,
        paddingLeft: 10,
        alignSelf: 'center'
    }
});