
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width * 0.8;
const HANDLE_SIZE = 26;
const TRACK_HEIGHT = 20; // Increased the height of the slider track for thickness

const CustomSlider: React.FC<{ value: number; setValue: (val: number) => void }> = ({ value, setValue }) => {
  const offset = useSharedValue(0);
  const MAX_OFFSET = SLIDER_WIDTH - HANDLE_SIZE;
  const rippleWidth = useSharedValue(0); // For the ripple effect on the track

  const panGesture = Gesture.Pan().onChange((event) => {
    let newOffset = offset.value + event.changeX;
    if (newOffset < 0) newOffset = 0;
    if (newOffset > MAX_OFFSET) newOffset = MAX_OFFSET;
    offset.value = newOffset;

    // Update ripple effect width
    rippleWidth.value = withTiming(newOffset, { duration: 100 });

    // Update value between 1 - 10 based on position
    const percentage = newOffset / MAX_OFFSET;
    const calculatedValue = Math.round(1 + percentage * 9);
    runOnJS(setValue)(calculatedValue); // Update parent state
  }).onEnd(() => {
    rippleWidth.value = withTiming(0, { duration: 200 }); // Reset ripple effect after drag ends
  });

  // Interpolating the color of the track based on the slider's position
  const trackStyle = useAnimatedStyle(() => {
    const trackColor = interpolateColor(
      offset.value,
      [0, MAX_OFFSET],
      ['#00f0ff', '#ff0000'] // From blue to red while dragging
    );

    return {
      backgroundColor: trackColor,
    };
  });

  // Style for the handle
  const handleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  // Animated style for the ripple effect (on the track)
  const rippleStyle = useAnimatedStyle(() => {
    return {
      width: rippleWidth.value,
      height: TRACK_HEIGHT,
      backgroundColor: '#ff0000', // Ripple color
      opacity: 0.3,
      position: 'absolute',
      top: 0,
      left: 0,
    };
  });

  return (
    <GestureHandlerRootView>
      <View style={styles.sliderContainer}>
        <Animated.View style={[styles.track, trackStyle]}>
          {/* Ripple effect on the track */}
          <Animated.View style={rippleStyle} />
        </Animated.View>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.handle, handleStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: SLIDER_WIDTH,
    height: HANDLE_SIZE,
    justifyContent: 'center',
    marginVertical: 25,
    position: 'relative',
  },
  track: {
    height: TRACK_HEIGHT,
    backgroundColor: '#00f0ff',  // Default color, will be overridden by the animated style
    borderRadius: 5,
  },
  handle: {
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: HANDLE_SIZE / 2,
    backgroundColor: '#ff00d4',
    position: 'absolute',
    top: -HANDLE_SIZE / 2 + 2,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SLIDER_WIDTH,
    marginTop: 10,
  },
  labelText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default CustomSlider;





