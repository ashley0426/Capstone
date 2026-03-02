import React from 'react';
import { Text, StyleSheet, View, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function ToS({ setShowToS }: { setShowToS: Function }) {

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: '100%',
            width: '100%',
        },
        header: {
            backgroundColor: '#F89522',
            borderRadius: 10,
            height: 80,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        tosTitle: {
            fontSize: 28,
            fontWeight: '500',
            textAlign: 'center',
            alignSelf: 'center'
        },
        cross: {
            right: 15,
            top: 10,
            position: 'absolute'
        },
        tosContainer: {
            width: '85%',
            height: '75%',
            backgroundColor: 'white',
            position: 'relative',
            alignSelf: 'center',
            borderRadius: 10,
            top: '10%'
        },
        tosText: {
            padding: 20,
            paddingBottom: 20
        },
        label: {
            fontWeight: 'bold'
        }
    });

    return (
        <View style={[styles.container]}>
            <View style={styles.tosContainer}>
                <View style={styles.header}>
                    <Text style={styles.tosTitle}>Terms of Service</Text>
                    <Pressable style={styles.cross}
                        onPress={() => setShowToS(false)}>
                        <Icon name="x" size={24} />
                    </Pressable>
                </View>
                <ScrollView style={styles.tosText}>
                    <Text>
                        Welcome to the 60 Plus Hub. By registering for an account on our platform, you agree to the collection and use of your personal information as outlined in this Terms of Service (ToS).
                        {"\n"}Please read these terms carefully before proceeding with registration:{"\n"}
                    </Text>
                    <Text style={styles.label}>1. Sharing of information</Text>
                    <Text>
                        We do not sell, trade, or otherwise transfer your personal information to outside parties, except in the following circumstances: {"\n"}
                    </Text>
                    <Text style={{ padding: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>1.1. Service Providers: </Text>
                        We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.{"\n"}
                    </Text>
                    <Text style={styles.label}>2. Data Security</Text>
                    <Text>We implement a variety of security measures to maintain the safety of your personal information. However, please note that no method of transmission over the Internet, or method of electronic storage, is 100% secure. {"\n"}</Text>
                    <Text style={styles.label}>3. Changes to Terms of Service</Text>
                    <Text>
                        We reserve the right to update or modify these terms at any time without prior notice. Any changes will be posted on this page, and the date of the latest revision will be indicated at the top of this document.{"\n"}
                    </Text>

                </ScrollView>
            </View>
        </View>
    )


}




