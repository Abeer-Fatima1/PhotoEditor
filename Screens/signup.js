import { StatusBar } from 'expo-status-bar';
import React, { useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity,Animated, } from 'react-native';
import { Input, Button,NativeBaseProvider, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config";
import { doc, setDoc } from "firebase/firestore";
import * as Animatable from 'react-native-animatable';

function Signup() {
    const navigation = useNavigation();

    const [error, setError] = useState(false);
    const [account, setAccount] = useState(false);
    const [user, setUser] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

Registration = async (user, email, password, confirmPassword) => {
  try {

    if ( user === "" || email === "" || password === "" || confirmPassword === "")

        {
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
    if (password !== confirmPassword) {
      setError(true);
      return;
    }

    setError(false);


createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
  const user = userCredential.user.email; // Access the email using userCredential.user.email
  const myUserUid = auth.currentUser.uid;

  setDoc(doc(db, "users", myUserUid), {
    user: user,
    email: email,
    password: password,
  });
});

      setAccount(true);

      setTimeout(() => {
          setAccount(false);
      }, 2000);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('The email address is already in use. Please use a different email.');
    } else {
      alert('User registration failed. Please try again.');
    }
  }
};


  return (
    <View style={styles.container}>
    <View style={{width:400,height:100,alignItems:'center',justifyContent:'flex-start'
    ,borderBottomWidth: 1, borderBottomColor: 'pink',}}>
                    <Animatable.Text
                              animation="pulse"
                              easing="ease-out"
                              iterationCount="infinite"
                              duration={1000}
                              delay={500}
                              style={{...styles.glowyText,position:'relative',top:31,right:3}}
                            >
                            <FontAwesome5 name="crown" size={20}/>
                    </Animatable.Text>
                     <Animatable.Text
                       animation="pulse"
                       easing="ease-out"
                       iterationCount="infinite"
                       duration={1000}
                       delay={500}
                         style={{
                           ...styles.glowyText2,
                           height: 60,
                           position:'relative',
                           bottom:0,
                           top:20,
                         }}
                     >
                            P
                     </Animatable.Text>
                           </View>
      <View style={styles.Middle}>
        <Text style={styles.LoginText}>Signup</Text>
      </View>
      <View style={styles.text2}>
        <Text style={{ fontWeight:'bold',color:'white',}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} ><Text style={styles.signupText}> Login </Text></TouchableOpacity>
      </View>

      {/* Username  */}
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
            variant="outline"
            color="white"
            placeholder="Username"
            onChangeText = {(user) => setUser(user)}
         _light={{
                    placeholderTextColor: "pink.200",
                  }}
                  _dark={{
                    placeholderTextColor: "pink.200",
                  }}
          />
        </View>
      </View>

      {/* Email Input Field */}
      <View style={styles.buttonStyleX}>

        <View style={styles.emailInput}>
          <Input
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="email" />}
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
            placeholder="Email"
              color="white"
             onChangeText = {(email) => setEmail(email)}
            _light={{
                       placeholderTextColor: "pink.200",
                     }}
                     _dark={{
                       placeholderTextColor: "pink.200",
                     }}

          />
        </View>
      </View>

      {/* Password Input Field */}
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
              color="white"
            secureTextEntry={true}
            placeholder="Password"
            onChangeText = {(password) => setPassword(password)}
             _light={{
                        placeholderTextColor: "pink.200",
                      }}
                      _dark={{
                        placeholderTextColor: "pink.200",
                      }}
          />
        </View>
      </View>

      {/* Confirm Password Input Field */}
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
              color="white"
            secureTextEntry={true}
            placeholder="Confirm Password"
            onChangeText = {(password) => setConfirmPassword(password)}
             _light={{
                        placeholderTextColor: "pink.200",
                      }}
                      _dark={{
                        placeholderTextColor: "pink.200",
                      }}
          />
        </View>
      </View>

      {/* Button */}
      <View style={styles.buttonStyle1}>
        <Button style={styles.buttonDesign} onPress={()=> Registration(user,email,password,confirmPassword)}>
            <Text style={{ color:'black', fontWeight:900}}> REGISTER NOW </Text>
        </Button>
      </View>

     {error && (
   <View style={{width:360,height:50,backgroundColor:'rgba(220, 0, 0, 1)',marginTop:20,borderRadius:17,marginLeft:20}}>
      <Text style={{color:'white',textAlign:'center',fontWeight:'bold',marginTop:12}}>
        Password and Confirm Password Do Not Match
      </Text>
   </View>
      )
     }

     {account && (
        <View style={{width:350,height:50,backgroundColor:'rgba(0, 208, 0, 0.5)',marginTop:20,borderRadius:20,marginLeft:25}}>
             <Text style={{color:'white',fontSize:15,fontWeight:'bold',marginTop:12,textAlign:'center'}}>
                    Your Account has been Created
             </Text>
        </View>
           )
          }
    </View>
  );
}

export default Signup;


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
  Middle:{
    alignItems:'center',
    justifyContent:'center',
  },
  text2:{
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:5
  },
  signupText:{
    fontWeight:'bold',
    color:'pink',
  },
  emailField:{
   borderWidth:1,
    borderColor:'red',
    marginTop:30,
    marginLeft:15
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
  glowyText: {
      fontSize: 100,
      fontWeight: 'bold',
      color: 'black',
      textShadowColor: 'pink',
      textShadowRadius: 10,
      textAlign:'center',
    },
    glowyText2: {
      fontSize: 40,
      fontWeight: '500',
      color: 'pink',
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