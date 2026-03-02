import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, ScrollView, Linking } from 'react-native';
import common from '@/components/styles/commonStyles';

import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from "react-native-safe-area-context";


// var ProductAdvertisingAPIv1 = require('paapi5-nodejs-sdk'); 

const { width } = Dimensions.get('window');

// ----------------------------------------------------
// 1. DATA STRUCTURES & PAAPI CONFIGURATION
// ----------------------------------------------------

// Define the expected structure of a deal item
interface DealItem {
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
const PAAPI_REGION = 'ap-southeast-2'; // Set to Australia (com.au) based on your original links
const PAAPI_HOST = `webservices.amazon.com.au`; 

// ASINs extracted from your original hardcoded Amazon URLs (The products you want to display)
// Fitness Section Products
const FITNESS_ASINS = ['1797515365', 'B007PS8KHK']; 

// Useful Items Section Products (Note: B08GS5D4M8 is for the clippers; others are duplicates from your original code)
const USEFUL_ITEMS_ASINS = ['B007PS8KHK', 'B007PS8KHK', 'B007PS8KHK', 'B08GS5D4M8']; 

// Games Section Products
const GAMES_ASINS = ['B0BZB7XFLM', '1988923182'];

// ----------------------------------------------------
// 2. PAAPI FETCH LOGIC (GetItems API)
// ----------------------------------------------------

/**
 * Fetches specific Amazon products using the Product Advertising API 5.0 GetItems operation.
 */
async function fetchAmazonItemsByAsin(asinList: string[]): Promise<DealItem[]> {
    // Fallback if keys are missing (to ensure the UI loads with mock data)
    if (!YOUR_ACCESS_KEY || !YOUR_SECRET_KEY || !YOUR_PARTNER_TAG || YOUR_ACCESS_KEY === '<YOUR ACCESS KEY>') {
        console.warn('PAAPI keys are missing. Returning hardcoded sample data.');
        return asinList.map((asin, index) => ({
            asin: asin, 
            title: `Sample Item ${index + 1} (${asin})`, 
            price: '$19.99', 
            detailPageURL: `https://${PAAPI_HOST.replace('webservices.', '')}/dp/${asin}`, 
            imageUrl: 'https://placehold.co/400x400' 
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
    //     'Images.Primary.Medium', 
    //     'ItemInfo.Title', 
    //     'Offers.Listings.Price' 
    // ];

//     try {
//         const data = await api.getItems(getItemsRequest);
//         var getItemsResponse = ProductAdvertisingAPIv1.GetItemsResponse.constructFromObject(data);

//         if (getItemsResponse['Items']) {
//             const items = getItemsResponse['Items'].filter((item: any) => item['ASIN'] && item['ItemInfo']);
            
//             // Map the complex API response to our simple DealItem interface
//             return items.map((item: any) => ({
//                 asin: item['ASIN'],
//                 title: item['ItemInfo']?.['Title']?.['DisplayValue'] || `No Title for ${item['ASIN']}`,
//                 price: item['Offers']?.['Listings']?.[0]?.['Price']?.['DisplayAmount'] || 'Price N/A',
//                 detailPageURL: item['DetailPageURL'] || `https://${PAAPI_HOST.replace('webservices.', '')}/dp/${item['ASIN']}`,
//                 imageUrl: item['Images']?.['Primary']?.['Medium']?.['URL'] || 'https://placehold.co/400x400'
//             })) as DealItem[];
//         }
//         return [];
//     } catch (error) {
//         console.error(`Error calling PA-API 5.0 for GetItems:`, JSON.stringify(error, null, 2));
//         return asinList.map(asin => ({ asin: asin, title: 'Error Fetching Item', price: 'N/A', detailPageURL: 'https://amazon.com', imageUrl: 'https://placehold.co/400x400/ff0000/ffffff?text=API+Error' }));
//     }
}

// ----------------------------------------------------
// 3. REUSABLE UI COMPONENT
// ----------------------------------------------------

// Component to display a single deal card
const DealCard: React.FC<{ item: DealItem }> = ({ item }) => (
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
// 4. MAIN COMPONENT (Deals)
// ----------------------------------------------------

export default function Deals() {
	const insets = useSafeAreaInsets();
	const [fitnessDeals, setFitnessDeals] = useState<DealItem[]>([]);
    const [usefulItemsDeals, setUsefulItemsDeals] = useState<DealItem[]>([]);
    const [gamesDeals, setGamesDeals] = useState<DealItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
        const loadDeals = async () => {
            setIsLoading(true);
            
            // ⭐️ Fetch items by their specific ASINs, replacing hardcoded product data
            const fitness = await fetchAmazonItemsByAsin(FITNESS_ASINS);
            const useful = await fetchAmazonItemsByAsin(USEFUL_ITEMS_ASINS);
            const games = await fetchAmazonItemsByAsin(GAMES_ASINS);
            
            setFitnessDeals(fitness);
            setUsefulItemsDeals(useful);
            setGamesDeals(games);
            setIsLoading(false);
        };
        
        loadDeals();
    }, []);

	const [searchText, setSearchText] = useState(''); 
	const handleSearchChange = (text: string) => {
		setSearchText(text); 
	};

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: insets.top }}>
                <Text>Loading Deals...</Text>
                 <Image
                    source={require('@/assets/gif/loading.gif')} 
                    style={{ width: width * .7, height: width * .7 }}
                />
            </View>
        );
    }


