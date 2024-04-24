import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, GestureResponderEvent} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconPrevSong, iconNextSong, iconPause, iconPlay, iconLove, iconSong, iconShuffle, iconCommentsWhite} from '../../app-uikits/icon-svg'
import {Footer, Content, Header} from '../../app-layout/Layout';
import Slider from '@react-native-community/slider';
import TrackPlayer, { Capability, State , Event, usePlaybackState} from 'react-native-track-player';



interface SongProps {

}
const Song: React.FC<SongProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [playState, setPlayState] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

   
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

    const playbackState = usePlaybackState();
    useEffect(() => {
        const trackPlayerListener = TrackPlayer.addEventListener(Event.PlaybackState, ({ state }) => {
            if (state === State.Playing) {
                setPlayState(true);
            } else {
                setPlayState(false);
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
        }
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

            <View style={styles.container}>

                <Header style={styles.header}>
                    <Text style={styles.headerText}>Playing now</Text>

                </Header>
             
                <Content>
                    <View style={styles.imageSong}>
                        <SvgXml width={400} height={400} xml={iconSong()}></SvgXml>
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
                            maximumValue={totalDuration}
                            value={currentPosition}
                            minimumTrackTintColor="#00ffff"
                            maximumTrackTintColor="white"
                            thumbTintColor="#00ffff"
                            onValueChange={(value: React.SetStateAction<number>) => setCurrentPosition(value)}
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
                        <View style={styles.iconPrevSong}>
                            <SvgXml width={30} height={30} xml={iconPrevSong()}></SvgXml>
                        </View>
                        <View style={styles.iconNextSong}>
                            <SvgXml width={30} height={30} xml={iconNextSong()}></SvgXml>
                        </View>
                        <View style= {styles.iconShuffle}>
                            <SvgXml width={40} height={40} xml={iconShuffle()}></SvgXml>
                        </View>
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
    left:20,
},
artist: {
    fontSize: 15,
    color: "white",
    left:20,
},
imageSong: {
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
iconShuffle:{
    bottom:15,
    left: 150,
    
}
});
export default Song;


