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
      <Text style={{fontWeight:700,fontSize:35,textAlign:'center',color:'pink',marginTop:70,marginBottom:15,paddingBottom:10,
      borderBottomWidth:3,borderBottomColor:'white'}}>
                 Picture Pulse
      </Text>

      <Text style={{fontWeight:700,fontSize:30,textAlign:'center',color:'pink',marginBottom:10}}>
      Privacy Policy
      </Text>

      <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'pink', textAlign: 'left', marginLeft:15, }}>
        <Text style={{color:'rgba(204, 0, 102, 1)'}}>Welcome to Picture Pulse Photo Editor! This Privacy Policy outlines
        how we collect, use, disclose, and protect your information when you use our mobile application and related services.</Text>
        {"\n"}
        {"\n"}
        By using Picture Pulse, you agree to the terms outlined in this policy.
        {"\n"}
        {"\n"}
        <Text style={{fontWeight:700,fontSize:30, color:'rgba(204, 0, 102, 1)',}}>Information We Collect </Text>
        {"\n"}
          {"\n"}
        <Text style={{fontWeight:700,fontSize:25,color:'white'}}>Personal Information: </Text>
         {"\n"} {"\n"}
       <Text style={{fontWeight:700,fontSize:20,color:'white'}}>Account Information: </Text>
       {"\n"}
       When you create an account, we collect your email address and username.
           {"\n"} {"\n"}
         <Text style={{fontWeight:700,fontSize:20,color:'white'}}>Profile Information: </Text>
         {"\n"}
         You may choose to provide additional information such as a profile picture or bio.
         {"\n"} {"\n"}
        <Text style={{fontWeight:700,fontSize:25,color:'white'}}>Usage Information:  </Text>
         {"\n"}{"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}>Device Information: </Text>
          {"\n"}
         We collect information about your device, including model, operating system, and unique identifiers.
         {"\n"}   {"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}>Log Data: </Text>
          {"\n"}
         Our servers automatically log information about your use of Picture Pulse, including IP address, app features used, and the date/time of access.
         {"\n"}   {"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}>Content: </Text>
         {"\n"}
        Photos and Edits: When you use our photo editing features, we temporarily process and store your images solely for the purpose of editing.
          {"\n"}  {"\n"}
        <Text style={{fontWeight:700,fontSize:30,color:'rgba(204, 0, 102, 1)'}}>How We Use Your Information </Text>
          {"\n"}  {"\n"}
        We use the collected information for the following purposes:
        {"\n"}
        {"\n"}
         <Text style={{fontWeight:700,fontSize:20,color:'white'}}>Provide and Improve Services: </Text>
         {"\n"}
        To deliver, maintain, and enhance Picture Pulse.
          {"\n"}  {"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}> Personalization: </Text>
        {"\n"}
        To customize content, features, and advertisements based on your preferences.
        {"\n"}{"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}> Communication: </Text>
        {"\n"}
         To send you updates, notifications, and respond to your inquiries.
         {"\n"}{"\n"}
         <Text style={{fontWeight:700,fontSize:20,color:'white'}}>Analytics: </Text>
         {"\n"}
         To analyze usage patterns, troubleshoot issues, and improve our app.
         {"\n"}{"\n"}
         <Text style={{fontWeight:700,fontSize:30,color:'rgba(204, 0, 102, 1)'}}>Information Sharing and Disclosure </Text>
         {"\n"}{"\n"}
        We do not sell, trade, or otherwise transfer your information to third parties for marketing purposes. We may share information with:
        {"\n"}
        {"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}>Service Providers:</Text>
         {"\n"}
        Third-party service providers assisting us in operations and analysis.
         {"\n"} {"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}>Legal Compliance: </Text>
          {"\n"}
        When required to comply with applicable laws, regulations, or legal processes.
           {"\n"}   {"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}>Protection of Rights: </Text>
           {"\n"}
        To protect our rights, safety, and property, and that of our users.
           {"\n"}   {"\n"}
         <Text style={{fontWeight:700,fontSize:30,color:'rgba(204, 0, 102, 1)'}}>Data Security </Text>
         {"\n"}{"\n"}
        We implement reasonable security measures to protect your information. However, no method of transmission or storage
         is completely secure. We cannot guarantee absolute security.
        {"\n"}
        {"\n"}
        <Text style={{fontWeight:700,fontSize:30,color:'rgba(204, 0, 102, 1)'}}>Your Choices:</Text>
         {"\n"}{"\n"}
        <Text style={{fontWeight:700,fontSize:20,color:'white'}}> Account Information: </Text>
           {"\n"}
         You can update or delete your account information through Picture Pulse settings.
        {"\n"}
        {"\n"}
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
