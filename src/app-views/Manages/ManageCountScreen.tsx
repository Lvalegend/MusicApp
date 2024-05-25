
import React from 'react';
import { View, Text, StyleSheet, Pressable,ImageBackground } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { NavigationProp } from '@react-navigation/native';
import { Container, Header, Content, Footer } from '../../app-layout/Layout';
import { iconBack } from '../../app-uikits/icon-svg';

interface ManageCountScreenProps {
    navigation: NavigationProp<any>;
}

const ManageCountScreen: React.FC<ManageCountScreenProps> = ({ navigation }) => {
    const handleManage = () => {
        navigation.navigate('ManageScreen');
    };

    const data = [
        { label: '1', value: 60.2, color: '#f00', song: '#1' },
        { label: '2', value: 56.2, color: '#0f0', song: '#2' },
        { label: '3', value: 48.2, color: '#00f', song: '#3' },
        { label: '4', value: 40.9, color: '#ff0', song: '#4' },
        { label: '5', value: 36.7, color: '#f0f', song: '#5' },
        { label: '6', value: 34.1, color: '#0ff', song: '#6' },
    ];

    const Chart = () => {
        const renderBars = () => data.map((item, index) => {
            const barHeight = (item.value / 60.2) * 290; 
            return (
                <View key={index} style={{ alignItems: 'center', marginHorizontal: 10 }}>
                    <Text style={styles.barText}>{`${item.value}M`}</Text>
                    <View style={[styles.bar, { height: barHeight, backgroundColor: item.color }]} />
                    <Text style={styles.songTitle}>{item.song}</Text>
                </View>
                
            );
        });

        return (
            <View style={styles.chartContainer}>
                {renderBars()}
            </View>
        );
    };

    const rankImages = [
        require('../../assets/images/ImageRanking/rank1.png'),
        require('../../assets/images/ImageRanking/rank2.png'),
        require('../../assets/images/ImageRanking/rank3.png'),
        require('../../assets/images/ImageRanking/rank4.png'),
        require('../../assets/images/ImageRanking/rank5.png'),
        require('../../assets/images/ImageRanking/rank6.png'),
    ];

    const rankingSongs = [
        {
            id: '1',
            titleRank: ['#1', '#2', '#3', '#4', '#5', '#6'],
            titleRanking: ['Chúng ta của tương lai', 'Từng quen', 'Sau lời từ khước', 'Lệ lưu ly', 'À Lôi', 'Buồn hay vui'],
        },
    ];

    const renderRankingSongs = () => {
        return rankingSongs.map((item, index) => (
            <View key={item.id} style={styles.songContainer}>
                {[1, 2, 3, 4, 5, 6].map(rank => (
                    <View key={rank} style={styles.songItem}>
                        <Text style={styles.songRanking}>{item.titleRank[rank - 1]}</Text>
                        <ImageBackground source={rankImages[rank - 1]} style={styles.songImage}></ImageBackground>
                        <Text style={styles.songName}>{item.titleRanking[rank - 1]}</Text>
                        
                    </View>
                ))}
                {index < rankingSongs.length - 1 && <View style={styles.underline}></View>}
            </View>
        ));
    };

    return (
        <Container colors={['#4c669f', 'red', '#192f6a']}>
            <Header>
                <View style={styles.containerHeader}>
                    <Pressable onPress={handleManage}>
                        <SvgXml xml={iconBack()} />
                    </Pressable>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Thống kê</Text>
                </View>
            </Header>
            <Content>
                <Chart />
                {renderRankingSongs()}
                
        
            </Content>
            <Footer />
        </Container>
    );
};

const styles = StyleSheet.create({
    containerHeader: {
        margin: 15,
        flexDirection: 'row'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 26,
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    bar: {
        width: 30, 
        marginHorizontal: 10,
    },
    barText: {
        color: 'white',
        marginBottom: 5,
    },
    songTitle: {
        color: 'white',
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
        maxWidth: 50,  
        flexShrink: 1,
    },
    data: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20,
    },
    video: {
        flex: 1,
        marginHorizontal: 10,
        alignItems: "center",
        borderRadius: 10
    },
    songContainer: {
        flexDirection: 'column',
        paddingVertical: 30,
        paddingHorizontal: 15,
        marginVertical:10
    },
    songItem: {
        flexDirection: 'row',
        marginVertical:10
    },
    songRanking: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        top: 20,
    },
    songImage: {
        width: 78,
        height: 70,
        left: 20,
        top: 6,
    },
    songName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        left: 50,
        top: 29,
    },
    underline: {
        width: '100%',
        marginTop: 15,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
});

export default ManageCountScreen;