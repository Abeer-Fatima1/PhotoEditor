import { View, Animated, StyleSheet, TouchableOpacity,Text } from 'react-native';
import Svg , { G, Circle } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';

export const NextButton = ({scrollTo,scrollBack,gotoLogin,Next}) => {

  return (
    <View style={styles.container}>

{gotoLogin ?
      <TouchableOpacity onPress={scrollTo} style={styles.button2} activeOpacity={0.6}>
      <Text style={{color:'pink',fontWeight:'bold'}}> Lets Go </Text>
      </TouchableOpacity>
       : (
      <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
      <Text style={{color:'pink',fontWeight:'bold'}}> Next </Text>
      </TouchableOpacity>
  )}

{Next ?
        <TouchableOpacity onPress={scrollBack} style={styles.button1} activeOpacity={0.6}>
               <Text style={{color:'pink',fontWeight:'bold'}}> Previous </Text>
            </TouchableOpacity>
            :(<></>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black',
    height:100,
    width:500,
  },

  button: {
     position:'absolute',
     backgroundColor: 'rgba(0, 0, 0, 0.5)',
     borderRadius:20,
     padding:15,
     paddingRight:30,
     paddingLeft:30,
     right:60,
     borderWidth:2,
     borderColor:'pink',
    },

    button2: {
         position:'absolute',
         backgroundColor: 'rgba(0, 0, 0, 0.5)',
         borderRadius:20,
         padding:15,
         paddingRight:20,
         paddingLeft:20,
         borderColor:'pink',
         borderWidth:2,
         right:60,
        },

      button1: {
         position:'absolute',
         backgroundColor: 'rgba(0, 0, 0, 0.5)',
         borderRadius:20,
         padding:15,
         left:60,
         borderWidth:2,
         borderColor:'pink',
        },
  })

