import { Text, type TextProps, StyleSheet } from 'react-native';
import { NAVY, ORANGE } from './theme';
import React from 'react';

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: 'default' | 'title' | 'card' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
	style,
	type = 'default',
	...rest
}: ThemedTextProps) {

	return (
		<Text
			style={[
				type === 'default' ? styles.default : undefined,
				type === 'title' ? styles.title : undefined,
				type === 'card' ? styles.card : undefined,
				type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
				type === 'subtitle' ? styles.subtitle : undefined,
				type === 'link' ? styles.link : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		fontFamily: 'Figtree-Regular'
	},
	defaultSemiBold: {
		fontSize: 16,
		fontWeight: '600',
		fontFamily: 'Figtree-Regular'
	},
	title: {
		fontSize: 36,
		fontFamily: 'Figtree-Bold'
	},
	card: {
		fontSize: 36,
		fontFamily: 'Figtree-Bold',
		textAlign: 'center',
		color: NAVY,
	},
	subtitle: {
		fontSize: 20,
		fontFamily: 'Figtree-Bold'
	},
	link: {
		fontSize: 16,
		color: '#0a7ea4',
		fontFamily: 'Figtree'
	},
});
