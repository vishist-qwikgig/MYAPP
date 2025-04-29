import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  request,
  requestNotifications,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

const Screen5 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Screen5'>>();
  const handlePermission = async (permission: string) => {
    try {
      let result;

      if (permission === 'Location') {
        const locationPermission =
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

        result = await request(locationPermission);

        if (result === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const timestamp = new Date().toISOString();

              const user = JSON.parse(await AsyncStorage.getItem('user') || '{}');
              const updatedUser = {
                ...user,
                location: {
                  latitude,
                  longitude,
                  timestamp,
                },
              };
              await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
              console.log('Location saved:', updatedUser.location);
            },
            (error) => {
              console.error('Location error:', error);
              Alert.alert('Error', 'Could not fetch location.');
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
            }
          );
        } else {
          Alert.alert('Permission Denied', 'Location permission was denied.');
        }
      }

      if (permission === 'Camera') {
        const cameraPermission =
          Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

        result = await request(cameraPermission);

        const user = JSON.parse(await AsyncStorage.getItem('user') || '{}');
        const updatedUser = {
          ...user,
          cameraPermission: result,
        };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('Camera permission saved:', result);
      }

      if (permission === 'Notifications') {
        const { status } = await requestNotifications(['alert', 'sound', 'badge']); // iOS + Android (API 33+)
      
        const user = JSON.parse(await AsyncStorage.getItem('user') || '{}');
        const updatedUser = {
          ...user,
          notificationPermission: status,
        };
      
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('Notification permission saved:', status);
      }
    } catch (error) {
      console.error('Permission error:', error);
      Alert.alert('Error', 'Something went wrong with permissions.');
    }
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Allow ‘Serendipity Engine’ to</Text>

        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>
            To enhance your experience, I can help with these permissions!
          </Text>
        </View>

        <Image source={require('../assets/character.png')} style={styles.character} />

        <View style={styles.permissionContainer}>
          <View style={styles.permissionBox}>
            <Image source={require('../assets/location_icon.png')} style={styles.icon} />
            <Text style={styles.permissionText}>Location</Text>
            <Text style={styles.permissionDescription}>Suggestions You'll Love</Text>
            <TouchableOpacity style={styles.allowButton} onPress={() => handlePermission('Location')}>
              <Text style={styles.allowText}>Allow</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.permissionBox}>
            <Image source={require('../assets/notification_icon.png')} style={styles.icon} />
            <Text style={styles.permissionText}>Notifications</Text>
            <Text style={styles.permissionDescription}>For updates & alerts</Text>
            <TouchableOpacity style={styles.allowButton} onPress={() => handlePermission('Notifications')}>
              <Text style={styles.allowText}>Allow</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.permissionBox}>
            <Image source={require('../assets/camera_icon.png')} style={styles.icon} />
            <Text style={styles.permissionText}>Camera</Text>
            <Text style={styles.permissionDescription}>For capturing moments</Text>
            <TouchableOpacity style={styles.allowButton} onPress={() => handlePermission('Camera')}>
              <Text style={styles.allowText}>Allow</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Screen6')}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    paddingTop: 120,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },
  speechBubble: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 16,
    marginBottom: 30,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speechText: {
    color: '#00f0ff',
    fontSize: 14,
    textAlign: 'center',
  },
  character: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  permissionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  permissionBox: {
    backgroundColor: '#222244',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: width * 0.28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 35,
    height: 50,
    marginBottom: 15,
  },
  permissionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  permissionDescription: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
  },
  allowButton: {
    backgroundColor: '#00f0ff',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginTop: 10,
  },
  allowText: {
    color: '#fff',
    fontSize: 12,
  },
  continueButton: {
    marginTop: 40,
    backgroundColor: '#ff00d4',
    borderRadius: 30,
    paddingVertical: 14,
    width: '80%',
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Screen5;

