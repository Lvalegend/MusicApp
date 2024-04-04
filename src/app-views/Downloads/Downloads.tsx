import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar } from '../../app-uikits/icon-svg';
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
            <Container>

                <Header>

                </Header>
                <Text style={{ color: 'white', fontSize: 26, flex: 1, justifyContent: 'center', paddingHorizontal: 140, marginTop:20 }}>Downloads</Text>
                <Content>
                    <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                        <ImageBackground source={require("../../assets/images/taixuong.png")} style={{ width: 150, height: 150}}/>                 
                        <Text style={{ color: 'white', fontSize: 22, flex: 1, justifyContent: 'center', alignContent: "center" }}>Chưa có bản nhạc nào tải xuống</Text>
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