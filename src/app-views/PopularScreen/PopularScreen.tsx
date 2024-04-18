import * as React from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Circle, Image, Path, SvgUri, SvgXml } from 'react-native-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { icon1, icon2 } from '../../app-uikits/icon-svg'





interface RankingProps {

}

const RankingScreen: React.FC<RankingProps & { navigation: NavigationProp<any> }> = () => {
    const rankingSongs = [
        {
            id: '1', title3: '#3', title4: '#4', title5: '#5', title6: '#6', titleRank3: 'Sau lời từ khước', voteText3: '48,2M', titleRank4: 'Lệ lưu ly', titleRank5: 'À Lôi',
            titleRank6: 'Buồn hay vui', voteText4: '40,9M', voteText5: '36,7M', voteText6: '34,1M',
        },


    ];
    const renderSongs = ({ item }: {
        item: {
            id: string, title3: string, title4: string, title5: string, title6: string,
            titleRank3: string; titleRank4: string, titleRank5: string, titleRank6: string,
            voteText3: string; voteText4: string; voteText5: string; voteText6: string;
        }
    }) => (

        <View style={{ flexDirection: 'column', padding: 30 }}>

            <View style={{ flexDirection: 'row' }}>

                <Text style={styles.songRanking}>{item.title3}</Text>
                <ImageBackground source={require('../../assets/images/ImageRanking/rank3.png')}
                    style={{ width: 78, height: 70, left: 20, top: 10 }}>
                </ImageBackground>
                <Text style={styles.songName}>{item.titleRank3}</Text>
                <Text style={styles.voteText}>{item.voteText3}</Text>
            </View>
            <View style={styles.underline1}>
            </View>
            <View style={{ flexDirection: 'row', top: -10 }}>
                <Text style={{ color: 'gray', fontSize: 25, fontWeight: 'bold', top: 40 }}>{item.title4}</Text>
                <ImageBackground source={require('../../assets/images/ImageRanking/rank4.png')}
                    style={{ width: 80, height: 80, left: 20, top: 20 }}>
                </ImageBackground>

                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', left: 40, top: 40 }}>{item.titleRank4}</Text>
                <Text style={{ color: 'white', fontSize: 18, left: 125, top: 40, fontWeight: 'bold', }}>{item.voteText4}</Text>

            </View>
            <View style={styles.underline2}>

            </View>

            <View style={{ flexDirection: 'row', top: -18 }}>
                <Text style={{ color: 'gray', fontSize: 25, fontWeight: 'bold', top: 55 }}>{item.title5}</Text>
                <ImageBackground source={require('../../assets/images/ImageRanking/rank5.png')}
                    style={{ width: 78, height: 70, left: 20, top: 40 }}>
                </ImageBackground>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', left: 40, top: 60 }}>{item.titleRank5}</Text>
                <Text style={{ color: 'white', fontSize: 18, left: 155, top: 60, fontWeight: 'bold', }}>{item.voteText5}</Text>

            </View>
            <View
                style={styles.underline3}>
            </View>
            <View style={styles.rank6}>
                <Text style={{ color: 'gray', fontSize: 25, fontWeight: 'bold', paddingVertical: 30 }}>{item.title6}</Text>
                <ImageBackground source={require('../../assets/images/ImageRanking/rank6.png')}
                    style={{ width: 78, height: 70, left: 20, top: 18 }}>
                </ImageBackground>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', left: 40, paddingVertical: 35 }}>{item.titleRank6}</Text>
                <Text style={{ color: 'white', fontSize: 18, left: 85, paddingVertical: 40, fontWeight: 'bold', }}>{item.voteText6}</Text>
            </View>

        </View>

    );


    return (
        <>

            <Container colors={['black', 'black', 'black']} >
                <Header>

                </Header>

                <Content>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, marginBottom: 10, marginTop: 20 }}>Bảng xếp hạng
                    </Text>
                    <SvgXml style={{ top: 95, }} width={50} height={50} xml={icon1()}></SvgXml>
                    <View style={{ flexDirection: 'row' }}>
                        <ImageBackground source={require('../../assets/images/ImageRanking/rank1.png')}
                            style={{ width: 150, height: 150, padding: 20, left: 40 }}>
                            <SvgXml style={{ top: 20, left: 140 }} width={60} height={60} xml={icon2()}></SvgXml>
                        </ImageBackground>
                        <ImageBackground source={require('../../assets/images/ImageRanking/rank2.png')}
                            style={{ width: 150, height: 150, padding: 20, left: 85 }}>
                        </ImageBackground>
                    </View>


                    <FlatList
                        data={rankingSongs}
                        renderItem={renderSongs}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />


                </Content>

                <Footer>
                    <BottomBar >
                    </BottomBar>
                </Footer>
            </Container>
        </>
    );
};
const styles = StyleSheet.create({
    Container: {

    },
    headerText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    imageRank1: {
        width: 210,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Rank1: {
        borderWidth: 1,
        borderRadius: 8,
    },
    iconNumber: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'gray',
        textShadowColor: 'white',
        textShadowRadius: 2,
        marginTop: 45,
        left: 10
    },
    songName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        left: 40,
        top: 30
    },
    songRanking: {
        color: 'gray',
        fontSize: 25,
        fontWeight: 'bold',
        top: 20
    },
    voteText: {
        color: 'white',
        fontSize: 18,
        left: 55,
        top: 30,
        fontWeight: 'bold',

    },
    rank6: {
        flexDirection: 'row'
    },
    underline1: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        width: '100%',
        marginTop: 15,
    },
    underline2: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        width: '100%',
        marginTop: 13,
    },
    underline3: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        width: '100%',
        marginTop: 35,
    },


})



export default RankingScreen;