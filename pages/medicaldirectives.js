import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyledContainer,InnerContainer, PageLogo,PageTitle,
  Subtitle,StyleFormArea,StyledInputLabel,StyledTextInput,
  StyledButton, Lefticon,Rightticon, Colors,
  MsgBox,Line, ButtonText, ForgetPwdView, ForgetText,
  TextLink, TextLinkContent,FlexBox, BackInnerIcon } from '../components/styles';
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
//import styled from 'styled-components';

//import style from 'App.module.css';



//colors
const {brand, darkLight, primary} = Colors;


const MedicalDirectivePage = ({navigation}) => {

    const [MedicalDirectives,setMedicalDirectives] = useState(['']);

    const [customMedicalDirectives,setCustomMedicalDirectives] = useState(MedicalDirectives);
    const [value, setValue] = useState('');
    //LOAD DATA
    const url = settings.baseAPI+"MedicalDirectives/";
    const getMedicalDirectives = async () => {
        const results = await axios.get(url)
        .catch(error => console.log(error));
        if (results){
            const data = results.data;
            console.log("MedicalDirectives: " , data);
            setMedicalDirectives(data);
        }
    };
    const BackPressed = () => {
      navigation.navigate("Home");
  }
    const FilterByNameInput = (
        <Input
          placeholder="Search Medical Directive"
          value={value}
          onChange={e => {
            const currValue = e.target.value;
            setValue(currValue);
            const filteredData = MedicalDirectives.filter(entry =>
              entry.medicalDirectiveDescription.includes(currValue)
            );
            setCustomMedicalDirectives(filteredData);
          }}
        />
      );

    const columns =[
        {
            title: FilterByNameInput,
            dataIndex: 'medicalDirectiveDescription',
            key: 'medicalDirectiveDescription'
            
        },
        {
          title: 'Action',
          key: 'MedicalDirectiveID',
          render: (text, record) => (
            (record.medicalDirectiveID) ? 
            <a href={url + record.medicalDirectiveID} >View</a> : <a></a>
            // <a href='http://localhost:8080/api/MedicalDirectives/4'
            //   // button 
            // // onClick={()=> {
            // //     console.log(record);
            // //     //const Base64Str = record.fileBase64;
            // //     axios.get(url + "/" + record.MedicalDirectiveID)
            // //     .then(()=>{
            // //         const pdfString = `data:application/pdf;base64,$`+ `{` + record.fileBase64 + `}`;
            // //         console.log(pdfString); 
            // //     })
            // //     .catch(error => console.log(error));
            // // }}
            // >
            //   View MedicalDirective
            // </a>
           )
        }
    ]
    useEffect(()=>{getMedicalDirectives();
    },[]);
    
function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
    return (
        <StyledContainer>
            <StatusBar style='dark'/>
            <FlexBox><BackInnerIcon onPress={BackPressed}>
            <Ionicons name={'arrow-back'} size={30} color={darkLight}/>
            </BackInnerIcon>
            <InnerContainer>
                <PageTitle>Medical Directives</PageTitle>
                <Subtitle>Please Start by Searching in Search Box</Subtitle>
                <Table columns={columns} dataSource={customMedicalDirectives} onChange={onChange} />
            </InnerContainer></FlexBox>
        </StyledContainer>
    );
}

export default MedicalDirectivePage;