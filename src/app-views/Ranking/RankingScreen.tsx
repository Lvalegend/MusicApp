import * as React from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Circle, Image, Path, SvgUri, SvgXml } from 'react-native-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import { icon1,icon2,icon3,icon4,iconRank1, iconRank2, iconRank3, iconRank4 } from '../../app-uikits/icon-svg';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';



interface RankingProps {
    text: string;

}

const RankingScreen: React.FC<RankingProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const songs = [
        { id: '1', title: 'Lorem Lorem ipsum dolor sit amet', titleText: 'Live Long', text: 'Lorem Lorem ipsum dolor sit amet' },

    ];
    const renderItem = ({ item }: {
        item: {
            [x: string]: React.ReactNode; id: string; title: string
        }
    }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.row}>
                <View style={{ flexDirection: 'row', marginBottom: 30, marginTop: 20, }}>
                    <SvgXml xml={icon1()} width="70" height="70" />
                    <SvgXml xml={iconRank1()} width="70" height="70" />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: "white", fontSize: 20 }}>{item.titleText}</Text>
                        <Text style={{ color: "white", fontSize: 15, }}>{item.text}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 30, }}>
                    <SvgXml xml={icon2()} width="70" height="70" />
                    <SvgXml xml={iconRank2()} width="70" height="70" />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: "white", fontSize: 20 }}>{item.titleText}</Text>
                        <Text style={{ color: "white", fontSize: 15, }}>{item.text}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom:20, }}>
                    <SvgXml xml={icon3()} width="70" height="70" />
                    <SvgXml xml={iconRank3()} width="70" height="70" />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: "white", fontSize: 20 }}>{item.titleText}</Text>
                        <Text style={{ color: "white", fontSize: 15, }}>{item.text}</Text>
                    </View>
                <View style={{flexDirection:'row', marginTop:100, right:370, }}>
                    <SvgXml xml={icon4()} width="70" height="70" />
                    <SvgXml xml={iconRank4()} width="70" height="70" />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: "white", fontSize: 20 }}>{item.titleText}</Text>
                        <Text style={{ color: "white", fontSize: 15, }}>{item.text}</Text>
                    </View>
                </View>
                    
                </View>



            </View>
        </View>
    );

    function handlePopular(screen: string): void {
        throw new Error('Function not implemented.');
    }

    function handleDownload(screen: string): void {
        throw new Error('Function not implemented.');
    }

    function handleFavourite(screen: string): void {
        throw new Error('Function not implemented.');
    }

    function handleUser(screen: string): void {
        throw new Error('Function not implemented.');
    }

    return (
        <>

            <Container backgroundColor={'black'}>
                <Header>

                </Header>

                <Content>
                    <Text style={styles.headerText}>Bảng xếp hạng</Text>
                    <ImageBackground style={styles.imageRanking}
                        source={require('../../assets/images/ImageUserScreen/ảnh_nền_âm_nhạc.jpg')}>
                        <View>
                            <SvgXml width={60} height={60} xml={icon1()}></SvgXml>
                            <SvgXml width={80} height={80} xml={iconRank1()} style={styles.iconRank1}>
                            </SvgXml>
                            <Text style={{color:'white', left:10,}}>Live Long</Text>
                        </View>
                        <View style={styles.Rank2}>
                            <SvgXml width={60} height={60} xml={icon2()}></SvgXml>
                            <SvgXml width={80} height={80} xml={iconRank2()}>
                            </SvgXml>
                            <Text style={{color:'white', left:10,}}>Live Long</Text>
                        </View>
                        <View style={styles.Rank3}>
                            <SvgXml width={60} height={60} xml={icon3()}></SvgXml>
                            <SvgXml width={80} height={80} xml={iconRank3()}>
                            </SvgXml>
                            <Text style={{color:'white', left:10,}}>Live Long</Text>
                        </View>
                    </ImageBackground>
                    <View>
                        <FlatList
                            data={songs}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.title}
                        />
                    </View>

                </Content>

                <Footer>
                    <BottomBar onPressPopular={handlePopular} onPressDownload={handleDownload} onPressFavourite={handleFavourite} onPressUser={handleUser}>
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
    imageRanking: {
        width: 410,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',

    },
    iconRank1: {
        left: 5,
    },
    iconRank2: {

    },
    Rank2: {
        left: 150,
        marginTop: -70,
    },
    Rank3: {
        right: 150,
        marginTop: -150,
    },
    row: {
       
    },
    imagesContainer: {

    },
    svgXml1: {

    },
    svgXml2: {

    },
    orderIcon: {

    },
    songTitle: {
        color: 'white',
    },
})



export default RankingScreen;
