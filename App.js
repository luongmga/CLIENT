import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler'
//pages
import Login from './pages/login';
import ForgetPassword  from './pages/forgetpassword';
import HomePage from './pages/home';
//navi stack
import RootStack from './navigators/RootStack';
//keep user logged in
import React,{useState} from 'react';
import Apploading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from './components/CredentialContext';
//import "antd/dist/antd.css";
//import style from 'App.module.css';
export default function App() {
  const [appReady,setAppReady] = useState(false);
  const [storedCredential,setStoredCredential] = useState('');
  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('paramedicCredential')
      .then((result)=>{
        if (result != null){
          setStoredCredential(JSON.parse(result));
        }
        else{
          setStoredCredential(null);
        }
      })
      .catch(error => console.log(error))
  }
  if(!appReady){
    return(
      <Apploading
        startAsync={checkLoginCredentials}
        onFinish={()=>setAppReady(true)}
        onError= {console.warn}
      />
    )
  }

  return(
    <CredentialContext.Provider value={{storedCredential,setStoredCredential}}>
      <RootStack />
    </CredentialContext.Provider>
  ) 
}

