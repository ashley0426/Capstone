import { View, FlatList, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { CoursesData } from '@/components/smart-life-page/smart-life-data';
import { ThemedText } from '@/components/ThemedText';
import common from '@/components/styles/commonStyles';
import React from 'react';

export default function Courses() {
    const page = "Smart Living";
    
    return (
        <ScrollView>
            <TouchableOpacity
            onPress={() => Linking.openURL("https://www.mightynetworks.com/")}
            style={common.buttonWithShadow}>
                <Image source={require("@/assets/gif/loading.gif")} contentFit="contain" style={common.image} />
                <View style={{ backgroundColor: "#aca2a28a", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                    <ThemedText style={common.dealCardText}>Playground Courses</ThemedText>
                    <ThemedText style={common.dealCardText}>60 Plus Playground</ThemedText>
                </View>
            </TouchableOpacity>
            <ThemedText style={[{ marginLeft: '5%', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }]}>
                Free Courses
            </ThemedText>
            <FlatList
                data={CoursesData}
                keyExtractor={(item) => item.title}
                contentContainerStyle={common.scrollView}
                renderItem={({ item }) => (
                    <>
                        <TouchableOpacity
                            onPress={() => Linking.openURL(item.link)}
                            style={common.buttonWithShadow}>
                            <Image source={item.image} contentFit="contain" style={common.image} />
                            <View style={{ backgroundColor: "#aca2a28a", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                <ThemedText style={common.dealCardText}>{item.title}</ThemedText>
                                <ThemedText style={common.dealCardText}>{item.provider}</ThemedText>
                            </View>
                        </TouchableOpacity>
                    </>
                )}
            />
            
            <View style={{ marginBottom: 200 }} />
        </ScrollView>
    );
}