import React, { useState , useContext}  from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyledContainer,InnerContainer, PageLogo,PageTitle,
    Subtitle,StyleFormArea,StyledInputLabel,StyledTextInput,
    StyledButton, Lefticon,Rightticon, Colors,
    MsgBox,Line, ButtonText,} from '../components/styles';
import { View, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from '../components/CredentialContext';
//form
import { Formik } from 'formik';
//icon
import {Octicons, Ionicons} from '@expo/vector-icons';
//keyboard
import KeyboardWrapper from '../components/KeyboardAvoidingWrapper';
//API
import axios from 'axios';
import {settings} from '../config/config';
import { openInbox } from "react-native-email-link";

//colors
const {brand, darkLight, primary} = Colors;

const ForgetPassword = ({navigation}) => {

    //login message
    const [message,setMessage] = useState();
    const [messageType,setmessageType] = useState();
    const handleMessage = (message,type = 'FAILED')=>{
        setMessage(message);
        setmessageType(type);
    }

    const ValidateReset = (values, setSubmitting) =>{
        //clear up buttons
        handleMessage(null);
        //call API
        const url=settings.baseAPI+"pwdreset";
        axios.post(url,values)
             .then((response)=>{
                 const result = response.data;
                 const {status,message} = result;
                 //success case
                 if (status !== 'EMAILED'){
                    handleMessage(message,status);
                 }
                 else{
                    handleMessage(message,status);
                    alert(
                        "Password Resetted",
                        "Please check your email for temporary password",
                        [
                          { text: "OK", onPress: () => navigation.navigate('Login'),style:"cancel" }
                        ]
                      );
                    //navigation.navigate('Login');
                 }
                 setSubmitting(false);
             })
             .catch(error =>{
            console.log(error);
            setSubmitting(false);
            handleMessage("Error occured. Try again later");
        })
    }
    return (
        <StyledContainer>
            <StatusBar style='dark'/>
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/Logo.png')}/>
                <PageTitle>Password Recovery</PageTitle>
                <Subtitle>Forget Password</Subtitle>

                <Formik
                    initialValues={{emailAddress:''}}
                    onSubmit={(values, {setSubmitting})=>{
                        //console.log(values);
                        if (values.emailAddress == ""){
                            handleMessage('Please enter account/email address for password recovery');
                            setSubmitting(false);
                        }
                        else{
                            ValidateReset(values,setSubmitting)
                        }
                    }}
                >
                    {({handleChange,handleBlur,handleSubmit,values}) =>  
                    (<StyleFormArea>
                        <TextInput
                            label="Email Address"
                            icon="mail"
                            placeholder="Please enter work Email"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('emailAddress')}
                            onBlur={handleBlur('emailAddress')}
                            value={values.emailAddress}
                            keyboardType="email-address"
                        ></TextInput>
                        <MsgBox type={messageType}>{message}</MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Reset Your Password</ButtonText>
                        </StyledButton>
                        <StyledButton onPress={()=> {openInbox();}}>
                            <ButtonText>Open Email</ButtonText>
                        </StyledButton>
                        <Line />
                    </StyleFormArea>)}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}

const TextInput = ({label,icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <Lefticon>
                <Octicons name={icon} size={30} color={brand}/>
            </Lefticon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <Rightticon onPress={() =>setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword? 'md-eye-off':'md-eye'}size={30} color={darkLight}/>
                </Rightticon>
            )}

        </View>
    );
};

export default ForgetPassword;