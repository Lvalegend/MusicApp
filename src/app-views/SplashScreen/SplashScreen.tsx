import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import { useEffect } from 'react';
import { iconMusic } from '../../app-uikits/icon-svg';

interface SplashScreenProps {

}

const SplashScreen: React.FC<SplashScreenProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Container backgroundColor={'black'}>

        <Header>


        </Header>

        <Content>

          <View style={{ height: 800, justifyContent: 'center', alignItems: 'center' }}>
            <SvgXml xml={iconMusic()}></SvgXml>
            <Text style={{ marginTop: 10, fontWeight: '600', color: 'white' }}>Music 60T</Text>
          </View>


        </Content>

        <Footer>

          <BottomBar></BottomBar>

        </Footer>

      </Container>



    </>
  );
};

export default SplashScreen;
