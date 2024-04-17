import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';


interface PopularProps {

}

const Popular: React.FC<PopularProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const handleHome = ()=>{
        navigation.navigate('HomeScreen')
    }
    const handleFavourite = ()=>{
        navigation.navigate('Favourite')
    }
    const handleDownload = ()=>{
        navigation.navigate('Downloads')
    }
    const handleUser = ()=>{
        navigation.navigate('User')
    }

    return (
        <> 
        <Container colors={['black','black','black']} >


            <Header>


            </Header>

            <Content>
                <Text style = {{color: 'white', fontSize: 32}}>PopularScreen</Text>
            </Content>
            <Footer>
                    <BottomBar onPressHome={handleHome} onPressDownloads={handleDownload} onPressFavourite={handleFavourite} onPressUser={handleUser}>
                    </BottomBar>
                </Footer>
        </Container>

        </>
    );
};

export default Popular;