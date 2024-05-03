import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconMusic } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import axios from 'axios';
import { getToken } from '../../secure-storage/GetToken';
import { hostNetwork } from '../../host/HostNetwork';

interface UserProps { }

const User: React.FC<UserProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {


    const handleLogin = () => {
        navigation.navigate('Login');
    }

    const handleRegister = () => {
        navigation.navigate('Register');
    }

    const handleUserAfterLoginOrRegister = () => {
        navigation.navigate('UserAfterLoginOrRegister');
    }
    const [songs, setSongs] = useState<any>([]);

    useEffect(() => {
        const getInfo = async () => {
            try {

                const response = await axios.get(`http://${hostNetwork}:3000/songs`);
                if (response.data) {
                    console.log(response.data);
                    // const test = response.data.map((data: any) => {

                    //     console.log(data.imageLink.data);
                    // })



                    setSongs(response.data);
                }

            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }
        getInfo();
    }, []);

    return (
        <Container colors={['#4c669f', 'red', '#192f6a']}>
            <Header />
            <Content>
                <View style={styles.container}>
                    <SvgXml xml={iconMusic()} />
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
                {/* <TouchableOpacity style={{ backgroundColor: 'red' }} onPress={handleUserAfterLoginOrRegister}>
                    <Text>Go to UserAfter</Text>
                </TouchableOpacity> */}
                <View>
                    {songs.map((item: any) => (
                        <View key={item._id}>
                            <Image
                                source={{ uri: item.imageLink }}
                                style={{ width: '100%', height: 200 }}
                            />
                        </View>
                    ))}
                </View>



            </Content>
            <Footer>
                <BottomBar />
            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 750,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textColor: {
        color: 'white',
        textAlign: 'center'
    }
});

export default User;
