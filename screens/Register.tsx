import React, { useState } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Register: undefined;
  Screen3: undefined;
};

const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState<Date | undefined>();
  const [phone, setPhone] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // For OTP Simulation
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');

  const questions = [
    "Hi there! What's your first name?",
    "Awesome! What's your last name?",
    "Cool! Can you share your email address?",
    "Mind sharing your birthday? 🎂",
    "Almost there! What's your phone number?",
    "Enter the OTP we sent to your phone!",
  ];

  const isOldEnough = (date: Date) => {
    const today = new Date();
    const fourteenYearsAgo = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());
    return date <= fourteenYearsAgo;
  };

  const sendOtp = () => {
    // Ideally, integrate a real OTP service like Firebase here.
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);
    setOtpSent(true);
    Alert.alert('OTP Sent', `Your OTP is ${generatedOtp} (In real app, this will be sent via SMS!)`);
  };

  const verifyOtp = () => {
    if (otp === enteredOtp) {
      handleRegister();
    } else {
      Alert.alert('Incorrect OTP', 'Please try again.');
    }
  };

  const handleNext = () => {
    if (step === 0 && !firstName) {
      Alert.alert('Please enter your first name.');
      return;
    }
    if (step === 1 && !lastName) {
      Alert.alert('Please enter your last name.');
      return;
    }
    if (step === 2 && !email) {
      Alert.alert('Please enter your email.');
      return;
    }
    if (step === 3 && !dob) {
      Alert.alert('Please pick your date of birth.');
      return;
    }
    if (step === 3 && dob && !isOldEnough(dob)) {
      Alert.alert('Too young!', 'You must be at least 14 years old to register.');
      return;
    }
    if (step === 4 && !phone) {
      Alert.alert('Please enter your phone number.');
      return;
    }

    if (step === 4) {
      sendOtp();
    }

    setStep((prev) => prev + 1);
  };

  const handleRegister = async () => {
    const userData = {
      firstName,
      lastName,
      dob: dob?.toISOString(),
      email,
      phone,
    };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log('User registered:', userData);
      navigation.navigate('Screen3');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save user data. Please try again.');
    }
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.question}>{questions[step]}</Text>

        {step === 0 && (
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#ccc"
            value={firstName}
            onChangeText={setFirstName}
          />
        )}

        {step === 1 && (
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#ccc"
            value={lastName}
            onChangeText={setLastName}
          />
        )}

        {step === 2 && (
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        )}

        {step === 3 && (
          <>
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Text style={{ color: dob ? '#fff' : '#ccc' }}>
                {dob ? dob.toDateString() : 'Select Date of Birth'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dob || new Date()}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) setDob(date);
                }}
              />
            )}
          </>
        )}

        {step === 4 && (
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#ccc"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        )}

        {step === 5 && otpSent && (
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#ccc"
            keyboardType="number-pad"
            value={enteredOtp}
            onChangeText={setEnteredOtp}
          />
        )}

        <TouchableOpacity style={styles.nextButton} onPress={step === 5 ? verifyOtp : handleNext}>
          <Text style={styles.buttonText}>{step === 5 ? 'Verify OTP' : 'Next'}</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    borderColor: '#00f0ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    color: '#fff',
  },
  nextButton: {
    width: '100%',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff00d4',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Register;
