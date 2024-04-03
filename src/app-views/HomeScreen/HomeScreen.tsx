import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, ScrollView, StyleSheet, StatusBar, TextInput, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconSreach } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import Login from '../LoginAndRegister/Login';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { useState } from 'react';




interface HomeScreenProps {

}

const HomeScreen: React.FC<HomeScreenProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const handleHomeScreen = () => {
        navigation.navigate('SplashScreen');
    }

    const [text, setText] = useState('');

    const handlePopular = () => {
        navigation.navigate('Popular')
    }
    const handleFavourite = () => {
        navigation.navigate('Favourite')
    }
    const handleDownload = () => {
        navigation.navigate('Download')
    }
    const handleUser = () => {
        navigation.navigate('User')
    }
    const handleChangeText = (newText: string) => {
        setText(newText);
    };

    return (

        <>
            <Container>
                <Header>
                    <Text style={{ color: 'white', fontSize: 32, marginLeft: 20, marginTop: 20 }}>Home</Text>
                    <View style={styles.searchContainer}>
                        <SvgXml xml={iconSreach()} style={{ margin: 20, marginRight: 0 }} />
                        <TextInput
                            style={styles.input}
                            value={text}
                            onChangeText={handleChangeText}
                            placeholder="Search"
                        />
                    </View>
                </Header>

                <Content>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <ImageBackground
                            style={styles.logo}
                            source={require('../../assets/images/song/album1.jpg')}
                        >
                            <Text style={styles.title}>GYM</Text>
                        </ImageBackground>
                        <ImageBackground
                            style={styles.logo}
                            source={require('../../assets/images/song/anhMatTroi.jpg')}
                        >
                            <Text style={styles.title}>GYM</Text>
                        </ImageBackground>
                        <ImageBackground
                            style={styles.logo}
                            source={require('../../assets/images/avatar_trắng.jpg')}
                        >
                            <Text style={styles.title}>GYM</Text>
                        </ImageBackground>
                        <ImageBackground
                            style={styles.logo}
                            source={require('../../assets/images/avatar_trắng.jpg')}
                        >
                            <Text style={styles.title}>GYM</Text>
                        </ImageBackground>
                        <ImageBackground
                            style={styles.logo}
                            source={require('../../assets/images/avatar_trắng.jpg')}
                        >
                            <Text style={styles.title}>GYM</Text>
                        </ImageBackground>
                    </ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, color: 'white', marginLeft: 20, marginTop: 20, }}>
                            Recently Play
                        </Text>
                        <Text style={{ fontSize: 18, color: 'white', marginLeft: 190, marginTop: 20, }}>
                            See all
                        </Text>
                    </View>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                        <Pressable style={styles.item}>
                            <Image source={require('../../assets/images/song/Leluuly.jpg')} style={styles.song}></Image>
                            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>Mehaboba</Text>
                                <Text style={{ color: 'white' }}>Nguyen Kim Tuyen</Text>
                                <Text style={{ color: 'white', marginTop: 8 }}>3:50</Text>
                            </View>
                        </Pressable>
                    </ScrollView>

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
    searchContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 20
    },
    logo: {
        height: 170,
        width: 170,
        alignContent: 'center',
        marginLeft: 20,
        borderRadius: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    search: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: '#D9D9D9'
    },
    list: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    playList: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        backgroundColor: '#24242E',
        height: 100,
        width: 380,
        alignContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 20,
        flexDirection: 'row'
    },
    itemPlayList: {
        backgroundColor: '#f9c2ff',
        height: 170,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    title: {
        fontSize: 16,
        top: 110,
        margin: 20,
        color: 'white'
    },
    word: {
        fontSize: 18,
        color: 'white',
        alignContent: 'stretch',
    },
    song: {
        height: 70,
        width: 70,
        borderRadius: 10,
    },
});
export default HomeScreen;
