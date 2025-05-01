// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   ImageBackground,
//   Animated,
//   Easing,
//   Image,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width } = Dimensions.get('window');

// const Screen6 = () => {
//   const [surprise, setSurprise] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const spinValue = useRef(new Animated.Value(0)).current;
//   const borderColorValue = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const animateBorderColor = () => {
//       borderColorValue.setValue(0);
//       Animated.loop(
//         Animated.timing(borderColorValue, {
//           toValue: 1,
//           duration: 6000,
//           easing: Easing.linear,
//           useNativeDriver: false,
//         })
//       ).start();
//     };
//     animateBorderColor();
//   }, []);

//   const spinDice = () => {
//     spinValue.setValue(0);
//     Animated.timing(spinValue, {
//       toValue: 1,
//       duration: 800,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handleSurprise = async () => {
//     spinDice();
//     setLoading(true);
//     try {
//       const json = await AsyncStorage.getItem('user');
//       const user = json ? JSON.parse(json) : {};

//       const response = await fetch('https://your-api.com/api/surprise', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       });

//       const data = await response.json();
//       setSurprise(data.surprise || 'No surprise received.');
//     } catch (error) {
//       console.error('Error fetching surprise:', error);
//       setSurprise('Oops! Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const spin = spinValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '360deg'],
//   });

//   const borderColor = borderColorValue.interpolate({
//     inputRange: [
//       0, 0.033, 0.067, 0.1, 0.133, 0.167, 0.2, 0.233, 0.267, 0.3, 
//       0.333, 0.367, 0.4, 0.433, 0.467, 0.5, 0.533, 0.567, 0.6, 0.633,
//       0.667, 0.7, 0.733, 0.767, 0.8, 0.833, 0.867, 0.9, 0.933, 1
//     ],
//     outputRange: [
//       'rgb(255, 0, 0)', 'rgb(255, 165, 0)', 'rgb(255, 255, 0)', 'rgb(0, 255, 0)', 
//       'rgb(0, 128, 0)', 'rgb(0, 255, 255)', 'rgb(0, 0, 255)', 'rgb(75, 0, 130)', 
//       'rgb(238, 130, 238)', 'rgb(255, 105, 180)', 'rgb(255, 20, 147)', 'rgb(255, 0, 255)', 
//       'rgb(139, 0, 255)', 'rgb(128, 0, 128)', 'rgb(173, 216, 230)', 'rgb(240, 230, 140)', 
//       'rgb(255, 248, 220)', 'rgb(255, 239, 0)', 'rgb(255, 140, 0)', 'rgb(186, 85, 211)', 
//       'rgb(0, 191, 255)', 'rgb(255, 222, 173)', 'rgb(255, 228, 181)', 'rgb(144, 238, 144)', 
//       'rgb(255, 160, 122)', 'rgb(0, 206, 209)', 'rgb(255, 99, 71)', 'rgb(255, 69, 0)', 
//       'rgb(124, 252, 0)', 'rgb(255, 20, 147)'
//     ]
//   });

//   return (
//     <ImageBackground
//       source={require('../assets/background.png')}
//       style={styles.background}
//     >
//       <View style={styles.container}>
//         <View style={styles.contentWrapper}>
//           {surprise && (
//             <View style={styles.surpriseBox}>
//               <Text style={styles.surpriseText}>
//                 {loading ? 'Finding something magical for you...' : surprise}
//               </Text>
//             </View>
//           )}

//           <Animated.View
//             style={[styles.surpriseButtonWrapper, { borderColor }]}
//           >
//             <TouchableOpacity style={styles.surpriseButton} onPress={handleSurprise}>
//               <Animated.View style={{ transform: [{ rotate: spin }] }}>
//                 <Image
//                   source={require('../assets/dice_icon.png')}
//                   style={styles.diceIcon}
//                 />
//               </Animated.View>
//               <Text style={styles.surpriseButtonText}>Surprise Me</Text>
//             </TouchableOpacity>
//           </Animated.View>
//         </View>

