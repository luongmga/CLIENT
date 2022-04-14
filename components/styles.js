import styled, {css} from 'styled-components/native';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constant from 'expo-constants';
const StatusBarHeight = Constant.statusBarHeight;

//color

export const Colors = {
    primary : '#ffffff',
    secondary : '#E5E7EB',
    tertiary : '#1F2937',
    darkLight : '#9CA3AF',
    brand :  '#19CE75',
    green: '#10B981',
    red: '#EF4444',
};

const {primary,secondary,tertiary,darkLight,brand,green,red } = Colors;

export const FlexBox = styled.View`
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top : ${StatusBarHeight + 30}px;
    background-color: ${primary};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const SmallLogo = styled.Image`
    width: 150px;
    height: 141px;
    max-width: 200px;
    max-height: 188px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
`;

export const PageLogo = styled.Image`
    width: 200px;
    height: 188px;
    max-width: 400px;
    max-height: 366px;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    
`;

export const PageTitle = styled.Text`
    font-size:30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
`;

export const Subtitle = styled.Text`
    font-size:18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
`;

export const StyleFormArea = styled.View`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
`
;
export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    color: ${tertiary};
    margin-vertical: 3px;
`;
export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 18px;
    text-align: left;
`;

export const Lefticon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index:1;
`;

export const Rightticon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index:1;
`;

export const BackIcon = styled.TouchableOpacity`
    left: 32px;
    top: -160px;
    position: absolute;
    z-index:10;
`;

export const BackInnerIcon = styled.TouchableOpacity`
    left: -14px;
    top: 10px;
    position: absolute;
    z-index:10;
`;

export const DrawerButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 40px;
    width: 48px;
`;
export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
`;
export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 22px;
    font-weight: bold;
`;

export const MsgBox = styled.Text`
    text-align:center;
    font-size: 13px;
    color: ${props => props.type == 'SUCCESS' ? green:red};
`;
export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;

export const ForgetPwdView = styled.View`
    justify-content:center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ForgetText = styled.Text`
    justify-content:center;
    color: ${tertiary}
    align-items: center;
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content:center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color : ${brand};
    font-size: 15px;
`;
export const HomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top:10px;
    justify-content: center;
`;

export const MainMenuGrid = styled.View`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 250px 250px
    grid-gap: 15px
`;

export const MainMenuButton = styled.TouchableOpacity`
    margin: auto;
    padding: 25px;
    justify-content: left;
    align-items: left;
    border-radius: 5px;
    height: 220px;
    width: 220px;
    ${props =>{
        if (props.name == 'mmBtn_Contacts'){
            return `
                background-color: #4287f5;
                `
        }
        else if (props.name == 'mmBtn_Assessments'){
            return `
                background-color: #d8de2f;
                `
        }
        else if (props.name == 'mmBtn_MedDirectives'){
            return `
                background-color: #63c7a9;
                `
        }
        else if (props.name == 'mmBtn_Forms'){
            return `
                background-color: #683bed;
                `
        }
        else if (props.name == 'mmBtn_Resources'){
            return `
                background-color: #b05717;
                `
        }
    }}
`;

export const MainMenuButtonText = styled.Text`
    color: ${primary};
    font-size: 25px;
    font-weight: bold;
`;

