import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button,TouchableOpacity,Animated,StyleSheet} from 'react-native';
import { auth, db } from "../config";
import { getDoc, doc, updateDoc} from "firebase/firestore";
import { reauthenticateWithCredential,EmailAuthProvider,updatePassword} from "firebase/auth";
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';

const EditProfile = () => {
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [passwordChange, setPasswordChange] = useState(false);
  const [showPassFields, setShowPassFields] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [error,setError] = useState(false);
  const [passError,setPassError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setCurrentUsername(userData.user);
          setCurrentEmail(userData.email);
        } else {
          // Handle the case when the document doesn't exist
          setCurrentUsername("No username found");
          setCurrentEmail("No email found");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleUpdateUsername = async () => {
      const user = auth.currentUser.uid;

    if (user) {
      const userDocRef = doc(db, 'users', user);

      // Use updateDoc to update specific fields in the document
      await updateDoc(userDocRef, {
        user: currentUsername,
        email: currentEmail,
      });

      setIsEditMode(false);
    }
  };

  const handleChangePassword = async () => {
    try {
       const user = auth.currentUser;

          const credentials = EmailAuthProvider.credential(user.email, oldPassword);
          const verify = await reauthenticateWithCredential(user, credentials);

      if (verify) {
        setPasswordChange(false);
        setShowPassFields(true);
         setPassError(false);
      }
    } catch (error) {
    setPassError(true);
    }
  };

  const updatePass = async () =>{
    const user = auth.currentUser;

    if(newPassword != confirmNewPassword)
    {
        setError(true);
        return;
    }

        setError(false);
      if (user) {
      await updatePassword(user, newPassword);

        const userDocRef = doc(db, 'users', user.uid);

        await updateDoc(userDocRef, {
          password : newPassword
        });

        setShowPassFields(false);
      }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop:30, backgroundColor: 'black' }}>
    <View style={{width:400,height:160,alignItems:'center',justifyContent:'center',
        borderBottomWidth: 1, borderBottomColor: 'pink',}}>
                    <Animatable.Text
                              animation="pulse"
                              easing="ease-out"
                              iterationCount="infinite"
                              duration={1000}
                              delay={500}
                              style={{...style.glowyText,position:'relative',top:22,right:3}}
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
                           ...style.glowyText2,
                           height: 100,
                         }}
                     >
                            P
                     </Animatable.Text>
                           </View>
   {passError ? (
     <View style={{ width: 250, height: 40, backgroundColor: 'rgba(220, 0, 0, 1)', borderRadius: 10, marginTop: 10 }}>
       <Text style={{ color: 'white', textAlign: 'center', marginTop: 7, fontWeight: 'bold' }}>
         Wrong Password !
       </Text>
     </View>
   ) : (
     <></>
   )}
   {showPassFields ? (
     <>
        <Text style={{ color: 'pink', marginTop: 30, fontWeight: 'bold', fontSize: 17 }}>Enter New Password:</Text>
       <TextInput
         style={{color: 'rgba(204, 0, 102, 1)', borderWidth: 1, borderColor: 'pink', padding: 8, borderRadius: 4, fontWeight: 'bold', fontSize: 20, marginTop: 5 }}
         placeholder="Enter Your Password"
         value={newPassword}
         secureTextEntry={true}
         onChangeText={(text) => setNewPassword(text)}
       />
       <Text style={{ color: 'pink', marginTop: 10, width: 170, fontSize: 17, fontWeight: 'bold' }}>Confirm Password:</Text>
       <TextInput
         style={{ color: 'rgba(204, 0, 102, 1)', borderWidth: 1, borderColor: 'pink', padding: 8, borderRadius: 4, fontWeight: 'bold', fontSize: 20, marginTop: 5 }}
         placeholder="Enter Your Password"
         value={confirmNewPassword}
         secureTextEntry={true}
         onChangeText={(text) => setConfirmNewPassword(text)}
       />
       <TouchableOpacity onPress={updatePass} style={{ backgroundColor: 'pink', marginTop: 20, height: 40, width: 300, borderRadius: 15 }}>
            <Text style={style.text}>Update </Text>
       </TouchableOpacity>
     </>
   ) : (
     <>
     {passwordChange ? (
          <>
            <Text style={{ color: 'pink', marginTop: 30, fontWeight: 'bold', fontSize: 17 }}>
              Enter Your Old Password:
            </Text>
            <TextInput
              style={{
                color: 'rgba(204, 0, 102, 1)',
                borderWidth: 1,
                borderColor: 'pink',
                padding: 8,
                borderRadius: 4,
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 5,
              }}
              placeholder="Enter Your Password"
              value={oldPassword}
              secureTextEntry={true}
              onChangeText={(text) => setOldPassword(text)}
            />
            <TouchableOpacity onPress={handleChangePassword} style={{ backgroundColor: 'pink', marginTop: 20, height: 40, width: 230, borderRadius: 15 }}>
              <Text style={style.text}> Verify </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setPasswordChange(false); setPassError(false); setOldPassword(''); }} style={{ backgroundColor: 'pink', marginTop: 20, height: 40, width: 230, borderRadius: 15 }}>
              <Text style={style.text}> Cancel </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {!isEditMode ? (
              <View>
                <Text style={{ color: 'pink', borderBottomWidth: 2, borderBottomColor: 'white', marginTop: 30, width: 128, fontWeight: 'bold', fontSize: 25 }}>
                  Username
                </Text>
                <Text style={{ color: 'rgba(204, 0, 102, 1)', fontWeight: 'bold', fontSize: 20, marginTop: 5 }}>{currentUsername}</Text>
                <Text style={{ color: 'pink', borderBottomWidth: 2, borderBottomColor: 'white', marginTop: 10, width: 70, fontSize: 25, fontWeight: 'bold' }}>Email</Text>
                <Text style={{ color: 'rgba(204, 0, 102, 1)', fontWeight: 'bold', fontSize: 20, marginTop: 5 }}>{currentEmail}</Text>
                <TouchableOpacity onPress={handleEditClick} style={{ backgroundColor: 'pink', marginTop: 20, height: 40, width: 300, borderRadius: 15 }}>
                  <Text style={style.text}> Edit </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPasswordChange(true)} style={{ backgroundColor: 'pink', marginTop: 20, height: 40, borderRadius: 15 }}>
                  <Text style={style.text}> Change Password </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={{ color: 'pink', marginTop: 30, width: 128, fontWeight: 'bold', fontSize: 25 }}>Username </Text>
                <TextInput
                  style={{ color: 'rgba(204, 0, 102, 1)', borderWidth: 1, borderColor: 'pink', padding: 8, borderRadius: 4, fontWeight: 'bold', fontSize: 20, marginTop: 5 }}
                  placeholder="Enter username"
                  value={currentUsername}
                  onChangeText={(text) => setCurrentUsername(text)}
                />
                <Text style={{ color: 'pink', marginTop: 10, width: 70, fontSize: 25, fontWeight: 'bold' }}>Email</Text>
                <TextInput
                  style={{ color: 'rgba(204, 0, 102, 1)', borderWidth: 1, borderColor: 'pink', padding: 8, borderRadius: 4, fontWeight: 'bold', fontSize: 20, marginTop: 5 }}
                  placeholder="Enter email"
                  value={currentEmail}
                  onChangeText={(text) => setCurrentEmail(text)}
                />
                <TouchableOpacity onPress={handleUpdateUsername} style={{ backgroundColor: 'pink', marginTop: 20, height: 40, width: 300, borderRadius: 15 }}>
                  <Text style={style.text}> Update </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsEditMode(false)} style={{ backgroundColor: 'pink', marginTop: 20, height: 40, width: 300, borderRadius: 15 }}>
                  <Text style={style.text}> Cancel </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
     </>
   )}
      {error ?
         <View style={{width:300,height:50,backgroundColor:'rgba(220, 0, 0, 1)',borderRadius:10,marginTop:10,paddingLeft:10,
         paddingRight:10}}>
              <Text style={{color:'white',textAlign:'center',fontWeight:'bold'}}>
                     Confirm Password and New Password Do not Match
              </Text>
         </View>
      :(<></>)}
    </View>
  );
};

export default EditProfile;


const style = StyleSheet.create({
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

  text:{
   textAlign:'center',
   marginTop:7,
   fontWeight:'bold',
   fontSize:17,
  },
});