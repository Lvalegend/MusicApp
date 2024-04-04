import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { ImageBackground } from 'react-native';

interface DownloadProps {

}

const Downloads: React.FC<DownloadProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const handleHome = () => {
        navigation.navigate('HomeScreen')
    }
    const handleFavourite = () => {
        navigation.navigate('Favourite')
    }
    const handlePopular = () => {
        navigation.navigate('Popular')
    }
    const handleUser = () => {
        navigation.navigate('User')
    }
    return (
        <>
            <Container backgroundColor={'black'}>

                <Header>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{ color: 'white', fontSize: 26, marginTop:10}}>Downloads</Text>
                    </View>
               
                 

                </Header>
                <Content>
                    <View style={{justifyContent: 'center', alignItems: 'center', height:700 }}>
                        <Image source={require("../../assets/images/taixuong.png")} style={{ width: 150, height: 150 }} />
                        <Text style={{ color: 'white', fontSize: 22 }}>Chưa có bản nhạc nào tải xuống</Text>
                    </View>

                </Content>

                <Footer>
                    <BottomBar onPressHome={handleHome} onPressPopular={handlePopular} onPressFavourite={handleFavourite} onPressUser={handleUser}>
                    </BottomBar>
                </Footer>
            </Container>
        </>
    );
};

export default Downloads;