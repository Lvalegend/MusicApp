import React, { useEffect, useState } from 'react';
import { Button, View, Text, ImageBackground, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconMusic } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import AvatarPicker from './components/AvatarUpload';
import axios from 'axios';
import { deleteToken } from '../../secure-storage/DeleteToken';
import { getToken } from '../../secure-storage/GetToken';
import { hostNetwork } from '../../host/HostNetwork';



interface UserAfterLoginOrRegisterProps {

}

const UserAfterLoginOrRegister: React.FC<UserAfterLoginOrRegisterProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {


    const [songs, setSongs] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const handleLogout = async () => {
        await deleteToken()
        navigation.navigate('User')
    }
    const [image, setImage] = useState<any>();
    const [info, setInfo] = useState<any>([]);



    useEffect(() => {
        const getImage = async () => {
            try {
                const token = await getToken()
                const response = await axios.get(`http://${hostNetwork}:3000/avatar`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data) {
                    console.log(response.data);
                    setImage(response.data);
                }

            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }
        getImage();
        const getInfo = async () => {
            try {
                const token = await getToken()
                const response = await axios.get(`http://${hostNetwork}:3000/infoUser`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data) {
                    console.log(response.data);
                    setInfo(response.data);
                }

            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }
        getInfo();
    }, []);

    return (

        <Container colors={['#4c669f', 'red', '#192f6a']} >

            <Header>
            </Header>

            <Content>
                <View>
                    <AvatarPicker />
                </View>
             
                    <View style={{ marginTop: 50, alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>{info.name}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, fontWeight: '300', color: 'white' }}>{info.description}</Text>
                        </View>
                    </View>
       
                <View style={{ marginHorizontal: 15, marginVertical: 20 }}>
                    <Text style={{ fontWeight: '500', color: 'white', fontSize: 18 }}>My PlayList</Text>
                    <ScrollView horizontal={true}>
                        <View style={{ flexDirection: 'row', gap: 15 }}>
                            <View>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <ImageBackground source={require('../../assets/images/ImageUserScreen/ảnh_nền_âm_nhạc.jpg')} style={{ width: 170, height: 150, justifyContent: 'center', alignItems: 'center' }} imageStyle={{ borderRadius: 10 }}>
                                        <Text style={{ fontWeight: '500', color: 'white', fontSize: 15 }}>Best of 2023</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 17, color: 'white', fontWeight: '500' }}>Show Me Love</Text>
                                </TouchableOpacity>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontSize: 15, color: '#D9DADC', fontWeight: '300' }}>Alan Walker</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <ImageBackground source={require('../../assets/images/ImageUserScreen/ảnh_nền_âm_nhạc.jpg')} style={{ width: 170, height: 150, justifyContent: 'center', alignItems: 'center' }} imageStyle={{ borderRadius: 10 }}>
                                        <Text style={{ fontWeight: '500', color: 'white', fontSize: 15 }}>Best of 2023</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 17, color: 'white', fontWeight: '500' }}>So Beautiful</Text>
                                </TouchableOpacity>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontSize: 15, color: '#D9DADC', fontWeight: '300' }}>Alan Walker</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity style={{ marginVertical: 10 }}>
                                    <ImageBackground source={require('../../assets/images/ImageUserScreen/ảnh_nền_âm_nhạc.jpg')} style={{ width: 170, height: 150, justifyContent: 'center', alignItems: 'center' }} imageStyle={{ borderRadius: 10 }}>
                                        <Text style={{ fontWeight: '500', color: 'white', fontSize: 15 }}>Best of 2023</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 17, color: 'white', fontWeight: '500' }}>Give Me Money</Text>
                                </TouchableOpacity>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontSize: 15, color: '#D9DADC', fontWeight: '300' }}>Alan Walker</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#797E8D', padding: 10, marginHorizontal: 20, borderRadius: 10, marginBottom: 10 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 15 }}>Chỉnh sửa thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, marginHorizontal: 20, borderRadius: 10 }} onPress={handleLogout}>
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 15 }}>Logout</Text>
                </TouchableOpacity>


                <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />

            </Content>

            <Footer>
                <BottomBar>
                </BottomBar>
            </Footer>
        </Container>

    );
};
const styles = StyleSheet.create({
    textColor: {
        color: 'white',
        textAlign: 'center'
    }
})

export default UserAfterLoginOrRegister;
