import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, StyleSheet, StatusBar, TextInput, ImageBackground, Pressable, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconSreach } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
<<<<<<< HEAD
import { ReactNode, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import PlayList from './PlayList';



interface HomeScreenProps {
    navigation: NavigationProp<any>;
=======
import { useState } from 'react';
import DownloadButton from '../GeneralComponents/DownloadButton.tsx/DownloadButton';
interface HomeScreenProps {
    navigation: NavigationProp<any>
>>>>>>> cb282879cda04304949c3179bb03061c0e6d785b
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const [text, setText] = useState('');
    const [showPlayList, setShowPlayList] = useState(true);
    const [selectedId, setSelectedId] = useState<string>(''); 

<<<<<<< HEAD
    const handleNavigateToPlaylist = (ID: string) => {
        setShowPlayList(false)
        setSelectedId(ID);
    }
    const handleNavigateToBack = () => {
        setShowPlayList(true)
    };

    const handlePopular = () => {
        navigation.navigate('Popular')
    };

    const handleFavourite = () => {
        navigation.navigate('Favourite')
    };

    const handleDownload = () => {
        navigation.navigate('Downloads')
    };

    const handleUser = () => {
        navigation.navigate('User')
    };
=======
    const handlePopular = () => {
        navigation.navigate('Popular')
    }
    const handleFavourite = () => {
        navigation.navigate('Favourite')
    }

    const handleDownloads = ()=>{
        navigation.navigate('Downloads')
    }
    const handleUser = () => {
        navigation.navigate('User')
    }
    const handleSong = () => {
        navigation.navigate('Song')
    }
>>>>>>> cb282879cda04304949c3179bb03061c0e6d785b

    const handleChangeText = (newText: string) => {
        setText(newText);
    };

<<<<<<< HEAD
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


=======
    const handleNavigateToPlaylist = () => {
        navigation.navigate('PlayList');
    };
>>>>>>> cb282879cda04304949c3179bb03061c0e6d785b

    return (

        <>
<<<<<<< HEAD
            {showPlayList ? (
                <Container backgroundColor={'black'}>
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
                        <ScrollView
                        horizontal>
                            {playListData.map((item) => (
                                <Pressable
                                key={item.id}
                                onPress={() => handleNavigateToPlaylist(item.id)}
=======
            <Container colors={['#4c669f', 'red', '#192f6a']}>
                <Header>
                    <Text style={{ color: 'white', fontSize: 32, marginLeft: 20, marginTop: 20 }}>Home</Text>
                    <View style={styles.searchContainer}>
                        <SvgXml xml={iconSreach()} style={{ margin: 20, marginRight: 0, }} />
                        <TextInput
                            style={styles.input}
                            value={text}
                            onChangeText={handleChangeText}
                            placeholder="Search"
                        />
                    </View>
                </Header>

                <Content>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <Pressable onPress={handleNavigateToPlaylist}>
                            <ImageBackground
                                style={styles.logo}
                                source={require('../../assets/images/song/albumChill.jpg')}
>>>>>>> cb282879cda04304949c3179bb03061c0e6d785b
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

<<<<<<< HEAD
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
=======
                        <ImageBackground
                            style={styles.logo}
                            source={require('../../assets/images/song/album1.jpg')}
                        >
                            <Text style={styles.title}>Chills</Text>
                        </ImageBackground>
                        <ImageBackground
                            style={styles.logo}
                            source={require('../../assets/images/song/album1.jpg')}
                        >
                            <Text style={styles.title}>GYM</Text>
                        </ImageBackground>
                        <ImageBackground
                            style={styles.logo}
                            source={require('../../assets/images/song/album1.jpg')}
                        >
                            <Text style={styles.title}>GYM</Text>
                        </ImageBackground>
                        <ImageBackground
                            style={styles.logo}
                            source={require('../../assets/images/song/album1.jpg')}
                        >
                            <Text style={styles.title}>GYM</Text>
                        </ImageBackground>
                    </ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, color: 'white', marginLeft: 20, marginTop: 20, }}>
                            Recently Play
                        </Text>
                        <Text style={{ fontSize: 18, color: 'white', marginLeft: 190, marginTop: 20, }}>
                            See all
                        </Text>
                    </View>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}>
                        <Pressable style={styles.item} onPress={handleSong}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Le Luu Ly</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/anhMatTroi.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Anh Mat Troi</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/KhiAnhGanEm.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Khi Anh Gan Em</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Hoacuoijpg.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Hoa Cuoi</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/OIP.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Tinh Yeu Sai</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                            <DownloadButton></DownloadButton>
                        </Pressable>
                    </ScrollView>

                </Content>
                <Footer>
                    <BottomBar></BottomBar>
                </Footer>

            </Container>
>>>>>>> cb282879cda04304949c3179bb03061c0e6d785b


                    </Content>

                    <Footer>
                        <BottomBar onPressPopular={handlePopular} onPressDownloads={handleDownload} onPressFavourite={handleFavourite} onPressUser={handleUser} />
                    </Footer>

                </Container>
            ) : (
                <PlayList handleNavigateBack={handleNavigateToBack} id={selectedId} />
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
<<<<<<< HEAD
=======
    },
    itemPlayList: {
        backgroundColor: '#f9c2ff',
        height: 170,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
>>>>>>> cb282879cda04304949c3179bb03061c0e6d785b
    },
    title: {
        fontSize: 16,
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
    },
});
export default HomeScreen;