import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import React from 'react';

export default function PageTitle({ text }: { text: string }) {

    const insets = useSafeAreaInsets();

    return (
        <ThemedText style={[styles.header, { marginTop: insets.top + 10 }]}>{text}</ThemedText>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        width: '70%',
    }
});

