import React, { useState,useEffect,useRef } from "react";
import * as Animatable from 'react-native-animatable';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from '@expo/vector-icons';


export default function Splash({navigation}){

useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem('FirstTimePicture');
        if (isFirstTime === null) {
          // App is opened for the first time
          await AsyncStorage.setItem('FirstTimePicture', 'false');
          // Navigate to onboarding
          setTimeout(() => {
          navigation.navigate("Onboarding");
          }, 1000);
        } else {
          // App has been opened before
          // Navigate to login
           setTimeout(() => {
          navigation.navigate("Login");
            }, 700);
        }
      } catch (error) {
        console.error("Error checking first time:", error);
      }
    };

    checkFirstTime();
  }, [navigation]);

return(

    <View style={style.Container}>
            <Animatable.Text
                      animation="pulse"
                      easing="ease-out"
                      iterationCount="infinite"
                      duration={1000}
                      delay={500}
                      style={{...style.glowyText, marginBottom: 10,position:'absolute',top:335,left:167 }}
                    >
                    <FontAwesome5 name="crown" size={45}   />
            </Animatable.Text>
                   <Text style={style.glowyText2}> P </Text>
    </View>

);
}


const style = StyleSheet.create({

glowyText: {
  fontSize: 100,
  fontWeight: 'bold',
  color: 'black',
  textShadowColor: 'pink',
  textShadowRadius: 10,
},

glowyText2: {
  fontSize: 100,
  fontWeight: 'bold',
  color: 'pink',
  textShadowRadius: 10,
},

Container: {
  flex: 1,
  alignItems: 'center',
  justifyContent :'center',
  backgroundColor:'black',
},

});
