import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, GestureResponderEvent } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconPrevSong, iconNextSong, iconPause, iconPlay, iconLove, iconSong, iconShuffle, iconCommentsWhite, iconLyrics } from '../../app-uikits/icon-svg'
import { Footer, Content, Header, Container } from '../../app-layout/Layout';
import Slider from '@react-native-community/slider';
import TrackPlayer, { Capability, State, Event, usePlaybackState, useProgress } from 'react-native-track-player';
import Swiper from 'react-native-swiper';


interface SongProps {

}
const Song: React.FunctionComponent<SongProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [playState, setPlayState] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const progress = useProgress()

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
        loadTrack();
    }, []);


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

        setTotalDuration(await TrackPlayer.getDuration());
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


    const [showComments, setShowComments] = useState(false);
    const handleCommentPress = () => {
        navigation.navigate('Comments');
        setShowComments(!showComments);
    };
    return (
        <>

            <Container colors={['black', 'black']}>

                <Header style={styles.header}>
                    <Text style={styles.headerText}>Playing now</Text>

                </Header>

                <Content>
                    <View>
                        <Swiper style={styles.imageSong} 
                        loop={false} 
                        dotStyle={{bottom:370, backgroundColor:'gray'}}
                        activeDotStyle={{backgroundColor:'white', bottom:370}}>
                            <View style={styles.slide}>
                                <SvgXml width={400} height={400} xml={iconSong()}></SvgXml>
                            </View>
                            <View style={styles.slide}>
                                <SvgXml width={400} height={400} xml={iconLyrics()}></SvgXml>
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
                            <Text style={styles.timeText}>{formatTime(currentPosition)}</Text>
                            <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>

                        </View>

                        <View style={styles.iconCmt}>
                            <TouchableOpacity onPress={handleCommentPress} >
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
        marginBottom: 30,
        textAlign: 'center',
    },
    songTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "white",
        marginTop: 80,
        left: 30,
    },
    artist: {
        fontSize: 15,
        color: "white",
        left: 30,
    },
    imageSong: {
        alignItems: 'center',
    },
    titleLeft: {
        marginRight: -50,
        bottom:430,
    },
    titleRight: {
        left: 350,
        bottom:470
    },
    controls: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        width: '100%',
        marginTop: -450,

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
        alignItems: 'center',
        margin:12
    },
    iconCmt: {
        right: 150,
        bottom: -80,
        flex:1
    },
    iconPrevSong: {
        right: 80,
        bottom: 390,
    },
    iconNextSong: {
        left: 80,
        bottom: 390,
       
    },
    iconPlayPause: {
        bottom:400
       
    },
    iconShuffle: {
        bottom: 350,
        left: 150,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default Song;