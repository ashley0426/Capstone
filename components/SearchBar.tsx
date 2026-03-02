import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import SearchIcon from 'react-native-vector-icons/Ionicons'; // Using Material Icons for the magnifying glass
import CircleIcon from 'react-native-vector-icons/FontAwesome'; // Using Material Icons for the magnifying glass
import Icon from 'react-native-vector-icons/FontAwesome6';
type SearchBarProps = {
    onSearchChange?: (text: string) => void; // Function to handle text changes
    searchText?: string; // Optional value prop to control the text input
    clearText?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, searchText, clearText }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search country or city"
                placeholderTextColor="#888" // Optional: Set the placeholder text color
                underlineColorAndroid="transparent" // Optional: Remove underline on Android
                onChangeText={onSearchChange}
                value={searchText} // Bind the TextInput value to the state
            />
            <CircleIcon name="circle" size={36} color="#949494" style={styles.CircleIconLeft} />
            <SearchIcon name="search-circle" size={44} color="#eee" style={styles.SearchIconLeft} />
            {searchText && searchText?.length >= 3 && (
                <>
                    <CircleIcon onPress={clearText} name="circle" size={56} color="white" style={styles.CircleIconRight} />
                    <Icon name="x" size={16} color={"grey"} style={styles.XIconRight} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // backgroundColor: '#fff',
        // borderRadius: 50, // Make the search bar rounded
        // paddingHorizontal: 10, // Optional: Add some padding around the search bar
        flex: 1,
    },
    input: {
        // flex: 1,
        // height: 40, // Adjust as needed
        // paddingLeft: 30, // Make room for the icon
        // paddingRight: 10, // Optional: Add some padding to the right
        // borderRadius: 50, // Make the input rounded
        // fontSize: ts16, // Optional: Set the font size
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 50,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    SearchIconLeft: {
        position: 'absolute',
        left: 1, // Position the icon inside the search bar
        top: '50%', // Vertically center the icon
        transform: [{ translateY: -22 }], // Adjust based on the icon size
    },
    CircleIconLeft: {
        position: 'absolute',
        left: 7, // Position the icon inside the search bar
        top: '50%', // Vertically center the icon
        transform: [{ translateY: -18 }], // Adjust based on the icon size
    },
    XIconRight: {
        position: 'absolute',
        right: 12, // Position the icon inside the search bar
        top: '50%', // Vertically center the icon
        transform: [{ translateY: -9 }], // Adjust based on the icon size
    },
    CircleIconRight: {
        position: 'absolute',
        // right: 7, // Position the icon inside the search bar
        top: '50%', // Vertically center the icon
        // transform: [{ translateY: -18 }], // Adjust based on the icon size
        opacity: 0.1,

        right: -2, // Position the icon inside the search bar
        transform: [{ translateY: -30 }], // Adjust based on the icon size
    },
});

export default SearchBar;