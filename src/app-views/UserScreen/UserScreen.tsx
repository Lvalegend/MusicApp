import * as React from 'react';
import { Button, View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar, iconMusic } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';



interface UserProps {

}

const User: React.FC<UserProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
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
            <Container backgroundColor={'black'}>

                <Header>
        

                </Header>

                <Content>
                    <ImageBackground source={require('../../assets/images/ImageUserScreen/ảnh_nền_âm_nhạc.jpg')} style={{ width: '100%', height: 780, justifyContent: 'center', alignItems: 'center' }} resizeMode='cover'>
                       
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

                    </ImageBackground>
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

export default User;
