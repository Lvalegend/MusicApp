import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, ScrollView, StyleSheet, StatusBar, TextInput, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';




interface PopularProps {

}

const Popular: React.FC<PopularProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const handleHome = () => {
        navigation.navigate('HomeScreen')
    }
    const handleFavourite = () => {
        navigation.navigate('Favourite')
    }
    const handleDownloads = () => {
        navigation.navigate('Downloads')
    }
    const handleUser = () => {
        navigation.navigate('User')
    }

    return (
        <>
            <Container backgroundColor={'black'}>


                <Header>
            

                </Header>

                <Content>
                    
                    
                    
                </Content>
                <Footer>
                    <BottomBar onPressHome={handleHome} onPressDownloads={handleDownloads} onPressFavourite={handleFavourite} onPressUser={handleUser}>
                    </BottomBar>
                </Footer>
            </Container>

        </>
    );
};


export default Popular;