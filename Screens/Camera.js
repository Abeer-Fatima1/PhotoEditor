import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome5 } from '@expo/vector-icons';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleCamera = () => {
    setIsFrontCamera((prev) => !prev);
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log('Photo taken:', photo);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={isFrontCamera ? Camera.Constants.Type.front : Camera.Constants.Type.back}
          ref={(ref) => setCameraRef(ref)}
        />
        <View style={styles.filter} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <FontAwesome5 name="camera" size={25} color="pink" />
        </TouchableOpacity>

        <View style={styles.toggle}>
          <TouchableOpacity onPress={toggleCamera}>
            <FontAwesome5 name="sync-alt" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 0.7,
    zIndex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  toggle: {
    position: 'absolute',
    left: 80,
    top: 90,
  },
  buttonContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  captureButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 25,
    marginBottom: 35,
  },
  filter: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
     backgroundColor: 'rgba(0, 255, 255, 0.2)',
  },
});

//backgroundColor: 'rgba(255, 204, 153, 0.6)'

export default CameraComponent;
