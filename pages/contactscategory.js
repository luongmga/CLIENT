import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyledContainer,InnerContainer, PageLogo,PageTitle,
    Subtitle,StyleFormArea,StyledInputLabel,StyledTextInput,
    StyledButton, Lefticon,Rightticon, Colors,
    MsgBox,Line, ButtonText, ForgetPwdView, ForgetText,
    TextLink, TextLinkContent,FlexBox, BackIcon,BackInnerIcon } from '../components/styles';
//form
import { Formik } from 'formik';
//icon
import {Octicons, Ionicons} from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import {settings} from '../config/config';
import axios from 'axios';
import { Table, Input, Button, Space } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import styled from 'styled-components';
//import style from 'App.module.css';




//colors
const {brand, darkLight, primary} = Colors;



const ContactCategoryPage = ({navigation}) => {
    const [contacts,setContacts] = useState(['']);
    const [customContacts,setCustomContacts] = useState(contacts);
    const [value, setValue] = useState('');
    //LOAD DATA
    const url = settings.baseAPI+"contactscategory";
    const getContacts = async () => {
        const results = await axios.get(url)
        .catch(error => console.log(error));
        if (results){
            const data = results.data;
            console.log("Contacts Category: " , data);
            setContacts(data);
        }
    };

    // const NavigateToContactPage = (text) =>{
    //     console.log("should navigate");
    //     //navigation.navigate("Contact",text);
    // }

    const BackPressed = () => {
        navigation.navigate("Home");
    }

    const columns =[
        {
            title: 'Categories',
            dataIndex: 'categoryName',
            key:'categoryName',
            render: (text,record) => <button onClick={()=> {
                console.log("button click");
                console.log(text);
                navigation.navigate("Contact",{
                    categoryID: record.categoryID,
                    categoryName: record.categoryName
                });
        }}>{text}</button>
        }
    ]
    useEffect(()=>{getContacts();
    },[]);
    

    return (
        <StyledContainer>
            <StatusBar style='dark'/>
            <FlexBox>
            <BackInnerIcon onPress={BackPressed}>
            <Ionicons name={'arrow-back'} size={30} color={darkLight}/>
            </BackInnerIcon>
            <InnerContainer>
                <PageTitle>CONTACTS</PageTitle>
                <Subtitle>Select a Sub Category</Subtitle>
                <Table columns={columns} dataSource={contacts} />
            </InnerContainer></FlexBox>
        </StyledContainer>
    );
}

export default ContactCategoryPage;