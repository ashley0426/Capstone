import { RegistrationResponse } from '@/interfaces/registrationInterface';
import { LoginResponseData, UserDetails } from '@/interfaces/signInInterface';
import { Tour } from '@/interfaces/toursInterface';
// import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { save } from './auth/secureStoreHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ageToString, getAgeRepresentation } from '@/functions/ageAndDob';

interface LoginUser {
  country: string,
  dob: string,
  email: string,
  email_consent: Boolean,
  gender: "male" | "female",
  interests: string[],
  last_name: string,
  postcode: number
}


export const fetchToursData = async () => {
  // Defining an asynchronous function 'fetchToursData' to fetch tour data from the API.

  try {
    const response = await axios.get('https://plusplaygroundhub-au-6c6uz4csla-ts.a.run.app/v1/tours/');  //Cameron mentions {} /v1/user/delete
    const tours: Tour[] = Object.values(response.data.tours);

    return tours
  } catch (error) {
    console.error('Error fetching tours data:', error);

    throw error;
    // Throwing the error to ensure any calling functions are aware that an error occurred.
  }
};
export const saveToAsyncStorage = async (data: Tour[]) => {
  try {
    await AsyncStorage.setItem('tours', JSON.stringify(data));
    // console.log('Tours saved to AsyncStorage');
  } catch (error) {
    console.error('Error saving tours to AsyncStorage:', error);
  }
};
export async function getTours() {
  try {
    const toursString = await AsyncStorage.getItem('tours');
    if (toursString !== null) {
      // Parse the string back to JSON
      const tours = JSON.parse(toursString);
      return tours;
    } else {
      console.error('No tours found');
      return [];
    }
  } catch (error) {
    console.error('Error getting tours:', error);
    return [];
  }
}


export const loginUser = async (email: string, password: string): Promise<number | null> => {
  try {
    const response = await axios.post(
      'https://plusplaygroundhub-au-6c6uz4csla-ts.a.run.app/v1/user/login/',
      {
        email: email,
        password: password
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    // console.log(response.status);
    if (response.status === 200) {
      const loginResponse: LoginResponseData = response.data;
      const { details: { first_name, last_name, dob, gender, country, postcode, email_consent } } = loginResponse.data;
      const idToken: string = loginResponse.data.verification.token.idToken;
      save('email', loginResponse.data.verification.token.email);
      save('firstName', first_name);
      save('lastName', last_name);
      save('dob', dob);
      save('age', getAgeRepresentation(dob));
      save('gender', gender);
      save('country', country);
      save('postcode', postcode.toString());
      save('emailConsent', email_consent.toString());
      save('idToken', idToken);
      if (loginResponse.data.verification.verified.email_verified === false) {
        // number represent unverifed account
        return 999;
      }
    }

    return response.status;

  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const registerUser = async (email: string, password: string, first_name: string, last_name: string, dob: string, country: string,
  postcode: number, gender: string, email_consent: boolean, interests: string[]) => {

  try {
    const response = await axios.post('https://plusplaygroundhub-au-6c6uz4csla-ts.a.run.app/v1/user/register/',
      {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        gender: gender,
        country: country,
        postcode: postcode,
        email_consent: email_consent,
        interests: interests
      }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 201) {
      const registerResponse: RegistrationResponse = response.data;
    }
    return response.status;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      console.error('Error fetching data:', error.message, 'Status code:', statusCode);

      return statusCode;
    }
  }
}

export async function updateUserInfo(idToken: string, email: string, first_name: string, last_name: string, age: string, dob: string, country: string,
  postcode: number, gender: string) {

  const ageToDob = ageToString(parseInt(age));
  const userData = JSON.stringify({
    email: email,
    first_name: first_name,
    last_name: last_name,
    dob: ageToDob, //to be updated when they change database attribute to 'age' 
    gender: gender,
    country: country,
    postcode: postcode,
    id_token: idToken
  });

  try {


    const response = await fetch('https://plusplaygroundhub-au-6c6uz4csla-ts.a.run.app/v1/user/update/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: userData,
    });
    if (response.ok) {
      const parsedResponse = JSON.parse(await response.text());
      const loginResponse: UserDetails = parsedResponse.data.details;
      const { first_name, last_name, dob, gender, country, postcode, email_consent, email } = loginResponse;
      save('email', email);
      save('firstName', first_name);
      save('lastName', last_name);
      save('dob', dob);
      save('age', getAgeRepresentation(dob));
      save('gender', gender);
      save('country', country);
      save('postcode', postcode.toString());
      save('emailConsent', email_consent.toString());
    }
    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
      const parsedResponse = JSON.parse(await response.text());
      if (parsedResponse.response.message.includes("Token")) {

        throw new Error(`${parsedResponse.response.message}\n\nPlease log in again to refresh token for updating user details.`);
      }
      throw new Error(parsedResponse.response.message);
    }
    return { success: true };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}