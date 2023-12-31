import { ScrollView, View, Text, StyleSheet, } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const PP = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'black' }}>
       <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          duration={1000}
          delay={500}
          style={{...style.glowyTextCrown, marginBottom: 10,position:'absolute',top:45,left:88 }}
        >
          <FontAwesome5 name="crown" size={25} color='black' />
       </Animatable.Text>
      <Text style={{fontWeight:700,fontSize:35,textAlign:'center',color:'pink',marginTop:70,marginBottom:15,paddingBottom:10,borderBottomWidth:3,borderBottomColor:'white'}}>
                 Picture Pulse
      </Text>

      <Text style={{fontWeight:700,fontSize:30,textAlign:'center',color:'pink',marginBottom:10}}>
      Terms of Service
      </Text>

      <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'pink', textAlign: 'left', marginLeft:15, }}>
        <Text style={{color:'rgba(204, 0, 102, 1)'}}>Welcome to Picture Pulse Photo Editor! These Terms of Service outline
         the terms and conditions under which you may use our mobile application and related services. </Text>
            {"\n"}By accessing or using
                   Picture Pulse, you agree to comply with and be bound by these terms. If you do not agree with any part of these
                    terms, please do not use our services.
        {"\n"}
        {"\n"}
        <Text style={{fontWeight:700,fontSize:30,color:'rgba(204, 0, 102, 1)'}}>1. User Agreement</Text>
        {"\n"}
        {"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}>1.1 Acceptance of Terms: </Text>
       {"\n"}
       By using Picture Pulse, you agree to abide by these Terms of Service.
           {"\n"} {"\n"}
         <Text style={{fontWeight:700,fontSize:20,color:'white'}}>1.2 Age Restriction: </Text>
         {"\n"}
          Picture Pulse is intended for users aged 13 and older. By using the service, you confirm that you are at least 13 years old.
         {"\n"} {"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}>1.3 Account Creation:  </Text>
          {"\n"}
          Some features of Picture Pulse may require you to create an account. You are responsible for maintaining the confidentiality of your account information.
         {"\n"}   {"\n"}
        <Text style={{fontWeight:700,fontSize:30,color:'rgba(204, 0, 102, 1)'}}>2. User Conduct </Text>
          {"\n"}  {"\n"}
       <Text style={{fontWeight:700,fontSize:20,color:'white'}}>2.1 Prohibited Activities: </Text>
        {"\n"}
        You agree not to engage in any activities that may violate these terms or any applicable laws.
        {"\n"}  {"\n"}
       <Text style={{fontWeight:700,fontSize:20,color:'white'}}>2.2 Content Usage: </Text>
       You are solely responsible for the content you create, edit, or share using Picture Pulse.
        {"\n"}  {"\n"}
       <Text style={{fontWeight:700,fontSize:30,color:'rgba(204, 0, 102, 1)'}}>3. Intellectual Property </Text>
        {"\n"}  {"\n"}
       <Text style={{fontWeight:700,fontSize:20,color:'white'}}>3.1 Ownership: </Text>
        {"\n"}
       Picture Pulse and its content are protected by intellectual property laws. You agree not to reproduce, distribute, or create derivative works without our explicit consent.
        {"\n"}  {"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}>3.2 User Content: </Text>
        {"\n"}
        By using Picture Pulse, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute your user-generated content for the purpose of providing and improving our services.
        {"\n"}  {"\n"}
        <Text style={{fontWeight:700,fontSize:30,color:'rgba(204, 0, 102, 1)'}}>4. Privacy </Text>
          {"\n"}  {"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}>4.1 Privacy Policy: </Text>
          {"\n"}
          Your use of Picture Pulse is also governed by our Privacy Policy. Please review it to understand our practices.
  {"\n"}  {"\n"}
       <Text style={{fontWeight:700,fontSize:30,color:'rgba(204, 0, 102, 1)'}}>5. Termination </Text>
        {"\n"}  {"\n"}
       <Text style={{fontWeight:700,fontSize:20,color:'white'}}>5.1 Termination by Us: </Text>
        {"\n"}
       We reserve the right to terminate or suspend your access to Picture Pulse at our discretion.
        {"\n"}  {"\n"}
       <Text style={{fontWeight:700,fontSize:20,color:'white'}}>5.2 Termination by You: </Text>
       {"\n"}
        You may stop using Picture Pulse at any time.
        {"\n"}{"\n"}
       <Text style={{fontWeight:700,fontSize:30,color:'rgba(204, 0, 102, 1)'}}>6. Disclaimers and Limitations of Liability </Text>
         {"\n"}{"\n"}
       <Text style={{fontWeight:700,fontSize:20,color:'white'}}>6.1 No Warranty: </Text>
         {"\n"}
       Picture Pulse is provided "as is" without any warranty.
  {"\n"}{"\n"}
       <Text style={{fontWeight:700,fontSize:20,color:'white'}}>6.2 Limitation of Liability: </Text>
         {"\n"}
       In no event shall Picture Pulse be liable for any indirect, consequential, or incidental damages.
  {"\n"}{"\n"}
       <Text style={{fontWeight:700,fontSize:30,color:'rgba(204, 0, 102, 1)'}}>7. Changes to Terms </Text>
         {"\n"}{"\n"}
       <Text style={{fontWeight:700,fontSize:20,color:'white'}}> 7.1 Updates: </Text>
         {"\n"}
        These Terms of Service may be updated from time to time. We will notify you of significant changes.
          {"\n"}{"\n"}
      </Text>
    </ScrollView>
  );
};

export default PP;


const style = StyleSheet.create({
glowyTextCrown: {
  fontSize: 15,
  fontWeight: 'bold',
  color:'rgba(204, 0, 102, 1)',
  textShadowColor:'pink',
  textShadowRadius: 10,
},
});
