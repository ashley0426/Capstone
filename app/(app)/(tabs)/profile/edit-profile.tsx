import { StyleSheet, View, Text, Dimensions, Pressable, ScrollView, TextInput, Platform } from 'react-native';
import BackButton from '@/components/BackButton'; // Adjust the path as necessary
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
// import CurvedHeader from '@/components/Header';
// import HomeButton from '@/components/HomeButton';
// import EditProfilePageIcon from '@/components/ProfilePageIcons/EditProfileIcon';
// import ChangePasswordIcon from '@/components/ProfilePageIcons/ChangePasswordIcon';
// import SettingsAndPrivacyIcon from '@/components/ProfilePageIcons/SettingsAndPrivacyIcon';
// import LogoutIcon from '@/components/ProfilePageIcons/LogoutIcon';
import PageTitle from '@/components/PageTitle';
import { useEffect, useState } from 'react';
import { getValueFor } from '@/components/auth/secureStoreHelper';
import { ThemedText } from '@/components/ThemedText';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { validateFieldUpdatePage, checkBeforeUpdate } from '@/functions/registerFunctions/register';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UpdatePageFormErrors } from '@/interfaces/registrationInterface';
import { updateUserInfo } from '@/components/apiService';
import React from 'react';
import { Image } from 'expo-image';

import common from '@/components/styles/commonStyles';

