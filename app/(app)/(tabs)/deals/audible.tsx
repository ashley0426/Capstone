import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, ScrollView, Linking } from 'react-native';
import common from '@/components/styles/commonStyles';

import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

// ----------------------------------------------------
// 1. DATA STRUCTURES & PAAPI CONFIGURATION
// ----------------------------------------------------

// Define the expected structure of an audiobook item
interface AudiobookItem {
    asin: string;
    title: string;
    price: string;
    detailPageURL: string;
    imageUrl: string;
}

// ⚠️ PLACEHOLDER VALUES - These MUST be replaced with actual keys by the recipient
const YOUR_ACCESS_KEY = '<YOUR ACCESS KEY>';
const YOUR_SECRET_KEY = '<YOUR SECRET KEY>';
const YOUR_PARTNER_TAG = '<YOUR PARTNER TAG>'; // Associate Tag
const PAAPI_REGION = 'ap-southeast-2'; // Set to Australia (com.au)
const PAAPI_HOST = `webservices.amazon.com.au`; 

// ASINs for popular audiobooks suitable for elderly listeners
// Classic Literature & Memoirs
const CLASSICS_ASINS = [
    'B002V0QUQM', // To Kill a Mockingbird
    'B003ZWFO7E', // The Great Gatsby
    'B004X3PM0A', // Pride and Prejudice
    'B008ELGS9C'  // Becoming by Michelle Obama
]; 

// Mysteries & Thrillers (Gentle pace, popular with seniors)
const MYSTERY_ASINS = [
    'B017V4IM1G', // Still Life (Inspector Gamache #1)
    'B002UZMLXM', // The No. 1 Ladies' Detective Agency
    'B002V0TTXK', // Murder on the Orient Express
    'B01LWUOW6F'  // A Man Called Ove
]; 

// Historical Fiction & Biographies
const HISTORICAL_ASINS = [
    'B002V1A0WE', // The Book Thief
    'B004X37QY8', // All the Light We Cannot See
    'B00DD2SW2C', // The Nightingale
    'B01N6DBFFO'  // Born a Crime by Trevor Noah
];

// Self-Help & Wellness
const WELLNESS_ASINS = [
    'B071LB6ZGC', // The Subtle Art of Not Giving a F*ck
    'B0711SLPR7', // Educated by Tara Westover
    'B01HF4V7A2', // When Breath Becomes Air
    'B00X47ZVXM'  // Being Mortal by Atul Gawande
];

// ----------------------------------------------------
// 2. PAAPI FETCH LOGIC (GetItems API)
// ----------------------------------------------------

/**
 * Fetches specific Audible audiobooks using the Product Advertising API 5.0 GetItems operation.
 */
