import React, { useEffect, useState } from 'react';
import { Button, View, Text, ImageBackground, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, ActivityIndicator, Modal, TextInput } from 'react-native';
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

    const [token, setToken] = useState();
    const [imageData, setImageData] = useState<any>()
    const [songImages, setSongImages] = useState<any>([])

    const [idSongs, setIdSongs] = useState([
        {
            song_id_1: "Song_1"
        }, {
            song_id_2: "Song_2"
        }, {
            song_id_3: "Song_3"
        }, {
            song_id_4: "Song_5"
        }, {
            song_id_5: "Song_5"
        }, {
            song_id_6: "Song_6"
        }, {
            song_id_7: "Song_7"
        }, {
            song_id_8: "Song_8"
        }, {
            song_id_9: "Song_9"
        }, {
            song_id_10: "Song_10"
        }, {
            song_id_11: "Song_11"
        },
    ])

    useEffect(() => {
        getToken().then((data: any) => {
            setToken(data)
        })

        // getImage()
        // const getImage = async () => {
        //     try {
        //         const token = await getToken()
        //         const response = await axios.get(`http://${hostNetwork}:3000/avatar`, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`
        //             }
        //         });
        //         if (response.data) {
        //             console.log(typeof response.data);
        //             setImage(URL.createObjectURL(new Blob([Buffer.from(response.data, 'binary')], { type: 'image/jpeg' })));
        //         }

        //     } catch (error) {
        //         console.error('Error fetching image:', error);
        //     }
        // }
        // getImage();
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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken();
                const response = await fetch(`http://${hostNetwork}:3000/avatar`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }

                const contentType = response.headers.get('Content-Type');
                if (!contentType || !contentType.startsWith('image/')) {
                    throw new Error('Response is not an image');
                }

                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result;
                    setImageData(base64data);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchData();
        const getImage = async (songId: any) => {
            try {
                const response = await fetch(`http://${hostNetwork}:3000/songImages?id=${songId}`, {
                    method: 'GET',

                });
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                console.log(response);
                
                const contentType = response.headers.get('Content-Type');
                if (!contentType || !contentType.startsWith('image/')) {
                    throw new Error('Response is not an image');
                }

                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data: any = reader.result;
                    setSongImages((prevImageData: any) => [...prevImageData, base64data]);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        const sendMultipleRequests = async () => {
            try {
                idSongs.forEach(async (idSongObj) => {
                    const songId = Object.values(idSongObj)[0];
                    await getImage(songId);
                });
            } catch (error) {
                console.error('Error sending multiple requests:', error);
            }
        };

        sendMultipleRequests();

    }, []);

    useEffect(()=> {
        const getImage = async (songId: any) => {
            try {
                const response = await fetch(`http://${hostNetwork}:3000/songImages?id=${songId}`, {
                    method: 'GET',

                });
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                console.log(response);
                
                const contentType = response.headers.get('Content-Type');
                if (!contentType || !contentType.startsWith('image/')) {
                    throw new Error('Response is not an image');
                }

                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data: any = reader.result;
                    setSongImages((prevImageData: any) => [...prevImageData, base64data]);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
    });

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
                <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
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

                <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                    <Text style={{ fontWeight: '500', color: 'white', fontSize: 18 }}>Recommend For You</Text>
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
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 15 }}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, marginHorizontal: 20, borderRadius: 10 }} onPress={handleLogout}>
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 15 }}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, marginHorizontal: 20, borderRadius: 10, marginTop:10 }} onPress={() => navigation.navigate('Manager')}>
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 15 }}>Navigate to Manager</Text>
                </TouchableOpacity>


                <View style={{ width: '100%', height: 200, backgroundColor: 'transparent' }} >
                    {imageData &&
                        <Image source={{
                            uri: imageData
                        }} style={{ width: '100%', height: '100%' }} />
                    }
                </View>

                <View style={{ marginVertical: 10 }}>
                    {songImages.map((item: any, index: any) => (
                        <View key={index} style={{ width: '100%', height: 200, backgroundColor: 'transparent' }}>
                            <Image source={{
                                uri: item
                            }} style={{ width: '100%', height: '100%' }} />
                        </View>
                    ))}
                </View>

                


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
