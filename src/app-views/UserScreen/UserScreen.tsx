import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';



interface UserProps {

}

const User: React.FC<UserProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const handleHome = ()=>{
        navigation.navigate('HomeScreen')
    }
    const handleFavourite = ()=>{
        navigation.navigate('Favourite')
    }
    const handlePopular = ()=>{
        navigation.navigate('Popular')
    }
    const handleDownload = ()=>{
        navigation.navigate('Download')
    }
    return (
        <> 
            <Container>

                <Header>


                </Header>

                <Content>
                    <Text  style = {{color: 'white', fontSize: 32}}>UserScreen</Text>
                </Content>

                <Footer>
                    <BottomBar onPressHome={handleHome} onPressPopular={handlePopular} onPressFavourite={handleFavourite} onPressDownload={handleDownload}>
                    </BottomBar>
                </Footer>
            </Container>

        </>
    );
};

export default User;
