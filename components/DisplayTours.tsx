import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Tour } from '@/interfaces/toursInterface';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DisplayToursProps = {
  searchText?: string; // Optional value prop to control the text input
  tours: Tour[];
  searchAndFilteredTours: Tour[];
};

const DisplayTours: React.FC<DisplayToursProps> = ({ searchText, tours, searchAndFilteredTours }) => {
  const insets = useSafeAreaInsets();

  const renderSearchResultsText = (count: number) => {
    if (searchText === '') {
      return count === 1 ? `${count} search result` : `${count} search results`;
    }
    else {
      return count === 1 ? `${count} search result for ${searchText}` : `${count} search results for ${searchText}`;
    }
  }

  return (
    <>
      {searchText === '' ? (
        <>
          {/* display how many results we have */}
          <Text style={[{ textAlign: 'center', marginBottom: '3%' }]}>
            {renderSearchResultsText(tours.length)}
          </Text>
          <FlatList
            data={tours}
            keyExtractor={(item) => item.id.toString()}
            // keyExtractor={(item) => item.id} 
            contentContainerStyle={styles.scrollView}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                // console.log(item.tour_name);
                const serializedTourData = JSON.stringify(item);
                // console.log("serializedTourData");
                // console.log(serializedTourData);
                router.push({
                  pathname: `/travel/tour-details`,
                  params: { tourData: serializedTourData }
                })
                return undefined;
              }}>
                <View style={styles.dealCard}>
                  {item.thumbnail_image ? (
                    <Image source={{ uri: item.thumbnail_image }} style={styles.image} />
                  ) : (
                    <View style={styles.placeholderImage}>
                      <Text>No Image</Text>
                    </View>
                  )}
                  <Text style={styles.destination}>{item.tour_name}</Text>
                  {/* <Text style={styles.description}>{item.description}</Text> */}
                </View>
              </TouchableOpacity>
            )}
          />
        </>

      ) : searchAndFilteredTours && searchAndFilteredTours.length > 0 ? (
        <>
          {/* display how many results we have */}
          <Text style={[{ textAlign: 'center', marginBottom: '3%' }]}>
            {renderSearchResultsText(searchAndFilteredTours.length)}
          </Text>
          <FlatList
            data={searchAndFilteredTours}
            keyExtractor={(item) => item.id.toString()}
            // keyExtractor={(item) => item.id} 
            contentContainerStyle={styles.scrollView}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                // console.log(item.tour_name);
                const serializedTourData = JSON.stringify(item);
                // console.log("serializedTourData");
                // console.log(serializedTourData);
                router.push({
                  pathname: `/travel/tour-details`,
                  params: { tourData: serializedTourData }
                })
                return undefined;
              }}>
                <View style={styles.dealCard}>
                  {item.thumbnail_image ? (
                    <Image source={{ uri: item.thumbnail_image }} style={styles.image} />
                  ) : (
                    <View style={styles.placeholderImage}>
                      <Text>No Image</Text>
                    </View>
                  )}
                  <Text style={styles.destination}>{item.tour_name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>

      ) : (
        <View style={{ height: "100%" }}>
          {/* <EmptyIcon name="md-empty" size={30} color="#000" /> Replace "md-empty" with the actual icon name */}
          <Text style={[styles.header, { marginTop: insets.top + 10 }]}>No Tours Found</Text>
          <Text style={styles.header}>For</Text>
          <Text style={[styles.header, { color: "#b71919" }]}>{searchText}</Text>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    paddingBottom: '75%'
    // Styling for the FlatList content container.
  },
  dealCard: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#27c1aa1b',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    // Styling for each tour item container.
  },
  image: {
    width: '100%',
    height: 150,
    // Styling for the tour image.
  },
  placeholderImage: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    // Styling for the placeholder image container.
  },
  destination: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    marginHorizontal: 10,
    // Styling for the tour name.
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginHorizontal: 10,
    marginBottom: 10,
    // Styling for the tour description.
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
    // Styling for the page title.
  },
});


export default DisplayTours