import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hitSlopSmallValue } from '@/constants/Constants';

const BackButton = ({ color = '#000', size = 40 }) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    return (
        <TouchableOpacity
            style={[styles.button, { top: insets.top + 10 }]}
            hitSlop={{ top: hitSlopSmallValue, bottom: hitSlopSmallValue, left: hitSlopSmallValue, right: hitSlopSmallValue }}
            onPress={() => navigation.goBack()}>
            <Image source={require('@/assets/images/back_icon.png')} style={{ width: size, height: size }} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        left: 8, // Adjust this value as needed
        padding: 10,
    },
});

export default BackButton;