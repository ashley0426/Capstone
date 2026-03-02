import React, { Children } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '@/app/sign-in';
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
    registerUser: jest.fn().mockResolvedValue(200), // Mock a successful registration
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


describe('Login', () => {
    it('User successfully logs in.', async () => {

        const { getByText, getByTestId} = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Login />
                </NavigationContainer>
            </SafeAreaProvider>
        );
        
        await waitFor(() => {
            expect(getByText('Email Address')).toBeTruthy(); 
        });
    });
});
