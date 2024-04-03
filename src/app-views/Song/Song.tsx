import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, GestureResponderEvent } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar, iconPrevSong, iconNextSong, iconPause, iconPlay, iconLove, iconSong, iconComments2, iconShuffle } from '../app-uikits/icon-svg';
import {Footer, Content, Header} from '../../app-layout/Layout';



interface SongProps {

}
const Song: React.FC<SongProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [playState, setPlayState] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isCommentVisible, setCommentVisible] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            setTotalDuration(300); // Assume total duration is 5 minutes (300 seconds)
        }, 2000); // Simulate loading time
    }, []);

    // Simulate audio playback progress
    useEffect(() => {
        if (!isLoading && playState) {
            const interval = setInterval(() => {
                setCurrentPosition(prevPosition => prevPosition + 1);
            }, 1000); // Update every second
            return () => clearInterval(interval);
        }
    }, [isLoading, playState]);

    const togglePlayPause = () => {
        setPlayState(prevState => !prevState);
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
                {isCommentVisible && <View style={styles.overlay} />}
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

                    {isLoading ? (
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
                            />
                            <View style={styles.timeContainer}>
                                <Text style={styles.timeText}>{formatTime(currentPosition)}</Text>
                                <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>

                            </View>

                            <View style={styles.iconCmt}>
                                <TouchableOpacity onPress={handleCommentPress} >
                                    <SvgXml width={30} height={30} xml={iconComments2()}></SvgXml>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.iconPrevSong}>
                                <SvgXml width={30} height={30} xml={iconPrevSong()}></SvgXml>
                            </View>
                            <View style={styles.iconNextSong}>
                                <SvgXml width={30} height={30} xml={iconNextSong()}></SvgXml>
                            </View>
                            <View>
                                <SvgXml width={30} height={30} xml={iconShuffle()}></SvgXml>
                            </View>
                            <View style={styles.iconPlayPause}>
                                <TouchableOpacity onPress={togglePlayPause}>
                                    {playState ? (
                                        <SvgXml width={60} height={60} xml={iconPause()}></SvgXml>
                                    ) : (
                                        <SvgXml width={60} height={60} xml={iconPlay()}></SvgXml>
                                    )}
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
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
    },
    artist: {
        fontSize: 15,
        color: "white",
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
        bottom: -45,
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
        bottom: 60,
    }
});
export default Song;
