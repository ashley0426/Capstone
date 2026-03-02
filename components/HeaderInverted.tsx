import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// default colour is #1ca7ac, will not be a problem aslong as prop is passed
const CurvedHeaderInverted = ({ color = '#1ca7ac' }) => {

    const height = (width / 32) * 12; // Maintain aspect ratio based on the original path dimensions, look at line 24 to see viewbox size
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            {insets.top > 0 && (
                <View style={{ backgroundColor: color, height: insets.top }} />
            )}
            <Svg height={height} width={width} viewBox="0 0 32 12">
                {/* 32 width 10 height */}
                <Path
                    fill={color}
                    d="M -1 0 L -1 4 C 6 14 26 14 33 4 L 33 0 L -1 0"

                />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

})

export default CurvedHeaderInverted;
