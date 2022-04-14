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


const AssessmentPage = ({navigation}) => {

    const [assesments,setAssesments] = useState(['']);

    const [customAssesments,setCustomAssesments] = useState(assesments);
    const [value, setValue] = useState('');
    //LOAD DATA
    const url = settings.baseAPI+"assessments/";
    const getAssesments = async () => {
        const results = await axios.get(url)
        .catch(error => console.log(error));
        if (results){
            const data = results.data;
            console.log("Assessments: " , data);
            setAssesments(data);
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

    const FilterByNameInput = (
        <Input
          placeholder="Search Assesment"
          value={value}
          onChange={e => {
            const currValue = e.target.value;
            setValue(currValue);
            const filteredData = assesments.filter(entry =>
              entry.assessmentDescription.includes(currValue)
            );
            setCustomAssesments(filteredData);
          }}
        />
      );

    const columns =[
        {
            title: FilterByNameInput,
            dataIndex: 'assessmentDescription',
            key: 'assessmentDescription'
            
        },
        {
          title: 'Action',
          key: 'assessmentID',
          render: (text, record) => (
            (record.assessmentID) ? 
            <a href={url + record.assessmentID}>View</a> : <a></a>
            // <a href='http://localhost:8080/api/assessments/4'
            //   // button 
            // // onClick={()=> {
            // //     console.log(record);
            // //     //const Base64Str = record.fileBase64;
            // //     axios.get(url + "/" + record.assessmentID)
            // //     .then(()=>{
            // //         const pdfString = `data:application/pdf;base64,$`+ `{` + record.fileBase64 + `}`;
            // //         console.log(pdfString); 
            // //     })
            // //     .catch(error => console.log(error));
            // // }}
            // >
            //   View Assesment
            // </a>
           )
        }
    ]
    useEffect(()=>{getAssesments();
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
                <PageTitle>ASSESSMENTS</PageTitle>
                <Subtitle>Please Start by Searching in Search Box</Subtitle>
                <Table columns={columns} dataSource={customAssesments} onChange={onChange} />
            </InnerContainer></FlexBox>
        </StyledContainer>
    );
}

export default AssessmentPage;