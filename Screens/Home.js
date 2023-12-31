import React, { useState,useEffect,useRef } from "react";
import * as Animatable from 'react-native-animatable';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Animated,
  Pressable,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera } from 'expo-camera';

export default function Home({navigation}){
  const [hasGalleryAccess, setHasGalleryAccess] = useState(false);
  const [dropdown, setDropDown] = useState(false);

 const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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

const AnimatedText = ({ text, style }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    rotateP();
  }, []);

  const rotateP = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: text === 'P' ? [{ rotateY: rotateInterpolate }] : [],
  };

  return (
    <Animated.Text style={[style, animatedStyle]}>{text}</Animated.Text>
  );
};

    useEffect(() => {
      // Check if the user has already granted gallery access
      checkGalleryAccess();
    }, []);

    const checkGalleryAccess = async () => {
      try {
        const accessStatus = await AsyncStorage.getItem("galleryAccess");

        if (accessStatus === "granted") {
          setHasGalleryAccess(true);
        }
      } catch (error) {
        console.error("Error reading access status from AsyncStorage", error);
      }
    };

    const requestGalleryAccess = async () => {
      try {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (result.granted) {
          setHasGalleryAccess(true);
          await AsyncStorage.setItem("galleryAccess", "granted");
        } else {
          Alert.alert(
            "Permission Denied",
            "You need to grant access to the gallery to use this feature."
          );
        }
      } catch (error) {
        console.error("Error requesting gallery access", error);
      }
    };

    const handlePickImage = async () => {
      if (!hasGalleryAccess) {
        requestGalleryAccess();
      } else {
        ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        })
          .then((response) => {
            if (!response.canceled) {
              navigation.navigate("Edit", { myProp: response.assets[0].uri });
            }
          })
          .catch((error) => {
            console.error("ImagePicker Error:", error);
          });
      }
    };

