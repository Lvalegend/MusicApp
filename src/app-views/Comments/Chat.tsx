import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconBack } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import { ScrollView } from 'react-native-gesture-handler';
import { add } from 'react-native-track-player/lib/src/trackPlayer';
import { getToken } from '../../secure-storage/GetToken';
import { useState } from 'react';
import socketServices from '../../app-service/socketService';
import axios from 'axios';
import { hostNetwork } from '../../host/HostNetwork';

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    };
    const [data, setData] = useState<any>([]);
    const token: any = getToken();
    const [socketCurrentId, setSocketCurrentId] = useState<any>();
    const [textData, setTextData] = useState<any>();
    const [idOriginComment, setIdOriginComment] = useState(undefined);
    const [comments, setComments] = useState<any[]>([]);

    // const sendMessage = async () => {
    //     if (idOriginComment == undefined) {
    //         const data = {
    //             userId: token,
    //             songId: 'Song_3',
    //             socketChat: socketCurrentId,
    //             message: textData,
    //         }
    //         if (!!textData) {
    //             socketServices.emit('send-message', data);
    //             try {
    //                 const respone = await axios.post(`http://${hostNetwork}:3000/addComment`), {
    //                     data: data
    //                 }, {
    //                     headers: {
    //                         'Content-Type': 'application/json' // Định nghĩa header hợp lệ
    //                     }
    //                 }
    //                 if (respone.data) {
    //                     console.log(respone.data);

    //                 }
    //                 else {
    //                     console.log('No data');

    //                 }
    //             } catch (err) {
    //                 console.log('Error: ', err);
    //             }

    //             setTextData('');
    //         } else {
    //             Alert.alert('Please enter a message');
    //         }
    //     }
    //     else {
    //         const data = {
    //             userId: token,
    //             songId: 'Song_3',
    //             socketChat: socketCurrentId,
    //             message: textData,
    //             originMessageId: idOriginComment

    //         }
    //         if (!!textData) {
    //             socketServices.emit('send-message', data);
    //             try {
    //                 const respone = await axios.post(http://${hostNetwork}:3000/addComment, {
    //                     data: data
    //                 }, {
    //                     headers: {
    //                         'Content-Type': 'application/json' // Định nghĩa header hợp lệ
    //                     }
    //                 })
    //                 if (respone.data) {
    //                     console.log(respone.data);

    //                 }
    //                 else {
    //                     console.log('No data');

    //                 }
    //             } catch (err) {
    //                 console.log('Error: ', err);

    //             }
    //             setTextData('');
    //         } else {
    //             Alert.alert('Please enter a message');
    //         }
    //     }
    const sendMessage = async () => {
        const messageData = {
            userId: token,
            songId: 'Song_3',
            socketChat: socketCurrentId,
            message: textData,
            originMessageId: idOriginComment,
        };

        if (!!textData) {
            socketServices.emit('send-message', messageData);
            try {
                const response = await axios.post(`http://${hostNetwork}:3000/addComment`, messageData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data) {
                    console.log(response.data);
                } else {
                    console.log('No data');
                }
            } catch (err) {
                console.log('Error: ', err);
            }

            setTextData('');
        } else {
            Alert.alert('Please enter a message');
        }
    };


    return (
        <Container colors={['black', 'white', 'white']}>
            <Header style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={{left:20, top:25}}>
                    <SvgXml xml={iconBack()} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Bình luận</Text>
            </Header>

            <Content>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.commentContainer}>
                    {comments.map((comment) => (
                        <View style={{ width: '100%', backgroundColor: 'white', height: 700 }}>
                                <Text style={styles.commentText}>{comment.text}</Text>
                                </View>
                     ))}
                    </View>
                </ScrollView>
            </Content>

            <Footer>
                <View style={styles.footerContent}>
                    <TextInput
                        placeholder="Nhập bình luận..."
                        value={textData}
                        onChangeText={(text) => setTextData(text)}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Text style={styles.sendText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    header:{
        flexDirection:'row'
    },
    headerText: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
    },
    scrollView: {
        width: '100%',
        maxHeight: 700,
    },
    commentContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        marginRight: 10,
        bottom:15
    },
    sendButton: {
        backgroundColor: 'blue',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        bottom:15
    },
    sendText: {
        color: 'white',
        fontWeight: 'bold',
    },
    commentText:{
        margin:12,
        fontWeight:'bold'
    }
});

export default Chat;
