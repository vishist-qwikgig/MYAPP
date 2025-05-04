import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import type { RootStackParamList } from '../App';


const Screen1 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCreateAccount = () => {
    navigation.navigate('Register');
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
  
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;
  
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          lastLogin: firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
  
      navigation.navigate('Screen3', {
        user: {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }
      });
  
    } catch (error: any) {
      console.log('Google Sign-In Full Error:', JSON.stringify(error, null, 2));
      Alert.alert('Sign-In Failed', `Raw error: ${JSON.stringify(error)}`);
    }
  };
  
  return (
    <ImageBackground
      source={require('../assets/screen1_background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SERENDIPITY ENGINE</Text>
        </View>

        <Text style={styles.title}>Ready to discover{"\n"}joy in the unexpected?</Text>

        <Image source={require('../assets/happy.png')} style={styles.emoji} />

        <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
          <Text style={styles.createAccountText}>Create an Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <View style={styles.googleContent}>
            <Image source={require('../assets/google.png')} style={styles.googleLogo} />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
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
    justifyContent: 'center',
  },
  badge: {
    borderWidth: 2,
    borderColor: '#00f0ff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 30,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    letterSpacing: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 20,
  },
  emoji: {
    width: 120,
    height: 120,
    marginVertical: 30,
  },
  createAccountButton: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: '#ff00d4',
    backgroundColor: 'transparent',
    marginBottom: 15,
  },
  createAccountText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  googleButton: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: '#4285F4',
    backgroundColor: 'transparent',
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  googleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },  
});

export default Screen1;



