import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, StyleSheet, StatusBar, TextInput, ImageBackground, Pressable, FlatList} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconSreach } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import Login from '../LoginAndRegister/Login';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { ReactNode, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import PlayList from './PlayList';
import Album from './Album';


interface HomeScreenProps {
}

const HomeScreen: React.FC<HomeScreenProps> = () => {

    const [text, setText] = useState('');
    const [showPlayList, setShowPlayList] = useState(true);
    const [selectedIdP, setSelectedIdP] = useState<string>(''); 

    const [showAlbum, setShowAlbum] = useState(true);
    const [selectedIdA, setSelectedIdA] = useState<string>(''); 

    const handleNavigateToPlaylist = (ID: string) => {
        setShowPlayList(false)
        setSelectedIdP(ID);
    }
    const handleNavigateToBackL = () => {
        setShowPlayList(true)
    };

    const handleNavigateToAlbum = (ID: string) => {
        setShowAlbum(false)
        setSelectedIdA(ID);
    }
    const handleNavigateToBackA = () => {
        setShowPlayList(true)
    };




    const handleChangeText = (newText: string) => {
        setText(newText);
    };

    const recentlyPlayedData = [
        { id: '1', title: 'Le Luu Ly', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/Leluuly.jpg') },
        { id: '2', title: 'Anh Mat Troi', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/anhMatTroi.jpg') },
        { id: '3', title: 'Khi Anh Gan Em', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/KhiAnhGanEm.jpg') },
        { id: '4', title: 'Hoa Cuoi', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/Hoacuoijpg.jpg') },
        { id: '5', title: 'Tinh Yeu Sai', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/OIP.jpg') },
        { id: '6', title: 'Mehaboba', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/Leluuly.jpg') },
    ];

    const playListData = [
        { id: '1', title: 'Chills', image: require('../../assets/images/song/albumChill.jpg'), colorAlbum: ['#b41b1b', '#101d1d'] },
        { id: '2', title: 'Anime', image: require('../../assets/images/ImageAnime/ImageAlbum.png'),colorAlbum: ['#5a6777', '#101221'] },
        { id: '3', title: 'Gym', image: require('../../assets/images/ImageGym/imageAlbum.jpg'), colorAlbum: ['#e8a356', '#140000'] },
        { id: '4', title: 'Sad', image: require('../../assets/images/ImageSad/imageAlbum.jpg'),colorAlbum: ['#142e4e', '#966d74'] },
    ];

    const albumData = [
        { id: '1', title: '99%', image: require('../../assets/images/ImageAlbum99/ImageAlbum.jpg'), colorAlbum: ['', '']},
        { id: '2', title: 'Ai', image: require('../../assets/images/ImageAlbumAi/imageAlbum.jpg'), colorAlbum: ['', '']},
        { id: '3', title: 'LoiChoi', image: require('../../assets/images/ImageLoiChoi/ImageAlbum.jpg'), colorAlbum: ['', '']},
    ]


    return (
        <>
            {showPlayList ? (
                <Container colors={['black','black','black']}>
                    <Header>
                        <Text style={{ color: 'white', fontSize: 32, marginLeft: 20, marginTop: 20 }}>Home</Text>
                        <View style={styles.searchContainer}>
                            <SvgXml xml={iconSreach()} style={{ margin: 12, marginRight: 0, }} />
                            <TextInput
                                style={styles.input}
                                value={text}
                                onChangeText={handleChangeText}
                                placeholder="Search"
                            />
                        </View>
                    </Header>

                    <Content>
                        <Text style={{ fontSize: 18, color: 'white', margin: 20, }}>
                        Playlist Hot
                        </Text>
                        <ScrollView
                        horizontal>
                            {playListData.map((item) => (
                                <Pressable
                                key={item.id}
                                onPress={() => handleNavigateToPlaylist(item.id)}
                            >
                                <ImageBackground
                                    style={styles.logo}
                                    source={item.image}
                                >
                                    <Text style={styles.title}>{item.title}</Text>
                                </ImageBackground>
                            </Pressable>
                            
                            ))}
                        </ScrollView>

                        <Text style={{ fontSize: 18, color: 'white', margin: 20, }}>
                        Album Hot
                        </Text>
                        <ScrollView
                        horizontal>
                            {albumData.map((item) => (
                                <Pressable
                                key={item.id}
                                onPress={() => handleNavigateToPlaylist(item.id)}
                            >
                                <ImageBackground
                                    style={styles.logo}
                                    source={item.image}
                                >
                                    <Text style={styles.title}>{item.title}</Text>
                                </ImageBackground>
                            </Pressable>
                            
                            ))}
                        </ScrollView>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 18, color: 'white', marginLeft: 20, marginTop: 20, }}>
                                Recently Play
                            </Text>
                            <Text style={{ fontSize: 18, color: 'white', marginLeft: 190, marginTop: 20, }}>
                                See all
                            </Text>
                        </View>

                        {recentlyPlayedData.map((item) => (
                            <Pressable
                                key={item.id}
                                style={styles.item}
                            >
                                <Image source={item.image} style={styles.song} />
                                <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                    <Text style={{ color: 'white' }}>{item.title}</Text>
                                    <Text style={{ color: 'white' }}>{item.artist}</Text>
                                    <Text style={{ color: 'white', marginTop: 8 }}>{item.duration}</Text>
                                </View>
                            </Pressable>
                        ))}


                    </Content>

                    <Footer>
                        <BottomBar/>
                    </Footer>

                </Container>
            ) : (
                <PlayList handleNavigateBack={handleNavigateToBackL} id={selectedIdP} />

            )}
        </>

    );
};
const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 20,
        height: 40
    },
    logo: {
        height: 170,
        width: 170,
        alignContent: 'center',
        marginLeft: 20,
        borderRadius: 20,
        overflow: 'hidden'
    },
    input: {
        flex: 1,
        paddingVertical: 1,
        paddingHorizontal: 10,
    },
    search: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: '#D9D9D9',
        height: 500
    },
    list: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    playList: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        backgroundColor: '#24242E',
        height: 100,
        width: 380,
        alignContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 20,
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        top: 110,
        margin: 20,
        top: 110,
        margin: 20,
        color: 'white'
    },
    word: {
        fontSize: 18,
        color: 'white',
        alignContent: 'stretch',
    },
    song: {
        height: 70,
        width: 70,
        borderRadius: 10,
        borderRadius: 10,
    },
});
export default HomeScreen;