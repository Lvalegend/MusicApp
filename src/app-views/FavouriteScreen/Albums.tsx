import * as React from 'react';
import Content from '../../app-layout/Content';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { icon3Cham } from '../../app-uikits/icon-svg';
import { SvgXml } from 'react-native-svg';

interface AlbumsProps {
    handleNavigateBack: () => void;
    backgroundColor: string,
    id: string,
}

const Albums: React.FC<AlbumsProps> = ({backgroundColor,id, handleNavigateBack }) => {
    
    const favouriteSongData = [
        { id: '1', title: 'Le Luu Ly', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/Leluuly.jpg') },
        { id: '2', title: 'Anh Mat Troi', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/anhMatTroi.jpg') },
        { id: '3', title: 'Khi Anh Gan Em', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/KhiAnhGanEm.jpg') },
        { id: '4', title: 'Hoa Cuoi', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/Hoacuoijpg.jpg') },
        { id: '5', title: 'Tinh Yeu Sai', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/OIP.jpg') },
        { id: '6', title: 'Mehaboba', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/Leluuly.jpg') },
    ];

    const buttonData = [
        {id: '1', title: 'Playlists'},
        {id: '2', title: 'Albums'},
        {id: '3', title: 'Songs'},
        {id: '4', title: 'Artists'}
    ]

    return(
    
        <>
            <Content>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style = {{padding:20}}>
                        {buttonData.map((item) => (
                            <Pressable style = {[styles.button, {backgroundColor: backgroundColor}]}>
                                <Text style= {styles.text}>{item.title}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                    <View>
                        {favouriteSongData.map((item) => (
                            <Pressable key={item.id} style={styles.playlist}>
                                <View style={{ flexDirection: 'row', width: 360 }}>
                                    <Image source={item.image} style={styles.image}></Image>
                                    <View style={{ margin: 10 }}>
                                        <Text style={{ color: 'white', fontSize: 15, marginBottom: 7 }}>{item.title}</Text>
                                        <Text style={{ color: 'gray' }}>{item.artist}</Text>
                                    </View>
                                </View>
                                <SvgXml xml={icon3Cham()} style={{ marginTop: 20 }} />
                            </Pressable>
                        ))}
                    </View>
                </Content>
        </>
    )
};
const styles = StyleSheet.create({
    button:{
        width: 100,
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderWidth:1,
        borderColor: 'white'
    },
    text:{
        color: 'white'
    },
    add: {
        borderRadius:40,
        borderWidth:1,
        borderColor:'white',
        width:40,
        height:40,
        alignItems:'center',
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

    },
    playlist: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 17,

    },

});
export default Albums;