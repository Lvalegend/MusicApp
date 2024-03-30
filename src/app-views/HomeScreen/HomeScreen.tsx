import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar } from '../../app-uikits/icon-svg';
import Header from '../../app-layout/Header';
import Content from '../../app-layout/Content';
import Footer from '../../app-layout/Footer';

interface HomeScreenProps {

}

const HomeScreen: React.FC<HomeScreenProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    return (
        <>
        <Header>
            
        </Header>

        <Content>

        </Content>

        <Footer>

        </Footer>
        </>
    );
};

export default HomeScreen;
