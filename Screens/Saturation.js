import React, { useState,useRef } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from 'gl-react-expo';
import Slider from '@react-native-community/slider';
import { useRoute } from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  StyleSheet,
  DeviceEventEmitter,
  TouchableOpacity,
} from "react-native";
import {
  Saturate
} from "./AdvanceEffects";
import { FontAwesome5 } from '@expo/vector-icons';
import GLImage from "./GLImage";
import { captureRef } from 'react-native-view-shot';

const Saturation = ({ route,navigation }) => {
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const { uri } = route.params;

  const viewRef = useRef(null);

    const handleSnapshot = async () => {
            if (viewRef.current) {
              const Img = await captureRef(viewRef, {
                format: 'png',
                quality: 1.0,
              });

           DeviceEventEmitter.emit("Saturation", {Img});
           navigation.goBack();
           };

        }

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'black',}}>
               <TouchableOpacity onPress={handleSnapshot} style={{ flex:1,borderRadius:15,position:'absolute',top:70,left:270,width:120,height:50,borderWidth:2,borderColor:'pink' }}>
                           <Text style={{color:'pink',fontSize:15,position:'absolute',bottom:10,fontSize:20,textAlign:'center',left:25}}> Done</Text>
                  </TouchableOpacity>
        <View style={{flex:1,backgroundColor:'black',marginTop:200}}>
          <Surface style={{width: 430, height: 500 ,alignSelf:'center',resizeMode:'contain'}} ref={viewRef}>
            <Saturate contrast={contrast} saturation={saturation} brightness={brightness}>
                 <GLImage {...{ source: { uri }, resizeMode: "contain"}} />
            </Saturate>
          </Surface>
        </View>

          <View style={{ marginBottom:50,width:380,borderTopWidth:2,borderTopColor:'pink',paddingTop:40,alignItems:"center"}}>
            <FontAwesome5 name='tint' size={25} color="white" style={{position:'absolute',right:330,marginTop:35}}/>
            <Slider
              step={0.1}
              minimumValue={0.1}
              maximumValue={2.0}
              value={brightness}
              onValueChange={(value) => setSaturation(value)}
              thumbTintColor="pink"
              minimumTrackTintColor="pink"
              maximumTrackTintColor="white"
              style={{ width: 300 }}
            />
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 520,
    height: 520,
    marginVertical: 10,
    alignSelf: 'center',
  }
});


export default Saturation;
