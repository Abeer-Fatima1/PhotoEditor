import React, { useState, useRef,useEffect } from 'react';
import { View, FlatList, Animated, StyleSheet,  BackHandler, } from 'react-native';
import {OnboardingItem} from './OnboardingItem';
import {Paginator} from './Paginator';
import {NextButton} from './NextButton';
import { Video } from 'expo-av';

const data = [
  {
    id: 1,
    description: 'Login and Registration',
    video: require('../assets/Login.mp4'),
  },
  {
    id: 2,
    description: 'Home Screen',
    video: require('../assets/Home.mp4'),
  },
  {
    id: 3,
    description: 'Edit Picture',
    video: require('../assets/Edit.mp4'),
  },
  {
    id: 4,
    description: 'Save and Share',
    video: require('../assets/Save.mp4'),
  },
];

export const Onboarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [login, setLogin] = useState(false);
   const [next, setNext] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
          // Prevent going back to Home screen
          if (navigation.isFocused()) {
            return true;
          }
          return false;
        });

        return () => {
          // Cleanup: Remove the event listener when the component is unmounted
          backHandler.remove();
        };
      }, [navigation]);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

const scrollTo = () => {
  if (currentIndex < data.length - 1) {
    setLogin(false);
    setNext(true);
    slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
  }
  if(currentIndex === data.length - 2){
  setLogin(true);
  }
  if(currentIndex === data.length - 1){
    navigation.navigate('Login')
    }
  }


const scrollBack = () => {
  if (currentIndex > 0) {
    slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
  }
   if(currentIndex === data.length - 1){
    setLogin(false);
    }

     if(currentIndex === data.length - 3){
        setNext(false);
        }
};

  return (
    <View style={styles.container}>
      <View style={{ flex:3, backgroundColor: 'black', }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={data} scrollX={scrollX} />
      <NextButton scrollTo={scrollTo} scrollBack={scrollBack} gotoLogin={login} Next={next}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

