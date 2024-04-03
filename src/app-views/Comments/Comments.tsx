import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar } from '../../app-uikits/icon-svg';

import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import HomeScreen from '../HomeScreen/HomeScreen';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';

interface CommentsProps {

}

const Comments: React.FC<CommentsProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    return (
        <> <Container>

            <Header>


            </Header>

            <Content>

            </Content>

            <Footer>
               <BottomBar></BottomBar>
            </Footer>

        </Container>
        </>
    );
};

export default Comments;
