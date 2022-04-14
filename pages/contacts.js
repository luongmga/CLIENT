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



const ContactPage = ({route,navigation}) => {
    const {categoryID,categoryName} = route.params;
    const [contacts,setContacts] = useState(['']);
    //const [customContacts,setCustomContacts] = useState(contacts);
    //const [value, setValue] = useState('');
    const [url,setUrl] = useState("");
    var prepURL = "";
    //LOAD DATA
    const getContacts = async () => {
        prepURL = settings.baseAPI+"contactbycategory/"+categoryID;
        console.log("PREPED URL IS : " + prepURL);
        setUrl(prepURL);
        console.log("AXIOS URL IS : " + url);
        const results = await axios.get(prepURL)
        .catch(error => console.log(error));
        if (results){
            const data = results.data;
            console.log("Contacts: " , data);
            setContacts(data);
        }
    };
    const BackPressed = () => {
        prepURL = "";
        navigation.navigate("Contacts");
    }
    

    // const FilterByCategoryInput = (
    //     <Input
    //       placeholder="Search Category"
    //       value={value}
    //       onChange={e => {
    //         const currValue = e.target.value;
    //         setValue(currValue);
    //         const filteredData = contacts.filter(entry =>
    //           entry.categoryName.includes(currValue)
    //         );
    //         setCustomContacts(filteredData);
    //       }}
    //     />
    //   );

    const columns =[
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstname'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key:'lastName'
        },
        {
            title: 'Email',
            dataIndex: 'emailAddress',
            key:'emailAddress',
            render: text => <a href={"mailto:" + text}>{text}</a>
        },
        {
            title: 'Location',
            dataIndex: 'contactLocation',
            key:'contactLocation'
        },
        {
            title: 'Mobile',
            dataIndex: 'mobilePhone',
            key:'mobilePhone',
            render: text => <a href={"tel:" + text}>{text}</a>
        },
        {
            title: 'Office',
            dataIndex: 'officePhone',
            key:'officePhone',
            render: text => <a href={"tel:" + text}>{text}</a>
        }
    ]
    useEffect(()=>{getContacts();
    },[categoryID]);
    
// function onChange(pagination, filters, sorter, extra) {
//     console.log('params', pagination, filters, sorter, extra);
//   }
    return (
        <StyledContainer>
            <StatusBar style='dark'/>
            
            <FlexBox>
            <BackInnerIcon onPress={BackPressed}>
            <Ionicons name={'arrow-back'} size={30} color={darkLight}/>
            </BackInnerIcon>
            <InnerContainer>
                <PageTitle>CONTACTS</PageTitle>
                <Subtitle>Currently show {categoryName} contacts</Subtitle>
                <Table columns={columns} dataSource={contacts} />
            </InnerContainer></FlexBox>
        </StyledContainer>
    );
}

export default ContactPage;