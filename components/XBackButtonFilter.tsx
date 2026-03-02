import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hitSlopValue } from '@/constants/Constants';

interface BackButtonFilterProps {
    // link: string; // Type for link prop
    color?: string; // Optional prop with default value
    size?: number; // Optional prop with default value
}

const XBackButtonFilter: React.FC<BackButtonFilterProps> = ({ color = '#000', size = 24 }) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    return (
        <TouchableOpacity
            style={[styles.button, { top: insets.top + 10, right: 20 }]}
            hitSlop={{ top: hitSlopValue, bottom: hitSlopValue, left: hitSlopValue, right: hitSlopValue }}
            onPress={() => navigation.goBack()}
        >
            <Icon name="x" size={30} color={color} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
    },
});

export default XBackButtonFilter;
