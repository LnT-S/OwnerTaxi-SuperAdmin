/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { ContextProvider } from './src/context/ContextProvider';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import CustomDrawerContent from './src/common/drawer/CustomDrawerContent';
import HomePage from './src/components/home/Home';
import ProfilePage from './src/components/profile/Profile';
import SplashScreen from './src/screens/static/SplashScreen';
import LoginPage from './src/components/Login/Login';
import { BgColor } from './src/styles/colors';
import OtpScreen from './src/components/Login/OTP';
import Message from './src/components/Message/Message';
import MessageScreen from './src/components/Message/MessageScreen';
import Notification from './src/components/Notification/Notification';
import NotificationFullPage from './src/components/Notification/NotificationFullPage';
import Setting from './src/components/setting/Setting';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();

function DrawerNavigator() {

  return (
    <Drawer.Navigator initialRouteName='Home' drawerContent={(props) => <CustomDrawerContent {...props} />} backBehavior="history">
      <Drawer.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
      <Drawer.Screen name="message" component={Message} options={{ headerShown: false }} />
      <Drawer.Screen name="messageScreen" component={MessageScreen} options={{ headerShown: false }} />
      <Drawer.Screen name='notification' component={Notification} options={{ headerShown: false }} />
      <Drawer.Screen name='notificationScreen' component={NotificationFullPage} options={{ headerShown: false }} />
      <Drawer.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when the loading task is complete
    }, 2500); // Simulate loading for 2 seconds, replace this with your actual loading logic
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ContextProvider>
        <NavigationContainer >
          <StatusBar barStyle="dark-content" backgroundColor="#ffea00" />
          {isLoading ? (
            <SplashScreen />
          ) : (<Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',

            }}
          >
            <Stack.Screen
              name='LoginScreen'
              component={LoginPage}
              options={{ headerShown: false }}
            />
           
            <Stack.Screen
              name='OTPScreen'
              component={OtpScreen}
              options={{ headerShown: false }}
            />
           
              <Stack.Screen
                name='HomeSceen'
                component={DrawerNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='ProfileScreen'
                component={ProfilePage}
                options={{ headerShown: false }}
              />
          </Stack.Navigator>)}
        </NavigationContainer>
      </ContextProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BgColor
  }
})

export default App;
