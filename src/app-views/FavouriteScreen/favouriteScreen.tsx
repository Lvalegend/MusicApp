import * as React from 'react';
import { Button, View, Text, Pressable, Image, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { icon3Cham, iconAdd, iconDownload, iconFavourite, iconLoop } from '../../app-uikits/icon-svg';
import { useState } from 'react';
import Albums from './Albums';
import Playlists from './Playlists';
import Songs from './Songs';
import Artists from './Artists';
import ArtistInf from './ArtistInf';


interface FavouriteProps {

}

const Favourite: React.FC<FavouriteProps & { navigation: NavigationProp<any> }> = () => {
    const [currentComponent, setCurrentComponent] = useState('Playlists');
    const [selectedIdP, setSelectedIdP] = useState<string>('');
    const renderComponent = () => {
        switch (currentComponent) {
            case 'Playlists':
              return <Playlists onPress={setCurrentComponent}/>;
            case 'Albums':
              return <Albums onPress={setCurrentComponent}/>;
            case 'Songs':
              return <Songs onPress={setCurrentComponent}/>;
            case 'Artists':
              return <Artists onPress={() => setCurrentComponent('ArtistInf')}/>;
            case 'ArtistInf':
              return <ArtistInf handleNavigateBack={() => setCurrentComponent('Artists')} id={selectedIdP} onPress={undefined}/>;
            default:
              return null;
          }
        };
    return (
        <> 
            <Container colors={['black', 'black']}>
                <Header>
                <Text style={{ color: 'white', fontSize: 32, marginLeft: 50, marginTop: 20 }}>Favourite</Text>
                </Header>
                <Content>
                    {renderComponent()}
                </Content>
                <Footer>
                    <BottomBar >
                    </BottomBar>
                </Footer>
            </Container>
        </>
    );
};
export default Favourite;
