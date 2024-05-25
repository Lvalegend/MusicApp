import * as React from 'react';
import { Button, View, Text, ImageBackground, StyleSheet, Touchable, TouchableOpacity, Image, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { ScrollView } from 'react-native-gesture-handler';
import { icon3Cham, iconBack } from '../../app-uikits/icon-svg';



interface ArtistInfProps {
    onPress: any
    id: string
    handleNavigateBack: () => void;
    
}

const ArtistInf: React.FC<ArtistInfProps> = ({ handleNavigateBack, id }) => {
    const data = [
        {
            id: '1',
            image: require('../../assets/images/ImageArtistInf/thienlyoi.png'),
            name: "Thiên lý ơi",
            artist: "Jack - J97",
            icon: require('../../assets/svg/icon3Cham')
        },
        {
            id: '2',
            image: require('../../assets/images/ImageArtistInf/cuoicungthi.png'),
            name: "Cuối cùng Thì",
            artist: "Jack - J97",
            icon: require('../../assets/svg/icon3Cham')
        },
        {
            id: '3',
            image: require('../../assets/images/ImageArtistInf/hoahaiduong.png'),
            name: "Hoa Hải Đường",
            artist: "Jack - J97",
            icon: require('../../assets/svg/icon3Cham')
        },
        {
            id: '4',
            image: require('../../assets/images/ImageArtistInf/vebenanh.png'),
            name: "Về Bên Anh",
            artist: "Jack - J97",
            icon: require('../../assets/svg/icon3Cham')
        },
    ]
    const dataDetails =
        [
            {
                id: '1',
                image: require('../../assets/images/ImageArtist/Jack97.png'),
                name: "Jack - J97",
                follow: "2,5M quan tâm"
            },
            {
                id: '2',
                image: require('../../assets/images/ImageArtist/MartinGarrix.png'),
                name: "Martin Garrix",
                follow: "145K quan tâm"
            },
            {
                id: '3',
                image: require('../../assets/images/ImageArtist/Pitbull.png'),
                name: "Pitbull",
                follow: "80,3K quan tâm"
            },
            {
                id: '4',
                image: require('../../assets/images/ImageArtist/Vicetone.png'),
                name: "Vicetone",
                follow: "50,7K quan tâm"
            },
        ]
    const findArtistInfItemById = (itemId: string, dataDetails: any[]) => {
        return dataDetails.find(item => item.id === itemId);
    };

    const ArtistInfItem = findArtistInfItemById(id, dataDetails);
    console.log("Selected Artist ID:", id);
    return (
        <>
            {ArtistInfItem && (
                <Container colors={['black', 'black']}>
                    <Header>

                    </Header>
                    <Content>
                        <ScrollView>
                            <ImageBackground
                                style={styles.headerImage}
                                imageStyle={{ opacity: 0.7 }}
                                source={ArtistInfItem.image}>
                                <Pressable onPress={handleNavigateBack} style={{left:12}}>
                                    <SvgXml xml={iconBack()} />
                                </Pressable>
                                <Text style={styles.headerText}>
                                    {ArtistInfItem.name}
                                </Text>
                                <Text style={{ color: 'white', margin: 18, marginTop: -25 }}>
                                    {ArtistInfItem.follow}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.buttonFollow}>
                                        <Text style={styles.followText}>Đã quan tâm</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonPlay}>
                                        <Text style={{ color: 'white', textAlign: 'center', margin: 12, fontWeight: 'bold' }}>Phát nhạc</Text>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>



                            <Text style={{ color: 'white', margin: 15, fontSize: 18 }}>Bài hát nổi bật</Text>
                            {data.map((item) => (
                                <View style={{ flexDirection: 'row', margin: 5 }}>
                                    <Image source={item.image} style={{ width: 60, height: 60, marginBottom: 20, margin: 20 }} />
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 30, flex: 1 }}>
                                        {item.name}
                                    </Text>
                                    <Text style={{ color: 'white', right: 215, marginTop: 55 }}>
                                        {item.artist}
                                    </Text>
                                    <SvgXml xml={icon3Cham()} width={20} height={20} style={{ marginTop: 35 }} />
                                </View>
                            ))}
                        </ScrollView>
                    </Content>
                    <Footer>

                    </Footer>
                </Container>
            )}
        </>

    )
};


const styles = StyleSheet.create({
    headerImage: {
        width: '100%',
        height: 400,

    },
    headerText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        margin: 20,
        marginTop: 200,
    },
    followText: {
        color: 'white',
        margin: 12,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonFollow: {
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
        width: 170,
        marginTop: 5,
        marginLeft: 20
    },
    buttonPlay: {
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
        width: 170,
        marginTop: 5,
        marginLeft: 18,
        backgroundColor: 'purple'
    }
})

export default ArtistInf;
