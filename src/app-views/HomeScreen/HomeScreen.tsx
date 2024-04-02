import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, ScrollView, StyleSheet, StatusBar, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar, iconMusic } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import Login from '../LoginAndRegister/Login';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';


interface HomeScreenProps {

}

type ItemData = {
    id: string;
    title: string;
    img: string;
};

const items: ItemData[] = Array.from({ length: 10 }).map((_, index) => ({
    id: String(index),
    title: `Item ${index + 1}`,
    img: '../assets/images/avatar_trắng.jpg',
}));

const HomeScreen: React.FC<HomeScreenProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const handleHomeScreen = () => {
        navigation.navigate('SplashScreen');
      }

    const [text, setText] = useState('');
    const handleLogin = ()=>{
        navigation.navigate('Login')
    }
    const handleChangeText = (newText: string) => {
        setText(newText);
    };

    return (

        <>
            <Container>
                <Header>
                    <Text>HOME</Text>
                    <View style={styles.searchContainer}>
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
                    <Text style = {styles.title}>
                        khsdfsfsdfsfsdfsdf
                    </Text>

                    {/* <SafeAreaView style={styles.container}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <ScrollView contentContainerStyle={styles.playList}>
                                {items.map(item => (
                                    <View key={item.id} style={styles.itemPlayList}>
                                        <ImageBackground
                                            style={styles.logo}
                                            source={require('../../assets/images/avatar_trắng.jpg')}
                                        >
                                            <Text style={styles.title}>{item.title}</Text>
                                        </ImageBackground>
                                    </View>
                                ))}
                            </ScrollView>
                        </ScrollView>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <ScrollView contentContainerStyle={styles.list}>
                                {items.map(item => (
                                    <View key={item.id} style={styles.item}>
                                        <Text style={styles.title}>{item.title}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </ScrollView>
                    </SafeAreaView> */}
                </Content>




                <Footer>
                   
                    
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
        backgroundColor: '#e5e5e5'

    },
    logo: {
        height: 170,
        width: 170,
        alignContent: 'center',
        margin: 20,
        borderRadius:20,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
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
        backgroundColor: '#f9c2ff',
        height: 100,
        width: 380,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
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
        top:110,
        margin:20,

    },
});
export default HomeScreen;
