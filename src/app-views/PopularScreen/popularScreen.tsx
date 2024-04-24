import * as React from 'react';
import { Text, StyleSheet, ImageBackground, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { icon1, icon2 } from '../../app-uikits/icon-svg';

interface RankingProps {}

const RankingScreen: React.FC<RankingProps & { navigation: NavigationProp<any> }> = () => {
    const rankingSongs = [
        {
            id: '1',
            title3: '#3',
            title4: '#4',
            title5: '#5',
            title6: '#6',
            titleRank3: 'Sau lời từ khước',
            voteText3: '48,2M',
            titleRank4: 'Lệ lưu ly',
            titleRank5: 'À Lôi',
            titleRank6: 'Buồn hay vui',
            voteText4: '40,9M',
            voteText5: '36,7M',
            voteText6: '34,1M',
        },
    ];

    return (
        <Container colors={['black', 'black', 'black']}>
            <Header></Header>
            <Content>
                <Text style={styles.headerText}>Bảng xếp hạng</Text>
                <SvgXml style={styles.icon1} width={50} height={50} xml={icon1()} />
                <View style={styles.rank1Container}>
                    <ImageBackground source={require('../../assets/images/ImageRanking/rank1.png')} style={styles.imageRank1}>
                        <SvgXml style={styles.icon2} width={60} height={60} xml={icon2()} />
                    </ImageBackground>
                    <ImageBackground source={require('../../assets/images/ImageRanking/rank2.png')} style={styles.imageRank2}></ImageBackground>
                </View>

                {rankingSongs.map((item) => (
                    <View key={item.id} style={styles.songContainer}>
                        <View style={styles.songItem}>
                            <Text style={styles.songRanking}>{item.title3}</Text>
                            <ImageBackground source={require('../../assets/images/ImageRanking/rank3.png')} style={styles.songImage}></ImageBackground>
                            <Text style={styles.songName}>{item.titleRank3}</Text>
                            <Text style={styles.voteText}>{item.voteText3}</Text>
                        </View>
                        <View style={styles.underline}></View>

                        <View style={styles.songItem}>
                            <Text style={styles.songRanking}>{item.title4}</Text>
                            <ImageBackground source={require('../../assets/images/ImageRanking/rank4.png')} style={styles.songImage}></ImageBackground>
                            <Text style={styles.songName}>{item.titleRank4}</Text>
                            <Text style={styles.voteText}>{item.voteText4}</Text>
                        </View>
                        <View style={styles.underline}></View>

                        <View style={styles.songItem}>
                            <Text style={styles.songRanking}>{item.title5}</Text>
                            <ImageBackground source={require('../../assets/images/ImageRanking/rank5.png')} style={styles.songImage}></ImageBackground>
                            <Text style={styles.songName}>{item.titleRank5}</Text>
                            <Text style={styles.voteText}>{item.voteText5}</Text>
                        </View>
                        <View style={styles.underline}></View>

                        <View style={styles.songItem}>
                            <Text style={styles.songRanking}>{item.title6}</Text>
                            <ImageBackground source={require('../../assets/images/ImageRanking/rank6.png')} style={styles.songImage}></ImageBackground>
                            <Text style={styles.songName}>{item.titleRank6}</Text>
                            <Text style={styles.voteText}>{item.voteText6}</Text>
                        </View>
                    </View>
                ))}
            </Content>
            <Footer>
                <BottomBar />
            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    headerText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20,
    },
    icon1: {
        top: 95,
    },
    rank1Container: {
        flexDirection: 'row',
    },
    imageRank1: {
        width: 150,
        height: 150,
        padding: 20,
        left: 40,
    },
    icon2: {
        top: 20,
        left: 140,
    },
    imageRank2: {
        width: 150,
        height: 150,
        padding: 20,
        left: 85,
    },
    songContainer: {
        flexDirection: 'column',
        paddingVertical: 30,
        paddingHorizontal: 15,
    },
    songItem: {
        flexDirection: 'row',
    },
    songRanking: {
        color: 'gray',
        fontSize: 25,
        fontWeight: 'bold',
        top: 20,
    },
    songImage: {
        width: 78,
        height: 70,
        left: 20,
        top: 10,
    },
    songName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        left: 40,
        top: 30,
    },
    voteText: {
        color: 'white',
        fontSize: 18,
        left: 55,
        top: 30,
        fontWeight: 'bold',
    },
    underline: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        width: '100%',
        marginTop: 15,
    },
});

export default RankingScreen;
