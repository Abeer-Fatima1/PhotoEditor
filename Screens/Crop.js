import React, { useState, useEffect } from "react";
import { Image, View, TouchableOpacity, DeviceEventEmitter,Text } from "react-native";
import { ImageEditor } from "expo-image-editor";
import { useRoute } from '@react-navigation/native';

export default function Crop({ route, navigation }) {
  const { selectedImage } = route.params;

  const [imageUri, setImageUri] = useState(selectedImage);

  return (
        <ImageEditor
          visible={true}
          onCloseEditor={() => {
            navigation.goBack();
          }}
          imageUri={imageUri}
          asView={true}
          fixedCropAspectRatio={13 / 9}
          minimumCropDimensions={{
            width: 100,
            height: 100,
          }}
          onEditingComplete={(result) => {
            DeviceEventEmitter.emit("CropDone", { result });
          }}
          mode="full"
        />

  );
}