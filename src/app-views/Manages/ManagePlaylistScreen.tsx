import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Image, TextInput, Pressable, Modal, TouchableOpacity, ScrollView
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconBack, iconAdd, icon3Cham } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import { launchImageLibrary } from 'react-native-image-picker';
import { hostNetwork } from '../../host/HostNetwork';

interface Playlist {
    name: string;
    color?: string;
    image?: string;
    songs?: string[]
}

const ManagePlaylistScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({ song: '', name: '', image: '', color: '' });

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        try {
            const response = await fetch(`http://${hostNetwork}:3000/getPlaylist`);
            const data: Playlist[] = await response.json();
            setPlaylists(data);
        } catch (error) {
            console.error('Failed to fetch playlists:', error);
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://${hostNetwork}:3000/createPlaylist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                fetchPlaylists();
                setModalVisible(false);
                setFormData({ song: '', name: '', image: '', color: '' });
            } else {
                console.error('Failed to save playlist');
            }
        } catch (error) {
            console.error('Error saving playlist:', error);
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
                    <Text style={{ color: 'white', fontSize: 26, marginTop: 0, marginBottom: 10 }}>PlayList</Text>
                </View>
            </Header>
            <Content>
                <Pressable style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                    <View style={styles.add}><SvgXml xml={iconAdd('white', 20, 20)} /></View>
                    <Text style={styles.textPlaylist}>Add new playlist</Text>
                </Pressable>
                <ScrollView>
                    {playlists.map((item) => (
                        <Pressable key={item.name} style={styles.playlist}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={{ margin: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 18, marginBottom: 7 }}>{item.name}</Text>
                                    
                                </View>
                                <SvgXml xml={icon3Cham()} style={{ marginTop: 18, marginLeft: 'auto' }} />
                            </View>
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
                                placeholder="Playlist name"
                                style={styles.inputAdd}
                                value={formData.name}
                                onChangeText={(text) => setFormData({ ...formData, name: text })}
                            />
                            
                            
                            {formData.image ? (
                                <Image source={{ uri: formData.image }} style={styles.previewImage} />
                            ) : null}
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    containerHeader: {
        margin: 15,
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
        marginHorizontal: 10
    },
    playlist: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 17,
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: '#24242E',
        borderRadius: 20,
        opacity: 0.9
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
    selectImageText: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginBottom: 10
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10
    }
});

export default ManagePlaylistScreen;