function capitalizeFirstLetter(word: string): string {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

const { width, height } = Dimensions.get('window');
const nameInputWidth = width * 0.4
const inputWidth = width * 0.4
const iconContainerSize = width * 0.15;
const pickerHeight = 50;
let placeholder = {
	email: '',
	firstName: '',
	lastName: '',
	age: '',
	dob: '',
	gender: '',
	country: '',
	postcode: 0,
}
interface User {
	email: string,
	firstName: string,
	lastName: string,
	age: string,
	dob: string,
	gender: string,
	country: string,
	postcode: number,
}

const editProfile = () => {
	const navigation = useNavigation();
	const isiOS = Platform.OS === 'ios';
	const insets = useSafeAreaInsets();
	const logoSize = width * 0.33;
	const [user, setUser] = useState<User>({
		email: '',
		firstName: '',
		lastName: '',
		age: '',
		dob: '',
		gender: '',
		country: '',
		postcode: 0,
	});
	const [idToken, setIdToken] = useState("");
	const [buttonClicked, setButtonClicked] = useState(false);
	const [formErrors, setFormErrors] = useState<UpdatePageFormErrors>({
		firstName: null,
		lastName: null,
		email: null,
		postcode: null,
		age: null,
		country: null,
		gender: null,
	});
	useEffect(() => {
		const getUserData = async () => {
			try {
				const email = await getValueFor('email');
				const firstName = await getValueFor('firstName');
				const lastName = await getValueFor('lastName');
				const dob = await getValueFor('dob');
				const age = await getValueFor('age');
				const gender = await getValueFor('gender');
				const country = await getValueFor('country');
				const postcode = await getValueFor('postcode');

				if (email && firstName && lastName && dob && gender && country && postcode && age) {
					setUser({
						email: email,
						firstName: firstName,
						lastName: lastName,
						age: age,
						dob: dob,
						gender: gender,
						country: country,
						postcode: parseInt(postcode),
					})
					placeholder = {
						email: email,
						firstName: firstName,
						lastName: lastName,
						age: age,
						dob: dob,
						gender: gender,
						country: country,
						postcode: parseInt(postcode),
					}
				}
				const idToken = await getValueFor('idToken');
				setIdToken(idToken);

			} catch (error) {
				console.error('Error accessing user data:', error);
			}
		};

		getUserData();
	}, []);

	// Style for first container to access windowHeight variable within scope.
	const containerStyle = StyleSheet.create({
		container: {
			flex: 1,
			marginVertical: 10
		}
	})

	return (
		<>
			<Image style={common.background} source={require('@/assets/images/BackgroundCircles.png')} />
			<View
				testID='Edit Profile Container'
			>
				<BackButton />
				<PageTitle text="Edit Profile" />
			</View>
			<ScrollView style={containerStyle.container}>
				<SafeAreaView>

					< View style={{ paddingHorizontal: width < 400 ? '5%' : '7%' }}>
						<View id='Details container' style={{ flex: 6, width: '100%' }}>
							<View id='Names Row' style={{ justifyContent: 'space-between', flexDirection: 'row' }}>

								{/* FIRST NAME */}
								<View id='First name container'>
									<Text style={styles.inputName}>First Name</Text>
									<TextInput
										style={[styles.inputBox, { width: nameInputWidth }, { borderColor: formErrors.firstName ? '#d90000' : 'grey' }]}
										placeholder={placeholder.firstName}
										onChangeText={newText => { setUser({ ...user, firstName: newText }) }}
										defaultValue={placeholder.firstName}
										textContentType='givenName'
										testID="firstNameInput"
										onEndEditing={() => validateFieldUpdatePage(user, 'firstName', setFormErrors, formErrors)}
									/>
									{formErrors.firstName && <Text style={styles.formError}>{formErrors.firstName}</Text>}
								</View>

								{/* LAST NAME */}
								<View id='Last name container'>
									<Text style={styles.inputName}>Last Name</Text>
									<TextInput
										style={[styles.inputBox, { width: nameInputWidth }, { borderColor: formErrors.lastName ? '#d90000' : 'grey' }]}
										placeholder={placeholder.lastName}
										onChangeText={newText => { setUser({ ...user, lastName: newText }) }}
										defaultValue={placeholder.lastName}
										textContentType='familyName'
										testID="lastNameInput"
										onEndEditing={() => validateFieldUpdatePage(user, 'lastName', setFormErrors, formErrors)}
									/>
									{formErrors.lastName && <Text style={styles.formError}>{formErrors.lastName}</Text>}
								</View>
							</View>

							{/* EMAIL INPUT */}
							<View id='Email Container' style={{ marginTop: 15 }}>
								<Text style={styles.inputName}>Email Address</Text>
								<TextInput
									style={[styles.inputBox, { borderColor: formErrors.email ? '#d90000' : 'grey' }]}
									placeholder={placeholder.email}
									onChangeText={newText => { setUser({ ...user, email: newText }) }}
									defaultValue={placeholder.email}
									textContentType='emailAddress'
									testID="emailInput"
									onEndEditing={() => validateFieldUpdatePage(user, 'email', setFormErrors, formErrors)}
								/>
								{formErrors.email && <Text style={styles.formError}>{formErrors.email}</Text>}
								{formErrors.email && <MaterialCommunityIcons name="alert-circle-outline" size={24} color="red" style={{ position: 'absolute', right: 10, top: height * 0.045 }} />}
							</View>


							<View id='Postcode' style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 }}>

								{/* POSTCODE INPUT*/}
								<View id='Postcode container'>
									<Text style={styles.inputName}>Postcode</Text>
									<TextInput
										style={[styles.inputBox, { width: inputWidth }, { borderColor: formErrors.postcode ? '#d90000' : 'grey' }]}
										placeholder={placeholder.postcode.toString()}
										defaultValue={placeholder.postcode.toString()}
										onChangeText={newText => {
											setUser({ ...user, postcode: parseInt(newText) })
											// console.log("postcode:" + newText);
											if (newText.length === 0) {
												// console.log(placeholder.postcode);
												setUser({ ...user, postcode: placeholder.postcode })
											}
										}
										}
										maxLength={4}
										inputMode='decimal'
										testID="postcodeInput"
										onEndEditing={() => {
											validateFieldUpdatePage(user, 'postcode', setFormErrors, formErrors);
											// console.log("postcode2:" + user.postcode);
										}
										}
									/>
									{formErrors.postcode ? <Text style={styles.formError}>{formErrors.postcode}</Text> : ''}
								</View>

								{/* AGE INPUT */}
								<View id='Age container' style={{ width: inputWidth }}>
									<Text style={styles.inputName}>Age</Text>
									<TextInput
										style={[styles.inputBox, { width: inputWidth, borderColor: formErrors.age ? '#d90000' : 'grey' }]}

										placeholder={placeholder.age}//HELP FIX ME!!!!!!!!!!!!!!!!!!!!!!!

										// onChangeText={newText => { setUser({ ...user, age: newText }) }}
										onChangeText={newText => {
											setUser({ ...user, age: newText })
											if (newText.length === 0) {
												console.log(placeholder.age);
												setUser({ ...user, age: placeholder.age })
											}
										}
										}
										defaultValue={placeholder.age}
										maxLength={3}
										inputMode='decimal'
										testID="ageInput"
										onEndEditing={() => validateFieldUpdatePage(user, 'age', setFormErrors, formErrors)}
									/>
									{formErrors.age && <Text style={styles.formError}>{formErrors.age}</Text>}
									{formErrors.age && <MaterialCommunityIcons name="alert-circle-outline" size={24} color="red" style={{ position: 'absolute', right: 10, top: height * 0.045 }} />}
								</View>
							</View>

							<View id='Country and Postcode Container' style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 }}>

								{/* COUNTRY INPUT */}
								<View id='Country container'>
									<Text style={styles.inputName}>Country</Text>
									<View style={[styles.pickerContainer, { width: inputWidth }]}>
										{isiOS ? (
											<RNPickerSelect
												placeholder={{
													label: `${user.country}`,
													value: `${user.country}`
												}}
												onValueChange={(itemValue) => setUser({ ...user, country: itemValue })}
												value={user.country}
												style={pickerStyle}
												items={[
													// { label: "Select", value: "" },
													{ label: "United States", value: "United States" },
													{ label: "Canada", value: "Canada" },
													{ label: "United Kingdom", value: "United Kingdom" },
													{ label: "Australia", value: "Australia" },
												]}

											/>
										) : (<Picker
											selectedValue={user.country}
											onValueChange={(itemValue) => { setUser({ ...user, country: itemValue }) }}
											style={styles.picker}
										>
											{/* <Picker.Item label="Select" value="" /> */}
											<Picker.Item label="United States" value="United States" />
											<Picker.Item label="Canada" value="Canada" />
											<Picker.Item label="United Kingdom" value="United Kingdom" />
											<Picker.Item label="Australia" value="Australia" />
										</Picker>
										)}

									</View>
								</View>

								{/* GENDER INPUT */}
								<View id='Gender container'>
									<Text style={styles.inputName}>Gender</Text>
									<View style={[styles.pickerContainer, { width: inputWidth }]}>
										{isiOS ? (
											<RNPickerSelect
												placeholder={{
													label: capitalizeFirstLetter(user.gender),
													value: `${user.gender}`,
												}}
												onValueChange={(value) => { setUser({ ...user, gender: value }) }}
												value={user.gender}
												style={pickerStyle}
												items={[
													// { label: "Select", value: "" },
													{ label: "Male", value: "male" },
													{ label: "Female", value: "female" },
													{ label: "Other", value: "other" },
												]}
											/>
										) : (<Picker
											selectedValue={user.gender}
											onValueChange={(itemValue) => { setUser({ ...user, gender: itemValue }) }}
											style={styles.picker}
										>
											{/* <Picker.Item label="Select" value="" /> */}
											<Picker.Item label="Male" value="Male" />
											<Picker.Item label="Female" value="female" />
											<Picker.Item label="Other" value="other" />
										</Picker>
										)}

									</View>
								</View>
							</View>
						</View>

						<View id='Bottom Section Container' style={{ flex: 2.3, width: '100%', marginVertical: 20 }}>

							{/* UPDATE BUTTON */}
							<Pressable style={[
								styles.nextButton,
								buttonClicked ? styles.pressedStyle : {},
								formErrors.age || formErrors.country || formErrors.email || formErrors.firstName || formErrors.gender
									|| formErrors.lastName || formErrors.postcode ? styles.pressedStyle : {}
							]}
								disabled={buttonClicked}
								onPress={() => {
									setButtonClicked(true);
									if (formErrors.age || formErrors.country || formErrors.email || formErrors.firstName || formErrors.gender
										|| formErrors.lastName || formErrors.postcode
									) {
										alert("Please enter valid details");
										setButtonClicked(false);
										return;
									}
									if (idToken.length > 1) {
										updateUserInfo(idToken, user.email, user.firstName, user.lastName, user.age, user.dob, user.country, user.postcode, user.gender)
											.then(result => {
												if (result.success === true) {
													alert("Update Successful");
													router.replace('/profile');
												}
											})
											// handle errors
											.catch(error => {
												alert("Update failed " + error + " If certificate key id error, try logging out and back in to refresh your token.");
											});
									}
									setTimeout(() => {
										setButtonClicked(false);
									}, 1000);
								}}
							>
								<ThemedText style={styles.nextButtonText} testID='registerButton'>Update</ThemedText>
							</Pressable>
						</View>
					</View>

				</SafeAreaView>
			</ScrollView >
		</>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',         // Aligns icon and text in a row
		alignItems: 'center',         // Vertically centers the content
		backgroundColor: '#F89522',   // Button background color
		borderRadius: 8,              // Rounded corners
		textAlign: 'center',
		paddingHorizontal: 20,        // Horizontal padding for space
		width: '80%',                 // Width of the button (adjust as needed)
		justifyContent: 'flex-start', // Align contents to the left
	},
	pressedStyle: {
		backgroundColor: '#db78146e',
	},
	iconContainer: {
		width: iconContainerSize,
		height: iconContainerSize,
		borderRadius: 20,
		paddingHorizontal: 20,
		justifyContent: "center",
		alignItems: "center"
	},
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
		// borderWidth: 1,
		// borderRadius: 5,
		height: pickerHeight,
		// marginBottom: 40,
	},
	placeholder: {
		color: 'black',
	}
};

export default editProfile 