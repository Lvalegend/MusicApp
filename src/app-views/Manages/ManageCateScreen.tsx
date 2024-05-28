import React, { useEffect, useState } from 'react';
import {
    StyleSheet, View, Text, Image, TextInput, Pressable, Modal, TouchableOpacity, ScrollView
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconBack, iconAdd, icon3Cham } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import { launchImageLibrary } from 'react-native-image-picker';
import { hostNetwork } from '../../host/HostNetwork';
interface Album {
   
    name: string;
    color?: string;
    image?: string;
    songs?: string[];
}

const ManageCateScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({ id: '', name: '', image: '' });
    
    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const response = await fetch(`http://${hostNetwork}:3000/inforAlbum`);
            const data: Album[] = await response.json();
            setAlbums(data);
        } catch (error) {
            console.error('Failed to fetch albums:', error);
        }
    };

    const handleSave = async () => {
        const response = await fetch(`http://${hostNetwork}:3000/album`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                image: formData.image,
                songs: [], 
            }),
        });
        if (response.ok) {
            fetchAlbums(); 
            setModalVisible(false);
            setFormData({ id: '', name: '', image: '' }); 
        }
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <Container colors={['#4c669f', 'red', '#192f6a']}>
            <Header>
                <View style={styles.containerHeader}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <SvgXml xml={iconBack()} />
                    </Pressable>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 26, marginTop: 0, marginBottom: 10 }}>Album</Text>
                </View>
            </Header>
            <Content>
                <Pressable style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                    <View style={styles.add}><SvgXml xml={iconAdd('white', 20, 20)} /></View>
                    <Text style={styles.textalbum}>Add new album</Text>
                </Pressable>
                <ScrollView>
                    {albums.map((item) => (
                        <Pressable key={item.name} style={styles.album}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <Text style={{ color: 'white', fontSize: 27, marginLeft: 30 }}>{item.name}</Text>
                            </View>
                            <SvgXml xml={icon3Cham()} style={{ marginTop: 18, marginLeft: 'auto' }} />
                        </Pressable>
                    ))}
                </ScrollView>
            </Content>
            <Footer>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                placeholder="Album Name"
                                style={styles.inputAdd}
                                value={formData.name}
                                onChangeText={(text) => setFormData({ ...formData, name: text })}
                            />
    
                            <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity >
                            <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Footer>
        </Container >
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
    buttonCancel: {
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
