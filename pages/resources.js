import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyledContainer,InnerContainer, PageLogo,PageTitle,
  Subtitle,StyleFormArea,StyledInputLabel,StyledTextInput,
  StyledButton, Lefticon,Rightticon, Colors,
  MsgBox,Line, ButtonText, ForgetPwdView, ForgetText,
  TextLink, TextLinkContent,FlexBox , BackInnerIcon} from '../components/styles';
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


//colors
const {brand, darkLight, primary} = Colors;

const ResourcePage = ({navigation}) => {
    const [resources,setResources] = useState(['']);
    const [customResources,setCustomResources] = useState(resources);
    const [catInput, setCatInput] = useState('');
    const [companyInput, setCompanyInput] = useState('');
    //LOAD DATA
    const url = settings.baseAPI+"resources";
    const getResources = async () => {
        const results = await axios.get(url)
        .catch(error => console.log(error));
        if (results){
            const data = results.data;
            console.log("resources: " , data);
            setResources(data);
        }
    };
    const BackPressed = () => {
      navigation.navigate("Home");
    }
    const FilterByCategoryInput = (
        <Input
          placeholder="Search Category"
          value={catInput}
          onChange={e => {
            const currValue = e.target.value;
            setCatInput(currValue);
            const filteredData = resources.filter(entry =>
              entry.categoryName.includes(currValue)
            );
            setCustomResources(filteredData);
          }}
        />
      );
    const FilterByCompanyInput = (
        <Input
          placeholder="Search Company"
          value={companyInput}
          onChange={e => {
            const currValue = e.target.value;
            setCompanyInput(currValue);
            const filteredData = resources.filter(entry =>
              entry.companyName.includes(currValue)
            );
            setCustomResources(filteredData);
          }}
        />
      );
    const columns =[
        {
            title: FilterByCategoryInput,
            dataIndex: 'categoryName',
            key:'categoryName'
        },
        {
            title: FilterByCompanyInput,
            dataIndex: 'companyName',
            key: 'companyName'
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
            render: text => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>
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
    useEffect(()=>{getResources();
    },[]);
    
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
                <PageTitle>RESOURCES</PageTitle>
                <Subtitle>Please Start by Searching</Subtitle>
                <Table columns={columns} dataSource={customResources} />
            </InnerContainer></FlexBox>
        </StyledContainer>
    );
}

export default ResourcePage;