import * as React from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, StatusBar, TextInput, ImageBackground, Pressable, FlatList, PermissionsAndroid, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import { ReactNode, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { iconSreach, iconBack,iconpencil } from '../../app-uikits/icon-svg';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

 interface ManageInformScreenProps {
}

const ManageInformScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
    const userInfo = {
        email: 'fjofjis@gmail.com',
        phoneNumber: '454365465',
        address: '123 Main St, City, Country',
    };
    const handleManage = () => {
        navigation.navigate('ManageScreen');
    };
    
    const [image, setImage] = useState('')
    const requesCameraPermissions = async () => {
        try {
            const checkPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
            if (checkPermissions === PermissionsAndroid.RESULTS.GRANTED) {

                const result: any = await launchImageLibrary({ mediaType: 'mixed' })
                setImage(result.assets[0].uri)

                console.log(result);

            }
            else {
                console.log('Refuse');

            }
        } catch (error) {
            console.log(error);

        }

    }
    return (
        <Container colors={['#4c669f', 'red', '#192f6a']} >
            <Header>
                <View style={styles.containerHeader}>
                    <Pressable onPress={handleManage}>
                        <SvgXml xml={iconBack()} />
                    </Pressable>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 26, marginTop: 0, marginBottom:10 }}>Thông tin cá nhân</Text>
                </View>
            </Header>
            <Content>
                <ImageBackground source={require("../../assets/images/ImageManage/anh_nen.jpg")} style={{ width: '100%', height: 170, backgroundColor: '#5D9DE8', position: 'relative' }} resizeMode='cover'>
                    <View style={{ position: 'absolute', right: 161, bottom: -40, borderWidth: 1, borderRadius: 50 }}>
                        {image != '' ? <Image source={{ uri: image }} style={{ width: 90, height: 90, borderRadius: 50 }} /> : <Image source={require("../../assets/images/avatar_trắng.jpg")} style={{ width: 90, height: 90, borderRadius: 50 }} />}
                    </View>
                </ImageBackground>
                <View style={{ marginTop: 50, alignItems: 'center' }}>
                    <View >
                        <Text style={{ fontSize: 25, fontWeight: '600' }}>Lê Văn An</Text>
                    </View>
                    
                    <View style={{ flexDirection:"row" }}>
                        <Text style={{ fontSize: 20, fontWeight: '800', }}>Là một người hòa đồng vui vẻ</Text>
                        <SvgXml xml={iconpencil()} style={{marginLeft:10, marginTop:5}}/>
                    </View>

                    <TouchableOpacity onPress={() => requesCameraPermissions()} style={{ padding: 10, borderRadius: 50, backgroundColor: '#23D6E4', marginTop: 10 }}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '700', textAlign: 'center' }}>Change Avatar</Text>
                    </TouchableOpacity>
                    

                    <View style={styles.container}>
                        <View style={styles.item}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.text}>{userInfo.email}</Text>
                        </View>
                        <SvgXml xml={iconpencil()} style={styles.pencil}/>
                        </View>

                        <View style={styles.item}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Số Điện Thoại:</Text>
                            <Text style={styles.text}>{userInfo.phoneNumber}</Text>
                        </View>
                        <SvgXml xml={iconpencil()} style={styles.pencil}/>
                        </View>

                        <View style={styles.item}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Địa Chỉ:</Text>
                            <Text style={[styles.text, { textAlignVertical: 'top' }]}>{userInfo.address}</Text> 
                        </View>
                        <SvgXml xml={iconpencil()} style={styles.pencil}/>
                        </View>

                        <TouchableOpacity onPress={handleManage} style={{ padding: 10, borderRadius: 50, backgroundColor: '#23D6E4', marginTop: 10, width: 100, marginLeft:140 }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '700', textAlign: 'center' }}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
            </Content>
            <Footer></Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    containerHeader: {
        margin: 15,
        
    },

    infoContainer: {
        marginBottom: 15,
        width:260
    },
    label: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    pencil:{
        alignItems: 'flex-end',
        marginTop: 45,
        marginLeft:10
    },
    item:{
        alignContent: 'center', 
        flexDirection:"row",
        backgroundColor:'Salmon1',
        borderRadius: 20,
        marginHorizontal: 25,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});

export default ManageInformScreen;