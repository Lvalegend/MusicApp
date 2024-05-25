import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconBack, iconComments } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';




interface CommentsProps {
    goBack(): unknown;
    onPress: () => void
    handleNavigateBack: () => void;
    navigation :any

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
    
};

const Comments: React.FC<CommentsProps> = ( navigation) => {
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<Comments[]>([]);
    const currentUser:
        User = { id: 1, name: 'Someone', avatar: require('../../assets/images/ImageComments/avt_ca_nhan.png') };
    const addComment = () => {
        if (comment.trim() !== '') {
            const newComment: Comments = {
                id: comments.length + 1,
                text: comment.trim(),
                user: currentUser,
            };
            setComments([...comments, newComment]);
            setComment('');
        };
    }

    const handleNavigateBack = () => {
        navigation.goBack();
    };
    return (

        <>
            <Container colors={['white', 'white']}>

                <Header style={styles.header}>
                <TouchableOpacity onPress = {handleNavigateBack} style={styles.goBackButton}>
                    <SvgXml width={30} height={30} xml={iconBack()}></SvgXml>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Bình luận</Text>                  
                </Header>


                <Content>
                    {comments.map(comment => (
                        <View key={comment.id} style={styles.commentContainer}>
                            <View style={styles.commentBox}>
                                <Image style={styles.imageCaNhan} source={comment.user.avatar} />
                                <Text style={styles.commentText}>
                                    <Text style={styles.comment}>{comment.user.name}</Text>: {comment.text}
                                </Text>
                            </View>
                        </View>
                    ))}

                </Content>


                <Footer>
                    <View style={styles.cmtDetails}>
                        <View style={styles.commentBox}>
                            <Image style={styles.imageCaNhan} source={currentUser.avatar}></Image>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,

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
        marginLeft:10
    },
    goBackButton:{
       padding:10,
       color:'black'
    }
});
export default Comments;