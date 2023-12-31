import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Video } from 'expo-av';

export const OnboardingItem = ({item}) => {

    const {width} = useWindowDimensions();

  return (
    <View style={[styles.container,{width}]}>
    <View style={{flex:1,alignItems:'center',height:400}}>
     <Video
            source={item.video}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay={true}
            isLooping={true}
            style={{ width: 400, height: 700,borderWidth:2}}
          />
     </View>
      <View style={{position:'absolute',backgroundColor:'black',top:655,width: 400,alignItems:'center'}}>
      <Text style={styles.description} >{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:580,
  },

  image: {
    flex: 1,
    marginTop:40,
    justifyContent: 'center',
  },

  description: {
    fontWeight: '500',
    textAlign: 'center',
    marginBottom:10,
    marginTop:20,
    fontSize:17,
    width:260,
    color: 'pink',
    zIndex:1,
  },
});
