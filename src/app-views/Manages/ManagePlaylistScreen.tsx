import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, StyleSheet, StatusBar, TextInput, TouchableOpacity, Pressable, Modal, PermissionsAndroid } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import {iconBack , icon3Cham, iconAdd } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import { ReactNode, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';


interface ManagePlaylistScreenProps {
}

const ManagePlaylistScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation}) => {
    const playListFavouriteData = [
        { id: '1', title: 'Chills', image: require('../../assets/images/song/albumChill.jpg'), artist: 'tling, hz52, mck' },
        { id: '2', title: 'Anime', image: require('../../assets/images/ImageAnime/ImageAlbum.png'), artist: 'tling, hz52, mck' },
        { id: '3', title: 'Gym', image: require('../../assets/images/ImageGym/imageAlbum.jpg'), artist: 'tling, hz52, mck' },
        { id: '4', title: 'Sad', image: require('../../assets/images/ImageSad/imageAlbum.jpg'), artist: 'tling, hz52, mck' },
    ];
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        image: null
    });
    const handleChangeID = (newID: string) => setFormData({ ...formData, id: newID });
    const handleChangeName = (newName: string) => setFormData({ ...formData, name: newName });
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

    const handleManage = () => {
        navigation.navigate('ManageScreen');
    };

    const handleSave = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <Container colors={['#4c669f', 'red', '#192f6a']} >
            <Header>
            <View style={styles.containerHeader}>
                    <Pressable onPress={handleManage}>
                        <SvgXml xml={iconBack()} />
                    </Pressable>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 26, marginTop: 0, marginBottom:10 }}>PlayList</Text>
                </View>
            </Header>
            <Content>
                <View>
                    <Pressable style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                        <View style={styles.add}><SvgXml xml={iconAdd('white', 20, 20)} /></View>
                        <View >
                            <Text style={styles.textPlaylist} >Add new playlist</Text>
                            </View>
                    </Pressable>
                </View>
                <View>
                    {playListFavouriteData.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.playlist}>
                            <View style={{ flexDirection: 'row', width: 360 }}>
                                <Image source={item.image} style={styles.image}></Image>
                                <View style={{ margin: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 18, marginBottom: 7 }}>{item.title}</Text>
                                    <Text style={{ color: 'gray', fontSize: 15 }}>{item.artist}</Text>
                                </View>
                                <TouchableOpacity>
                                <SvgXml xml={icon3Cham()} style={{ marginTop: 18, marginLeft:90 }} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </Content>
            <Footer>  
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => requesCameraPermissions()} style={{ padding: 15, borderRadius: 50, backgroundColor: '#23D6E4', marginHorizontal: 10, marginBottom: 10 }}>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', textAlign: 'center' }}>Chọn ảnh</Text>
                            </TouchableOpacity>
                            <TextInput
                                placeholder="ID"
                                style={styles.inputAdd}
                                value={formData.id}
                                onChangeText={handleChangeID}
                            />
                            <TextInput
                                placeholder="Tên PlayList"
                                style={styles.inputAdd}
                                value={formData.name}
                                onChangeText={handleChangeName}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
                                    <Text style={styles.buttonText}>Lưu</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCancel} style={styles.buttonClose}>
                                    <Text style={styles.buttonText}>Hủy bỏ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal></Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    containerHeader: {
        margin: 15,
        
    },
    button: {
        width: 100,
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    text: {
        color: 'white'
    },
    add: {
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30
    },
    textPlaylist: {
        color: 'white',
        fontSize: 20,
    },
    image: {
        borderRadius: 10,
        width: 70,
        height: 70,
        marginHorizontal:10

    },
    playlist: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 17,
        paddingVertical:14,
        paddingHorizontal:16,
        backgroundColor: '#24242E',
        borderRadius:20,
        opacity:0.9
    },
    song: {
        height: 70,
        width: 70,
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    inputAdd: {
        width: 200,
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    buttonSave: {
        backgroundColor: "blue",
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 10,
        borderRadius: 10,
    },
    buttonClose: {
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 5
    },
    buttonText: {
        fontSize: 15,
        color: 'black',
        fontWeight: "bold"
    },
});

export default ManagePlaylistScreen;