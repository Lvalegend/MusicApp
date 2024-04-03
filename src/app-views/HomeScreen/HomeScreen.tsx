import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar, iconMusic } from '../../app-uikits/icon-svg';
import {Header,Content,Footer} from '../../app-layout/Layout';

interface HomeScreenProps {

}

const HomeScreen: React.FC<HomeScreenProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    return (
        <>
        <Header>
<<<<<<< HEAD
            <Text>1231231</Text>
=======

            <SvgXml xml={iconMusic()}></SvgXml>
            <Image source = {require("../../assets/images/avatar_trắng.jpg")}></Image>

            <Text>dfasdasfdsfsdf</Text>
>>>>>>> 5b7af330518c5bd9266f0d93695fb2da990047ec
        </Header>

        <Content>
            <Image source={require('../../assets/images/avatar_trắng.jpg')} />
            <Text>Text cua toiiii</Text>
        </Content>

        <Footer>

        </Footer>
        </>
    );
};

export default HomeScreen;
