import React, { Children } from 'react';
import { render, fireEvent, waitFor, screen, renderHook, act, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import TravelPage from '@/app/(app)/(tabs)/travel';
import { fetchToursData, getTours } from '@/components/apiService';
import DisplayTours from '@/components/DisplayTours';
import { Tour } from '@/interfaces/toursInterface';
// import '@testing-library/jest-native/';
// import '@testing-library/jest-dom';

const mockData: Tour = {
    booking_url: "https://www.tourradar.com/book-now/1037?utm_source=partner-60-plus-playground&utm_medium=api&utm_campaign=book#check",
    categories: [
        "Coach / Bus",
        "Christmas & New Year",
        "Active",
        "Sightseeing",
        "Historical",
        "Group",
        "Fully Guided",
        "Easy",
        "Explorer",
        "Private Room",
        "Shared Room"
    ],
    currency: "AUD",
    description: "A few weeks up your sleeve to really discover the best of Europe? Coasting around the best spots on the European Inspiration holiday is your answer. With 2 nights in each major location - think Paris, Prague, Florence, Berlin - you'll settle into the groove of Europe & know which places deserve a round two.",
    destination_cities: [
        "London",
        "Dover",
        "Calais",
        "Amsterdam",
        "Edam",
        "Berlin",
        "Dresden",
        "Prague",
        "Dachau",
        "Munich",
        "Tyrol",
        "Venice",
        "Rome",
        "Florence",
        "Pisa",
        "Lucerne",
        "Paris"
    ],
    end_city: {
        city_name: "London",
        country_name: "United Kingdom"
    },
    id: "0dMfLgZl8Sb3rJEUUgUi",
    images: [
        "https://cdn.tourradar.com/s3/tour/1500x800/1037_9dd8cc3d.jpg",
        "https://cdn.tourradar.com/s3/tour/1500x800/1037_c07db660.jpg",
        "https://cdn.tourradar.com/s3/tour/1500x800/1037_638b871e.jpg",
        "https://cdn.tourradar.com/s3/tour/1500x800/1037_32dc1123.jpg",
        "https://cdn.tourradar.com/s3/tour/1500x800/1037_29e975dc.jpg",
        "https://cdn.tourradar.com/s3/tour/1500x800/1037_4ea54bd7.jpg",
        "https://cdn.tourradar.com/s3/tour/1500x800/1037_4c385f40.jpg",
        "https://cdn.tourradar.com/s3/tour/1500x800/1037_87c42ec3.jpg",
        "https://cdn.tourradar.com/s3/tour/1500x800/1037_17f792ae.jpg",
        "https://cdn.tourradar.com/s3/tour/1500x800/1037_f249fb52.jpg",
        "https://cdn.tourradar.com/s3/map/1500x800/1037_9024.png"
    ],
    max_group: 52,
    price_total: 5515,
    rating: 4.7,
    start_city: {
        city_name: "London",
        country_name: "United Kingdom"
    },
    thumbnail_image: "https://cdn.tourradar.com/s3/tour/1500x800/1037_9dd8cc3d.jpg",
    tour_length_days: 19,
    tour_name: "European Inspiration (Start London, Classic, 19 Days)"
}
const mockDataArray = Array.from({ length: 5 }, () => mockData);
jest.mock('expo-router', () => ({
    router: {
        push: jest.fn(), // Mock the replace function
    },
}));
// Mock the API call for registration
jest.mock('@/components/apiService', () => ({
    fetchToursData: jest.fn(), // Mock a successful registration
    getTours: jest.fn(),
    saveToAsyncStorage: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
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


// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: jest.fn(),
// }));

describe('Travel Page', () => {
    beforeEach(() => {
        // Reset the mock function before each test
        jest.clearAllMocks();
        (fetchToursData as jest.Mock).mockResolvedValue(mockData);
    });

    // it('Successfully Render', async () => {

    //     const { getByText, getByTestId, getByDisplayValue, debug } = render(
    //         <SafeAreaProvider>
    //             <NavigationContainer>
    //                 <TravelPage />
    //             </NavigationContainer>
    //         </SafeAreaProvider>
    //     );

    //     // debug();
    //     await waitFor(() => {
    //         // expect(router.replace).toHaveBeenCalledWith('/(app)/(tabs)/home');
    //         expect(getByText("Let's Explore!")).toBeTruthy();
    //     });
    // });
    it('Successfully Render 2', async () => {

        console.log("TEST @2 return empty flat list if isLoading set to false in travel index")
        // move the code belox the render

        // debug();
        // await waitFor(() => {
        //     expect(getByText("Filter")).toBeTruthy();
        // });
        const { getByText, getByTestId, getByDisplayValue, debug } = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <TravelPage />
                </NavigationContainer>
            </SafeAreaProvider>
        );

        // debug();
        await waitFor(() => {
            expect(getByText("Filter")).toBeTruthy();
        });
    });
    it('Successfully Render gpt', async () => {

        // move the code belox the render

        // debug();
        // await waitFor(() => {
        //     expect(getByText("Filter")).toBeTruthy();
        // });
        // (fetchToursData as jest.Mock).mockResolvedValueOnce([
        //     mockData
        // ]);
        (fetchToursData as jest.Mock).mockResolvedValue([
            mockData
        ]);

        const { getByText, getByTestId, getByDisplayValue, debug } = render(
            <SafeAreaProvider>
                <NavigationContainer>
                    <TravelPage />
                </NavigationContainer>
            </SafeAreaProvider>
        );
        await waitFor(() => {
            // Check if DisplayTours renders after data is fetched
            expect(getByText('European Inspiration (Start London, Classic, 19 Days)')).toBeTruthy();
            // expect(getByText('Rome')).toBeTruthy();
        });

        // Ensure that the loading animation is no longer present
        // expect(getByTestId('loading-gif')).toBeFalsy();
        // debug();

    });
    // it('Successfully Render 3 - loading gif', async () => {
    //     (fetchToursData as jest.Mock).mockResolvedValue(mockData);

    //     const { getByText, getByTestId, getByDisplayValue, debug } = render(
    //         <SafeAreaProvider>
    //             <NavigationContainer>
    //                 <TravelPage />
    //             </NavigationContainer>
    //         </SafeAreaProvider>
    //     );

    //     // debug();

    //     await waitFor(() => {
    //         // expect(router.replace).toHaveBeenCalledWith('/(app)/(tabs)/home');
    //         expect(getByText("Filter")).toBeTruthy();
    //         // expect(screen.getAllByRole('button', { name: 'start' })).toBeOnTheScreen();
    //         expect(getByTestId("isLoadingIndicator")).toBeTruthy();
    //     });
    // });
    // THESE TEST CAN SHOW DEAFULT BEHAVIOUR FOR LOADING DATA
    // it('Successfully Render 4', async () => {

    //     const { getByText, getByTestId, getByDisplayValue, debug } = render(
    //         <SafeAreaProvider>
    //             <NavigationContainer>
    //                 <DisplayTours searchText={"London"} tours={[mockData]} searchAndFilteredTours={[mockData]} />
    //             </NavigationContainer>
    //         </SafeAreaProvider>
    //     );

    //     // debug();
    //     await waitFor(() => {
    //         // expect(router.replace).toHaveBeenCalledWith('/(app)/(tabs)/home');
    //         expect(getByText("European Inspiration (Start London, Classic, 19 Days)")).toBeTruthy();
    //     });
    // });

    // // await waitFor(() =>
    // //     render(<ComponentUnderTest />);
    // // );   

    // // const setHookState = (newState: any) =>
    // //     jest.fn().mockImplementation(() => [
    // //         newState,
    // //         () => { },
    // //     ]);

    // it('Successfully Render 5', async () => {
    //     console.log("NEW TEST 5");
    //     // const reactMock = require('react');
    //     (fetchToursData as jest.Mock).mockResolvedValue(mockData);

    //     // const isLoading = true
    //     // const tours = [mockDataArray]
    //     // const searchAndFilteredTours = [mockDataArray]
    //     // const searchText = 'Londo'
    //     // React.useState = jest.fn()
    //     //     .mockReturnValueOnce([isLoading, {}])
    //     //     .mockReturnValueOnce([tours, {}])
    //     //     .mockReturnValueOnce([searchAndFilteredTours, {}])
    //     //     .mockReturnValueOnce([searchText, {}])


    //     console.log("HERE IS STATE");
    //     // console.log(isLoading);
    //     // console.log(tours);
    //     // console.log(searchText);

    //     console.log("SET STATE");


    //     // reactMock.useState = setHookState({
    //     //     isLoading: true,
    //     //     tours: [mockDataArray],
    //     //     searchAndFilteredTours: [mockDataArray],
    //     //     searchText: ''
    //     // });
    //     // reactMock.useState = jest.fn().mockImplementation((initialState) => {
    //     //     if (initialState[0] === 'isLoading') return [true, () => { }];
    //     //     if (initialState[0] === 'tours') return [mockDataArray, () => { }];
    //     //     if (initialState[0] === 'searchAndFilteredTours') return [mockDataArray, () => { }];
    //     //     if (initialState[0] === 'searchText') return ['', () => { }];
    //     //     throw new Error('Invalid state key');
    //     // });

    //     const { getByText, getByTestId, getByDisplayValue, debug } = render(
    //         <SafeAreaProvider>
    //             <NavigationContainer>
    //                 <TravelPage />
    //             </NavigationContainer>
    //         </SafeAreaProvider>
    //     );
    //     // await waitFor(() => expect(getByTestId('isLoadingIndicator')).toBeFalsy());
    //     const user = userEvent.setup();
    //     const searchBarInput = screen.getByTestId('SearchBarMain');
    //     // await user.type(searchBarInput, 'Brisbane');
    //     fireEvent.changeText(searchBarInput, 'Brisbane');
    //     fireEvent(searchBarInput, 'onEndEditing');



    //     // fireEvent.changeText(searchBarInput, 'Brisbane');


    //     await waitFor(() => {
    //         // expect(router.replace).toHaveBeenCalledWith('/(app)/(tabs)/home');
    //         // expect((searchBarInput.props as any)?.value).toBe("Brisbane");
    //         expect(searchBarInput.props.value).toBe("Brisbane");
    //         // debug();
    //     });
    // });
});
