import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import ViewShot, {captureRef} from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';

const Save = ({route,navigation}) => {
  const ref = useRef();
  const { uri, save } = route.params;

   const shareImage = async () => {
     try {
       const imageUri = await captureRef(ref, {
         format: 'png',
         quality: 0.7,
       });

       await Sharing.shareAsync(imageUri);
     } catch (error) {
       console.error('Error sharing image:', error);
     }
   };;

  return (
    <SafeAreaView style={{ flex:1 , backgroundColor:'black',}}>
    <View style={{width:400,height:160,alignItems:'center',justifyContent:'center',
            borderBottomWidth: 1, borderBottomColor: 'pink',marginTop:20,backgroundColor:'black'}}>
                        <Animatable.Text
                                  animation="pulse"
                                  easing="ease-out"
                                  iterationCount="infinite"
                                  duration={1000}
                                  delay={500}
                                  style={{...styles.glowyText,position:'relative',top:28,right:3}}
                                >
                                <FontAwesome5 name="crown" size={35}/>
                        </Animatable.Text>
                         <Animatable.Text
                           animation="pulse"
                           easing="ease-out"
                           iterationCount="infinite"
                           duration={1000}
                           delay={500}
                             style={{
                               ...styles.glowyText2,
                               height: 100,
                             }}
                         >
                                P
                         </Animatable.Text>
                               </View>
      <View style={styles.container}>
        <ViewShot ref={ref} style={{borderWidth:2,borderColor:'black',marginTop:10,marginBottom:20,width:400,height:500,alignItems:'center',justifyContent:'center'}}>
          <Image
            style={styles.generatedImage}
            source={{
              uri: uri,
            }}
          />
        </ViewShot>

      {{save} ?
             <View style={styles.generateButton}>
                 <Text style={styles.generateButtonText}>Image Saved</Text>
             </View>
         :(
             <View style={styles.generateButton}>
                  <Text style={styles.generateButtonText}>Error</Text>
             </View>
         )
      }

        <TouchableOpacity style={styles.generateButton} onPress={shareImage}>
          <Text style={styles.generateButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
                <TouchableOpacity onPress={() => navigation.navigate("Edit")} style={styles.button1} activeOpacity={0.6}>
                             <Text style={{color:'pink',fontWeight:'bold'}}> Go Back </Text>
                          </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Save;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor:'black',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth:2,
    borderColor:'black',
  },
  generateButton: {
    height: 50,
    width: 400,
    backgroundColor: 'black',
    borderRadius: 10,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2,
    borderColor:'pink',
    backgroundColor:'black',
  },
  generateButtonText: {
    color: 'pink',
    fontWeight:'bold',
    fontSize:17,
  },
  generatedImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  generatedImage: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
    glowyText: {
      fontSize: 100,
      fontWeight: 'bold',
      color: 'black',
      textShadowColor: 'pink',
      textShadowRadius: 10,
      textAlign:'center',
    },
    glowyText2: {
      fontSize: 80,
      fontWeight: '500',
      color: 'pink',
    },
          button1: {
             position:'absolute',
             backgroundColor: 'rgba(0, 0, 0, 0.5)',
             borderRadius:20,
             padding:15,
             left:20,
             borderWidth:2,
             borderColor:'pink',
             top:50,
            },
});
