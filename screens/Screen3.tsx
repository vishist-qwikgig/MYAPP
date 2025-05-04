import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const interestsList = [
  { label: 'Books', color: '#00f0ff' },
  { label: 'Music', color: '#ff00d4' },
  { label: 'Nature', color: '#00ffc8' },
  { label: 'Adventure', color: '#c800ff' },
  { label: 'Cooking', color: '#ff00aa' },
  { label: 'Technology', color: '#008cff' },
  { label: 'Travel', color: '#ff33cc' },
  { label: 'Art', color: '#9933ff' },
  { label: 'Fitness', color: '#ff6600' },
  { label: 'Photography', color: '#33ccff' },
  { label: 'Gaming', color: '#ff4444' },
  { label: 'Meditation', color: '#66ffcc' },
  { label: 'Yoga', color: '#cc66ff' },
  { label: 'Science', color: '#33ff99' },
  { label: 'History', color: '#ff9966' },
  { label: 'Movies', color: '#ff6699' },
  { label: 'Podcasts', color: '#66ccff' },
  { label: 'DIY Crafts', color: '#ffcc00' },
  { label: 'Blogging', color: '#00ccff' },
  { label: 'Fashion', color: '#ff3399' },
  { label: 'Dance', color: '#cc00ff' },
  { label: 'Poetry', color: '#ffccff' },
  { label: 'Startups', color: '#33ffcc' },
  { label: 'Coding', color: '#0099ff' },
  { label: 'Astronomy', color: '#9966ff' },
  { label: 'Volunteering', color: '#66ff66' },
  { label: 'Gardening', color: '#00ff99' },
  { label: 'Pets', color: '#ff99cc' },
  { label: 'Board Games', color: '#ff9933' },
  { label: 'Investing', color: '#33ffff' },
  { label: 'Languages', color: '#ff3366' },
  { label: 'Comics', color: '#cc99ff' },
  { label: 'Martial Arts', color: '#ff6666' },
  { label: 'Hiking', color: '#66ff99' },
  { label: 'Cycling', color: '#3399ff' },
  { label: 'Writing', color: '#ff99ff' },
  { label: 'Anime', color: '#ff6699' },
  { label: 'Mindfulness', color: '#00ffcc' },
  { label: 'Skateboarding', color: '#ffcc66' },
  { label: 'Chess', color: '#ccccff' },
];

const Screen3 = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleContinue = async () => {
    if (selectedInterests.length === 0) {
      Alert.alert('Select Interests', 'Please select at least one interest to continue.');
      return;
    }
  
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const user = jsonValue != null ? JSON.parse(jsonValue) : {};
  
      const updatedUser = {
        ...user,
        interests: selectedInterests, // add selected interests to the user object
      };
  
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('Updated user with interests:', updatedUser);
  
      navigation.navigate('Screen4');
    } catch (error) {
      console.error('Failed to save interests:', error);
      Alert.alert('Error', 'Failed to save interests. Please try again.');
    }
  };


  const renderItem = ({ item }: { item: { label: string, color: string } }) => (
    <TouchableOpacity
      style={[styles.interestButton, { borderColor: item.color }, selectedInterests.includes(item.label) && styles.selectedButton]}
      onPress={() => toggleInterest(item.label)}
    >
      <Text style={styles.interestText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/character.png')} style={styles.character} />
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>Select some interests to{"\n"}help me get started!</Text>
          </View>
        </View>

        <Text style={styles.title}>Choose your{"\n"}interests</Text>

        <FlatList
          data={interestsList}
          renderItem={renderItem}
          keyExtractor={(item) => item.label}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ marginTop: 30 , paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Continue button moved up a bit */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  speechBubble: {
    backgroundColor: '#1a1a2e',
    padding: 12,
    borderRadius: 16,
    marginTop: 10,
    maxWidth: width * 0.8,
  },
  speechText: {
    color: '#00f0ff',
    fontSize: 14,
    textAlign: 'center',
  },
  character: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  interestButton: {
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginVertical: 10,
    marginHorizontal: 5,
    minWidth: 50, // Ensuring the button is wide enough to accommodate text
    flexWrap: 'wrap', // Allow wrapping of long text
  },
  selectedButton: {
    backgroundColor: '#222244',
  },
  interestText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center', // Ensure the text is centered
  },
  continueButton: {
    marginTop: 10, // Move the continue button up a bit
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00f0ff',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Screen3;

