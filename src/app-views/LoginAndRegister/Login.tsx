import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { Container, Content, Footer, Header } from '../../app-layout/Layout';



interface LoginProps {

}

const Login: React.FC<LoginProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    return (
        <> 


            <Header>


            </Header>

            <Content>

            </Content>

            <Footer>

            </Footer>

        </>
    );
};

export default Login;
