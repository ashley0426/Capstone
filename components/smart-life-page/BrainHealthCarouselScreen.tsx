import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking, Dimensions } from 'react-native';
import Carousel from 'pinar';
import { BrainHealthData } from './smart-life-data';

const { width, height } = Dimensions.get('window');
interface CarouselComponentProps {
    data: BrainHealthData[];
    title: string;
}
const open = async (url: string) => {
    try {
        await Linking.openURL(url);
    } catch (error) {
        console.error('Error opening URL:', error);
    }
};
const CarouselComponent = ({ data, title }: CarouselComponentProps) => {
    return (
        <View>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Carousel
                style={{ height: 200 }}
                showsControls={true}
                mergeStyles={true}
                controlsButtonStyle={styles.controlsButtonStyle}
                controlsTextStyle={styles.controlsTextStyle}
                dotStyle={styles.dotStyle}
                activeDotStyle={[styles.dotStyle, { backgroundColor: '#000000' }]}
            >
                {data.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => open(item.link)} style={styles.card}>
                        <Image source={item.image} style={styles.cardImage} />
                        <Text style={styles.cardText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </Carousel>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 30,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    horizontalScrollView: {
        flexDirection: 'row',
    },
    card: {
        width: width * 0.68,
        // width: '85%',
        // marginRight: 15,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#ddd',
        alignSelf: 'center'
    },
    cardImage: {
        width: '100%',
        height: 100,
    },
    cardText: {
        textAlign: 'center',
        paddingVertical: 10,
        backgroundColor: '#4d4d4d',
        color: '#fff',
        fontWeight: 'bold',
    },
    arrowLeft: {
        position: 'absolute',
        left: 0,
        top: '50%',
    },
    arrowRight: {
        position: 'absolute',
        right: 0,
        top: '50%',
    },
    dotStyle: {
        width: '3%',
        height: 4,
        backgroundColor: 'silver',
        marginHorizontal: 3,
        borderRadius: 3,
    },
    controlsButtonStyle: {
        display: "flex",
        flexDirection: "row",
        bottom: '20%',
        alignItems: "center",
        // width: 80,
        // height: 80,
        // backgroundColor: "#eb6767",
        // borderRadius: 60,
        // opacity: 0.5
    },
    controlsTextStyle: {
        fontSize: 50,
        // set arrow colour
        // color: "#eace15", 
        padding: 0
    },
});

export default CarouselComponent;
