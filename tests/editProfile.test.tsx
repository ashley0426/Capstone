import React, { Children } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditProfile from '@/app/(app)/(tabs)/profile/edit-profile';
import { SafeAreaConsumer, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from '@/components/auth/ctx';
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
    EditProfileUser: jest.fn().mockResolvedValue(201), // Mock a successful registration
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

describe('First Name Input', () => {
    it('Error for numbers in First Name field renders.', async () => {

        const { getByText, getByTestId } = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <EditProfile />
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


describe('Last Name Input', () => {
    it('Error for numbers in Last Name field renders.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <EditProfile />
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
                    <EditProfile />
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
                    <EditProfile />
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


describe('Age Input', () => {
    it('Error for age containing a letter renders.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <EditProfile />
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
                    <EditProfile />
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