//         <View style={styles.navBar}>
//           <View style={styles.navItem}>
//             <Image
//               source={require('../assets/explore_icon.png')}
//               style={styles.navIcon}
//             />
//             <Text style={styles.navText}>Explore</Text>
//           </View>
//           <View style={styles.navItem}>
//             <Image
//               source={require('../assets/memories_icon.png')}
//               style={styles.navIcon}
//             />
//             <Text style={styles.navText}>Memories</Text>
//           </View>
//           <View style={styles.navItem}>
//             <Image
//               source={require('../assets/profile_icon.png')}
//               style={styles.navIcon}
//             />
//             <Text style={styles.navText}>Profile</Text>
//           </View>
//         </View>
//       </View>
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
//     paddingTop: 60,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     justifyContent: 'flex-end',
//   },
//   contentWrapper: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   surpriseBox: {
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 25,
//     marginBottom: 25,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     width: width * 0.9,         // Fixed wider box
//     minHeight: 550,             // Ensure it's tall enough
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   surpriseText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     backgroundColor: 'transparent',
//   },
//   surpriseButtonWrapper: {
//     borderRadius: 20,
//     padding: 1,
//     backgroundColor: 'transparent',
//     borderWidth: 3,
//     width: width * 0.70,
//     height: 70,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   surpriseButton: {
//     backgroundColor: 'transparent',
//     borderRadius: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 2,
//     justifyContent: 'center',
//   },
//   surpriseButtonText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     backgroundColor: 'transparent',
//   },
//   diceIcon: {
//     marginRight: 10,
//     width: 50,
//     height: 30,
//     backgroundColor: 'transparent',
//   },
//   navBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     paddingVertical: 12,
//     backgroundColor: 'transparent',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   navItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     paddingVertical: 10,
//     backgroundColor: 'transparent',
//   },
//   navIcon: {
//     width: 50,
//     height: 30,
//     backgroundColor: 'transparent',
//   },
//   navText: {
//     fontSize: 20,
//     color: '#00f0ff',
//     marginTop: 4,
//     fontWeight: 'bold',
//     fontFamily: 'Arial',
//     backgroundColor: 'transparent',
//   },
// });

// export default Screen6;

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Animated,
  Easing,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // adjust the path if App.tsx is in a different folder

const { width } = Dimensions.get('window');

const Screen6 = () => {
  const [surprise, setSurprise] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const spinValue = useRef(new Animated.Value(0)).current;
  const borderColorValue = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const animateBorderColor = () => {
      borderColorValue.setValue(0);
      Animated.loop(
        Animated.timing(borderColorValue, {
          toValue: 1,
          duration: 6000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    };
    animateBorderColor();
  }, []);

  const spinDice = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 800,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handleSurprise = async () => {
    spinDice();
    setLoading(true);
    try {
      const json = await AsyncStorage.getItem('user');
      const user = json ? JSON.parse(json) : {};

      const response = await fetch('https://your-api.com/api/surprise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      setSurprise(data.surprise || 'No surprise received.');
    } catch (error) {
      console.error('Error fetching surprise:', error);
      setSurprise('Oops! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const borderColor = borderColorValue.interpolate({
    inputRange: Array.from({ length: 30 }, (_, i) => i / 29),
    outputRange: [
      'rgb(255, 0, 0)', 'rgb(255, 165, 0)', 'rgb(255, 255, 0)', 'rgb(0, 255, 0)',
      'rgb(0, 128, 0)', 'rgb(0, 255, 255)', 'rgb(0, 0, 255)', 'rgb(75, 0, 130)',
      'rgb(238, 130, 238)', 'rgb(255, 105, 180)', 'rgb(255, 20, 147)', 'rgb(255, 0, 255)',
      'rgb(139, 0, 255)', 'rgb(128, 0, 128)', 'rgb(173, 216, 230)', 'rgb(240, 230, 140)',
      'rgb(255, 248, 220)', 'rgb(255, 239, 0)', 'rgb(255, 140, 0)', 'rgb(186, 85, 211)',
      'rgb(0, 191, 255)', 'rgb(255, 222, 173)', 'rgb(255, 228, 181)', 'rgb(144, 238, 144)',
      'rgb(255, 160, 122)', 'rgb(0, 206, 209)', 'rgb(255, 99, 71)', 'rgb(255, 69, 0)',
      'rgb(124, 252, 0)', 'rgb(255, 20, 147)'
    ]
  });

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          {surprise && (
            <View style={styles.surpriseBox}>
              <Text style={styles.surpriseText}>
                {loading ? 'Finding something magical for you...' : surprise}
              </Text>
            </View>
          )}

          <Animated.View style={[styles.surpriseButtonWrapper, { borderColor }]}>
            <TouchableOpacity style={styles.surpriseButton} onPress={handleSurprise}>
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Image
                  source={require('../assets/dice_icon.png')}
                  style={styles.diceIcon}
                />
              </Animated.View>
              <Text style={styles.surpriseButtonText}>Surprise Me</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Explore')}>
            <Image source={require('../assets/explore_icon.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Explore</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Memories')}>
            <Image source={require('../assets/memories_icon.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Memories</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../assets/profile_icon.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingTop: 60,
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: 'flex-end',
  },
  contentWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  surpriseBox: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: width * 0.9,
    minHeight: 550,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surpriseText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  surpriseButtonWrapper: {
    borderRadius: 20,
    padding: 1,
    backgroundColor: 'transparent',
    borderWidth: 3,
    width: width * 0.70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  surpriseButton: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  surpriseButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  diceIcon: {
    marginRight: 10,
    width: 50,
    height: 30,
    backgroundColor: 'transparent',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  navIcon: {
    width: 50,
    height: 30,
    backgroundColor: 'transparent',
  },
  navText: {
    fontSize: 20,
    color: '#00f0ff',
    marginTop: 4,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    backgroundColor: 'transparent',
  },
});

export default Screen6;
