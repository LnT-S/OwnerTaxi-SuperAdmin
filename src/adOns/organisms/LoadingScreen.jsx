import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Easing, ActivityIndicator } from 'react-native';
import { BgColor } from '../../styles/colors';
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout';

const LoadingScreen = () => {
    const [zoomValue] = useState(new Animated.Value(1));

    useEffect(() => {
        const zoomInAndOut = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(zoomValue, {
                        toValue: 1.2,
                        duration: 1000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(zoomValue, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ]),
                { iterations: -1 }
            ).start();
        };

        zoomInAndOut();
    }, [zoomValue]);

    return (
        <AuthenticatedLayout>
            <View style={styles.container}>
                <Animated.Image
                    source={require('../../assets/imgaes/Taxilogo.png')}
                    style={[styles.image, { transform: [{ scale: zoomValue }] }]}
                />
                <ActivityIndicator size={40} color={'white'} style={styles.activityIndicator} />
            </View>
        </AuthenticatedLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'black'
    },
    activityIndicator: {
        margin: 60,
        size: 40,
        position: 'absolute',
        bottom: 15,
        left: '30%'
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
});

export default LoadingScreen;