import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, Text, PermissionsAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SvgXml } from 'react-native-svg';
import { iconImage } from '../../../app-uikits/icon-svg';

const AvatarPicker = () => {
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
            <View >
                {image != '' ? <Image source={{ uri: image }} style={{ width: 75, height: 75, borderRadius: 50 }} /> : <Image source={require('../../../assets/images/avatar_trắng.jpg')} style={{ width: 75, height: 75, borderRadius: 50 }} />}
            </View>
            <View style={{ marginLeft: 20 }}>
                <View>
                    <Text style={{fontSize:20, fontWeight:'600'}}>Lê Văn An</Text>
                </View>
                <TouchableOpacity onPress={() => requesCameraPermissions()} style={{ padding: 10, borderRadius: 50, backgroundColor: '#23D6E4', marginTop:5}}>
                    <Text style={{ color: 'white', fontSize:10, fontWeight:'700', textAlign:'center' }}>Change Image</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',

        flexDirection: 'row'

    },


});

export default AvatarPicker;
