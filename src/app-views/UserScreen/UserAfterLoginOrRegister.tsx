import * as React from 'react';
import { Button, View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconMusic } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import AvatarPicker from './components/AvatarUpload';



interface UserAfterLoginOrRegisterProps {

}

const UserAfterLoginOrRegister: React.FC<UserAfterLoginOrRegisterProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const handleHome = () => {
        navigation.navigate('HomeScreen')
    }
    const handleFavourite = () => {
        navigation.navigate('Favourite')
    }
    const handlePopular = () => {
        navigation.navigate('Popular')
    }
    const handleDownload = () => {
        navigation.navigate('Download')
    }
    const handleLogin = () => {
        navigation.navigate('Login')
    }
    const handleRegister = () => {
        navigation.navigate('Register')
    }
    return (
        <>
            <Container colors={['#4c669f', 'red', '#192f6a']} >

                <Header>


                </Header>

                <Content>

                    
                    <AvatarPicker/>
                


                </Content>

                <Footer>
                    <BottomBar onPressHome={handleHome} onPressPopular={handlePopular} onPressFavourite={handleFavourite} onPressDownload={handleDownload}>
                    </BottomBar>
                </Footer>
            </Container>

        </>
    );
};
const styles = StyleSheet.create({
    textColor: {
        color: 'white',
        textAlign: 'center'
    }
})

export default UserAfterLoginOrRegister;
