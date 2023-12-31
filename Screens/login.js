import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Pressable,Animated,  BackHandler, } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config";
import * as Animatable from 'react-native-animatable';

function Login() {
    const navigation = useNavigation();
    const [loading,setLoading] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState(false);

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

    useEffect(() => {
       setLoading(true);
       const unsubscribe = auth.onAuthStateChanged((authUser) => {
         if (!authUser) {
           setLoading(false);
         }
         if (authUser) {
           navigation.replace("Home");
         }
       });

       return unsubscribe;
     }, []);

     const handleForgotPassword = () => {
     if (email) {
       sendPasswordResetEmail(auth, email)
         .then(() => {
           console.log("Password reset email sent successfully.");
         })
         .catch((error) => {
           console.error("Error sending password reset email:");
         });
     } else {
       console.error("Email is required for password reset.");
     }
   };

   const LoginCredentials = () => {
   if ( email === "" || password === "" ){
             Alert.alert(
               "Invalid Details",
               "Please fill all the details",
               [
                 {
                   text: "Cancel",
                   onPress: () => console.log("Cancel Pressed"),
                   style: "cancel"
                 },
                 { text: "OK"}
               ],
               { cancelable: false }
             );
 }

     signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
         const user = userCredential.user;
         setError(false);
       })
       .catch((error) => {
         setError(true);
       });
   };
  return (
    <View style={styles.container}>
    <View style={{width:400,height:160,alignItems:'center',justifyContent:'center',
    borderBottomWidth: 1, borderBottomColor: 'pink',}}>
                <Animatable.Text
                          animation="pulse"
                          easing="ease-out"
                          iterationCount="infinite"
                          duration={1000}
                          delay={500}
                          style={{...styles.glowyText,position:'relative',top:22,right:3}}
                        >
                        <FontAwesome5 name="crown" size={37}/>
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
     <View style={styles.Middle}>
        <Text style={styles.LoginText}>Login</Text>
      </View>
      <View style={styles.text2}>
        <Text style={{fontWeight:900,color:'white'}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")} ><Text style={styles.signupText}> Sign up</Text></TouchableOpacity>
      </View>


       <View style={styles.buttonStyle}>

        <View style={styles.emailInput}>
          <Input
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="user-secret" />}
                size="sm"
                m={2}
                _light={{
                  color: "white",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
             onChangeText = {(email) => setEmail(email)}
            variant="outline"
            placeholder="Email"
            color="white"
            _light={{
              placeholderTextColor: "pink.200",
            }}
            _dark={{
              placeholderTextColor: "pink.50",
            }}

          />
        </View>
      </View>


      <View style={styles.buttonStyleX}>

        <View style={styles.emailInput}>
          <Input
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="key" />}
                size="sm"
                m={2}
                _light={{
                  color: "white",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            secureTextEntry={true}
            onChangeText = {(password) => setPassword(password)}
            placeholder="Password"
            color="white"
            _light={{
              placeholderTextColor: "pink.200",
            }}
            _dark={{
              placeholderTextColor: "pink.200",
            }}
          />
        </View>
      </View>


      <View style={styles.buttonStyle1}>
        <Button style={styles.buttonDesign} onPress={()=> LoginCredentials(email,password)}>
             <Text style={{ color:'black', fontWeight:900}}> LOGIN </Text>
        </Button>
      </View>

        <Pressable
                    onPress={handleForgotPassword}
                    style={{
                      marginTop: 20,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ color: "#318CE7", fontSize: 16,color:'white',fontWeight:900 }}>
                      Forgot Password?
                    </Text>
        </Pressable>

          {error && (
              <View style={{width:360,height:45,backgroundColor:'rgba(220, 0, 0, 1)',marginTop:20,borderRadius:17,marginLeft:20}}>
                  <Text style={{color:'white',textAlign:'center',fontWeight:'bold',marginTop:9,fontSize:17}}>
                         Invalid Credentials
                  </Text>
              </View>
             )
            }
    </View>
  );
}

export default Login;



const styles = StyleSheet.create({
  container: {
    flex: 1,
     justifyContent:'center',
     backgroundColor:'black',
  },
  LoginText: {
    fontSize:30,
    fontWeight:'bold',
    color:'pink',
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
  Middle:{
    alignItems:'center',
    justifyContent:'center',
    color:'pink',
    height:60,
  },
  text2:{
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:5,
    color:'pink',
  },
  signupText:{
    fontWeight:'bold',
    color:'pink',
  },
  emailField:{
    marginTop:30,
    marginLeft:15,
  },
  emailInput:{
    marginTop:10,
    marginRight:5
  },
 buttonStyle:{
     marginTop:30,
     marginLeft:15,
     marginRight:15,
   },
    buttonStyle1:{
       marginTop:30,
       marginLeft:15,
       marginRight:15,
       backgroundColor:"pink",
       borderRadius:10,
       borderWidth:2,
       borderColor:'pink',
     },
   buttonStyleX:{
     marginTop:12,
     marginLeft:15,
     marginRight:15
   },
   buttonDesign:{
   backgroundColor: 'pink',
   },
  lineStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    alignItems:'center'
  },
  imageStyle:{
    width:80,
    height:80,
    marginLeft:20,
  },
  boxStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    justifyContent:'space-around'
  },
});