import * as React from 'react';
import Content from '../../app-layout/Content';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { icon3Cham } from '../../app-uikits/icon-svg';
import { SvgXml } from 'react-native-svg';
import Artists from './Artists';

interface AlbumsProps {
    onPress: any
}

const Albums: React.FC<AlbumsProps> = ({onPress}) => {

    const albumData = [
        { id: '1', title: '99%', image: require('../../assets/images/ImageAlbum99/ImageAlbum.jpg'), colorAlbum: ['', ''], artist: 'MCK'},
        { id: '2', title: 'Ai', image: require('../../assets/images/ImageAlbumAi/imageAlbum.jpg'), colorAlbum: ['', ''],artist: 'MCK'},
        { id: '3', title: 'LoiChoi', image: require('../../assets/images/ImageLoiChoi/ImageAlbum.jpg'), colorAlbum: ['', ''],artist: 'MCK'},
    ]

    return(
        <>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style = {{padding:20}}>
                <Pressable style = {styles.button}
                onPress={()=>onPress('Playlists')}>
                    <Text style= {styles.text}>Playlists</Text>
                </Pressable>
                <Pressable 
                style = {[styles.button, {backgroundColor: 'red'}]}>
                    <Text style= {styles.text}>Albums</Text>
                </Pressable>
                <Pressable style = {styles.button}
                onPress={()=>onPress('Songs')}>
                    <Text style= {styles.text}>Songs</Text>
                </Pressable>
                <Pressable style = {styles.button}
                onPress={()=>onPress('Artists')}>
                    <Text style= {styles.text}>Artists</Text>
                </Pressable>
            </ScrollView>
            <View>
                {albumData.map((item) => (
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
        </>
    )
}
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

})
export default Albums;