return(
<SafeAreaView style={style.Box1}>
<TouchableOpacity  style={{width:40,height:50,alignItems:'center',backgroundColor:'black',position:'absolute',top:35,left:9,zIndex:1}} onPress={()=>{dropdown ? setDropDown(false) : (setDropDown(true))}}>
     <FontAwesome5
            color='pink'
            name="cog"
            size={35}
          />
     </TouchableOpacity>
          {dropdown ?
                  <View style={style.dropdown}>
                    <TouchableOpacity onPress={() => {navigation.navigate('EditProfile'); setDropDown(false)}}>
                      <Text style={{color:'pink',textAlign:'left',marginTop:10,fontSize:16}}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('PP'); setDropDown(false)}}>
                      <Text style={{color:'pink',textAlign:'left',marginTop:10,fontSize:16}}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('TOS'); setDropDown(false)}}>
                       <Text style={{color:'pink',textAlign:'left',marginTop:10,fontSize:16}}>Terms of Service</Text>
                    </TouchableOpacity>
                  </View>

          : (<></>)}
    <View style={style.Box}>
      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          height: Dimensions.get('window').height / 2 + Dimensions.get('window').height / 7,
          alignSelf: 'center',
        }}
        source={require("../assets/pink.jpg")}
      >
      </ ImageBackground>
      <View style={style.blurOverlay}>
         <Animatable.Text
                            animation="pulse"
                            easing="ease-out"
                            iterationCount="infinite"
                            duration={1000}
                            delay={500}
                            style={{...style.glowyTextCrown, marginBottom: 10,position:'absolute',top:10,left:89 }}
                          >
                 <FontAwesome5 name="crown" size={20} color='rgba(204, 0, 102, 1)' style={{ marginBottom: 10,position:'absolute',top:15,left:108 }} />
           </Animatable.Text>

              <View style={style.rowContainer}>
               <AnimatedText text="P" style={style.glowyText} />
                <Text style={style.glowyText}>icture </Text>
                 <Animatable.Text
                        animation="pulse"
                        easing="ease-out"
                        iterationCount="infinite"
                        duration={1000}
                        delay={500}
                        style={style.glowyText}
                      >
                        Pulse
                      </Animatable.Text>
                      </View>
      </View>
    </View>

      <Animatable.Text
           animation="pulse"
           easing="ease-out"
           iterationCount="infinite"
           duration={1000}
           delay={500}
           style={{textAlign:'center',marginTop:20}}
      >
    <Text style={{color:'pink',fontSize:20,fontWeight:700,  textShadowColor: 'rgba(204, 0, 102, 1)',textShadowRadius: 30,}}>
            The Photo Editor
     </Text>
    </Animatable.Text>

    <View style={style.Container}>
         <TouchableOpacity style={{  alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 12,
                                paddingHorizontal: 136,
                                borderRadius: 15,
                                marginTop:10,
                                borderWidth:2,
                                flexDirection:'row',
                                borderColor:'rgba(450, 145, 175, 0.8)',
                                backgroundColor: 'rgba(0, 0, 0, 1)',}}  onPress={() => takePicture()}>
                <FontAwesome5 name="camera" size={20} color="white" style={{marginRight:8}} />
                <Text style={style.Text1}>CAMERA</Text>
            </TouchableOpacity>


        <TouchableOpacity style={{  alignItems: 'center',
                                      justifyContent: 'center',
                                      paddingVertical: 12,
                                      paddingHorizontal: 118,
                                      borderRadius: 15,
                                      marginTop:10,
                                      borderWidth:2,
                                      flexDirection:'row',
                                      borderColor:'rgba(450, 145, 175, 0.8)',
                                      backgroundColor: 'rgba(0, 0, 0, 1)',}}  onPress={handlePickImage}>
                      <FontAwesome5 name="edit" size={20} color="white" style={{marginRight:5}} />
                      <Text style={style.Text1}>EDIT PICTURE</Text>
                  </TouchableOpacity>

        <TouchableOpacity style={{  alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingVertical: 12,
                                    paddingHorizontal: 135,
                                    borderRadius:15,
                                    marginTop:8,
                                    flexDirection:'row',
                                    borderWidth:2,
                                    borderColor:'rgba(450, 145, 175, 0.8)',
                                    backgroundColor: 'rgba(0, 0, 0, 1)',}} onPress={handlePickImage}>
                               <FontAwesome5 name="layer-group" size={20} color="white" style={{marginRight:8}} />
                               <Text style={style.Text1}>COLLAGE</Text>
        </TouchableOpacity>

           <TouchableOpacity style={{  alignItems: 'center',
                                       justifyContent: 'center',
                                       paddingVertical: 12,
                                       paddingHorizontal: 99,
                                       borderRadius:15,
                                       marginTop:8,
                                       flexDirection:'row',
                                       borderWidth:2,
                                       borderColor:'rgba(450, 145, 175, 0.8)',
                                       backgroundColor: 'rgba(0, 0, 0, 1)',}} onPress={handlePickImage}>
                       <FontAwesome5 name="eraser" size={20} color="white" style={{marginRight:8}} />
                       <Text style={style.Text1}>OBJECT REMOVAL</Text>
                  </TouchableOpacity>
    </View>

</SafeAreaView>
);
}


const style = StyleSheet.create({
 dropdown: {
    height: 120,
    width:170,
    backgroundColor:'black',
    borderColor: 'pink',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    position:'absolute',
    top:73,
    left:9,
    zIndex:1,
    },
  icon: {
    position:'absolute',
    left:9,
    top:9,
    zIndex:100,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
Box1: {
  flex: 1,
  backgroundColor: 'black',
},

  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(450, 140, 170, 0.8)',
    zIndex: 1,
    width:'100%',
    height:'20%',
    position:'relative',
    bottom:0,
    borderRadius:20,
    alignItems:'center',
  },

Box: {
  height: Dimensions.get('window').height / 2 + Dimensions.get('window').height / 7,
},

rowContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  height: 100,
},

glowyTextCrown: {
  fontSize: 15,
  fontWeight: 'bold',
 color:'rgba(204, 0, 102, 1)',
  textShadowColor:"white",
  textShadowRadius: 10,
},

glowyText: {
  fontSize: 35,
  fontWeight: 'bold',
  color: 'rgba(0, 270, 305, 0.8)',
  textShadowColor: 'rgba(255, 20, 147, 1)',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 20,
},

Container: {
  flex: 1,
  alignItems: 'center',
  marginTop:20,
  backgroundColor: 'rgba(450, 145, 175, 0.8)',
},

Text: {
  fontSize: 30,
  fontWeight: 'bold',
  color: 'rgba(0, 240, 285, 1)',
},

Text1: {
  fontWeight:'bold',
  fontSize: 15,
  color: 'white',
  textShadowColor: 'rgba(255, 20, 147, 1)',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 10,
},

});
