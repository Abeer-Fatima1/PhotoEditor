/*import { StyleSheet, View, Image } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { useRoute } from '@react-navigation/native';

export default function Animation({route}) {
 const { uri} = route.params;
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: scale.value },
        { rotateZ: `${rotation.value}rad` },
      ],
    };
  });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture)
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: uri }} style={styles.backgroundImage} />
      <Animated.View>
        <GestureDetector gesture={composed}>
          <Animated.View style={animatedStyles}>
            <LottieView
              source={require('./assets/2023.json')}
              autoPlay
              loop
              style={styles.animation}
            />
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});*/

import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

export default function Animation({ route, navigation }) {
  const { uri } = route.params;

  const [isBoundingBoxVisible, setBoundingBoxVisible] = useState(true);

  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: scale.value },
        { rotateZ: `${rotation.value}rad` },
      ],
    };
  });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture)
  );

  const toggleBoundingBoxVisibility = () => {
    setBoundingBoxVisible(!isBoundingBoxVisible);
  };

  const closeBoundingBox = () => {
    setBoundingBoxVisible(false);
  };

  const BOUNDING_BOX_SIZE = 150;

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderGrant={closeBoundingBox}
    >
      {isBoundingBoxVisible && (
        <TouchableOpacity
          style={[styles.boundingBox, { width: BOUNDING_BOX_SIZE, height: BOUNDING_BOX_SIZE }]}
          onPress={toggleBoundingBoxVisibility}
        />
      )}

      <Image source={{ uri: uri }} style={styles.backgroundImage} />

      <Animated.View>
        <GestureDetector gesture={composed}>
          <Animated.View style={animatedStyles}>
            <LottieView
              source={require('../assets/2023.json')}
              autoPlay
              loop
              style={styles.animation}
            />
          </Animated.View>
        </GestureDetector>
      </Animated.View>

      {isBoundingBoxVisible && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={toggleBoundingBoxVisibility}
          onLayout={(event) => event.stopPropagation()}
        >
          {/* Add a close button or any UI element for closing the bounding box */}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  boundingBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    zIndex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
