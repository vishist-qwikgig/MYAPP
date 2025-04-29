// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ImageBackground,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import CustomSlider from '../components/CustomSlider'; // Ensure path is correct
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import navigation prop types
// import { RootStackParamList } from '../types/types'; // Import the type definition
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width } = Dimensions.get('window');
// const SLIDER_WIDTH = width * 0.8;
// const SLIDER_HEIGHT = 16; // Slider height (thickness of the track)

// type Screen4NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Screen4'>;

// const Screen4 = () => {
//   const [tolerance, setTolerance] = useState(10);
//   const navigation = useNavigation<Screen4NavigationProp>()

//   const handleContinue = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('user');
//       const user = jsonValue != null ? JSON.parse(jsonValue) : {};
  
//       const updatedUser = {
//         ...user,
//         tolerance, // Add tolerance to the user object
//       };
  
//       await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
//       console.log('Updated user with tolerance:', updatedUser);
  
//       navigation.navigate('Screen5');
//     } catch (error) {
//       console.error('Failed to save tolerance:', error);
//       Alert.alert('Error', 'Failed to save tolerance. Please try again.');
//     }
//   };
  
//   return (
//     <ImageBackground source={require('../assets/background.png')} style={styles.background}>
//       <GestureHandlerRootView style={styles.container}>
//         <Text style={styles.title}>SURPRISE{"\n"}TOLERANCE</Text>

//         {/* Character image centered just above the slider */}
//         <Image source={require('../assets/character_screen4.png')} style={styles.character} />

//         {/* Custom Slider Component */}
//         <View style={styles.sliderWrapper}>
//           <CustomSlider value={tolerance} setValue={setTolerance} />
//         </View>

//         {/* Labels for "mild" and "mind-blowing" displayed only once at the edges */}
//         <View style={styles.labelRow}>
//           <Text style={styles.label}>mild</Text>
//           <Text style={styles.label}>mind-blowing</Text>
//         </View>

//         {/* Continue button with navigation to Screen5 */}
//         <TouchableOpacity style={styles.button} onPress={handleContinue}>
//           <Text style={styles.buttonText}>Continue</Text>
//         </TouchableOpacity>
//       </GestureHandlerRootView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#fff',
//     marginBottom: 30,
//   },
//   character: {
//     width: 140,
//     height: 140,
//     resizeMode: 'contain',
//     marginBottom: 40,
//   },
//   sliderWrapper: {
//     width: SLIDER_WIDTH,
//     height: SLIDER_HEIGHT,
//     justifyContent: 'center',
//     marginBottom: 30,
//   },
//   labelRow: {
//     width: SLIDER_WIDTH,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   label: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontStyle: 'normal',
//   },
//   button: {
//     marginTop: 20,
//     paddingVertical: 14,
//     paddingHorizontal: 50,
//     borderRadius: 30,
//     borderColor: '#ff00d4',
//     borderWidth: 2,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 20,
//   },
// });

// export default Screen4;


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomSlider from '../components/CustomSlider'; // Ensure path is correct
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import navigation prop types
import { RootStackParamList } from '../types/types'; // Import the type definition
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width * 0.8;
const SLIDER_HEIGHT = 16; // Slider height (thickness of the track)

type Screen4NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Screen4'>;

const Screen4 = () => {
  const [tolerance, setTolerance] = useState(10);
  const navigation = useNavigation<Screen4NavigationProp>();

  const handleContinue = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const user = jsonValue != null ? JSON.parse(jsonValue) : {};

      const updatedUser = {
        ...user,
        tolerance, // Add tolerance to the user object
      };

      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('Updated user with tolerance:', updatedUser);

      navigation.navigate('Screen5');
    } catch (error) {
      console.error('Failed to save tolerance:', error);
      Alert.alert('Error', 'Failed to save tolerance. Please try again.');
    }
  };

  // Message based on the slider value
  const getMessage = (value: number) => {
    switch (value) {
      case 1: return "Choose your surprise tolerance";
      case 2: return "At surprise tolerance level 1... Hmm, not bad!";
      case 3: return "Oooookay!";
      case 4: return "Calm down, son!";
      case 5: return "Getting spicy!";
      case 6: return "Starting to heat up!";
      case 7: return "Whoa, things are getting real!";
      case 8: return "Hold up, we're getting there!";
      case 9: return "Almost there, wow!";
      case 10: return "Boy, you're on fire today!";
      default: return "";
    }
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      
      <GestureHandlerRootView style={styles.container}>
        <Text style={styles.title}>SURPRISE{"\n"}TOLERANCE</Text>
        {/* Character image centered just above the slider */}
        <Image source={require('../assets/character_screen4.png')} style={styles.character} />

        {/* Dynamic Message */}
        <Text style={styles.messageText}>{getMessage(tolerance)}</Text>

        {/* Custom Slider Component */}
        <View style={styles.sliderWrapper}>
          <CustomSlider value={tolerance} setValue={setTolerance} />
        </View>

        {/* Labels for "mild" and "mind-blowing" displayed only once at the edges */}
        <View style={styles.labelRow}>
          <Text style={styles.label}>mild</Text>
          <Text style={styles.label}>mind-blowing</Text>
        </View>

        {/* Continue button with navigation to Screen5 */}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
  },
  character: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 20, // Reduced margin to create space for the message
  },
  sliderWrapper: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    justifyContent: 'center',
    marginBottom: 30,
  },
  labelRow: {
    width: SLIDER_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'normal',
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30, // Space below message and above slider
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    borderColor: '#ff00d4',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Screen4;

