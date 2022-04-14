import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyledContainer,InnerContainer, PageLogo,PageTitle,
  Subtitle,StyleFormArea,StyledInputLabel,StyledTextInput,
  StyledButton, Lefticon,Rightticon, Colors,
  MsgBox,Line, ButtonText, ForgetPwdView, ForgetText,
  TextLink, TextLinkContent,FlexBox,BackInnerIcon } from '../components/styles';
import reactDom from 'react-dom';
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


const FormPage = ({navigation}) => {

    const [forms,setForms] = useState(['']);

    const [customForms,setCustomForms] = useState(forms);
    const [value, setValue] = useState('');
    //LOAD DATA
    const url = settings.baseAPI+"forms/";
    const getForms = async () => {
        const results = await axios.get(url)
        .catch(error => console.log(error));
        if (results){
            const data = results.data;
            console.log("Form: " , data);
            setForms(data);
        }
    };
    const BackPressed = () => {
        navigation.navigate("Home");
    }
    //PDF
    // const [file,setFile] = useState();
    // const [numPages, setNumPages] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);
    // function onDocumentLoadSuccess({ numPages }) {
    // setNumPages(numPages);
    // }

    // const FilterByNameInput = (
    //     <Input
    //       placeholder="Search Form"
    //       value={value}
    //       onChange={e => {
    //         const currValue = e.target.value;
    //         setValue(currValue);
    //         const filteredData = forms.filter(entry =>
    //           entry.formDescription.includes(currValue)
    //         );
    //         setCustomForms(filteredData);
    //       }}
    //     />
    //   );
    
    const columns =[
        {
            title: 'Form Name',
            dataIndex: 'formDescription',
            key: 'formDescription'
        },
        {
          title: 'Action',
          dataIndex: 'fileBase64',
          key: 'fileBase64',
          render: (text, record) => (
            (record.fileBase64) ? 
            <a href={url + record.formID} target="_blank" rel="noopener noreferrer">View</a> : <a></a>)
          //render: text => <a href={text}>View</a>
        }
    ]
    useEffect(()=>{getForms();
    },[]);
    
function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
    return (
        <StyledContainer>
            <StatusBar style='dark'/>
            <FlexBox>
            <BackInnerIcon onPress={BackPressed}>
            <Ionicons name={'arrow-back'} size={30} color={darkLight}/>
            </BackInnerIcon>
            <InnerContainer>
                <PageTitle>FORMS</PageTitle>
                <Subtitle>Please Start by Searching in Search Box</Subtitle>
                <Table columns={columns} dataSource={forms} onChange={onChange} />
            </InnerContainer></FlexBox>
        </StyledContainer>
    );
}

export default FormPage;