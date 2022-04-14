import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { CredentialContext } from './../components/CredentialContext';
import { Colors } from '../components/styles';
import { DrawerButton } from '../components/styles';
import {Octicons, Ionicons} from '@expo/vector-icons';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
//Pages
import Login from '../pages/login';
import ForgetPassword from '../pages/forgetpassword';
import HomePage from '../pages/home';
import ContactPage from '../pages/contacts';
import ResourcePage from '../pages/resources';
import MedicalDirectivePage from '../pages/medicaldirectives';
import FormPage from '../pages/forms';
import AssesmentPage from '../pages/assesments';
import Logout from '../pages/logout';
import ChangePassword from '../pages/changepassword';
import ContactCategoryPage from '../pages/contactscategory';

import DrawerStack from './DrawerStack';
//import ViewPDFPage from '../pages/viewpdf';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const RootStack = () =>{
    return(
        <CredentialContext.Consumer>
            {({storedCredential})=>(
                <NavigationContainer>
                    <Drawer.Navigator
                        screenOptions={{
                            headerStyle:{
                                backgroundColor: 'transparent'
                            },
                            headerTintColor: Colors.tertiary,
                            headerTransparent:true,
                            headerTitle: '',
                            headerLeftContainerStyle:{
                                paddingLeft: 20
                            }
                        }}
                        initialRouteName="Login"
                        >
                            {storedCredential ? 
                                (<>
                                    <Drawer.Screen name="Home" component={HomePage}/>
                                    <Drawer.Screen name="Contacts" component={ContactCategoryPage}/>
                                    <Drawer.Screen name="Medical Directives" component={MedicalDirectivePage}/>
                                    <Drawer.Screen name="Resources" component={ResourcePage}/>
                                    <Drawer.Screen name="Assessments" component={AssesmentPage}/>
                                    <Drawer.Screen name="Forms" component={FormPage}/>
                                    <Drawer.Screen name="Change Password" component={ChangePassword}/>
                                    <Drawer.Screen name="Logout" component={Logout}/>
                                    <Drawer.Screen 
                                        name="Contact"
                                        component={ContactPage} 
                                        options={{
                                        drawerItemStyle: { height: 0 }
                                    }}/>
                                </>) 
                                    :
                                (<>
                                    <Drawer.Screen name="Login" component={Login}/>
                                    <Drawer.Screen name="Forget Password" component={ForgetPassword}/>
                                </>)
                            }
                            
                    </Drawer.Navigator>
                </NavigationContainer>
                    )}
        </CredentialContext.Consumer>
        
    );

}

export default RootStack;

// <Drawer.Screen name="Home" component={HomePage}/>
// <Drawer.Screen name="Contacts" component={ContactPage}/>
// <Drawer.Screen name="Medical Directives" component={MedicalDirectivePage}/>
// <Drawer.Screen name="Resources" component={ResourcePage}/>
// <Drawer.Screen name="Assessments" component={AssesmentPage}/>
// <Drawer.Screen name="Forms" component={FormPage}/>
// <Drawer.Screen name="Change Password" component={ChangePassword}/>
// <Drawer.Screen name="Logout" component={Logout}/>