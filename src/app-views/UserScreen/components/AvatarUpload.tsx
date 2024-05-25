import React, { useEffect, useState } from 'react';
import { View, Image, Button, StyleSheet, Text, PermissionsAndroid, ImageBackground, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SvgXml } from 'react-native-svg';
import { iconCamera } from '../../../app-uikits/icon-svg'; // Import chỉ iconCamera từ icon-svg
import axios from 'axios';
import { getToken } from '../../../secure-storage/GetToken';
import { hostNetwork } from '../../../host/HostNetwork';

const AvatarPicker = () => {
    const [image, setImage] = useState('');
    const requesCameraPermissions = async () => {
        try {
            const token = await getToken()
            const checkPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (checkPermissions === PermissionsAndroid.RESULTS.GRANTED) {
                const result: any = await launchImageLibrary({ mediaType: 'mixed' });
                if (result.assets && result.assets.length > 0) {
                    setImage(result.assets[0].uri);
                    try {
                        const formData = new FormData();
                        formData.append('avatar', {
                            uri: result.assets[0].uri,
                            type: result.assets[0]?.type,
                            name: result.assets[0]?.fileName,
                        });
                        console.log(result.assets[0].uri);
                        
                        const response = await axios.post(`http://${hostNetwork}:3000/upload`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                 Authorization: `Bearer ${token}`
                            },
                        });
                        console.log("Success");
                        console.log('Response:', response);
                        // Cập nhật state hoặc xử lý dữ liệu trả về từ server
                    } catch (error) {
                        console.error(error);
                        Alert.alert('Error:' + error);
                    }
                } else {
                    console.log('No image selected');
                }
            } else {
                console.log('Refuse');
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/images/ImageUserScreen/ảnh_nền_âm_nhạc.jpg')} style={{ width: '100%', height: 120, backgroundColor: '#5D9DE8', position: 'relative', zIndex: 2 }} resizeMode='cover'>
                    <View style={{ position: 'absolute', right: 161, bottom: -40, borderWidth: 1, borderRadius: 50, zIndex: 2 }}>
                        {image != '' ? <Image source={{ uri: image }} style={{ width: 90, height: 90, borderRadius: 50 }} /> : <Image source={require('../../../assets/images/avatar_trắng.jpg')} style={{ width: 90, height: 90, borderRadius: 50 }} />}
                        <TouchableOpacity style={{ alignSelf: 'flex-end', position: 'absolute', bottom: 0, zIndex: 1, backgroundColor: '#545968', padding: 5, borderRadius: 50 }} onPress={requesCameraPermissions}>
                            <SvgXml xml={iconCamera()} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
       
      
        alignItems:'center'



    },


});

export default AvatarPicker;
