import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';



interface DownloadProps {

}

const Download: React.FC<DownloadProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const handleHome = ()=>{
        navigation.navigate('HomeScreen')
    }
    const handleFavourite = ()=>{
        navigation.navigate('Favourite')
    }
    const handlePopular = ()=>{
        navigation.navigate('Popular')
    }
    const handleUser = ()=>{
        navigation.navigate('User')
    }
    return (
        <> 
            <Container>

                <Header>


                </Header>

                <Content>
                    <Text  style = {{color: 'white', fontSize: 32}}>Download</Text>
                </Content>
                <Footer>
                <BottomBar onPressHome={handleHome} onPressPopular={handlePopular} onPressFavourite={handleFavourite} onPressUser={handleUser}>
                    </BottomBar>
                </Footer>
            </Container>
        </>
    );
};

export default Download;