async function fetchAudibleItemsByAsin(asinList: string[]): Promise<AudiobookItem[]> {
    // Fallback if keys are missing (to ensure the UI loads with mock data)
    if (!YOUR_ACCESS_KEY || !YOUR_SECRET_KEY || !YOUR_PARTNER_TAG || YOUR_ACCESS_KEY === '<YOUR ACCESS KEY>') {
        console.warn('PAAPI keys are missing. Returning hardcoded sample data.');
        return asinList.map((asin, index) => ({
            asin: asin, 
            title: `Sample Audiobook ${index + 1} (${asin})`, 
            price: '$24.95', 
            detailPageURL: `https://www.audible.com.au/pd/${asin}`, 
            imageUrl: 'https://placehold.co/400x600/4A5568/FFFFFF?text=Audiobook+Cover' 
        }));
    }
    
    // 1. Initialize the PAAPI Client
    // var defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
    // defaultClient.accessKey = YOUR_ACCESS_KEY;
    // defaultClient.secretKey = YOUR_SECRET_KEY;
    // defaultClient.host = PAAPI_HOST;
    // defaultClient.region = PAAPI_REGION;
    // var api = new ProductAdvertisingAPIv1.DefaultApi();
    
    // // 2. Build the GetItems Request
    // var getItemsRequest = new ProductAdvertisingAPIv1.GetItemsRequest();
    // getItemsRequest['PartnerTag'] = YOUR_PARTNER_TAG;
    // getItemsRequest['PartnerType'] = 'Associates';
    // getItemsRequest['ItemIds'] = asinList; // Use the ASIN list here

    // // Requesting relevant data fields (Resources)
    // getItemsRequest['Resources'] = [
    //     'Images.Primary.Large', 
    //     'ItemInfo.Title', 
    //     'Offers.Listings.Price' 
    // ];

    // try {
    //     const data = await api.getItems(getItemsRequest);
    //     var getItemsResponse = ProductAdvertisingAPIv1.GetItemsResponse.constructFromObject(data);

    //     if (getItemsResponse['Items']) {
    //         const items = getItemsResponse['Items'].filter((item: any) => item['ASIN'] && item['ItemInfo']);
            
    //         // Map the complex API response to our simple AudiobookItem interface
    //         return items.map((item: any) => ({
    //             asin: item['ASIN'],
    //             title: item['ItemInfo']?.['Title']?.['DisplayValue'] || `No Title for ${item['ASIN']}`,
    //             price: item['Offers']?.['Listings']?.[0]?.['Price']?.['DisplayAmount'] || 'Price N/A',
    //             detailPageURL: item['DetailPageURL'] || `https://www.audible.com.au/pd/${item['ASIN']}`,
    //             imageUrl: item['Images']?.['Primary']?.['Large']?.['URL'] || 'https://placehold.co/400x600/4A5568/FFFFFF?text=Audiobook+Cover'
    //         })) as AudiobookItem[];
    //     }
    //     return [];
    // } catch (error) {
    //     console.error(`Error calling PA-API 5.0 for GetItems:`, JSON.stringify(error, null, 2));
    //     return asinList.map(asin => ({ 
    //         asin: asin, 
    //         title: 'Error Fetching Audiobook', 
    //         price: 'N/A', 
    //         detailPageURL: 'https://www.audible.com.au', 
    //         imageUrl: 'https://placehold.co/400x600/ff0000/ffffff?text=API+Error' 
    //     }));
    // }
}

// ----------------------------------------------------
// 3. REUSABLE UI COMPONENT
// ----------------------------------------------------

