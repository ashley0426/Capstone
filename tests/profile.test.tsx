import React, { Children } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '@/app/sign-in';
import { SafeAreaConsumer, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreens from '@/app/(app)/(tabs)/profile';
import { router } from 'expo-router';

// Mock the router module
jest.mock('expo-router', () => ({
    router: {
        push: jest.fn(), // Mock the replace function
    },
}));


// Mock the safe area
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

// Mock getValueFor function
jest.mock('@/components/auth/secureStoreHelper', () => ({
    getValueFor: jest.fn().mockResolvedValue('test@example.com'),
}));

// Mocking resetPassword function
jest.mock('@/functions/ForgetPassword Functions/resetPassword', () => ({
    resetPassword: jest.fn().mockResolvedValue(200),
}));

describe('Profile Screens', () => {
    let getByText: any, getByTestId: any; let getValueFor: any;

    beforeEach(() => {
        const utils = render(
            <NavigationContainer>
                <ProfileScreens />
            </NavigationContainer>
        );
        getByText = utils.getByText;
        getByTestId = utils.getByTestId;

        jest.clearAllMocks(); // Clears any mocks like router.push
    });

    it('Profile Screens page should be rendered successfully.', async () => {
        await waitFor(() => expect(getByTestId('Profile Screens Container')).toBeTruthy());
    });

    it('Navigating to Edit profile page from profile should be successful.', async () => {
        fireEvent.press(getByText('Edit Profile Page'));
        await waitFor(() => {
            expect(router.push).toHaveBeenCalledWith({ pathname: "/(app)/(tabs)/profile/edit-profile" });
        });
    });

    it('Navigating to Settings and Privacy page from profile should be successful.', async () => {
        fireEvent.press(getByText('Setting and Privacy'));
        await waitFor(() => {
            expect(router.push).toHaveBeenCalledWith({ pathname: "/(app)/(tabs)/profile/settings-and-privacy" });
        });
    });

    it('Navigating to Settings and Privacy page from profile should be successful.', async () => {
        fireEvent.press(getByText('Setting and Privacy'));
        await waitFor(() => {
            expect(router.push).toHaveBeenCalledWith({ pathname: "/(app)/(tabs)/profile/settings-and-privacy" });
        });
    });


    it('should successfully reset the password and navigate to the success page', async () => {

        // Trigger the Reset Password button press
        fireEvent.press(getByTestId('Reset Password Button'));

        // Wait for the side effects to happen
        await waitFor(() => {
            expect(router.push).toHaveBeenCalledWith('/profile/change-password-success');
        });
    });

});


