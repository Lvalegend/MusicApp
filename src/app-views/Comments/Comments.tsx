import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { StackNavigationProp } from '@react-navigation/stack';
import iconCommentsBlack from '../../assets/svg/IconComments/iconCommentsBlack';




interface CommentsProps {
    
    
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

        <> <Container colors={[]} >




            <Header>
          

            </Header>


            <Content>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Bình luận</Text>

                    </View>


                    <View style={styles.commentContainer}>

                        <SvgXml width={200} height={200} xml={iconCommentsBlack()}></SvgXml>
                        <Text style={styles.noCommentText}>Hãy là người đầu tiên bình luận</Text>
                    </View>
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

                </View>
            </Content>


            <Footer>


            </Footer>



        </Container >

        </>
    );
};
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: screenHeight * (2 / 3),
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'flex-end',

    },
    header: {
        height: 100,

    },
    headerText: {
        fontSize: 25,
        color: 'black',
        marginTop: 20,
        marginBottom: 1,
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
        marginBottom: 10,
    },
    noCommentText: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#999',
    },
    commentContainer: {
        paddingHorizontal: 10,
        alignItems: 'center',
        marginTop: 70,
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
