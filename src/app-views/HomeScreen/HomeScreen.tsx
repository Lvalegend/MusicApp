import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar, iconMusic } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import Login from '../LoginAndRegister/Login';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';

interface HomeScreenProps {

}

const HomeScreen: React.FC<HomeScreenProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const handleHomeScreen = () => {
        navigation.navigate('HomeScreen');
      }
    return (

        <>
            <Container>
                <Header>


                </Header>

                <Content>

                </Content>

                <Footer>
                    <BottomBar
                        onPressHome={handleHomeScreen}>
                    </BottomBar>
                </Footer>

            </Container>


        </>
    );
};

export default HomeScreen;
