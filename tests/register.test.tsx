import React, { Children } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Register from "../app/register";
import { SafeAreaConsumer, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from '@/components/auth/ctx';
import { registerUser } from '@/components/apiService';
import Home from "../app/(app)/(tabs)/home"
import { router } from 'expo-router';

// Mock the router module
// Mocking router.replace
jest.mock('expo-router', () => ({
    router: {
        replace: jest.fn(), // Mock the replace function
    },
}));

// Mock the API call for registration
jest.mock('@/components/apiService', () => ({
    registerUser: jest.fn().mockResolvedValue(201), // Mock a successful registration
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(() => JSON.stringify(['Sport', 'Art'])),
    removeItem: jest.fn(),
}));


jest.mock('react-native-safe-area-context', () => {
    const inset = { top: 0, right: 0, bottom: 0, left: 0 }
    return {
        SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
        SafeAreaConsumer: jest
            .fn()
            .mockImplementation(({ children }) => children(inset)),
        SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
        useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
    }
})


describe('Registration', () => {

    it('Successfully register a user with valid details', async () => {

        const { getByText, getByTestId, getByDisplayValue } = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        await waitFor(() => expect(getByTestId('firstNameInput')).toBeTruthy());

        // Fill in the registration form
        fireEvent.changeText(getByTestId('firstNameInput'), 'John');
        fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');
        fireEvent.changeText(getByTestId('emailInput'), 'johhnnnnn.doe@example.com');

        fireEvent.changeText(getByTestId('passwordInput'), 'Password123');
        fireEvent.changeText(getByTestId('confirmPasswordInput'), 'Password123');

        fireEvent.changeText(getByTestId('postcodeInput'), '1234');
        fireEvent.changeText(getByTestId('ageInput'), '30');

        // Simulate the selection of a country and gender from the Picker
        fireEvent(getByDisplayValue('Select Country'), 'onValueChange', 'Australia');
        fireEvent(getByDisplayValue('Select Gender'), 'onValueChange', 'male');

        // Find checkboxes by testID
        // Fire events to simulate pressing the checkboxes
        // Check if the TOS & personalized email checkbox is checked (by checking the state)
        const tosCheckbox = getByTestId('tosCheckBox');

        fireEvent.press(tosCheckbox);
        expect(tosCheckbox.props.style).toContainEqual({ backgroundColor: 'coral' }); // Assuming the checked style is applied

        fireEvent.press(getByTestId('registerButton'));
        await waitFor(() => {
            expect(router.replace).toHaveBeenCalledWith('/registration-success');
        });
    });




});


describe('First Name Input', () => {
    it('Error for numbers in First Name field renders.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const firstNameInput = getByTestId('firstNameInput');

        fireEvent.changeText(firstNameInput, 'ah2c');
        fireEvent(firstNameInput, 'onEndEditing');
        
        await waitFor(() => {
            expect(getByText('Invalid Name')).toBeTruthy(); 
        });
    });
});


describe('First Name Input', () => {
    it('Error for first Name field being empty renders.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const firstNameInput = getByTestId('firstNameInput');

        fireEvent.changeText(firstNameInput, '');
        fireEvent(firstNameInput, 'onEndEditing');
        
        await waitFor(() => {
            expect(getByText('Please enter a name')).toBeTruthy(); 
        });
    });
});

describe('Last Name Input', () => {
    it('Error for numbers in Last Name field renders.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const lastNameInput = getByTestId('lastNameInput');

        fireEvent.changeText(lastNameInput, 'ahc2c');
        fireEvent(lastNameInput, 'onEndEditing');
        
        await waitFor(() => {
            expect(getByText('Invalid Name')).toBeTruthy(); 
        });
    });
});


describe('Last Name Input', () => {
    it('Error for Last Name field being empty renders.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const lastNameInput = getByTestId('lastNameInput');

        fireEvent.changeText(lastNameInput, '');
        fireEvent(lastNameInput, 'onEndEditing');
        
        await waitFor(() => {
            expect(getByText('Please enter a name')).toBeTruthy(); 
        });
    });
});


