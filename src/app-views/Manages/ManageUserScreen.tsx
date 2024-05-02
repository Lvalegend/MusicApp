import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, StyleSheet, StatusBar, TextInput, ImageBackground, Pressable, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconSreach } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { ReactNode, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';



interface ManageUserScreenProps {
}

const ManageUserScreen: React.FC<ManageUserScreenProps> = () => {
    return (
        <Container colors={['#4c669f', 'red', '#192f6a']} >
        <Header>

        </Header>
        <Content>
    
    </Content>
        <Footer></Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    
    });
export default ManageUserScreen;