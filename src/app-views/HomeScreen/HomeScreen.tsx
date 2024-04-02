import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, ScrollView, StyleSheet, StatusBar, TextInput, ImageBackground} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar, iconMusic } from '../../app-uikits/icon-svg';
import {Header,Content,Footer} from '../../app-layout/Layout';
import { Svg } from 'react-native-svg';
import { useState } from 'react';

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
    const [text, setText] = useState('');

    const handleChangeText = (newText: string) => {
      setText(newText);
    };
    return (
        <>
        <Header>

            <SvgXml xml={iconMusic()}></SvgXml>
            <Image source = {require("../../assets/images/avatar_trắng.jpg")}></Image>

            <Text>dfasdasfdsfsdf</Text>
        </Header>

        <Content>
            <View style = {styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={handleChangeText}
                    placeholder="Search"
                />
            </View>
            <SafeAreaView style={styles.container}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <ScrollView contentContainerStyle={styles.playList}>
                        {items.map(item => (
                            <View key={item.id} style={styles.itemPlayList}>
                                <Text style={styles.title}>{item.title}</Text>
                                <ImageBackground
                                    style = {styles.logo}
                                    source={require('../../assets/images/avatar_trắng.jpg')}
                                ><Text style={styles.title}>{item.title}</Text></ImageBackground>
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
            </SafeAreaView>
        </Content>

        <Footer>

        </Footer>
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
        width:170,
        alignContent: 'center',
      },
    input: {
        flex:1,
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
      fontSize: 32,
    },
});
export default HomeScreen;
