import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormErrors, FormName, UpdatePageFormErrors } from '@/interfaces/registrationInterface';
import { Alert } from 'react-native';
import { registerUser } from '@/components/apiService';
import { router } from 'expo-router';
import { ageToString } from '../ageAndDob';

export const getInterests = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('selectedInterests');

        // Need to come up with better solution to handle nulls, though is not practically achieveable to have a null.
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};


// Insert error message to display after user leaves text field if any, otherwise null. passwordValue to synchronously check.
export function validateField(userDetails: any, formName: FormName, setFormErrors: React.Dispatch<FormErrors>, formErrors: FormErrors) {

    const { firstName, lastName, email, password, confirmPassword, postcode, age, country, gender, tosAccepted, personalizedEmailAccept } = userDetails;

    // Check if first name contains number or is empty.
    if (formName == 'firstName') setFormErrors({ ...formErrors, firstName: firstName.match('[0-9]') ? 'Invalid Name' : firstName.length == 0 ? 'Please enter a name' : null });

    // Check if last name contains number or is empty.
    else if (formName == 'lastName') setFormErrors({ ...formErrors, lastName: lastName.match('[0-9]') ? 'Invalid Name' : lastName.length == 0 ? 'Please enter a name' : null });

    // Check if email 
    else if (formName == 'email') {
        setFormErrors({ ...formErrors, email: !email.match('.[@].+[.].+') ? 'Invalid Email Address' : null })
    }

    // Check if postcode has a letter. Note if a user bypasses the keyboard and enters letters with numbers, only the numbers are saved.
    else if (formName == 'postcode') setFormErrors({ ...formErrors, postcode: isNaN(postcode) ? 'Invalid Postcode' : null })

    // Check if age has a letter. Note if a user bypasses the keyboard and enters letters with numbers, only the numbers are saved.
    // else if (formName == 'age') setFormErrors({ ...formErrors, age: isNaN(age) ? 'Invalid age' : null })
    else if (formName == 'age') setFormErrors({ ...formErrors, age: isNaN(age) ? 'Invalid age' : parseInt(age) <= 0 ? "Age must be more than 0" : null })

    // Check if passwords match.
    else if (formName == 'confirmPassword') setFormErrors({
        ...formErrors, confirmPassword: password.length == 0 ? 'Please enter a password first' :
            password != confirmPassword ? 'Passwords do not match !' : null
    })

    else if (formName == 'password') {
        let passwordErrors = formErrors.password;

        setFormErrors({
            ...formErrors, passwordValid: passwordErrors.hasCapital
                && passwordErrors.hasLetter && passwordErrors.hasNumber && passwordErrors.sufficentLength ? null : 'Invalid Password'
        })
    }
}
// Validate before registering user, after clicking the register button.
function checkBeforeRegistration(userDetails: any, formErrors: FormErrors) {
    const { firstName, lastName, email, password, confirmPassword, postcode, age, country, gender, tosAccepted, personalizedEmailAccept } = userDetails;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !postcode ||
        !age ||
        !gender ||
        !country
    ) {
        Alert.alert("Error", "Please fill out all the required fields.");
        return false;
    }

    if (!userDetails.tosAccepted) {
        Alert.alert("Error", "Please accept the Terms of Service");
        return false;
    }

    if (formErrors.age || formErrors.confirmPassword || formErrors.country || formErrors.email || formErrors.firstName || formErrors.gender
        || formErrors.lastName || formErrors.passwordValid || formErrors.postcode
    ) {
        Alert.alert("Error", "Please enter valid details");
        return false;
    }

    return true;
};

// Validate all fields are correct and then attempt to register a user and navigate the user accordingly.
export async function handleNextClick(userDetails: any, formErrors: FormErrors, setRegisterIsClicked: React.Dispatch<any>, signIn: any) {
    const { firstName, lastName, email, password, confirmPassword, postcode, age, country, gender, tosAccepted, personalizedEmailAccept } = userDetails;
    if (checkBeforeRegistration(userDetails, formErrors)) {
        // Error occured
        setRegisterIsClicked(true);
        const interests = await getInterests();
        const ageToDob = ageToString(age);
        const tryRegister = await registerUser(email, password, firstName, lastName, ageToDob, country, postcode, gender, personalizedEmailAccept, interests);
        if (tryRegister == 201) {
            router.replace('/registration-success');
        }
        else if (tryRegister == 409) {
            Alert.alert("The email is already in use. Please try another one.");
        }

        else {
            // console.log(email + password + firstName + lastName + country + postcode + gender + personalizedEmailAccept + interests);
            Alert.alert("Sorry, registration did not work. Please check your details are correct or try again.");
        }
        setRegisterIsClicked(false);
    }
}


export function validatePassword(passwordValue: string, setFormErrors: React.Dispatch<FormErrors>, formErrors: FormErrors) {
    let sufficentLength = false;
    let hasLetter = false;
    let hasNumber = false;
    let hasCapital = false;

    if (passwordValue.length >= 8) sufficentLength = true;
    if (passwordValue.match('[a-zA-Z]')) hasLetter = true;
    if (passwordValue.match('[0-9]')) hasNumber = true;
    if (passwordValue.match('[A-Z]')) hasCapital = true;

    setFormErrors({
        ...formErrors,
        password: { sufficentLength, hasNumber, hasLetter, hasCapital }
    })
}




// Individually validate a field when the user finishes editing it.
export function validateFieldUpdatePage(userDetails: any, formName: FormName, setFormErrors: React.Dispatch<UpdatePageFormErrors>, formErrors: UpdatePageFormErrors) {

    const { firstName, lastName, email, postcode, age } = userDetails;

    // Check if first name contains number or is empty.
    if (formName == 'firstName') setFormErrors({ ...formErrors, firstName: firstName.match('[0-9]') ? 'Invalid Name' : firstName.length == 0 ? 'Please enter a name' : null });

    // Check if last name contains number or is empty.
    else if (formName == 'lastName') setFormErrors({ ...formErrors, lastName: lastName.match('[0-9]') ? 'Invalid Name' : lastName.length == 0 ? 'Please enter a name' : null });

    // Check if email 
    else if (formName == 'email') {
        // setFormErrors({ ...formErrors, email: !email.match('.[@].+[.].+') ? 'Invalid Email Address' : null })
        setFormErrors({ ...formErrors, email: email.length === 0 ? "Please enter an email" : !email.match('.[@].+[.].+') ? 'Invalid Email Address' : null })
    }

    // Check if postcode has a letter. Note if a user bypasses the keyboard and enters letters with numbers, only the numbers are saved.
    else if (formName == 'postcode') {
        setFormErrors({ ...formErrors, postcode: isNaN(postcode) ? 'Invalid Postcode' : null });
    }

    // Check if age has a letter. Note if a user bypasses the keyboard and enters letters with numbers, only the numbers are saved.
    else if (formName == 'age') setFormErrors({ ...formErrors, age: isNaN(age) ? 'Invalid age' : parseInt(age) <= 0 ? "Age must be more than 0" : null })
}
// Validate before registering user, after clicking the register button.
export function checkBeforeUpdate(userDetails: any, formErrors: UpdatePageFormErrors) {
    const { firstName, lastName, email, postcode, age, country, gender } = userDetails;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !postcode ||
        !age ||
        !gender ||
        !country
    ) {
        Alert.alert("Error", "Please fill out all the required fields.");
        return false;
    }

    if (formErrors.age || formErrors.country || formErrors.email || formErrors.firstName || formErrors.gender
        || formErrors.lastName || formErrors.postcode
    ) {
        Alert.alert("Error", "Please enter valid details");
        return false;
    }

    return true;
};