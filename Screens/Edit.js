import React, {useState,useEffect} from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  DeviceEventEmitter,
  Dimensions,
} from "react-native";
import { useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

const ButtonList = ({ data }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={style.button}
      onPress={item.onPress}
    >
      <FontAwesome5 name={item.icon} size={25} color="white" />
      <Text style={style.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={style.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default function Edit({navigation}) {
  const route = useRoute();
  const myProp = route.params?.myProp || 'Default Value';
  const [editedImage, setEditedImage] = useState(myProp);
  const [save, setSave] = useState(false);

  //EventEmitter for receiving Cropped Image from Crop.js
  useEffect(() => {
    // Setting up the event listener
     const subscription = DeviceEventEmitter.addListener("CropDone", ({result}) =>
     setEditedImage(result.uri));

    // Cleaning up the event listener when the component unmounts
    return () => {
      subscription.remove();
    };
  }, [editedImage]);

  useEffect(() => {
    // Setting up the event listener
     const subscription = DeviceEventEmitter.addListener("Filter", ({Img}) =>
     setEditedImage(Img));

    // Cleaning up the event listener when the component unmounts
    return () => {
      subscription.remove();
    };
  }, [editedImage]);

   useEffect(() => {
      // Setting up the event listener
       const subscription = DeviceEventEmitter.addListener("Brightness", ({Img}) =>
       setEditedImage(Img));

      // Cleaning up the event listener when the component unmounts
      return () => {
        subscription.remove();
      };
    }, [editedImage]);

     useEffect(() => {
          // Setting up the event listener
           const subscription = DeviceEventEmitter.addListener("Saturation", ({Img}) =>
           setEditedImage(Img));

          // Cleaning up the event listener when the component unmounts
          return () => {
            subscription.remove();
          };
        }, [editedImage]);

    useEffect(() => {
         // Setting up the event listener
          const subscription = DeviceEventEmitter.addListener("Contrast", ({Img}) =>
          setEditedImage(Img));

         // Cleaning up the event listener when the component unmounts
         return () => {
           subscription.remove();
         };
       }, [editedImage]);


    const startCrop = () => {
      navigation.navigate("Crop", {
        selectedImage: editedImage,
      });
    };

  const applyFilter = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    // Calculate the aspect ratio based on screen dimensions
    const aspectRatio = screenWidth / screenHeight;
       navigation.navigate("Filter", { uri: editedImage, aspectRatio: aspectRatio })
     };

  const applyAnimations = () => {
       navigation.navigate("Animations", { uri: editedImage})
  }

  const Brightness = () => {
       navigation.navigate("Brightness", { uri: editedImage})
  }

  const Saturation = () => {
       navigation.navigate("Saturation", { uri: editedImage})
  }

   const Contrast = () => {
         navigation.navigate("Contrast", { uri: editedImage})
    }

     const startDrawing = () => {
             navigation.navigate("Draw", { uri: editedImage})
        }

    const saveImage = () => {
         MediaLibrary.saveToLibraryAsync(editedImage).then(() => {
                        setSave(true);
         });

        navigation.navigate("Save", { uri: editedImage,saveProp: save })
    }

  const buttonData = [
   { id: 1, title: 'Crop', icon: 'crop', onPress: startCrop },
    { id: 2, title: 'Filter', icon: 'filter', onPress: applyFilter },
    { id: 3, title: 'Brightness', icon: 'sun',onPress: Brightness },
    { id: 4, title: 'Saturation', icon: 'tint',onPress: Saturation  },
    { id: 5, title: 'Contrast', icon: 'adjust',onPress: Contrast },
  ];

  return (
    <SafeAreaView style={styles.box}>
    <TouchableOpacity onPress={saveImage} style={styles.button}>
        <Text style={{color:'pink',fontWeight:'bold',fontSize:15}}> Save </Text>
    </TouchableOpacity>
    <Image style={styles.image} source={{ uri: editedImage}} />
      <ButtonList data={buttonData} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    borderTopColor:'pink',
    borderTopWidth:2,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 15,
    paddingRight:20,
    paddingLeft:20,
    paddingBottom:10,
    alignItems:'center',
  },

  buttonText: {
  marginTop:10,
    color: 'pink',
    textAlign: 'center',
    fontSize:15,
    fontWeight:'bold',
  },
});

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'black',
  },

  image: {
    width: 420,
    height: 600,
    marginTop:40,
    objectFit:'contain',
  },

  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingLeft:20,
    paddingRight:20,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
    button: {
       position:'absolute',
       backgroundColor: 'rgba(0, 0, 0, 0.5)',
       borderRadius:20,
       padding:15,
       paddingRight:30,
       paddingLeft:30,
       right:30,
       borderWidth:2,
       top:80,
       borderColor:'pink',
      },
});