	return (
		<ScrollView>
            <Image source={require("@/assets/images/deals/amazon/amazon_icon.png")} style={[common.image, {marginBottom: 20, borderRadius: 10, height: 200 }]} />

			<ThemedText type="title">Fitness:</ThemedText>
            {/* Dynamically render fetched fitness items */}
            {fitnessDeals.map(item => (
                <DealCard item={item} key={item.asin} />
            ))}

			{/* See More button (uses original hardcoded link) */}
			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/s?k=seniors+fitness&crid=2Z4V9BIL5R7GJ&sprefix=seniors+fitn%2Caps%2C242&ref=nb_sb_ss_ts-doa-p_1_12')}
			style={common.buttonWithShadow}>
				<View style={{ backgroundColor: "#aca2a28a", borderRadius: 10 }}>
					<ThemedText style={common.dealCardText}>See more</ThemedText>
				</View>
			</TouchableOpacity>

			
			<ThemedText type="title">Useful Items:</ThemedText>
            {/* Dynamically render fetched useful items */}
            {usefulItemsDeals.map(item => (
                <DealCard item={item} key={item.asin} />
            ))}

			{/* See More button (uses original hardcoded link) */}
			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/s?k=seniors&crid=3AEOV1U5O0AK0&qid=1748559980&sprefix=seniors%2Caps%2C244&xpid=i3kcIzOyBsmoq&ref=sr_pg_1')}
			style={common.buttonWithShadow}>
				<View style={{ backgroundColor: "#aca2a28a", borderRadius: 10 }}>
					<ThemedText style={common.dealCardText}>See more</ThemedText>
				</View>
			</TouchableOpacity>

			<ThemedText type="title">Games</ThemedText>
            {/* Dynamically render fetched games */}
            {gamesDeals.map(item => (
                <DealCard item={item} key={item.asin} />
            ))}
			
			{/* See More button (uses original hardcoded link) */}
			<TouchableOpacity
			onPress={() => Linking.openURL('https://www.amazon.com.au/s?k=seniors+games&crid=2MIBOME466QHB&sprefix=seniors%2Caps%2C421&ref=nb_sb_ss_ts-doa-p_10_7')}
			style={common.buttonWithShadow}>
				<View style={{ backgroundColor: "#aca2a28a", borderRadius: 10 }}>
					<ThemedText style={common.dealCardText}>See more</ThemedText>
				</View>
			</TouchableOpacity>
		</ScrollView>
	);
}