import { ScrollView, StyleSheet, Platform, View, Pressable, TextInput, } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { useSession } from '@/components/auth/ctx';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '@/components/BackButton';
import { useWindowDimensions } from 'react-native';
import ToS from '@/components/ToS';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FormErrors, FormName } from '@/interfaces/registrationInterface';
import { validateField, handleNextClick, validatePassword } from '@/functions/registerFunctions/register';
import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';

import common from '@/components/styles/commonStyles';
import { Image } from 'expo-image';

const pickerHeight = 50;

export default function Register() {
    const { signIn } = useSession();

    const { height, width } = useWindowDimensions();
    const isiOS = Platform.OS === 'ios';
    const insets = useSafeAreaInsets();
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        postcode: 0,
        age: 0,
        country: '',
        gender: '',
        tosAccepted: false,
        personalizedEmailAccept: false
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({
        firstName: null,
        lastName: null,
        email: null,
        password: {
            sufficentLength: false,
            hasCapital: false,
            hasLetter: false,
            hasNumber: false
        },
        passwordValid: null,
        confirmPassword: null,
        postcode: null,
        age: null,
        country: null,
        gender: null,
    });

    const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
    const [registerIsClicked, setRegisterIsClicked] = useState(false);
    const [showToS, setShowToS] = useState(false);
    const { firstName, lastName, email, password, confirmPassword, postcode, age, country, gender, tosAccepted, personalizedEmailAccept } = userDetails;

    // Style for first container to access windowHeight variable within scope.
    const containerStyle = StyleSheet.create({
        container: {
            flex: 1,
            marginVertical: 10
        }
    })

    const [openC, setOpenC] = useState(false);
    const [valueC, setValueC] = useState(userDetails.country || null);
    const [itemsC, setItemsC] = useState([
        { label: 'United States', value: 'United States' },
        { label: 'Canada', value: 'Canada' },
        { label: 'United Kingdom', value: 'United Kingom' },
        { label: 'Australia', value: 'Australia' },
    ]);

    const [openG, setOpenG] = useState(false);
    const [valueG, setValueG] = useState(userDetails.gender || null);
    const [itemsG, setItemsG] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ]);

    return (
        <>
            <Image style={common.backgroundImage} source={require('@/assets/images/BackgroundCircles.png')} />
            {isiOS ? (
                <View>
                    <BackButton />
                    <ThemedText style={[styles.header, { marginTop: insets.top + 50 }]}>Let's Create your account!</ThemedText>
                    <ThemedText style={{ textAlign: 'center' }}>Join to start exploring !</ThemedText>
                </View>
            ) : (
                null
            )}

            <ScrollView style={containerStyle.container}>
                <SafeAreaView>
                    {/* Reduce padding for smaller phone sizes */}
                    <View style={{ paddingHorizontal: width < 400 ? '5%' : '7%' }}>
                        {!isiOS ? (
                            <View id='Titles Container ' style={{ flex: 1, marginVertical: 5, marginBottom: '10%' }}>
                                <ThemedText style={{ textAlign: 'center', fontSize: 23, fontWeight: '500' }}>Let's Create your account!</ThemedText>
                                <ThemedText style={{ textAlign: 'center' }}>join to start exploring !</ThemedText>
                            </View>
                        ) : (
                            null
                        )}
                        <View id='Details container' style={{ flex: 6, width: '100%' }}>
                            <View id='Names Row' style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <View id='First name container'>
                                    <ThemedText style={styles.inputName}>First Name</ThemedText>
                                    <TextInput
                                        style={[styles.inputBox, { width: 159 }, { borderColor: formErrors.firstName ? '#d90000' : 'grey' }]}
                                        placeholder="Enter your first name"
                                        onChangeText={newText => { setUserDetails({ ...userDetails, firstName: newText }) }}
                                        defaultValue={''}
                                        textContentType='givenName'
                                        testID="firstNameInput"
                                        onEndEditing={() => validateField(userDetails, 'firstName', setFormErrors, formErrors)}
                                    />
                                    {formErrors.firstName && <ThemedText style={styles.formError}>{formErrors.firstName}</ThemedText>}
                                </View>
                                <View id='Last name container'>
                                    <ThemedText style={styles.inputName}>Last Name</ThemedText>
                                    <TextInput
                                        style={[styles.inputBox, { width: 159 }, { borderColor: formErrors.lastName ? '#d90000' : 'grey' }]}
                                        placeholder="Enter your last name"
                                        onChangeText={newText => { setUserDetails({ ...userDetails, lastName: newText }) }}
                                        defaultValue={''}
                                        textContentType='familyName'
                                        testID="lastNameInput"
                                        onEndEditing={() => validateField(userDetails, 'lastName', setFormErrors, formErrors)}
                                    />
                                    {formErrors.lastName && <ThemedText style={styles.formError}>{formErrors.lastName}</ThemedText>}
                                </View>
                            </View>
                            <View id='Email Container' style={{ marginTop: 15 }}>
                                <ThemedText style={styles.inputName}>Email Address</ThemedText>
                                <TextInput
                                    style={[styles.inputBox, { borderColor: formErrors.email ? '#d90000' : 'grey' }]}
                                    placeholder="Enter your email address"
                                    onChangeText={newText => { setUserDetails({ ...userDetails, email: newText }) }}
                                    defaultValue={''}
                                    textContentType='emailAddress'
                                    testID="emailInput"
                                    onEndEditing={() => validateField(userDetails, 'email', setFormErrors, formErrors)}
                                />
                                {formErrors.email && <ThemedText style={styles.formError}>{formErrors.email}</ThemedText>}
                                {formErrors.email && <MaterialCommunityIcons name="alert-circle-outline" size={24} color="red" style={{ position: 'absolute', right: 10, top: height * 0.045 }} />}
                            </View>

                            <View id='Password Container' style={{ marginTop: 15 }}>
                                <ThemedText style={styles.inputName}>Password</ThemedText>
                                <TextInput
                                    style={[styles.inputBox, { borderColor: formErrors.passwordValid ? '#d90000' : 'grey' }]}
                                    placeholder="Enter your Password"
                                    onChangeText={newText => {
                                        setUserDetails({ ...userDetails, password: newText });
                                        validatePassword(newText, setFormErrors, formErrors);
                                    }}
                                    secureTextEntry={true}
                                    defaultValue={''}
                                    testID="passwordInput"
                                    onFocus={() => setShowPasswordCriteria(true)}
                                    onBlur={() => setShowPasswordCriteria(false)}
                                    onEndEditing={() => validateField(userDetails, 'password', setFormErrors, formErrors)}
                                />
                                {formErrors.passwordValid && <MaterialCommunityIcons name="alert-circle-outline" size={24} color="red" style={{ position: 'absolute', right: 10, top: height * 0.045 }} />}
                            </View>

                            {showPasswordCriteria && (
                                <View style={styles.passwordCriteria} testID='passwordChecklist'>
                                    <ThemedText testID='passwordLength' style={{ color: formErrors.password.sufficentLength ? 'green' : 'red' }}>
                                        • Minimum 8 characters
                                    </ThemedText>
                                    <ThemedText testID='passwordCapital' style={{ color: formErrors.password.hasCapital ? 'green' : 'red' }}>
                                        • At least 1 uppercase letter
                                    </ThemedText>
                                    <ThemedText testID='passwordNumber' style={{ color: formErrors.password.hasNumber ? 'green' : 'red' }}>
                                        • At least 1 number
                                    </ThemedText>
                                </View>
                            )}

                            {formErrors.passwordValid && !showPasswordCriteria && <ThemedText style={styles.formError}>{formErrors.passwordValid}</ThemedText>}

                            <View id='Confirm Password Container' style={{ marginTop: 15 }}>
                                <ThemedText style={styles.inputName}>Confirm Password</ThemedText>
                                <TextInput
                                    style={[styles.inputBox, { borderColor: formErrors.confirmPassword ? '#d90000' : 'grey' }]}
                                    placeholder="Enter your Password"
                                    onChangeText={newText => { setUserDetails({ ...userDetails, confirmPassword: newText }) }}
                                    secureTextEntry={true}
                                    defaultValue={''}
                                    autoComplete='password'
                                    textContentType='newPassword'
                                    testID="confirmPasswordInput"
                                    onEndEditing={() => validateField(userDetails, 'confirmPassword', setFormErrors, formErrors)}
                                />
                                {formErrors.confirmPassword && <ThemedText style={styles.formError}>{formErrors.confirmPassword}</ThemedText>}
                                {formErrors.confirmPassword && <MaterialCommunityIcons name="alert-circle-outline" size={24} color="red" style={{ position: 'absolute', right: 10, top: height * 0.045 }} />}
                            </View>

                            <View id='Postcode and Gender Container' style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 }}>
                                <View id='Postcode container'>
                                    <ThemedText style={styles.inputName}>Postcode</ThemedText>
                                    <TextInput
                                        style={[styles.inputBox, { width: 150 }, { borderColor: formErrors.postcode ? '#d90000' : 'grey' }]}
                                        placeholder="Enter your postcode"
                                        onChangeText={newText => {
                                            setUserDetails({ ...userDetails, postcode: parseInt(newText) })
                                        }
                                        }
                                        maxLength={4}
                                        inputMode='decimal'
                                        testID="postcodeInput"
                                        onEndEditing={() => validateField(userDetails, 'postcode', setFormErrors, formErrors)}
                                    />
                                    {formErrors.postcode ? <ThemedText style={styles.formError}>{formErrors.postcode}</ThemedText> : ''}
                                </View>

                                <View id='Age container' style={{ width: 150 }}>
                                    <ThemedText style={styles.inputName}>Age</ThemedText>
                                    <TextInput
                                        style={[styles.inputBox, { width: 150, borderColor: formErrors.age ? '#d90000' : 'grey' }]}
                                        placeholder="Enter your age"
                                        onChangeText={newText => { setUserDetails({ ...userDetails, age: parseInt(newText) }) }}
                                        defaultValue={''}
                                        maxLength={3}
                                        inputMode='decimal'
                                        testID="ageInput"
                                        onEndEditing={() => validateField(userDetails, 'age', setFormErrors, formErrors)}
                                    />
                                    {formErrors.age && <ThemedText style={styles.formError}>{formErrors.age}</ThemedText>}
                                    {formErrors.age && <MaterialCommunityIcons name="alert-circle-outline" size={24} color="red" style={{ position: 'absolute', right: 10, top: height * 0.045 }} />}
                                </View>
                            </View>

                            <View id='Country and Postcode Container' style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 }}>
                                <View id='Country container'>
                                    <ThemedText style={styles.inputName}>Country</ThemedText>
                                    <View style={[styles.pickerContainer, { width: 150, zIndex: 1000, elevation: 1000 }]}>
                                        <DropDownPicker 
                                            listMode="MODAL"
                                            modalTitle="Select a Country"
                                            modalAnimationType='slide'
                                            open={openC}
                                            value={valueC}
                                            items={itemsC}
                                            setOpen={setOpenC}
                                            setValue={setValueC}
                                            setItems={setItemsC}
                                            placeholder="Select Country"
                                            onChangeValue={(val) => setUserDetails({ ...userDetails, country: val })}
                                        />
                                    </View>
                                </View>
                                <View id='Gender container'>
                                    <ThemedText style={styles.inputName}>Gender</ThemedText>
                                    <View style={[styles.pickerContainer, { width: 150, zIndex: -10 }]}>
                                        <DropDownPicker 
                                            listMode="MODAL"
                                            modalTitle="Select a Gender"
                                            modalAnimationType='slide'
                                            open={openG}
                                            value={valueG}
                                            items={itemsG}
                                            setOpen={setOpenG}
                                            setValue={setValueG}
                                            setItems={setItemsG}
                                            placeholder="Select Gender"
                                            onChangeValue={(val) => setUserDetails({ ...userDetails, gender: val })}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View id='Bottom Section Container' style={{ flex: 2.3, width: '100%', marginVertical: 20 }}>
                            <View id='ToS row' style={{ flexDirection: 'row' }}>
                                <Pressable
                                    style={[styles.checkboxBase, userDetails.tosAccepted && styles.checkboxChecked]}
                                    onPress={() => setUserDetails({ ...userDetails, tosAccepted: !userDetails.tosAccepted })}
                                    testID='tosCheckBox'>
                                    {userDetails.tosAccepted && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <ThemedText style={{ paddingLeft: 10 }}>I accept and agree to the </ThemedText>
                                <Pressable onPress={() => { setShowToS(true); }}>
                                    <ThemedText style={{ textDecorationLine: 'underline' }}>Terms of Service</ThemedText>
                                </Pressable>
                            </View>

                            <View id='Email Consent row' style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Pressable
                                    style={[styles.checkboxBase, userDetails.personalizedEmailAccept && styles.checkboxChecked]}
                                    onPress={() => setUserDetails({ ...userDetails, personalizedEmailAccept: !userDetails.personalizedEmailAccept })}>
                                    {userDetails.personalizedEmailAccept && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <ThemedText style={{ paddingLeft: 10 }}>I accept to receive personalised emails from 60 Plus Playground</ThemedText>
                            </View>

                            <Pressable style={[styles.nextButton, { opacity: registerIsClicked ? 0.7 : 1 }]} onPress={() => {
                                handleNextClick(userDetails, formErrors, setRegisterIsClicked, signIn);
                            }}>
                                <ThemedText style={styles.nextButtonText} testID='registerButton'>Register</ThemedText>
                            </Pressable>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
            {showToS ? <ToS setShowToS={setShowToS} /> : ''}
        </>
    );
}

