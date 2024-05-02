import React, { useEffect, useState } from 'react';
import { Button, View, Text, ImageBackground, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconMusic } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import AvatarPicker from './components/AvatarUpload';
import axios from 'axios';



interface UserAfterLoginOrRegisterProps {

}

const UserAfterLoginOrRegister: React.FC<UserAfterLoginOrRegisterProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    

    const [songs, setSongs] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const getSong = async () => {
            try {
                
                const response:any = await axios.get('http://192.168.2.14:3000/songs');
               
                console.log('Response:', response);
                setSongs(response.data)
                
            } catch (error) {
                console.error(error);
                Alert.alert('Error: ' + error);
            }
        };
        getSong()
    },[])




    return (
        <>
            <Container colors={['#4c669f', 'red', '#192f6a']} >

                <Header>


                </Header>

                <Content>

                    
                    <AvatarPicker/>
                    <View>
                        {songs.map( (info:any) =>(
                            <View key={info._id}>
                            <Text>Name: {info.nameSong}</Text>
                            {/* <Image source={{uri:info.imageLink}}></Image> */}
                           
                        </View>
                        ))}
                    </View>



                </Content>

                <Footer>
                    <BottomBar>
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
