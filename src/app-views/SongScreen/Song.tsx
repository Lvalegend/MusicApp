import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, GestureResponderEvent } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconPrevSong, iconNextSong, iconPause, iconPlay, iconLove, iconSong, iconShuffle, iconCommentsWhite, iconLyrics, iconBack } from '../../app-uikits/icon-svg'
import { Footer, Content, Header, Container } from '../../app-layout/Layout';
import Slider from '@react-native-community/slider';
import TrackPlayer, { Capability, State, Event, usePlaybackState, useProgress } from 'react-native-track-player';
import Swiper from 'react-native-swiper';
import lyricsArray from './lyricsData';
import { hostNetwork } from '../../host/HostNetwork';

export type RootStackParamList = {
    Song: undefined;
    Comments: undefined;
    Playlist: undefined
};

interface SongProps {
    song: string;
     handleNavigateBack: () => void; 
     navigation: NavigationProp<any>; 
     onPress: () => void;

}


const Song: React.FunctionComponent<SongProps> = ({ handleNavigateBack }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [playState, setPlayState] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const progress = useProgress();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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


    const loadTrack = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,

            ],
        });

    const songId = 'Song_1'
        await TrackPlayer.add({
            id: songId,
            url: `http://${hostNetwork}:3000/audio?id=${songId}`,
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
            await TrackPlayer.play();
            const position = await TrackPlayer.getPosition();
            setCurrentPosition(await TrackPlayer.getPosition());
        }
        setPlayState(!playState);
        
    };


    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleCommentPress = () => {
        navigation.navigate('Comments')
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
                            <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
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
    lyricText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    goBackButton: {
        color: 'white',
        marginLeft: 30,
        bottom: 20,
    }
});
export default Song;
