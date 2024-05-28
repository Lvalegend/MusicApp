import React, { useEffect, useRef, useState } from 'react';
import {
    Button, View, Text, StyleSheet, Image, TextInput, TouchableOpacity,
    ActivityIndicator, GestureResponderEvent, Modal, ScrollView,
    Alert
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconPrevSong, iconNextSong, iconPause, iconPlay, iconLove, iconSong, iconShuffle, iconCommentsWhite, iconLyrics, iconBack } from '../../app-uikits/icon-svg'
import { Footer, Content, Header, Container } from '../../app-layout/Layout';
import Slider from '@react-native-community/slider';
import TrackPlayer, { Capability, State, Event, usePlaybackState, useProgress } from 'react-native-track-player';
import Swiper from 'react-native-swiper';
import lyricsArray from './lyricsData';
import { hostNetwork } from '../../host/HostNetwork';
import socketServices from '../../app-service/socketService';
import axios from 'axios';
import { getToken } from '../../secure-storage/GetToken';

export type RootStackParamList = {
    Song: undefined;
    Comments: undefined;
    Playlist: undefined;
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
        const fetchToken = async () => {
            const token = await getToken();
            setToken(token);
        };
        fetchToken();
    }, []);

    useEffect(() => {
        const setupPlayer = async () => {
            let isPlayerInitialized = false;
            try {
                await TrackPlayer.setupPlayer();
                isPlayerInitialized = true;
                await TrackPlayer.updateOptions({
                    capabilities: [Capability.Play, Capability.Pause],
                });
                await loadTrack();
            } catch (error) {
                console.error('Error setting up player:', error);
            }
            return isPlayerInitialized;
        };

        setupPlayer();
    }, []);

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

    const loadTrack = async () => {
        try {
            const songId = 'Song_3';
            await TrackPlayer.add({
                id: 'track1',
                url: `http://${hostNetwork}:3000/audio?id=${songId}`,
                title: 'Adiyee',
                artist: 'Bachelor Dhibu Ninan Thomas, Kapil Kapilan',
            });
            const duration = await TrackPlayer.getDuration();
            setTotalDuration(duration);
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading track:', error);
        }
    };

    const togglePlayPause = async () => {
        try {
            if (playState) {
                await TrackPlayer.pause();
            } else {
                await TrackPlayer.play();
                setCurrentPosition(await TrackPlayer.getPosition());
            }
            setPlayState(!playState);
        } catch (error) {
            console.error('Error toggling play/pause:', error);
        }
    };

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleCommentPress = () => {
        navigation.navigate('Comments');
    };

    const [isModalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [socketCurrentId, setSocketCurrentId] = useState<any>();
    const [token, setToken] = useState<string | null>(null);
    const [dataComment, setDataComment] = useState<any>([])
    const [tranformImage, setTranformImage] = useState<any>()
    const textInputRef = useRef<any>(null);
   
    

    const handleReplyPress = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };

    useEffect(() => {
        socketServices.on('user-connected', (id: any) => {
            setSocketCurrentId(id);
            console.log(id);
        });
    }, [])

    useEffect(() => {
        socketServices.initializeSocket();

        socketServices.on('received-message', (message: any) => {
            console.log("Message received: ", message);
            setData((prevData: any) => [...prevData, message]);
        });

        return () => {
            socketServices.removeListener('received-message');
        };
    }, []);

    const postMessage = async () => {
        const messageData = {
            token: token,
            songId: 'Song_3',
            socketChat: socketCurrentId,
            message: inputText,
        };
        if (!!inputText) {
            socketServices.emit('send-message', messageData);
            setInputText('')

            try {
                const response = await axios.post(`http://${hostNetwork}:3000/addComment`, {
                    data: messageData
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data) {
                    console.log('add: ',response.data);
                } else {
                    console.log('No data');
                }
            } catch (err) {
                console.error('Error: ', err);
            }
        }
        else {
            Alert.alert('Please enter a message');
        }
    };

    useEffect(() => {
        const fetchDataComment = async () => {
            try {
                const songId = 'Song_3'
                const response = await axios.get(`http://${hostNetwork}:3000/getComment?id=${songId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                if (response.data) {
                    console.log(response.data);
                    setDataComment(response.data);
                } else {
                    console.log('No data');
                }
            } catch (err) {
                console.error('Error: ', err);
            }
        }
        fetchDataComment()
    }, [])

    return (
        <Container colors={['black', 'black']}>
            <Header style={styles.header}>
                <Text style={styles.headerText}>Playing now</Text>
                <TouchableOpacity onPress={handleNavigateBack} style={styles.goBackButton}>
                    <SvgXml width={30} height={30} xml={iconBack()} />
                </TouchableOpacity>
            </Header>

            <Content>
                <View>
                    <Swiper
                        style={styles.imageSong}
                        loop={false}
                        dotStyle={{ bottom: 350, backgroundColor: 'gray' }}
                        activeDotStyle={{ bottom: 350, backgroundColor: 'white' }}>
                        <View style={styles.slide}>
                            <SvgXml width={400} height={400} xml={iconSong()} />
                        </View>
                        <View style={styles.slide}>
                            <SvgXml width={400} height={400} xml={iconLyrics()} />
                        </View>
                    </Swiper>
                </View>
                <View style={styles.titleLeft}>
                    <Text style={styles.songTitle}>Adiyee</Text>
                    <Text style={styles.artist}>Bachelor Dhibu Ninan Thomas , Kapil Kapilan</Text>
                </View>

                <View style={styles.titleRight}>
                    <SvgXml width={30} height={30} xml={iconLove()} />
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
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <SvgXml width={30} height={30} xml={iconCommentsWhite()} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.iconPrevSong}>
                        <SvgXml width={30} height={30} xml={iconPrevSong()} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconNextSong}>
                        <SvgXml width={30} height={30} xml={iconNextSong()} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconShuffle}>
                        <SvgXml width={40} height={40} xml={iconShuffle()} />
                    </TouchableOpacity>
                    <View style={styles.iconPlayPause}>
                        <TouchableOpacity onPress={togglePlayPause}>
                            {playState ? (
                                <SvgXml width={65} height={65} xml={iconPause()} />
                            ) : (
                                <SvgXml width={65} height={65} xml={iconPlay()} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Comment */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Modal visible={isModalVisible} animationType="fade" transparent={true}>
                        <View style={{
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            padding: 20,
                            borderRadius: 10,
                            width: '100%',
                            maxHeight: '100%',

                        }}>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Bình luận</Text>
                            </View>
                            <ScrollView style={{ width: '100%', backgroundColor: 'black', height:900 }}>
                                {dataComment.map((comment: any, index: any) => (
                                    <View key={index} style={{ padding: 10, margin: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                            <View>
                                                <Image source={require('../../../../MusicApp/src/assets/images/avatar_trắng.jpg')} style={{ width: 40, height: 40, borderRadius: 50 }}></Image>
                                            </View>
                                            <View>
                                                <View>
                                                    <Text style={{ color: 'white', fontSize: 18, opacity: 0.8 }}>{comment.userId.name}</Text>
                                                </View>
                                                <View>
                                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>{comment.message}</Text>
                                                </View>
                                            </View>
                                            
                                        </View>
                                        
                                    </View>
                                ))}
                                {data.map((message: any, index: any) => (
                                    <View key={index} style={{ padding: 10, margin: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                        <View>
                                            <Image source={require('../../../../MusicApp/src/assets/images/avatar_trắng.jpg')} style={{ width: 40, height: 40, borderRadius: 50 }}></Image>
                                        </View>
                                        <View>
                                            <View>
                                                <Text style={{ color: 'white', fontSize: 18, opacity: 0.8 }}>{message.name}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ color: 'white',fontSize: 18, fontWeight: '500' }}>{message.message}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    
                                </View>
                                ))}

                            </ScrollView>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <TextInput
                                    ref={textInputRef}
                                    style={{
                                        flex: 1,
                                        borderColor: 'gray',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        padding: 10,
                                        color: 'white'
                                    }}
                                    placeholder="Nhập bình luận..."
                                    placeholderTextColor={'white'}
                                    value={inputText}
                                    onChangeText={setInputText}
                                />
                                <TouchableOpacity style={{
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    padding: 15,
                                    marginLeft: 10,
                                }} onPress={postMessage}>
                                    <Text style={{ color: 'black' }}>Gửi</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={{
                                backgroundColor: '#f44336',
                                borderRadius: 5,
                                padding: 10,
                                marginTop: 10,
                                alignItems: 'center',
                            }}>
                                <Text style={{ color: 'white' }}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>

            </Content>
            <Footer />
        </Container>
    );
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
    imageSong: {},
    titleLeft: {
        marginLeft: 20
    },
    titleRight: {
        marginLeft: 350,
        bottom: 400
    },
    controls: {},
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
    slide: {},
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
