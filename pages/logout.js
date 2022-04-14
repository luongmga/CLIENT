import React, { useState , useContext}  from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyledContainer,InnerContainer, PageLogo,PageTitle,
    Subtitle,StyleFormArea,StyledInputLabel,StyledTextInput,
    StyledButton, Lefticon,Rightticon, Colors,
    MsgBox,Line, ButtonText, ForgetPwdView, ForgetText,
    TextLink, TextLinkContent } from '../components/styles';
import { View, ActivityIndicator} from 'react-native';
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

//colors
const {brand, darkLight, primary} = Colors;


const Logout = ({navigation}) => {

    //hide/show input password
    const [hidePassword,setHidePassword] = useState(true);
    //login message
    const [message,setMessage] = useState();
    const [messageType,setmessageType] = useState();
    const handleMessage = (message,type = 'FAILED')=>{
        setMessage(message);
        setmessageType(type);
    }
    //dev, remove soon
    const[dev,setDev] = useState();
    //context
    const {storedCredential,setStoredCredential} = useContext(CredentialContext);

    const ValidateLogin = (values, setSubmitting) =>{
        //clear up buttons
        handleMessage(null);
        //call API
        const url=settings.baseAPI+"login";
        axios.post(url,values)
             .then((response)=>{
                 const result = response.data;
                 const {status,message,user} = result;
                 //not success case
                 if (status !== 'SUCCESS'){
                     handleMessage(message,status);
                 }
                 else{
                     //navigation.navigate('Home',);
                     persistLogin({...user[0]},message, status);
                 }
                 setSubmitting(false);
             })
             .catch(error =>{
            console.log(error);
            setSubmitting(false);
            handleMessage("Error occured. Try again later");
        })
    }

    const persistLogin = (credential, message, status) =>{
        AsyncStorage.setItem('paramedicCredential', JSON.stringify(credential))
        .then(()=>{
            handleMessage(message,status);
            setStoredCredential(credential);
        })
        .catch((error) => {
            console.log(error);
            handleMessage('Persistance Login Error');
        })
    }

    return (
        <StyledContainer>
            <StatusBar style='dark'/>
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/Logo.png')}/>
                <PageTitle>Paramedic Logout</PageTitle>
                <Formik
                    initialValues={{emailAddress:'',password:''}}
                    onSubmit={(values, {setSubmitting})=>{
                        //console.log(values);
                        if (values.emailAddress == '' || values.password == ''){
                            handleMessage('Please enter credentials');
                            setSubmitting(false);
                        }
                        else{
                            ValidateLogin(values,setSubmitting)
                        }
                    }}
                >
                    {({handleSignout,handleCancel,values,isSubmitting}) =>  
                    (<StyleFormArea>
                        <MsgBox>Please confirm you want to Sign Out</MsgBox>
                        {!isSubmitting &&
                        <StyledButton onPress={()=>{
                            console.log('out');
                            AsyncStorage.removeItem('paramedicCredential')
                            .then(()=>{
                                setStoredCredential("");
                            })
                            .catch((error)=>{
                                console.log(error);
                            })
                            }}>
                            <ButtonText>Confirm</ButtonText>
                        </StyledButton>}
                        <StyledButton onPress={()=>{
                            console.log('cancel log out');
                            navigation.navigate('Home');
                        }}>
                            <ButtonText>Cancel</ButtonText>
                        </StyledButton>
                        {/* <StyledButton onPress={()=>setDev('dev')}>
                            <ButtonText>Press Dev Then Login For Dev</ButtonText>
                        </StyledButton> */}
                        {/* Spinning Indicator while validating */}
                        {isSubmitting &&
                        <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary}/>
                        </StyledButton>}
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

export default Logout;