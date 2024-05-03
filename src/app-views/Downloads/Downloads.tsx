import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image, ScrollView, StyleSheet, Pressable, TouchableOpacity, Modal, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import songsData from '../../assets/data/songs.json';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { icon3Cham, iconBack, iconSreach, iconChuX, iconMusic,iconPlay } from '../../app-uikits/icon-svg';

const images = {
    "Leluuly.jpg": require('../../assets/images/song/Leluuly.jpg'),
    "anhMatTroi.jpg": require('../../assets/images/song/anhMatTroi.jpg'),
    "KhiAnhGanEm.jpg": require('../../assets/images/song/KhiAnhGanEm.jpg'),
};

interface Song {
    id: number;
    image: string;
    name: string;
    description: string;
}

const Downloads: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        setSongs(songsData);
        setFilteredSongs(songsData);
    }, []);

    useEffect(() => {
        if (text.trim() === '') {
            setFilteredSongs(songs);
        } else {
            const filtered = songs.filter(song =>
                song.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredSongs(filtered);
        }
    }, [text, songs]);
    const handleHome = () => {
        navigation.navigate('HomeScreen');
    };


    const handleFavourite = () => {
        navigation.navigate('Favourite');
    };

    const handlePopular = () => {
        navigation.navigate('Popular');
    };

    const handleUser = () => {
        navigation.navigate('User');
    };

    const handleDelete = () => {
        if (selectedItemIndex !== null) {
            const songToDelete = songs[selectedItemIndex];
            const updatedSongs = songs.filter(song => song.id !== songToDelete.id);
            setSongs(updatedSongs);
            setFilteredSongs(updatedSongs);
            setSelectedItemIndex(null);
            setModalVisible(false);
        }
    };
    const handlePlay = () => {
        navigation.navigate('ManageScreen');
        setModalVisible(false);
    };
    const handleChangeText = (newText: string) => {
        setText(newText);
    };

    return (
        <Container colors={['#4c669f', 'red', '#192f6a']} >
            <Header>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 26, marginTop: 15 }}>Downloads</Text>
                </View>
            </Header>

            <Content>
                <View style={styles.searchContainer}>
                    <SvgXml xml={iconSreach()} style={{ margin: 20, marginRight: 0 }} />
                    <TextInput
                        style={styles.input}
                        value={text}
                        onChangeText={handleChangeText}
                        placeholder="Search"
                    />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 25 }}>
                    {filteredSongs.length > 0 ? (
                        filteredSongs.map((song, index) => (
                            <Pressable key={song.id} style={styles.item}>
                                <Image source={images[song.image as keyof typeof images]} style={styles.song} />
                                <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                    <Text style={styles.name}>{song.name}</Text>
                                    <Text style={styles.des}>{song.description}</Text>
                                </View>
                                <TouchableOpacity style={styles.dots} onPress={() => { setSelectedItemIndex(index); setModalVisible(true); }}>
                                    <SvgXml xml={icon3Cham()} />
                                </TouchableOpacity>
                            </Pressable>
                        ))
                    ) : (
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 500, marginBottom: 20 }}>
                            <Image source={require("../../assets/images/taixuong.png")} style={{ width: 150, height: 150 }} />
                            <Text style={{ color: 'white', fontSize: 22 }}>Chưa có bản nhạc nào tải xuống</Text>
                        </View>
                    )}
                </ScrollView>
            </Content>

            <Footer>

                <BottomBar></BottomBar>
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.buttonClose}>
                        <SvgXml xml={iconChuX()} />
                    </TouchableOpacity>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={handlePlay} style={styles.buttonPlay}>
                        <Image source={require("../../assets/images/playms.png")} style={{width:40,height:40, alignItems:'flex-start'}} />
                            <Text style={styles.buttonTextPlay}>Phát nhạc</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete} style={styles.buttonDelete}>
                            <Image source={require("../../assets/images/xoa.png")} style={{width:40,height:40, alignItems:'flex-start'}} />
                            <Text style={styles.buttonTextDelete}>Xóa nhạc</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            </Footer>

            
        </Container>
    );
};


const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 20
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        margin: 20,
        backgroundColor: "rgba(0, 0, 0,0.8)", 
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonPlay: {
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 60,
        elevation: 2,
        backgroundColor: "rgba(90, 90, 90)",
        marginTop: 10
    },
    buttonDelete: {
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 75,
        elevation: 2,
        backgroundColor: "rgba(90, 90, 90))",
        marginTop: 10
    },
    buttonClose: {
        position: 'absolute',
        top: 290,
        right: 45,
        borderRadius: 20,
        elevation: 2,
        backgroundColor: "gray",
        padding: 10,
        zIndex: 1
    },
    buttonTextPlay: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 25,
        marginLeft:10
    },
    buttonTextDelete: {
        marginLeft:12,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 25,
        
    },
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    des: {
        color: 'white',
        fontSize: 16,
    },
    item: {
        backgroundColor: '#24242E',
        height: 90,
        width: 370,
        alignContent: 'center',
        marginVertical: 8,
        marginHorizontal: 25,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
    },
    song: {
        height: 70,
        width: 70,
        borderRadius: 10,
    },
    dots: {
        alignItems: 'flex-end',
        marginTop: 14,
        marginLeft: 30,
    },
});

export default Downloads;
