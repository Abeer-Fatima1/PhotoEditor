import React, { useState, useRef,useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView,Button,  DeviceEventEmitter,Dimensions } from 'react-native';
import { Surface } from 'gl-react-expo';
import { captureRef } from 'react-native-view-shot';
import {
  Valencia,
  Brannan,
  Amaro,
  Earlybird,
  F1977,
  Hudson,
  Inkwell,
  Lokofi,
  LordKelvin,
  Nashville,
  Normal,
  Rise,
  Sierra,
  Sutro,
  Toaster,
  Walden,
  XproII,
} from "./ImageEffects";
import GLImage from "./GLImage";
import { useRoute,navigation } from '@react-navigation/native';

const Filter = ({route,navigation}) => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filteredImage, setFilteredImage] = useState(null);
  const { uri, aspectRatio } = route.params;
  const viewRef = useRef(null);

   const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
    const imageAspectRatio = aspectRatio || 1; // Set your image's aspect ratio
    const containerAspectRatio = windowWidth / windowHeight;
    let imageWidth, imageHeight;

    if (containerAspectRatio > imageAspectRatio) {
      // Window is wider than image, adjust height to fit
      imageWidth = windowWidth;
      imageHeight = windowWidth / imageAspectRatio;
    } else {
      // Window is taller than image, adjust width to fit
      imageHeight = windowHeight;
      imageWidth = windowHeight * imageAspectRatio;
    }

   const handleSnapshot = async () => {
        if (viewRef.current) {
          const Img = await captureRef(viewRef, {
            format: 'png',
            quality: 1.0,
          });

       DeviceEventEmitter.emit("Filter", {Img});
       navigation.goBack();
       };

    }

  const applyFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const filters = [
    { name: 'Original', filterComponent: Normal },
    { name: 'Valencia', filterComponent: Valencia },
    { name: 'Brannan', filterComponent: Brannan },
    { name: 'Amaro', filterComponent: Amaro },
    { name: 'Earlybird', filterComponent: Earlybird },
    { name: 'F1977', filterComponent: F1977 },
    { name: 'Hudson', filterComponent: Hudson },
    { name: 'LordKelvin', filterComponent: LordKelvin },
    { name: 'Inkwell', filterComponent: Inkwell },
    { name: 'Lokofi', filterComponent: Lokofi },
    { name: 'Nashville', filterComponent: Nashville },
    { name: 'Rise', filterComponent: Rise },
    { name: 'Sierra', filterComponent: Sierra },
    { name: 'Sutro', filterComponent: Sutro },
    { name: 'Toaster', filterComponent: Toaster },
    { name: 'Walden', filterComponent: Walden },
    { name: 'XproII', filterComponent: XproII },
  ];

  const FilterComponent = selectedFilter && filters.find(item => item.name === selectedFilter)?.filterComponent;

  return (
    <View style={styles.container}>
    <View style={{flex:1}}>
       <TouchableOpacity onPress={handleSnapshot} style={{ flex:1,borderRadius:15,position:'absolute',top:50,left:280,width:120,height:50,borderWidth:2,borderColor:'pink' }}>
                   <Text style={{color:'pink',fontSize:15,position:'absolute',bottom:10,fontSize:20,textAlign:'center',left:25}}> Done</Text>
          </TouchableOpacity>
    </View>
      <View style={styles.filterContainer}>
        {selectedFilter ? (
          <Surface style={{width: 430, height: 500 ,alignSelf:'center',resizeMode:'contain'}} pixelRatio={2} ref={viewRef}>
            {FilterComponent && (
              <FilterComponent >
                <GLImage {...{ source: { uri }, resizeMode: "contain", aspectRatio }} />
              </FilterComponent>
            )}
          </Surface>
        ) : (
          <Image
            style={styles.image}
            source={{ uri }}
            resizeMode={'contain'}
          />
        )}
      </View>
      <ScrollView horizontal style={styles.bottomImagesContainer}>
        {filters.map((item) => (
          <TouchableOpacity key={item.name} onPress={() => applyFilter(item.name)}>
            <Surface style={styles.filterSelector}>
              <item.filterComponent>
                <GLImage {...{ source: { uri }, resizeMode: "contain", aspectRatio }} />
              </item.filterComponent>
            </Surface>
            <Text style={styles.filterTitle}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
 backgroundColor:'black',
  },

  filterContainer: {
    flex: 1,
     backgroundColor:'black',
     marginTop:130,
  },

  bottomImagesContainer: {
    paddingTop:20,
    flexDirection: 'row',
    marginTop:530,
    backgroundColor:'black',
    borderTopColor:'pink',
    borderTopWidth:2,
  },

  filterSelector: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },

  filterTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },

  image: {
    width: 520,
    height: 520,
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default Filter;

