import React, { useState } from 'react';
import { Button, View, Text, Image, ScrollView, StyleSheet, Pressable, TouchableOpacity, Modal } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import songsData from '../../assets/data/songs.json';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { icon3Cham } from '../../app-uikits/icon-svg';

const images = {
    "Leluuly.jpg": require('../../assets/images/song/Leluuly.jpg'),
    "anhMatTroi.jpg": require('../../assets/images/song/anhMatTroi.jpg'),
    "KhiAnhGanEm.jpg": require('../../assets/images/song/KhiAnhGanEm.jpg'),
};

interface DownloadProps {}

const Downloads: React.FC<DownloadProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

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
        setModalVisible(false);
    };

    const handleAddToPlaylist = () => {
        setModalVisible(false);
    };

    return (
        <Container colors={['#4c669f', 'red', '#192f6a']} >
            <Header>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 26, marginTop: 15 }}>Downloads</Text>
                </View>
            </Header>

            <Content>
                <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 25 }}>
                    {songsData.map((song, index) => (
                        <Pressable key={song.id} style={styles.item}>
                            <Image source={images[song.image as keyof typeof images]} style={styles.song} />
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={styles.name}>{song.name}</Text>
                                <Text style={styles.des}>{song.description}</Text>
                            </View>                           
                            <TouchableOpacity style={styles.dots} onPress={() => {setSelectedItemIndex(index); setModalVisible(true);}}>
                                <SvgXml xml={icon3Cham()} />
                            </TouchableOpacity>
                        </Pressable>
                    ))}
                </ScrollView>
            </Content>

            <Footer>
                <BottomBar onPressHome={handleHome} onPressPopular={handlePopular} onPressFavourite={handleFavourite} onPressUser={handleUser} />
            </Footer>

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        
                        <TouchableOpacity onPress={handleAddToPlaylist} style={styles.buttonAdd}>
                            <Text style={styles.buttonText}>Thêm vào playlist</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete} style={styles.buttonDelete}>
                            <Text style={styles.buttonText}>Xóa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.buttonClose}>
                            <Text style={styles.buttonText}>Hủy bỏ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Container>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
    buttonAdd: {
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal:30,
        elevation: 2,
        backgroundColor: "#2196F3",
        marginTop: 10
    },
    buttonDelete: {
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal:75,
        elevation: 2,
        backgroundColor: "#2196F3",
        marginTop: 10
    },
    buttonClose: {
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal:50,
        elevation: 2,
        backgroundColor: "red",
        marginTop: 10,
        
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
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
