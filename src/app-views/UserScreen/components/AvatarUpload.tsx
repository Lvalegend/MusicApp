import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, Text, PermissionsAndroid, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SvgXml } from 'react-native-svg';
import { iconImage } from '../../../app-uikits/icon-svg';
import { useNavigation } from '@react-navigation/native';
import { deleteToken } from '../../../secure-storage/DeleteToken';

const AvatarPicker = () => {
    const navigation:any = useNavigation()
    const handleLogout = async () =>{
        await deleteToken()
        navigation.navigate('HomeScreen')
    }
    const [image, setImage] = useState('')
    const requesCameraPermissions = async () => {
        try {
            const checkPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
            if (checkPermissions === PermissionsAndroid.RESULTS.GRANTED) {

                // chụp ảnh
                // const result = await launchCamera({mediaType:'mixed', cameraType:'back'})


                // mở thư viện ảnh
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
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/images/ImageUserScreen/ảnh_nền_âm_nhạc.jpg')} style={{width:'100%', height:120,backgroundColor:'#5D9DE8', position:'relative'}} resizeMode='cover'>
                <View style={{position:'absolute', right:161, bottom:-40, borderWidth:1, borderRadius:50 }}>
                    {image != '' ? <Image source={{ uri: image }} style={{ width: 90, height: 90, borderRadius: 50 }} /> : <Image source={require('../../../assets/images/avatar_trắng.jpg')} style={{ width: 90, height: 90, borderRadius: 50 }} />}
                </View>
            </ImageBackground>
            <View style={{ marginTop:50, alignItems:'center'}}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Lê Văn An</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 15, fontWeight: '400' }}>Là một người hòa đồng vui vẻ</Text>
                </View>
                <TouchableOpacity onPress={() => requesCameraPermissions()} style={{ padding: 10, borderRadius: 50, backgroundColor: '#23D6E4', marginTop: 10 }}>
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: '700', textAlign: 'center' }}>Change Avatar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={{ padding: 10, borderRadius: 50, backgroundColor: '#23D6E4', marginTop: 10, width:100 }}>
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: '700', textAlign: 'center' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {


        alignItems:'center'



    },


});

export default AvatarPicker;
