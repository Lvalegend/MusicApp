import * as React from 'react';
import { Text, StyleSheet, ImageBackground, View, Touchable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { icon1, icon2 } from '../../app-uikits/icon-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface RankingProps {}

const RankingScreen: React.FC<RankingProps & { navigation: NavigationProp<any> }> = () => {
    const rankingSongs = [
        {
            id: '1',
            ranks: [
                { title: '#3', titleRank: 'Sau lời từ khước', voteText: '48,2M', image: require('../../assets/images/ImageRanking/rank3.png') },
                { title: '#4', titleRank: 'Lệ lưu ly', voteText: '40,9M', image: require('../../assets/images/ImageRanking/rank4.png') },
                { title: '#5', titleRank: 'À Lôi', voteText: '36,7M', image: require('../../assets/images/ImageRanking/rank5.png') },
                { title: '#6', titleRank: 'Buồn hay vui', voteText: '34,1M', image: require('../../assets/images/ImageRanking/rank6.png') },
            ],
        },
    ];

    return (
        <Container colors={['black', 'black', 'black']}>
            <Header />
            <Content>
                <Text style={styles.headerText}>Bảng xếp hạng</Text>
                <SvgXml style={styles.icon1} width={50} height={50} xml={icon1()} />
                <View style={styles.rank1Container}>
                    <ImageBackground source={require('../../assets/images/ImageRanking/rank1.png')} style={styles.imageRank1}>
                        <SvgXml style={styles.icon2} width={60} height={60} xml={icon2()} />
                    </ImageBackground>
                    <ImageBackground source={require('../../assets/images/ImageRanking/rank2.png')} style={styles.imageRank2} />
                </View>
                {rankingSongs.map((item) => (
                    <View key={item.id} style={styles.songContainer}>
                        {item.ranks.map((rankItem, index) => (
                            <React.Fragment key={rankItem.title}>
                                <TouchableOpacity style={styles.songItem}>
                                    <Text style={styles.songRanking}>{rankItem.title}</Text>
                                    <ImageBackground source={rankItem.image} style={styles.songImage} />
                                    <Text style={styles.songName}>{rankItem.titleRank}</Text>
                                    <Text style={styles.voteText}>{rankItem.voteText}</Text>
                                </TouchableOpacity>
                                {index < item.ranks.length - 1 && <View style={styles.underline} />}
                            </React.Fragment>
                        ))}
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
