import { Image, StyleSheet, ScrollView, Platform, View, Pressable, Text, TextInput, Keyboard, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { useSession } from '@/components/auth/ctx';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { loginUser } from '@/components/apiService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import common from '@/components/styles/commonStyles';
import React from 'react';

/*TEST IDs:
emailInput
passwordInput
passwordVisibilityToggle
rememberMeCheckBox
forgetPasswordLink
signInButton 
createAccountButton
errorEmailInput (for error state)
errorPasswordInput (for error state)
*/

export default function Login() {
    const isiOS = Platform.OS === 'ios';

    type LoginStatus = 'Not Entered' | 'Failed'
    type keyboardStatus = 'Keyboard Shown' | 'Keyboard Hidden'
    type User = number | null;
    const insets = useSafeAreaInsets();
    const { signIn } = useSession();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [rememberUser, setRememberUser] = useState(false);
    const [keyboardStatus, setKeyboardStatus] = useState<keyboardStatus>('Keyboard Hidden');

    const [loginStatus, setLoginStatus] = useState<LoginStatus>('Not Entered');
    const [loginIsClicked, setLoginIsClicked] = useState(false);

    const [isSecure, setIsSecure] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

    const handlePasswordVisibility = () => {
        setIsSecure(!isSecure);
        setRightIcon(isSecure ? 'eye' : 'eye-off');
    };

    useEffect(() => {

        // Components are shifted when keyboard appears on android. Lazy workaround by hiding bottom components. Need to find a better solution eventually.
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus('Keyboard Shown');
        });

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus('Keyboard Hidden');
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    async function handleLogin() {

        setLoginIsClicked(true);
        // const user: User = await loginUser(email, password);
        const user = 200;

        if (user === 200) {
            signIn();
            router.replace('/(app)/(tabs)/home');
        }
        // unverified flow
        else if (user === 999) {
            setIsModalVisible(true);
        }
        else {
            setLoginStatus('Failed');
        }
        setLoginIsClicked(false);
    }

    return (
        <>
            <View style={ common.backgroundBase }>
                <Image style={[common.backgroundImage, {opacity: 100}]} source={require('@/assets/images/BackgroundCircles.png')} />
            </View>

            <ScrollView>
                {/* image and text */}
                <View style={{ height: height * .35 }}>
                    <View style={[styles.titlesContainer, { marginTop: insets.top }]}>
                        <View style={styles.logoContainer}>
                            <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
                        </View>
                        <ThemedText type="title" style={styles.signInTitle}>SIGN IN</ThemedText>
                        <ThemedText type="card" style={styles.signInSubTitle}>Login with the following</ThemedText>
                    </View>
                </View>

                {loginStatus == 'Failed' ?
                    <View style={{ alignSelf: 'center', height: 60, width: "90%", marginTop: 5, backgroundColor: "#ffd6d6", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                        <ThemedText type="defaultSemiBold" style={{ marginTop: 5, color: '#b20e0e' }}>Login failed. Please try again !</ThemedText>
                    </View> : ''
                }

                {/* TEXT INPUTS, REMEMBER ME AND FORGOT PASSWORD  */}
                <View style={styles.loginContainer}>
                    {loginStatus === 'Not Entered' ? (
                        // email input 
                        <>
                            <ThemedText type="defaultSemiBold">Email Address</ThemedText>
                            <TextInput
                                style={styles.inputBox}
                                placeholder="Enter your email ..."
                                onChangeText={newText => setEmail(newText)}
                                defaultValue={email}
                                testID="emailInput"
                            />
                            {/* password input */}
                            <View style={{ marginTop: 12 }}>
                                <ThemedText type="defaultSemiBold">Password</ThemedText>
                                <TextInput
                                    style={styles.inputBox}
                                    placeholder="Enter your password ..."
                                    secureTextEntry={isSecure}
                                    onChangeText={newText => setPassword(newText)}
                                    defaultValue={password}
                                    testID="passwordInput"
                                />
                                <TouchableOpacity onPress={handlePasswordVisibility} style={styles.passwordInputEye} testID="passwordVisibilityToggle">
                                    {!isSecure ? (
                                        <Icon name={"eye"} size={24} color="#000" />
                                    ) : (
                                        <Icon name={"eye-off"} size={24} color="#000" />
                                    )
                                    }
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            <ThemedText type="defaultSemiBold">Email Address</ThemedText>
                            <TextInput
                                style={styles.failInputBox}
                                placeholder="Enter your email ..."
                                onChangeText={newText => setEmail(newText)}
                                defaultValue={email}
                                testID="errorEmailInput"
                            />
                            <MaterialCommunityIcons name="alert-circle-outline" size={24} color="red" style={{ position: 'absolute', right: 10, top: height * 0.045 }} />
                            {/* password input */}
                            <View style={{ marginTop: 12 }}>
                                <ThemedText type="defaultSemiBold">Password</ThemedText>
                                <TextInput
                                    style={styles.failInputBox}
                                    placeholder="Enter your password ..."
                                    secureTextEntry={isSecure}
                                    onChangeText={newText => setPassword(newText)}
                                    defaultValue={password}
                                    testID="errorPasswordInput"
                                />
                                <TouchableOpacity onPress={handlePasswordVisibility} style={styles.passwordInputEye}>
                                    {!isSecure ? (
                                        <Icon name={"eye"} size={24} color="#000" />
                                    ) : (
                                        <Icon name={"eye-off"} size={24} color="#000" />
                                    )
                                    }
                                </TouchableOpacity>
                                <MaterialCommunityIcons name="alert-circle-outline" size={24} color="red" style={{ position: 'absolute', right: 40, top: '50%' }} />
                            </View>
                        </>
                    )}


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: height * 0.07, marginTop: height * 0.025 }}>
                        {/* remember me checkbox */}
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[styles.checkboxBase, rememberUser && styles.checkboxChecked]}
                                onPress={() => setRememberUser(!rememberUser)}
                                testID="rememberMeCheckBox"
                            >
                                {rememberUser && <Ionicons name="checkmark" size={24} color="white" />}
                            </Pressable>
                            <ThemedText type="defaultSemiBold" style={{ marginLeft: 15 }}>Remember Me</ThemedText>
                        </View>
                        {/* forgot passowrd link */}

                        <ThemedText type="defaultSemiBold" style={{ textDecorationLine: 'underline' }} onPress={() => { router.push('(ForgetPassword)/inital-forget/') }}
                            testID="forgetPasswordLink"
                        >Forgot Password ?</ThemedText>
                    </View>

                </View >

                {/* BUTTONS */}
                < View style={{ flex: 1, display: !isiOS && keyboardStatus == 'Keyboard Shown' ? 'none' : 'flex', }}>

                    {/* Sign In Button */}
                    < Pressable style={[styles.button, { opacity: loginIsClicked ? 0.7 : 1 }]} onPress={() => {
                        // Debounce Button
                        !loginIsClicked ? handleLogin() : '';
                    }}
                        testID="signInButton"
                    >
                        <ThemedText style={styles.buttonText}>Sign In</ThemedText>
                    </Pressable >

                    <ThemedText type="defaultSemiBold" style={{ alignSelf: 'center', marginTop: height * 0.025 }}>Don't have an account yet ?</ThemedText>

                    {/* Create Account Button */}
                    <Pressable style={styles.createButton} onPress={() => {
                        router.push('/interests');
                    }}
                        testID="createAccountButton">
                        <ThemedText style={styles.createButtonText}>Create an account</ThemedText>
                    </Pressable>
                </View >
            </ScrollView>
            <Modal
                visible={isModalVisible}
                transparent={true}
            // animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={[styles.modalText, { fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }]}>Verify Your Email!</Text>
                        <Text style={styles.modalText}>Check your email inbox for a verification link and click it.</Text>
                        <Text style={styles.modalText}>If you cannot find an email from us.</Text>
                        <Text style={styles.modalText}>Check your spam or junk inbox.</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.modalButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
const alertStyles = StyleSheet.create({
    alertText: {
        fontSize: 16, // Increase this value to make the text larger
        fontWeight: 'bold',
    },
})
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
    },
    titlesContainer: {
        flex: 1,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoContainer2: {
        flex: 1,
        alignItems: 'center', // Centers children horizontally
        justifyContent: 'center', // Centers children vertically
    },
    logo: {
        resizeMode: 'contain',
        height: height * .2,
    },
    signInTitle: {
        fontWeight: "500",
        fontSize: 32,
        alignSelf: 'center',
        marginTop: height * 0.01,
    },
    signInSubTitle: {
        fontWeight: "400",
        fontSize: 16,
        alignSelf: 'center',
        marginTop: height * 0.001,
    },
    container: {
        flex: 1,
    },
    loginContainer: {
        alignSelf: 'center',
        flex: 1,
        marginVertical: 10
    },
    inputBox: {
        backgroundColor: 'white',
        height: height * 0.07,
        width: width * .9,
        borderRadius: 8,
        borderColor: 'grey',
        borderWidth: 1,
        paddingLeft: 10
    },
    failInputBox: {
        backgroundColor: 'white',
        height: height * 0.07,
        width: width * .9,
        borderRadius: 8,
        borderColor: '#d90000',
        borderWidth: 1,
        paddingLeft: 10
    },
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: 'grey',
    },
    button: {
        borderRadius: 8,
        backgroundColor: '#3C3C3C',
        width: 305,
        height: 55,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        fontWeight: 500,
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    createButton: {
        marginTop: height * 0.025,
        borderRadius: 8,
        backgroundColor: '#F89522',
        width: 145,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    createButtonText: {
        fontWeight: 700,
        fontSize: 13,
        textAlign: 'center',
    },
    passwordInputEye: {
        position: 'absolute',
        right: 10, // Position the icon inside bar
        top: '50%', // Vertically center the icon
    },
    // MODAL 
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        fontFamily: 'Roboto'
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize: 16,
        fontFamily: 'Roboto'
    },
});
