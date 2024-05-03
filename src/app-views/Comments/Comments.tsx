import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconComments } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';





interface CommentsProps {
    id: number;
    text: string;

};

const Comments: React.FC<CommentsProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<CommentsProps[]>([]);

    const addComment = () => {
        if (comment.trim() !== '') {
            const newComment: CommentsProps = {
                id: comments.length + 1,
                text: comment.trim(),
            };
            setComments([...comments, newComment]);
            setComment('');
        };
    }
    return (

        <>
            <Container colors={['white', 'white']}>



                <Header style={styles.header}>
                    <Text style={styles.headerText}>Bình luận</Text>

                </Header>
                <Content>
                    {comments.map(comment => (
                        <View key={comment.id} style={styles.commentContainer}>
                            
                            <Text style={styles.comment}>{comment.text}</Text>
                        </View>
                    ))}
                </Content>


                <Footer>
                    <View style={styles.footer}>

                        <View style={styles.commentBox}>
                            <Image style={styles.imageCaNhan} source={require('../../assets/images/ImageComments/avt_ca_nhan.png')}></Image>
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




            </Container>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'flex-end',

    },
    header: {
        height: 10,

    },
    headerText: {
        fontSize: 25,
        color: 'black',
        marginTop: 10,

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
    noCommentText: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#999',
    },
    commentContainer: {
        marginTop:5
    },
    imageTrongsuot: {
        width: '100%',
        height: 200,
    },
    imageCaNhan: {
        width: 40,
        height: 40,
    },
    comment: {
        marginBottom: 10,
    },
});
export default Comments;