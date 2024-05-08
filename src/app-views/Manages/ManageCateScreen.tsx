import * as React from 'react';
import { Button, View, Text, Image, StyleSheet,TextInput, Pressable,TouchableOpacity,PermissionsAndroid, Modal  } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconBack, iconAdd, icon3Cham } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import { ReactNode, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';


interface ManageCateScreenProps {
}

const ManageCateScreen:  React.FC<{ navigation: NavigationProp<any> }> = ({ navigation}) => {
    const albumFavouriteData = [
        { id: '1', title: '99%', image: require('../../assets/images/ImageAlbum99/ImageAlbum.jpg'), colorAlbum: ['', ''], artist: 'MCK'},
        { id: '2', title: 'Ai', image: require('../../assets/images/ImageAlbumAi/imageAlbum.jpg'), colorAlbum: ['', ''],artist: 'MCK'},
        { id: '3', title: 'LoiChoi', image: require('../../assets/images/ImageLoiChoi/ImageAlbum.jpg'), colorAlbum: ['', ''],artist: 'MCK'},
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
                    <Text style={{ color: 'white', fontSize: 26, marginTop: 0, marginBottom:10 }}>Album</Text>
                </View>
            </Header>
            <Content>
                <View>
                    <Pressable style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                        <View style={styles.add}><SvgXml xml={iconAdd('white', 20, 20)} /></View>
                        <View >
                            <Text style={styles.textalbum} >Add new album</Text>
                            </View>
                    </Pressable>
                </View>
                <View>
                    {albumFavouriteData.map((item) => (
                        <Pressable key={item.id} style={styles.album}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={item.image} style={styles.image} />
                            <Text style={{ color: 'white', fontSize: 27, marginTop: 7, marginLeft: 30 }}>{item.title}</Text>
                        </View>
                        <SvgXml xml={icon3Cham()} style={{ marginTop: 18, marginLeft: 'auto' }} />
                    </Pressable>
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
                                placeholder="Tên album"
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
    textalbum: {
        color: 'white',
        fontSize: 20,
    },
    image: {
        borderRadius: 10,
        width: 70,
        height: 70,

    },
    album: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 17,
        paddingVertical:14,
        paddingHorizontal:16,
        backgroundColor: '#24242E',
        borderRadius:20,
        opacity:0.8
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
export default ManageCateScreen;