describe('Email Input', () => {
    it('Error for email with invalid suffixes.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const emailInput = getByTestId('emailInput');

        fireEvent.changeText(emailInput, 'google.com.au');
        fireEvent(emailInput, 'onEndEditing');
        
        await waitFor(() => {
            expect(getByText('Invalid Email Address')).toBeTruthy(); 
        });
    });
});

describe('Password Input', () => {
    it('Password checklist is rendered when password input is focused.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const passwordInput = getByTestId('passwordInput');
        fireEvent(passwordInput, 'onFocus');
        
        await waitFor(() => {
            expect(getByTestId('passwordChecklist')).toBeTruthy(); 
        });
    });
});


describe('Password Input', () => {
    it('Checklist for password being sufficent length is green when 8 characters or longer.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const passwordInput = getByTestId('passwordInput');
        fireEvent(passwordInput, 'onFocus');
        const checkList = getByTestId('passwordLength');
        fireEvent.changeText(passwordInput, 'aaaaaaaaaaaaa');
        
        await waitFor(() => {
            expect(checkList.props.style).toMatchObject({ color: 'green' });
        });
    });
});

describe('Password Input', () => {
    it('Checklist for having a capital letter is green when password input has at least one capital letter.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const passwordInput = getByTestId('passwordInput');
        fireEvent(passwordInput, 'onFocus');
        const checkList = getByTestId('passwordCapital');
        fireEvent.changeText(passwordInput, 'jfaAkd');
        
        await waitFor(() => {
            expect(checkList.props.style).toMatchObject({ color: 'green' });
        });
    });
});


describe('Password Input', () => {
    it('Checklist for having a capital letter is green when password input has at least one number.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const passwordInput = getByTestId('passwordInput');
        fireEvent(passwordInput, 'onFocus');
        const checkList = getByTestId('passwordNumber');
        fireEvent.changeText(passwordInput, 'jfa2d');
        
        await waitFor(() => {
            expect(checkList.props.style).toMatchObject({ color: 'green' });
        });
    });
});

describe('Password Input', () => {
    it('Checklist for password is completely red when input does not match any conditions.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const passwordInput = getByTestId('passwordInput');

        fireEvent(passwordInput, 'onFocus');

        const checkNumber = getByTestId('passwordNumber');
        const checkCapital = getByTestId('passwordCapital');
        const checkLength = getByTestId('passwordLength');

        fireEvent.changeText(passwordInput, 'jfad');
        
        await waitFor(() => {
            expect(checkNumber.props.style).toMatchObject({ color: 'red' });
            expect(checkCapital.props.style).toMatchObject({ color: 'red' });
            expect(checkLength.props.style).toMatchObject({ color: 'red' });
        });
    });
});

describe('Confirm Password', () => {
    it('Error for passwords being different renders.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const passwordInput = getByTestId('passwordInput');
        fireEvent.changeText(passwordInput, 'Wow482wow482');

        const confirmPasswordInput = getByTestId("confirmPasswordInput");
        fireEvent.changeText(confirmPasswordInput, 'johnnyboy');
        fireEvent(confirmPasswordInput, 'onEndEditing');
        
        await waitFor(() => {
            expect(getByText('Passwords do not match !')).toBeTruthy(); 
        });
    });
});


describe('Age Input', () => {
    it('Error for age containing a letter renders.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const ageInput = getByTestId('ageInput');
        fireEvent.changeText(ageInput, 'ab');
        fireEvent(ageInput, 'onEndEditing');
        
        await waitFor(() => {
            expect(getByText('Invalid age')).toBeTruthy(); 
        });
    });
});


describe('Postcode Input', () => {
    it('Error for postcode containing a letter renders.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Register />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        const postInput = getByTestId('postcodeInput');
        fireEvent.changeText(postInput, 'fsa');
        fireEvent(postInput, 'onEndEditing');
        
        await waitFor(() => {
            expect(getByText('Invalid Postcode')).toBeTruthy(); 
        });
    });
});

