import * as React from 'react';
import { Button, View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconMusic } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import AvatarUpload from './components/AvatarUpload';



interface UserProps {

}

const User: React.FC<UserProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [redirect, setRedirect] = React.useState();
    const handleHome = () => {
        navigation.navigate('HomeScreen')
    }
   
    const handleLogin = () => {
        navigation.navigate('Login')
    }
    const handleRegister = () => {
        navigation.navigate('Register')
    }
    const handleUserAfterLoginOrRegister = () => {
        navigation.navigate('UserAfterLoginOrRegister')
    }
    return (
        <>
            <Container colors={['#4c669f', 'red', '#192f6a']} >

                <Header>


                </Header>

                <Content>

                    
                    <View style={{ width: '100%', height: 750, justifyContent: 'center', alignItems: 'center' }}>

                        <SvgXml xml={iconMusic()}></SvgXml>

                        <Text style={[styles.textColor, { fontSize: 25, marginTop: 30 }]}>Listen to music freely with many different music genres</Text>

                        <Text style={[styles.textColor, { fontSize: 18, marginVertical: 10 }]}>Quickly register an account and experience together</Text>

                        <TouchableOpacity style={{ marginVertical: 20, width: '100%' }} onPress={handleLogin}>
                            <Text style={[styles.textColor, { padding: 15, backgroundColor: '#23D6E4', marginHorizontal: 30, borderRadius: 105 }]}>Sign In</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.textColor, { fontSize: 18, marginTop: 10, marginRight: 10 }]}>You don't have account?</Text>
                            <TouchableOpacity onPress={handleRegister}>
                                <Text style={[styles.textColor, { fontSize: 18, marginTop: 10, color: '#23D6E4', fontWeight: '600' }]}>Register</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    


                    



                </Content>

                <Footer>
                    <BottomBar >
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

export default User;