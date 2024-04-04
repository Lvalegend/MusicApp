import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar } from '../../app-uikits/icon-svg';
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
        navigation.navigate('Download')
    }
    const handleUser = ()=>{
        navigation.navigate('User')
    }

    return (
        <> 
        <Container backgroundColor={''}>


            <Header>


            </Header>

            <Content>
                <Text style = {{color: 'white', fontSize: 32}}>PopularScreen</Text>
            </Content>
            <Footer>
                    <BottomBar onPressHome={handleHome} onPressDownload={handleDownload} onPressFavourite={handleFavourite} onPressUser={handleUser}>
                    </BottomBar>
                </Footer>
        </Container>

        </>
    );
};

export default Popular;