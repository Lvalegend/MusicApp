import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, ScrollView, StyleSheet, StatusBar, TextInput, ImageBackground, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Svg, SvgXml } from 'react-native-svg';
import { icon3Cham, iconBack, iconDownload, iconFavourite, iconSreach } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface PlayListProps {

}


const PlayList: React.FC<PlayListProps> = ({}) => {
    const navigation = useNavigation();
    const handleNavigateBack = () => {
        navigation.goBack();
    };
    return(
        <>
            <Container backgroundColor={''}>
                <LinearGradient colors={['#b41b1b', '#101d1d']} style = {{flex: 1}}>
                    <Header>
                        <View style = {styles.containerHeader}
                        >
                            <Pressable onPress={handleNavigateBack}>
                                <SvgXml xml={iconBack()} />
                            </Pressable>

                            <Text style = {{color: 'white', fontSize: 18, margin: 5, marginLeft: 120 }}>PLAYLIST</Text>
                        </View>
                    </Header>
                    <Content>
                        <ImageBackground source={require('../../assets/images/song/albumChill.jpg')} style = {{width: 230, height: 230, marginHorizontal: 90, borderRadius: 20, overflow: 'hidden'}}>
                            <Text style = {{color: '#f26161', top: 165, margin:15, fontSize: 30 }}>Lofi Hits</Text>
                        </ImageBackground>
                        <View style = {styles.containerFunction}>
                            <Pressable style = {styles.icon}>
                                <SvgXml xml={iconDownload()}/>
                                <Text style = {styles.text}>Download</Text>
                            </Pressable>
                            <Pressable style = {styles.button}>
                                <Text style = {{color: 'white', fontSize: 18}}>RANDOM PLAY</Text>
                            </Pressable>
                            <Pressable style = {styles.icon}>
                                <SvgXml xml={iconFavourite()}/>
                                <Text style = {styles.text}>Favourite</Text>
                            </Pressable>
                        </View>
                        <ScrollView>
                        <Pressable style = {styles.song}>
                                <View style = {{flexDirection:'row',width:360, }}>
                                    <Image source={require('../../assets/images/song/SongChill1.jpg')} style = {styles.image}></Image>
                                    <View style = {{margin: 10, }}>
                                        <Text style = {{color: 'white', fontSize: 15, marginBottom: 7}}>Point the star</Text>
                                        <Text style = {{color: 'gray'}}>Jasper, Martin Arteta, 11:11 Music Group</Text>
                                    </View>
                                </View>
                                <SvgXml xml={icon3Cham()} style= {{ marginTop: 20}}/>
                            </Pressable>
                            
                            <Pressable style = {styles.song}>
                                <View style = {{flexDirection:'row',width:360, }}>
                                    <Image source={require('../../assets/images/song/SongChill2.jpg')} style = {styles.image}></Image>
                                    <View style = {{margin: 10, }}>
                                        <Text style = {{color: 'white', fontSize: 15, marginBottom: 7}}>I Need a Girl</Text>
                                        <Text style = {{color: 'gray'}}>Lee</Text>
                                    </View>
                                </View>
                                <SvgXml xml={icon3Cham()} style= {{ marginTop: 20}}/>
                            </Pressable>
                            <Pressable style = {styles.song}>
                                <View style = {{flexDirection:'row',width:360, }}>
                                    <Image source={require('../../assets/images/song/SongChill3.jpg')} style = {styles.image}></Image>
                                    <View style = {{margin: 10, }}>
                                        <Text style = {{color: 'white', fontSize: 15, marginBottom: 7}}>I Like Me Better</Text>
                                        <Text style = {{color: 'gray'}}>Peaceful Melody, soave lofi</Text>
                                    </View>
                                </View>
                                <SvgXml xml={icon3Cham()} style= {{ marginTop: 20}}/>
                            </Pressable>
                            <Pressable style = {styles.song}>
                                <View style = {{flexDirection:'row',width:360 }}>
                                    <Image source={require('../../assets/images/song/SongChill4.jpg')} style = {styles.image}></Image>
                                    <View style = {{margin: 10, }}>
                                        <Text style = {{color: 'white', fontSize: 15, marginBottom: 7}}>See You Again</Text>
                                        <Text style = {{color: 'gray'}}>Peaceful Melody, soave lofi</Text>
                                    </View>
                                </View>
                                <SvgXml xml={icon3Cham()} style= {{ marginTop: 20}}/>
                            </Pressable>
                            <Pressable style = {styles.song}>
                                <View style = {{flexDirection:'row',width:360, }}>
                                    <Image source={require('../../assets/images/song/SongChill5.jpg')} style = {styles.image}></Image>
                                    <View style = {{margin: 10, }}>
                                        <Text style = {{color: 'white', fontSize: 15, marginBottom: 7}}>Stenven Universe</Text>
                                        <Text style = {{color: 'gray'}}>Jasper, Martin Arteta, 11:11 Music Group</Text>
                                    </View>
                                </View>
                                <SvgXml xml={icon3Cham()} style= {{ marginTop: 20}}/>
                            </Pressable>
                            <Pressable style = {styles.song}>
                                <View style = {{flexDirection:'row',width:360, }}>
                                    <Image source={require('../../assets/images/song/SongChill6.jpg')} style = {styles.image}></Image>
                                    <View style = {{margin: 10, }}>
                                        <Text style = {{color: 'white', fontSize: 15, marginBottom: 7}}>Payphone</Text>
                                        <Text style = {{color: 'gray'}}>Peaceful melody, soave lofi</Text>
                                    </View>
                                </View>
                                <SvgXml xml={icon3Cham()} style= {{ marginTop: 20}}/>
                            </Pressable>
                            <Pressable style = {styles.song}>
                                <View style = {{flexDirection:'row',width:360, }}>
                                    <Image source={require('../../assets/images/song/SongChill7.jpg')} style = {styles.image}></Image>
                                    <View style = {{margin: 10, }}>
                                        <Text style = {{color: 'white', fontSize: 15, marginBottom: 7}}>You're Beautiful</Text>
                                        <Text style = {{color: 'gray'}}>Peaceful Melody, soave lofi</Text>
                                    </View>
                                </View>
                                <SvgXml xml={icon3Cham()} style= {{ marginTop: 20}}/>
                            </Pressable>
                            
                        </ScrollView>
                    </Content>
                    <Footer>

                    </Footer>
                </LinearGradient>
            </Container>
        </>
    );
};

const styles = StyleSheet.create({
    containerHeader: {
        margin: 20,
        flexDirection: 'row'
    },
    containerFunction: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 40,
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor:'#925bff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20,
        marginHorizontal: 20,

    },
    icon: {
        alignItems: 'center'
    },
    text: {
        color: 'white',
    },
    song: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 17,

    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
});
export default PlayList;


