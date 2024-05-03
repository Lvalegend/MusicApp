import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, StyleSheet, StatusBar, TextInput, ImageBackground, Pressable, FlatList } from 'react-native';
import { Svg, Line, Text as SvgText } from 'react-native-svg';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { icon1, icon2, iconBack } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';



interface ManageCountScreenProps {
}

const ManageCountScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
    const handleManage = () => {
        navigation.navigate('ManageScreen');
    };
    const data = [
        { label: '60,2M', value: 60.2 },
        { label: '56,2M', value: 56.2 },
        { label: '48,2M', value: 48.2 },
        { label: '40,9M', value: 40.9 },
        { label: '36,7M', value: 36.7 },
        { label: '34,1M', value: 34.1 },
    ];

    const rankingSongs = [
        {
            id: '1',
            title1: '#1',
            title2: '#2',
            title3: '#3',
            title4: '#4',
            title5: '#5',
            title6: '#6',
            titleRank1: 'Chúng ta của tương lai',
            titleRank2: 'Từng quen',
            titleRank3: 'Sau lời từ khước',
            titleRank4: 'Lệ lưu ly',
            titleRank5: 'À Lôi',
            titleRank6: 'Buồn hay vui',
            voteText1: '60,2M',
            voteText2: '56,2M',
            voteText3: '48,2M',
            voteText4: '40,9M',
            voteText5: '36,7M',
            voteText6: '34,1M',
        },

    ];
    return (
        <Container colors={['#4c669f', 'red', '#192f6a']} >
            <Header>
                <View style={styles.containerHeader}>
                    <Pressable onPress={handleManage}>
                        <SvgXml xml={iconBack()} />
                    </Pressable>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 26, marginTop: 0 }}>Thống kê</Text>
                </View>
            </Header>
            <Content>

                <Image source={require("../../assets/images/ImageManage/bieu_do.png")} style={{ width: 380, height: 200,marginHorizontal:20, marginVertical:15 }}></Image>
                {rankingSongs.map((item) => (
                    <View key={item.id} style={styles.songContainer}>
                        <View style={styles.songItem}>
                            <Text style={styles.songRanking}>{item.title1}</Text>
                            <ImageBackground source={require('../../assets/images/ImageRanking/rank1.png')} style={styles.songImage}></ImageBackground>
                            <Text style={styles.songName}>{item.titleRank1}</Text>

                        </View>
                        <View style={styles.underline}></View>


                        <View style={styles.songItem}>
                            <Text style={styles.songRanking}>{item.title2}</Text>
                            <ImageBackground source={require('../../assets/images/ImageRanking/rank2.png')} style={styles.songImage}></ImageBackground>
                            <Text style={styles.songName}>{item.titleRank2}</Text>

                        </View>
                        <View style={styles.underline}></View>


                        <View style={styles.songItem}>
                            <Text style={styles.songRanking}>{item.title3}</Text>
                            <ImageBackground source={require('../../assets/images/ImageRanking/rank3.png')} style={styles.songImage}></ImageBackground>
                            <Text style={styles.songName}>{item.titleRank3}</Text>

                        </View>
                        <View style={styles.underline}></View>

                        <View style={styles.songItem}>
                            <Text style={styles.songRanking}>{item.title4}</Text>
                            <ImageBackground source={require('../../assets/images/ImageRanking/rank4.png')} style={styles.songImage}></ImageBackground>
                            <Text style={styles.songName}>{item.titleRank4}</Text>

                        </View>
                        <View style={styles.underline}></View>

                        <View style={styles.songItem}>
                            <Text style={styles.songRanking}>{item.title5}</Text>
                            <ImageBackground source={require('../../assets/images/ImageRanking/rank5.png')} style={styles.songImage}></ImageBackground>
                            <Text style={styles.songName}>{item.titleRank5}</Text>

                        </View>
                        <View style={styles.underline}></View>

                        <View style={styles.songItem}>
                            <Text style={styles.songRanking}>{item.title6}</Text>
                            <ImageBackground source={require('../../assets/images/ImageRanking/rank6.png')} style={styles.songImage}></ImageBackground>
                            <Text style={styles.songName}>{item.titleRank6}</Text>

                        </View>
                    </View>
                ))}
            </Content>
            <Footer></Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    data: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerHeader: {
        margin: 15,
        flexDirection: 'row'
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
        left: 10,
        top: 10,
    },
    songName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        left: 20,
        top: 29,
    },
    voteText: {
        color: 'white',
        fontSize: 18,
        left: 35,
        top: 30,
        fontWeight: 'bold',
        alignContent: "flex-end"
    },
    underline: {
        width: '100%',
        marginTop: 15,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },

});
export default ManageCountScreen;