// Component to display a single audiobook card
const AudiobookCard: React.FC<{ item: AudiobookItem }> = ({ item }) => (
    <TouchableOpacity
        onPress={() => Linking.openURL(item.detailPageURL)}
        style={common.buttonWithShadow}
        key={item.asin} 
    >
        {/* Uses dynamic image URL from the API */}
        <Image 
            source={item.imageUrl} 
            contentFit="contain" 
            style={common.image} 
        />
        <View style={{ backgroundColor: "#aca2a28a", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
            <ThemedText style={common.dealCardText}>{item.title}</ThemedText>
            <ThemedText style={common.dealCardText}>{item.price}</ThemedText>
        </View>
    </TouchableOpacity>
);

// ----------------------------------------------------
// 4. MAIN COMPONENT (Audiobooks)
// ----------------------------------------------------

export default function Audiobooks() {
    const insets = useSafeAreaInsets();
    const [classicsAudiobooks, setClassicsAudiobooks] = useState<AudiobookItem[]>([]);
    const [mysteryAudiobooks, setMysteryAudiobooks] = useState<AudiobookItem[]>([]);
    const [historicalAudiobooks, setHistoricalAudiobooks] = useState<AudiobookItem[]>([]);
    const [wellnessAudiobooks, setWellnessAudiobooks] = useState<AudiobookItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAudiobooks = async () => {
            setIsLoading(true);
            
            // ⭐️ Fetch audiobooks by their specific ASINs
            const classics = await fetchAudibleItemsByAsin(CLASSICS_ASINS);
            const mystery = await fetchAudibleItemsByAsin(MYSTERY_ASINS);
            const historical = await fetchAudibleItemsByAsin(HISTORICAL_ASINS);
            const wellness = await fetchAudibleItemsByAsin(WELLNESS_ASINS);
            
            setClassicsAudiobooks(classics);
            setMysteryAudiobooks(mystery);
            setHistoricalAudiobooks(historical);
            setWellnessAudiobooks(wellness);
            setIsLoading(false);
        };
        
        loadAudiobooks();
    }, []);

    const [searchText, setSearchText] = useState(''); 
    const handleSearchChange = (text: string) => {
        setSearchText(text); 
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: insets.top }}>
                <Text>Loading Audiobooks...</Text>
                <Image
                    source={require('@/assets/gif/loading.gif')} 
                    style={{ width: width * .7, height: width * .7 }}
                />
            </View>
        );
    }

    return (
        <ScrollView>
            <Image source={require("@/assets/images/deals/audible/audible_icon.png")} style={[common.image, {marginBottom: 20, borderRadius: 10, height: 200 }]} />

            <ThemedText type="title">Classic Literature & Memoirs:</ThemedText>
            {/* Dynamically render fetched classic audiobooks */}
            {classicsAudiobooks.map(item => (
                <AudiobookCard item={item} key={item.asin} />
            ))}

            {/* See More button */}
            <TouchableOpacity
                onPress={() => Linking.openURL('https://www.audible.com.au/cat/Literature-Fiction/Classics-Audiobooks/21228815031')}
                style={common.buttonWithShadow}>
                <View style={{ backgroundColor: "#aca2a28a", borderRadius: 10 }}>
                    <ThemedText style={common.dealCardText}>See more classics</ThemedText>
                </View>
            </TouchableOpacity>

            
            <ThemedText type="title">Mysteries & Cozy Thrillers:</ThemedText>
            {/* Dynamically render fetched mystery audiobooks */}
            {mysteryAudiobooks.map(item => (
                <AudiobookCard item={item} key={item.asin} />
            ))}

            {/* See More button */}
            <TouchableOpacity
                onPress={() => Linking.openURL('https://www.audible.com.au/cat/Mystery-Thriller-Suspense-Audiobooks/18574426031')}
                style={common.buttonWithShadow}>
                <View style={{ backgroundColor: "#aca2a28a", borderRadius: 10 }}>
                    <ThemedText style={common.dealCardText}>See more mysteries</ThemedText>
                </View>
            </TouchableOpacity>

            <ThemedText type="title">Historical Fiction & Biography:</ThemedText>
            {/* Dynamically render fetched historical audiobooks */}
            {historicalAudiobooks.map(item => (
                <AudiobookCard item={item} key={item.asin} />
            ))}
            
            {/* See More button */}
            <TouchableOpacity
                onPress={() => Linking.openURL('https://www.audible.com.au/cat/Biographies-Memoirs-Audiobooks/18571915031')}
                style={common.buttonWithShadow}>
                <View style={{ backgroundColor: "#aca2a28a", borderRadius: 10 }}>
                    <ThemedText style={common.dealCardText}>See more history & biographies</ThemedText>
                </View>
            </TouchableOpacity>

            <ThemedText type="title">Wellness & Life Stories:</ThemedText>
            {/* Dynamically render fetched wellness audiobooks */}
            {wellnessAudiobooks.map(item => (
                <AudiobookCard item={item} key={item.asin} />
            ))}
            
            {/* See More button */}
            <TouchableOpacity
                onPress={() => Linking.openURL('https://www.audible.com.au/cat/Health-Wellness-Audiobooks/18574061031')}
                style={common.buttonWithShadow}>
                <View style={{ backgroundColor: "#aca2a28a", borderRadius: 10 }}>
                    <ThemedText style={common.dealCardText}>See more wellness books</ThemedText>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}