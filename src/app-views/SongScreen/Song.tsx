import React, { useEffect, useState, useRef } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, GestureResponderEvent, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconPrevSong, iconNextSong, iconPause, iconPlay, iconLove, iconSong, iconShuffle, iconComments, iconLyrics } from '../../app-uikits/icon-svg'
import { Footer, Content, Header } from '../../app-layout/Layout';
import Slider from '@react-native-community/slider';
import iconCommentsWhite from '../../assets/svg/IconComments/iconCommentsWhite';
import Swiper from 'react-native-swiper';
import Sound from 'react-native-sound';
import { Audio } from 'expo-av';


type Song = {
    id: string;
    title: string;
    uri: string;
  };

interface SongProps {

}
const Song: React.FC<SongProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [playState, setPlayState] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);

    //
    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false);
    //         setTotalDuration(300);
    //     }, 2000);
    // }, []);
    //
    useEffect(() => {
    
        const fetchSongs = async () => {
          
            const fetchedSongs: Song[] = [
              { id: '1', title: 'Song 1', uri: require('../../assets/images/song/Mot-Dieu-Ma-Anh-Rat-Ngai-Noi-Ra-Hai-Sam.mp3') },
            ];
            setSongs(fetchedSongs);
          };
      
          fetchSongs();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
      }, []);
      const playSound = async (uri: string) => {
        if (sound) {
          await sound.unloadAsync();
        }
        const { sound: soundObject } = await Audio.Sound.createAsync({ uri });
        setSound(soundObject);
        await soundObject.playAsync();
      };
      const renderItem = ({ item }: { item: Song }) => (
        <Button title={item.title} onPress={() => playSound(item.uri)} />
      );
    //
  
    // useEffect(() => {

    //     if (!isLoading && playState) {
    //         const interval = setInterval(() => {
    //             setCurrentPosition(prevPosition => prevPosition + 1);
    //         }, 1000);

    //         return () => clearInterval(interval);
    //     }
    // }, [isLoading, playState]);

    // const togglePlayPause = async () => {
    //     setPlayState(prevState => !prevState);
    //     if (!sound) return;
    //     if (playState) {
    //         sound.pause();
    //     } else {
    //         sound.play();
    //     }
    // };
    
    // const formatTime = (timeInSeconds: number) => {
    //     const minutes = Math.floor(timeInSeconds / 60);
    //     const seconds = Math.floor(timeInSeconds % 60);
    //     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    // };
    const [showComments, setShowComments] = useState(false);
    const handleCommentPress = () => {
        navigation.navigate('Comments');
        setShowComments(!showComments);
    };
   

    return (
        <>

            <View style={styles.container}>

                <Header style={styles.header}>
                    <Text style={styles.headerText}>Playing now</Text>

                </Header>
             
                <Content>

                    <Swiper style={styles.wrapper}
                        dotColor="gray"
                        activeDotColor="white"
                        paginationStyle={styles.pagination}>
                        <View style={styles.imageSong}>
                            <SvgXml width={380} height={380} style={{ alignItems: 'center' }} xml={iconSong()}></SvgXml>
                        </View>
                        <View style={styles.imageSong}>
                            <SvgXml width={400} height={400} style={{ alignItems: 'center' }} xml={iconLyrics()}></SvgXml>
                        </View>
                    </Swiper>

                    <View style={styles.titleLeft}>
                        <Text style={styles.songTitle}>Adiyee</Text>
                        <Text style={styles.artist}>Bachelor Dhibu Ninan Thomas , Kapil Kapilan</Text>
                    </View>

                    <View style={styles.titleRight}>
                        <SvgXml width={30} height={30} xml={iconLove()}></SvgXml>
                    </View>

                    {/* {isLoading ? (
                        <ActivityIndicator size="large" color="#d3d3d3" />
                    ) : (
                        <View style={styles.controls}>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={totalDuration}
                                value={currentPosition}
                                minimumTrackTintColor="#00ffff"
                                maximumTrackTintColor="white"
                                thumbTintColor="#00ffff"
                                onValueChange={(value: React.SetStateAction<number>) => setCurrentPosition(value)}
                            /> */}
                            {/* <View style={styles.timeContainer}>
                                <Text style={styles.timeText}>{formatTime(currentPosition)}</Text>
                                <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>

                            </View> */}
                            <View>

                            <View style={styles.iconCmt}>
                                <TouchableOpacity onPress={handleCommentPress} >
                                    <SvgXml width={30} height={30} xml={iconCommentsWhite()}></SvgXml>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.iconPrevSong}>
                                <SvgXml width={30} height={30} xml={iconPrevSong()}></SvgXml>
                            </View>
                            <View style={styles.iconNextSong}>
                                <SvgXml width={30} height={30} xml={iconNextSong()}></SvgXml>
                            </View>
                            <View style={styles.iconShuffle}>
                                <SvgXml width={40} height={40} xml={iconShuffle()}></SvgXml>
                            </View>
                            <View style={styles.iconPlayPause}>

                              
                                <FlatList
                         data={songs}
                                renderItem={renderItem}
                        keyExtractor={(item) => item.id}
      
      />
                            </View>

                        </View>
                    
                </Content>

                <Footer>

                </Footer>
            </View>

        </>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,

    },
    header: {
        height: 100,

    },
    headerText: {
        fontSize: 20,
        color: 'white',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center',
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    footerText: {
        color: "white",
        fontSize: 20,
    },
    songTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "white",
        marginTop: 80,
        left: 25,
    },
    artist: {
        fontSize: 15,
        color: "white",
        left: 25,
    },
    imageSong: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleLeft: {
        marginRight: 10,

    },
    titleRight: {
        marginTop: -30,
        left: 340,
        flex: 1,
    },
    controls: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    iconCmt: {
        right: 150,
        flex: 1,
        bottom: -75,
    },
    overlay: {
        position: 'absolute',
        bottom: '50%',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    iconPrevSong: {
        right: 80,
        flex: 1,
        bottom: -10,
    },
    iconNextSong: {
        left: 80,
        flex: 1,
        bottom: 20,
    },
    iconPlayPause: {
        bottom: 100,
    },
    iconShuffle: {
        bottom: 15,
        left: 150,

    },
    wrapper: {
        height: 400,
    },
    pagination: {
        bottom: -50,

        alignItems: 'center'
    }
});
export default Song;
function setTotalDuration(arg0: number) {
    throw new Error('Function not implemented.');
}

