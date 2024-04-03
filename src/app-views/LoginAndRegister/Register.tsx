import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';


interface RegisterProps {

}

const Register: React.FC<RegisterProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    return (
        <> <Container>


            <Header>


            </Header>

            <Content>

            </Content>

            <Footer>

            </Footer>

        </Container>
        </>
    );
};

export default Register;
