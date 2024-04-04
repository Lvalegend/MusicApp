import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';



interface FavouriteProps {

}

const Favourite: React.FC<FavouriteProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const handleHome = ()=>{
        navigation.navigate('HomeScreen')
    }
    const handlePopular = ()=>{
        navigation.navigate('Popular')
    }
    const handleDownload = ()=>{
        navigation.navigate('Download')
    }
    const handleUser = ()=>{
        navigation.navigate('User')
    }
    return (
        <> 
            <Container>
                <Header>
                    <Text  style = {{color: 'white', fontSize: 32}}>Favourite</Text>
                </Header>
                <Content>
                    <View>
                        <View>
                            
                        </View>
                        <View>

                        </View>
                    </View>
                    <View>

                    </View>
                </Content>
                <Footer>
                <BottomBar onPressHome={handleHome} onPressDownload={handleDownload} onPressPopular={handlePopular} onPressUser={handleUser}>
                    </BottomBar>
                </Footer>
            </Container>
        </>
    );
};

export default Favourite;
