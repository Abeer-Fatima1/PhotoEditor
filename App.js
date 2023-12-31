import React, { useState, useEffect } from "react";
import Home from './Screens/Home';
import Edit from './Screens/Edit';
import Filter from './Screens/Filter';
import CameraComponent from './Screens/Camera.js';
import {Onboarding} from './Screens/Onboarding.js';
import Brightness from './Screens/Brightness.js';
import Contrast from './Screens/Contrast.js';
import Animation from './Screens/Animations.js';
import Crop from './Screens/Crop.js';
import Login from './Screens/login.js';
import Signup from './Screens/signup.js';
import Saturation from './Screens/Saturation.js';
import Splash from './Screens/SplashScreen.js';
import TOS from './Screens/TOS.js';
import PP from './Screens/PP.js';
import Save from './Screens/Save.js';
import Draw from './Screens/Draw.js';
import EditProfile from './Screens/EditProfile.js';
import { View, StyleSheet} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NativeBaseProvider>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }}/>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }}/>
      <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }}/>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name='PP' component={PP} options={{ headerShown: false }}/>
      <Stack.Screen name='TOS' component={TOS} options={{ headerShown: false }}/>
      <Stack.Screen name='EditProfile' component={EditProfile} options={{ headerShown: false }}/>
      <Stack.Screen name='Edit' component={Edit} options={{ headerShown: false }}/>
      <Stack.Screen name='Filter' component={Filter} options={{ headerShown: false }}/>
      <Stack.Screen name='Camera' component={CameraComponent} />
      <Stack.Screen name='Animations' component={Animation} />
      <Stack.Screen name='Brightness' component={Brightness} options={{ headerShown: false }}/>
      <Stack.Screen name='Crop' component={Crop} options={{ headerShown: false }} />
      <Stack.Screen name='Saturation' component={Saturation} options={{ headerShown: false }}/>
      <Stack.Screen name='Contrast' component={Contrast} options={{ headerShown: false }}/>
      <Stack.Screen name='Draw' component={Draw} />
      <Stack.Screen name='Save' component={Save} options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
    </GestureHandlerRootView >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
