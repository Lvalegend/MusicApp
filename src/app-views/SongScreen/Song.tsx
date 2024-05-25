import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, GestureResponderEvent } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconPrevSong, iconNextSong, iconPause, iconPlay, iconLove, iconSong, iconShuffle, iconCommentsWhite, iconLyrics, iconBack } from '../../app-uikits/icon-svg'
import { Footer, Content, Header, Container } from '../../app-layout/Layout';
import Slider from '@react-native-community/slider';
import TrackPlayer, { Capability, State, Event, usePlaybackState, useProgress } from 'react-native-track-player';
import Swiper from 'react-native-swiper';
import { load } from 'react-native-track-player/lib/src/trackPlayer';

export type RootStackParamList = {
    Song: undefined;
    Comments: undefined;
    Playlist: undefined
};

interface SongProps {
    navigation: any
    song: string
    onPress: () => void
    handleNavigateBack: () => void;
}


const Song: React.FunctionComponent<SongProps> = ({ handleNavigateBack }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [playState, setPlayState] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const progress = useProgress();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();;
    const [currentLyric, setCurrentLyric] = useState("");

    const lyricsArray = [
        { startTime: 0, text: "Và bao nhiêu đêm dài\nAnh mong có em ở lại" },
        { startTime: 10, text: "Chẳng chi trông mong\nở nơi hư không\nCho anh giấc ngủ của ngài" },
        { startTime: 20, text: "Phải chăng anh biết đường\nTìm ra những lẽ thường\nPhải chăng anh biết đường\nđi tìm em giữa bốn phương" },
        { startTime: 30, text: "Chiếc hôn thật xinh xắn\nNhững nụ cười tươi tắn\nThế nhưng thời gian với nhau\nCủa anh với em là hơi ngắn" },
        { startTime: 40, text: "Hãy ở lại đây\nVòng tay bên anh ấm ôm tràn đầy\nCho dù anh\nChẳng chắc mình có\nChỉ ôm em ngủ say\nôm em ngủ say" },
        { startTime: 50, text: "Vì một điều mà anh\nRất ngại nói ra\nKhông em ơi\nAnh không có người thứ ba" },
        { startTime: 60, text: "Chỉ là điều mà anh\nRất ngại nói ra với em" },
        { startTime: 70, text: "Mùa đông cho đêm nay thêm xanh\nBao nhiêu câu ca trong anh\nDa di da di con đường\nVề phải đi bao nhiêu phố phường" },
        { startTime: 80, text: "Thôi em ơi, con đường xa\nAnh cũng ngại phải đưa em về nhà\nAnh cũng ngại phải chào ông chào bà\nVà anh cũng ngại\nPhải cô đơn tại gia" },
        { startTime: 90, text: "Nhiều ngày rồi mình có nhau\nNhưng em thì nào có biết đâu\nNhững suy nghĩ ở trong đầu\nChẳng thể nói được ra cho quá mau" },
        { startTime: 100, text: "Để rồi lại mong\nCho đêm mai em sang\nCho dù anh chẳng dám\nLe lám bẽ bàng này" },
        { startTime: 110, text: "Cho dù anh chẳng chắc\nMình có chỉ ôm em ngủ say\nôm em ngủ say" },
        { startTime: 120, text: "Vì một điều mà anh\nRất ngại nói ra\nKhông em ơi\nAnh không có người thứ ba" },
        { startTime: 130, text: "Chỉ là điều mà anh\nRất ngại nói ra với em" },
        { startTime: 140, text: "Và anh biết chẳng cần thiết\nPhải như thế\nNếu vẫn muốn bên nhau" },
        { startTime: 150, text: "Một điều mà ai đã từng\nMột điều chẳng ai muốn dừng\nLại đâu" },
        { startTime: 160, text: "Vì một điều mà anh\nRất ngại nói ra\nKhông em ơi\nAnh không có người thứ ba" },
        { startTime: 170, text: "Chỉ là điều mà anh\nRất ngại nói ra với em" },
        { startTime: 180, text: "Chỉ là điều mà anh\nRất ngại nói ra" }
    ];

    useEffect(() => {
        const interval = setInterval(async () => {
            if (playState) {
                const position = await TrackPlayer.getPosition();
                setCurrentPosition(position);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [playState]);



    useEffect(() => {
        const trackPlayerListener = TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async ({ nextTrack }) => {
            if (nextTrack) {
                const position = await TrackPlayer.getPosition();
                setCurrentPosition(position);
            }
        });

        return () => {
            trackPlayerListener.remove();
        };
    }, []);
    useEffect(() => {
        loadTrack();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (playState) {
                updateCurrentLyric(progress.position);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [playState, progress.position]);

    const updateCurrentLyric = (position: number) => {
        const currentLyricData = lyricsArray.find((lyric: { startTime: number; }, index: number) => {
            const nextLyric = lyricsArray[index + 1];
            return position >= lyric.startTime && (!nextLyric || position < nextLyric.startTime);
        });
        setCurrentLyric(currentLyricData ? currentLyricData.text : "");
    };


    const loadTrack = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,

            ],
        });

        await TrackPlayer.add({
            id: 'track1',
            url: require('../../assets/images/song/Mot-Dieu-Ma-Anh-Rat-Ngai-Noi-Ra-Hai-Sam.mp3'),
            title: 'Adiyee',
            artist: 'Bachelor Dhibu Ninan Thomas, Kapil Kapilan',

        });
        const duration = await TrackPlayer.getDuration();
        setTotalDuration(duration);
        setIsLoading(false);
    };

    const togglePlayPause = async () => {
        if (playState) {
            TrackPlayer.pause();
        } else {
            TrackPlayer.play();
            setCurrentPosition(await TrackPlayer.getPosition());
        }
        setPlayState(!playState);
    };


    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>

            <Container colors={['black', 'black']}>

                <Header style={styles.header}>
                    <Text style={styles.headerText}>Playing now</Text>
                    <TouchableOpacity onPress={handleNavigateBack} style={styles.goBackButton}>
                        <SvgXml width={30} height={30} xml={iconBack()}></SvgXml>
                    </TouchableOpacity>
                </Header>

                <Content>
                    <View>
                        <Swiper style={styles.imageSong}
                            loop={false}
                            dotStyle={{ bottom: 350, backgroundColor: 'gray' }}
                            activeDotStyle={{ bottom: 350, backgroundColor: 'white' }}>
                            <View style={styles.slide}>
                                <SvgXml width={400} height={400} xml={iconSong()}></SvgXml>
                            </View>
                            <View style={styles.slide}>
                                <Text style={styles.lyricText}>{currentLyric}</Text>
                            </View>
                        </Swiper>
                    </View>
                    <View style={styles.titleLeft}>
                        <Text style={styles.songTitle}>Adiyee</Text>
                        <Text style={styles.artist}>Bachelor Dhibu Ninan Thomas , Kapil Kapilan</Text>
                    </View>

                    <View style={styles.titleRight}>
                        <SvgXml width={30} height={30} xml={iconLove()}></SvgXml>
                    </View>

                    <View style={styles.controls}>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={progress.duration}
                            value={progress.position}
                            minimumTrackTintColor="#00ffff"
                            maximumTrackTintColor="white"
                            thumbTintColor="#00ffff"
                            onValueChange={async value => {
                                await TrackPlayer.seekTo(value);
                            }}

                        />
                        <View style={styles.timeContainer}>
                            <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
                            <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
                        </View>

                        <View style={styles.iconCmt}>
                            <TouchableOpacity onPress={() => navigation.navigate('Comments')} >
                                <SvgXml width={30} height={30} xml={iconCommentsWhite()}></SvgXml>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity style={styles.iconPrevSong}>
                            <SvgXml width={30} height={30} xml={iconPrevSong()}></SvgXml>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconNextSong}>
                            <SvgXml width={30} height={30} xml={iconNextSong()}></SvgXml>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconShuffle}>
                            <SvgXml width={40} height={40} xml={iconShuffle()}></SvgXml>
                        </TouchableOpacity>
                        <View style={styles.iconPlayPause}>
                            <TouchableOpacity onPress={togglePlayPause}>
                                {playState ? (
                                    <SvgXml width={65} height={65} xml={iconPause()}></SvgXml>
                                ) : (
                                    <SvgXml width={65} height={65} xml={iconPlay()}></SvgXml>
                                )}
                            </TouchableOpacity>
                        </View>

                    </View>

                </Content>

                <Footer>

                </Footer>
            </Container>

        </>


    )


};

const styles = StyleSheet.create({
    header: {
        height: 100,

    },
    headerText: {
        fontSize: 20,
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
    },
    songTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "white",
        bottom: 350

    },
    artist: {
        fontSize: 15,
        color: "white",
        bottom: 340
    },
    imageSong: {

    },
    titleLeft: {
        marginLeft: 20

    },
    titleRight: {
        marginLeft: 350,
        bottom: 400

    },
    controls: {

    },
    slider: {
        bottom: 330
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 320
    },
    timeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',

    },
    iconCmt: {
        left: 30,
        bottom: 250,


    },
    iconPrevSong: {
        left: 110,
        bottom: 320,
    },
    iconNextSong: {
        left: 270,
        bottom: 350,

    },
    iconPlayPause: {
        alignItems: 'center',
        bottom: 430

    },
    iconShuffle: {
        left: 350,
        bottom: 340

    },
    slide: {

    },
    lyricText:{
        color:'white',
        textAlign:'center',
        fontSize:20
    },
    goBackButton: {
        color: 'white',
        marginLeft: 30,
        bottom: 20,
    }
});
export default Song;
