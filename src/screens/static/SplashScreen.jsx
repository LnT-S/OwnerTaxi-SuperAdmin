import React, { useRef } from 'react'
import { StyleSheet, View, TouchableOpacity,Animated } from 'react-native'
import { BgColor } from '../../styles/colors'
import { getResponsiveValue } from '../../styles/responsive';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
  
    const handleNextPage = () => {
      navigation.navigate('LoginScreen');
    };
  
    useFocusEffect(() => {
      const fadeIn = Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      });
      const growingAnim = Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      });
  
      const glowingAnim = Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0.1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );
  
      fadeIn.start();
      growingAnim.start();
      glowingAnim.start();
  
      const timer = setTimeout(handleNextPage, 3000);
  
      return () => {
        clearTimeout(timer);
        fadeAnim.setValue(0);
        scaleAnim.setValue(0);
        opacityAnim.setValue(0);
      };
    });

    return (
        <View style = {[styles.SplashScreenBG]}>
            <TouchableOpacity onPress={handleNextPage} activeScale={0.95}>
                <Animated.Image
                    source={require('../../assets/imgaes/DriverAppLogo.png')}
                    resizeMode="contain"
                    style={[
                        styles.image,
                        {
                            opacity: opacityAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                />

            </TouchableOpacity>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    SplashScreenBG: {
        backgroundColor: BgColor,
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: getResponsiveValue(572, 336),
        height: getResponsiveValue(572, 336),
        alignSelf: 'center',


    },
})