import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconBack, iconComments } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import socketServices from '../../app-service/socketService';
import { getToken } from '../../secure-storage/GetToken';



interface CommentsProps {
}
interface CommentsProps {
    goBack: any;
    onPress: () => void
    handleNavigateBack: () => void;
    navigation: any

}
interface User {
    id: number;
    name: string;
    avatar: any;
}
interface Comments {
    id: number;
    text: string;
    user: User;
    replies: Comments[];
    showReplyBox: boolean;
};

const Comments: React.FC<CommentsProps> = ({ handleNavigateBack }) => {
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<Comments[]>([]);
    const users:
        User[] = [{ id: 1, name: 'phog', avatar: require('../../assets/images/ImageComments/avt_ca_nhan.png') },
       
        ];
    const [socketCurrentId, setSocketCurrentId] = useState<any>();
    const [data, setData] = useState<any>([]);
    const [replyTo, setReplyTo] = useState<number | null>(null);
    const [replyTexts, setReplyTexts] = useState<{ [key: number]: string }>({});
    const token: any = getToken()
    useEffect(() => {
        socketServices.initializeSocket();

        socketServices.on('user-connected', (id: any) => {
            setSocketCurrentId(id);
        });

        socketServices.on('received-message', (message: any) => {
            console.log("Message received: ", message);
            setData((prevData: any) => [...prevData, message]);
        });

        return () => {
            socketServices.removeListener('received-message');
        };
    }, []);
    
    
    const addComment = () => {
        if (comment.trim() !== '') {
            const newComment: Comments = {
                id: comments.length + 1,
                text: comment.trim(),
                user: users[0],
                replies: [],
                showReplyBox: false
            };
            setComments([...comments, newComment]);
            setComment('');
        };
    }
    
    const handleReply = (parentCommentId: number, isReply: boolean = false) => {
        const text = replyTexts[parentCommentId] || '';
        if (text.trim() === '') {
            return;
        }
       
        const updatedComments = comments.map(comment => {
            if (comment.id === parentCommentId) {
                const newReply: Comments = {
                    id: comment.replies.length + 1,
                    text: text.trim(),
                    user: users[0],
                    replies: [],
                    showReplyBox: false
                };
            }
            return comment;
        });
        setComments(updatedComments);
        setReplyTo(null);
        setReplyTexts({ ...replyTexts, [parentCommentId]: '' });
    }

    const handleChangeReplyText = (commentId: number, text: string) => {
        setReplyTexts({ ...replyTexts, [commentId]: text });
    };

    const toggleReplyBox = (commentId: number, parentCommentId?: number) => {
        setComments(prevComments => {
            return prevComments.map(comment => {
                if (comment.id === commentId || (parentCommentId && comment.id === parentCommentId)) {
                    return { ...comment, showReplyBox: !comment.showReplyBox };
                } else {
                    return {
                        ...comment,
                        replies: comment.replies.map(reply => ({
                            ...reply,
                            showReplyBox: reply.id === commentId ? !reply.showReplyBox : false
                        }))
                    };
                }
            });
        });
    };


    return (

       
            <Container colors={['white', 'white']}>

                <Header style={styles.header}>
                    <TouchableOpacity onPress={handleNavigateBack} style={styles.goBackButton}>
                        <SvgXml width={30} height={30} xml={iconBack()}></SvgXml>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Bình luận</Text>
                </Header>


                <Content>
              
                        {/* <View key={comment.id} style={styles.commentContainer}>
                            <View style={styles.commentBox}>
                                <Image style={styles.imageCaNhan} source={comment.avatar} />
                                <Text style={styles.commentText}>
                                    <Text style={styles.comment}>{comment.name}</Text>: {comment.text}
                                </Text>
                                
                            </View>
                            
                           
                      

                        </View> */}
          
                </Content>


                <Footer>
                    <View style={styles.cmtDetails}>
                        <View style={styles.commentBox}>
                            <Image style={styles.imageCaNhan} source={users[0].avatar}></Image>
                            <TextInput
                                placeholder="Nhập bình luận..."
                                value={comment}
                                onChangeText={(text) => setComment(text)}
                                style={styles.input}
                            />

                            <TouchableOpacity onPress={addComment} style={styles.button}>
                                <Text style={styles.buttonText}>Gửi</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </Footer>

            </Container >

      
    );
};

const styles = StyleSheet.create({
    container: {
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,


    },
    header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    headerText: {
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
    },
    cmtDetails: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 10,


    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        padding: 10
    },
    button: {
        backgroundColor: 'blue',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    commentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        paddingHorizontal: 15,

    },
    commentContainer: {
        marginTop: 5,

    },
    imageCaNhan: {
        width: 40,
        height: 40,
    },
    comment: {
        marginBottom: 10,
    },
    commentText: {
        marginLeft: 10
    },
    goBackButton: {
        padding: 10,
        color: 'black'
    },
    replyText: {
        color: 'black',

    },
    replyBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    replyContainer: {
        marginLeft: 50,
    },
    replyButton: {

    }
});
export default Comments;