const styles = StyleSheet.create({
    inputName: {
        fontSize: 16,
    },
    inputBox: {
        backgroundColor: 'white',
        height: 50,
        borderRadius: 8,
        borderColor: 'grey',
        borderWidth: 0.5,
        paddingLeft: 10
    },
    pickerContainer: {
        backgroundColor: 'white',
        height: pickerHeight,
        borderRadius: 8,
        borderColor: 'grey',
        borderWidth: 0.5,
        justifyContent: 'center',
    },
    picker: {
        height: pickerHeight,
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
        backgroundColor: 'coral',
    },
    nextButton: {
        marginTop: 30,
        borderRadius: 8,
        backgroundColor: '#F89522',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    nextButtonText: {
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'center',
    },
    header: {
        fontSize: 23,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: "black",
        marginVertical: 20,
        // Styling for the page title.
    },
    formError: {
        marginTop: 5, color: 'red', fontWeight: '500'
    },
    passwordCriteria: {
        marginTop: 10,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
    },
});

const pickerStyle = {
    inputIOS: {
        color: 'black',
        paddingHorizontal: 10,
        borderColor: '#ccc',
        height: pickerHeight,
    },
    inputAndroid: {
        color: 'black',
        paddingHorizontal: 10,
        borderColor: '#ccc',
        height: pickerHeight,
    },
    placeholder: {
        color: 'black',
    }
};