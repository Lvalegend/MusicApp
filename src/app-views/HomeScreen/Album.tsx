import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, StyleSheet, StatusBar, TextInput, ImageBackground, Pressable, VirtualizedList } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Svg, SvgXml } from 'react-native-svg';
import { icon3Cham, iconBack, iconDownload, iconFavourite, iconSreach } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import LinearGradient from 'react-native-linear-gradient';


interface AlbumProps {
    handleNavigateBack: () => void;
    id: string;
}


const Album: React.FC<AlbumProps> = ({handleNavigateBack, id}) => {

    const chillsData = [
        { id: '1', title: 'Point the star', artist: 'Jasper, Martin Arteta, 11:11 Music Group', image: require('../../assets/images/song/SongChill1.jpg') },
        { id: '2', title: 'I Need a Girl', artist: 'Lee', image: require('../../assets/images/song/SongChill2.jpg') },
        { id: '3', title: 'I Like Me Better', artist: 'Peaceful Melody, soave lofi', image: require('../../assets/images/song/SongChill3.jpg') },
        { id: '4', title: 'See You Again', artist: 'Peaceful Melody, soave lofi', image: require('../../assets/images/song/SongChill4.jpg') },
        { id: '5', title: 'Stenven Universe', artist: 'Jasper, Martin Arteta, 11:11 Music Group', image: require('../../assets/images/song/SongChill5.jpg') },
        { id: '6', title: 'Payphone', artist: 'Peaceful melody, soave lofi', image: require('../../assets/images/song/SongChill6.jpg') },
        { id: '7', title: 'You re Beautiful', artist: 'Peaceful Melody, soave lofi', image: require('../../assets/images/song/SongChill7.jpg') },
    ]

    const albumData = [
        { id: '1', title: '99%', image: require('../../assets/images/ImageAlbum99/ImageAlbum.jpg'), colorAlbum: ['#b41b1b', '#101d1d']},
        { id: '2', title: 'Ai', image: require('../../assets/images/ImageAlbumAi/imageAlbum.jpg'), colorAlbum: ['#b41b1b', '#101d1d']},
        { id: '3', title: 'LoiChoi', image: require('../../assets/images/ImageLoiChoi/ImageAlbum.jpg'), colorAlbum: ['#b41b1b', '#101d1d']},
    ]

    const findPlaylistItemById = (itemId: string) => {
        return albumData.find(item => item.id === itemId);
    };
    
    const playlistItem = findPlaylistItemById(id);

    return (
        <>
            {playlistItem && (
                <Container colors={['black','black','black']}>
                    <LinearGradient colors={playlistItem.colorAlbum} style={{ flex: 1 }}>
                        <Header>
                            <View style={styles.containerHeader}>
                                <Pressable onPress={handleNavigateBack}>
                                    <SvgXml xml={iconBack()} />
                                </Pressable>
    
                                <Text style={{ color: 'white', fontSize: 18, margin: 5, marginLeft: 120 }}>PLAYLIST</Text>
                            </View>
                        </Header>
                        <Content>
                            <ImageBackground source={playlistItem.image} style={{ width: 230, height: 230, marginHorizontal: 90, borderRadius: 20, overflow: 'hidden' }}>
                                <Text style={{ color: '#f26161', top: 165, margin: 15, fontSize: 30 }}>{playlistItem.title}</Text>
                            </ImageBackground>
                            <View style={styles.containerFunction}>
                                <Pressable style={styles.icon}>
                                    <SvgXml xml={iconDownload()} />
                                    <Text style={styles.text}>Download</Text>
                                </Pressable>
                                <Pressable style={styles.button}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>RANDOM PLAY</Text>
                                </Pressable>
                                <Pressable style={styles.icon}>
                                    <SvgXml xml={iconFavourite()} />
                                    <Text style={styles.text}>Favourite</Text>
                                </Pressable>
                            </View>
                            {chillsData.map((item) => (
                            <Pressable key={item.id} style={styles.song}>
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
                        </Content>
                        <Footer>
    
                        </Footer>
                    </LinearGradient>
                </Container>
            )}
        </>
    );
    
};

const styles = StyleSheet.create({
    containerHeader: {
        margin: 20,
        flexDirection: 'row'
    },
    containerFunction: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 40,
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor:'#925bff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20,
        marginHorizontal: 20,

    },
    icon: {
        alignItems: 'center'
    },
    text: {
        color: 'white',
    },
    song: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 17,

    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
});
export default Album;