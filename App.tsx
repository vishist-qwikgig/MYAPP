// // npx react-native start
// // npx react-native run-android

import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BootSplash from "react-native-bootsplash";
import { Animated, StyleSheet, View, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin'; // <-- ADD THIS

// Import your screens
import Screen1 from './screens/Screen1';
import Register from './screens/Register';
import Screen3 from './screens/Screen3';
import Screen4 from './screens/Screen4';
import Screen5 from './screens/Screen5';
import Screen6 from './screens/Screen6';

// Define Stack types
export type RootStackParamList = {
  Screen1: undefined;
  Register: undefined;
  Screen3: {
    user: {
      name: string | null;
      email: string | null;
      photo: string | null;
    };
  };
  Screen4: undefined;
  Screen5: undefined;
  Screen6: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const init = async () => {
      // 🛠️ Configure Google Sign-In
      GoogleSignin.configure({
        webClientId: "232252120114-lt7akpmtvc9k6qjd342jp7vamidgni73.apps.googleusercontent.com",
        offlineAccess: true,
      });
  
      // Simulate loading tasks
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
  
      // Start animation: Spin and fade out
      Animated.parallel([
        Animated.timing(rotate, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(async () => {
        // Hide native BootSplash after animation
        await BootSplash.hide({ fade: true });
        setSplashVisible(false);
      });
    };
  
    init();
  }, []);
  
  // Interpolate rotate value into degrees
  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      {/* Main Navigation */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Screen1" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Screen1" component={Screen1} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Screen3" component={Screen3} />
          <Stack.Screen name="Screen4" component={Screen4} />
          <Stack.Screen name="Screen5" component={Screen5} />
          <Stack.Screen name="Screen6" component={Screen6} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* Custom Splash Animation Layer */}
      {isSplashVisible && (
        <Animated.View style={[StyleSheet.absoluteFillObject, styles.splashContainer, { opacity }]}>
          <Animated.Image
            source={require('./assets/bootsplash_logo.png')} // Your spinning dice logo
            style={[styles.logo, { transform: [{ rotate: spin }] }]}
            resizeMode="contain"
          />
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    backgroundColor: '#000000', // Same as your splash background color
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
});

export default App;
