import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { iconDownload, iconFavourite, iconHome, iconPopular, iconUser } from '../../../app-uikits/icon-svg';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../../secure-storage/GetToken';
import axios from 'axios';
import { hostNetwork } from '../../../host/HostNetwork';

interface BottomBarProps {

}

const BottomBar: React.FC<BottomBarProps> = () => {
    const navigation: any = useNavigation()

    const handleHome = () => {
        navigation.navigate('HomeScreen')
    }
    const handlePopular = () => {
        navigation.navigate('RankingScreen')
    }
    const handleFavourite = () => {
        navigation.navigate('Favourite')
    }
    const handleDownloads = () => {
        navigation.navigate('Downloads')
    }

    const handleResponse = async (responseData: any) => {
        const { redirect } = responseData;

        if (redirect) {
            navigation.navigate(redirect.slice(1));
        }
    };

    const handleUser = async () => {
        try {
            // Gọi hàm getToken để lấy token từ Encrypted Storage
            const token = await getToken();
            if (token) {
                const response = await axios.get(`http://${hostNetwork}:3000/decentralization`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data) {
                    console.log(response.data);
                    handleResponse(response.data);
                }
                else {
                    console.log("No Respone");

                }
            }
            else {
                // Nếu token không tồn tại, điều hướng tới màn hình User
                navigation.navigate('User');
            }
        } catch (error) {
            console.error('Lỗi trong handleUser:', error);
        }
    };
    

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touch} onPress={handleHome}>
                <SvgXml xml={iconHome()} />
                <Text style={styles.text}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch} onPress={handlePopular}>
                <SvgXml xml={iconPopular()} />
                <Text style={styles.text}>Popular</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch} onPress={handleFavourite}>
                <SvgXml xml={iconFavourite()} />
                <Text style={styles.text}>Favourite</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch} onPress={handleDownloads}>
                <SvgXml xml={iconDownload()} />
                <Text style={styles.text}>Download</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch} onPress={handleUser}>
                <SvgXml xml={iconUser()} />
                <Text style={styles.text}>User</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 20,
    },
    text: {
        color: 'white',
        marginTop: 5

    },
    touch: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default BottomBar;