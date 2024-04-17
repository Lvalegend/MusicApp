import * as React from 'react';
import { Button, View, Text, Pressable, Image, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { icon3Cham, iconAdd, iconDownload, iconFavourite, iconLoop } from '../../app-uikits/icon-svg';
import { useState } from 'react';
import Albums from './Albums';


interface FavouriteProps {

}

const Favourite: React.FC<FavouriteProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {

    const [showAlbums, setShowAlbums] = useState(true);
    let id = '';
    const handleNavigateToPAlbums = () => {
        setShowAlbums(false)
        id = '2';
    }
    const handleNavigateToBack = () => {
        setShowAlbums(true)
    };


    const handleHome = ()=>{
        navigation.navigate('HomeScreen')
    }
    const handlePopular = ()=>{
        navigation.navigate('Popular')
    }
    const handleDownload = ()=>{
        navigation.navigate('Download')
    }
    const handleUser = ()=>{
        navigation.navigate('User')
    }
    const playListFavouriteData = [
        { id: '1', title: 'Chills', image: require('../../assets/images/song/albumChill.jpg'), artist: 'tling, hz52, mck' },
        { id: '2', title: 'Anime', image: require('../../assets/images/ImageAnime/ImageAlbum.png'), artist: 'tling, hz52, mck' },
        { id: '3', title: 'Gym', image: require('../../assets/images/ImageGym/imageAlbum.jpg'), artist: 'tling, hz52, mck' },
        { id: '4', title: 'Sad', image: require('../../assets/images/ImageSad/imageAlbum.jpg'), artist: 'tling, hz52, mck' },
    ];
    return (
        <> 
            <Container colors={['black', 'black', 'black']}>
                <Header>
                <Text style={{ color: 'white', fontSize: 32, marginLeft: 20, marginTop: 20 }}>Favourite</Text>
                </Header>
                {showAlbums ? (
                    <Content>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style = {{padding:20}}>
                            <Pressable style = {styles.buttonSelec}>
                                <Text style= {styles.text}>Playlists</Text>
                            </Pressable>
                            <Pressable 
                            style = {styles.button}
                            onPress = {handleNavigateToPAlbums}>
                                <Text style= {styles.text}>Albums</Text>
                            </Pressable>
                            <Pressable style = {styles.button}>
                                <Text style= {styles.text}>Songs</Text>
                            </Pressable>
                            <Pressable style = {styles.button}>
                                <Text style= {styles.text}>Artists</Text>
                            </Pressable>
                        </ScrollView>
                        <View>
                            <Pressable style = {{padding:20, flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={styles.add}><SvgXml xml={iconAdd('white', 20, 20)}/></View>
                                    <View><Text style={styles.textPlaylist}>Add new playlist</Text></View>
                            </Pressable>
                        </View>
                        <View>
                            {playListFavouriteData.map((item) => (
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
                ) : (
                    <Albums backgroundColor={'red'} id={id} handleNavigateBack={function (): void {handleNavigateToBack} }></Albums>
                )}
                <Footer>
                <BottomBar onPressHome={handleHome} onPressDownloads={handleDownload} onPressPopular={handlePopular} onPressUser={handleUser}>
                    </BottomBar>
                </Footer>
            </Container>
        </>
    );
};
const styles = StyleSheet.create({
    buttonSelec: {
        width: 100,
        height: 30,
        borderRadius: 20,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderWidth:1,
        borderColor: 'white'
    },
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
export default Favourite;
