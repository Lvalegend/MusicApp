import * as React from 'react';
import Content from '../../app-layout/Content';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { icon3Cham } from '../../app-uikits/icon-svg';
import { SvgXml } from 'react-native-svg';
import { useState } from 'react';

interface SongsProps {
    onPress: any
}
interface SelectedItem {
    id: string;
    title: string;
    artist: string;
    duration: string;
    image: any;
}

const Songs: React.FC<SongsProps> = ({ onPress }) => {
    const recentlyPlayedData = [
        { id: '1', title: 'Le Luu Ly', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/Leluuly.jpg') },
        { id: '2', title: 'Anh Mat Troi', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/anhMatTroi.jpg') },
        { id: '3', title: 'Khi Anh Gan Em', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/KhiAnhGanEm.jpg') },
        { id: '4', title: 'Hoa Cuoi', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/Hoacuoijpg.jpg') },
        { id: '5', title: 'Tinh Yeu Sai', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/OIP.jpg') },
        { id: '6', title: 'Mehaboba', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/Leluuly.jpg') },
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

    const toggleModal = (item: { id: string; title: string; artist: string; duration: string; image: any; } | null = null) => {
        setSelectedItem(item);
        setModalVisible(!modalVisible);
    };
    return (
        <>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ padding: 20 }}>
                <Pressable style={styles.button}
                    onPress={() => onPress('Playlists')}>
                    <Text style={styles.text}>Playlists</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => onPress('Albums')}>
                    <Text style={styles.text}>Albums</Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: 'red' }]}>
                    <Text style={styles.text}>Songs</Text>
                </Pressable>
                <Pressable style={styles.button}
                    onPress={() => onPress('Artists')}>
                    <Text style={styles.text}>Artists</Text>
                </Pressable>
            </ScrollView>
            <View>
                {recentlyPlayedData.map((item) => (
                    <Pressable key={item.id} style={styles.playlist}>
                        <View style={{ flexDirection: 'row', width: 360 }}>
                            <Image source={item.image} style={styles.image}></Image>
                            <View style={{ margin: 10 }}>
                                <Text style={{ color: 'white', fontSize: 15, marginBottom: 7 }}>{item.title}</Text>
                                <Text style={{ color: 'gray' }}>{item.artist}</Text>
                            </View>
                        </View>
                        <Pressable onPress={() => toggleModal(item)} style={styles.modalButton}>
                            <SvgXml xml={icon3Cham()} style={{ marginTop: 20 }} />
                        </Pressable>
                    </Pressable>
                ))}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => toggleModal}
                >
                    <TouchableWithoutFeedback onPress={() => toggleModal(null)}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                {selectedItem && (
                                    <>
                                        <Image source={selectedItem.image} style={styles.image}></Image>
                                        <View style={{ margin: 10 }}>
                                            <Text style={{ color: 'black', fontSize: 15, marginBottom: 7 }}>{selectedItem.title}</Text>
                                            <Text style={{ color: 'gray' }}>{selectedItem.artist}</Text>
                                        </View>
                                    </>
                                )}
                            </View>
                        </View>

                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
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
    image: {
        borderRadius: 10,
        width: 70,
        height: 70,

    },
    playlist: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 17,

    },
    modalButton: {
        marginTop: 10,
        padding: 5,
        borderRadius: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        height: '50%',
        top: 210,
        flexDirection: 'row'
    }

})
export default Songs;