import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// use to create svg path
// https://yqnn.github.io/svg-path-editor/
const { width } = Dimensions.get('window');
interface CurvedHeaderProps {
    color?: string;
    insetColor?: string;
}
// default colour is #1ca7ac, will not be a problem aslong as prop is passed
const CurvedHeader: React.FC<CurvedHeaderProps> = ({ color = '#1ca7ac', insetColor = color }) => {

    const height = (width / 32) * 10; // Maintain aspect ratio based on the original path dimensions
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            {insets.top > 0 && (
                <View style={{ backgroundColor: insetColor, height: insets.top }} />
            )}
            <Svg height={height} width={width} viewBox="0 0 32 10">
                {/* 32 width 10 height */}
                <Path
                    fill={color}
                    d="M -1 0 L -1 10 C 6 4 25 4 33 10 L 33 0 L -1 0"
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

export default CurvedHeader;
