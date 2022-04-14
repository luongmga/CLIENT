import React,{ useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyledContainer,InnerContainer, PageLogo,PageTitle,
    Subtitle,StyleFormArea,StyledInputLabel,StyledTextInput,
    StyledButton, Lefticon,Rightticon, Colors,
    MsgBox,Line, MainMenuButtonText, ForgetPwdView, ForgetText,
    TextLink, TextLinkContent,HomeContainer, MainMenuButton, MainMenuGrid, SmallLogo, BackIcon} from '../components/styles';
import { View } from 'react-native';
//form
import { Formik } from 'formik';
//icon
import {Octicons, Ionicons} from '@expo/vector-icons';
import { useState } from 'react';
import RootStack from '../navigators/RootStack';
//setting
import {settings} from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from './../components/CredentialContext';
//colors
const {brand, darkLight, primary} = Colors;

//const HomePage = ({navigation, route}) => {
    //const {email, firstName, lastName} = route.params;

const HomePage = ({navigation}) => {
    //  context
    const {storedCredential,setStoredCredential} = useContext(CredentialContext);
    const {email, firstName, lastName} = storedCredential;

    const clearLogin = ()=>{
        AsyncStorage.removeItem('paramedicCredential')
        .then(()=>{
            setStoredCredential("");
        })
        .catch((error)=>{
            console.log(error);
        })
    }

const BackPressed = () => {
    navigation.navigate("Logout");
}

    return( 
        <>
        <StatusBar style="dark"/>
            <SmallLogo resizeMode="cover" source={require('./../assets/Logo.png')}/>
            
            <PageTitle>Welcome {firstName} {lastName}</PageTitle>
            
            <MainMenuGrid>
                <BackIcon onPress={BackPressed}>
                    <Ionicons name={'arrow-back'} size={30} color={darkLight}/>
                </BackIcon>
                <MainMenuButton name="mmBtn_Contacts" onPress={()=> navigation.navigate("Contacts")}>
                    <MainMenuButtonText>Contacts</MainMenuButtonText>
                </MainMenuButton>
                <MainMenuButton name="mmBtn_Assessments" onPress={()=> navigation.navigate("Assessments")}>
                    <MainMenuButtonText>Assessments</MainMenuButtonText>
                </MainMenuButton>
                <MainMenuButton name="mmBtn_Resources" onPress={()=> navigation.navigate("Resources")}>
                    <MainMenuButtonText>Resources</MainMenuButtonText>
                </MainMenuButton>
                <MainMenuButton name="mmBtn_MedDirectives" onPress={()=> navigation.navigate("Medical Directives")}>
                    <MainMenuButtonText>Medical Directives</MainMenuButtonText>
                </MainMenuButton>
                <MainMenuButton name="mmBtn_Forms" onPress={()=> navigation.navigate("Forms")}>
                    <MainMenuButtonText>Forms</MainMenuButtonText>
                </MainMenuButton>
            
            </MainMenuGrid>
        </>
    )
}
export default HomePage;