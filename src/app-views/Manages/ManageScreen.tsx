import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, StyleSheet, StatusBar, TextInput, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconsong } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import { ReactNode, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';


interface ManageScreenProps {
}

const ManageScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {

    const handleCate = () => {
        navigation.navigate('ManageCateScreen');
    };

    const handleCount = () => {
        navigation.navigate('ManageCountScreen');
    };

    const handleInform = () => {
        navigation.navigate('ManageInformScreen');
    };

    const handlePlaylist = () => {
        navigation.navigate('ManagePlaylistScreen');
    };

    const handleSong = () => {
        navigation.navigate('ManageSongScreen');
    };

    const handleUser = () => {
        navigation.navigate('ManageUserScreen');
    };
    return (
        <Container colors={['#4c669f', 'red', '#192f6a']} >
            <Header>
                <View style={styles.header}>
                <Image source={require("../../assets/images/ImageManage/header.jpg")} style={styles.headerImage}></Image>  
                </View>
            </Header>
            <Content>
                <View style={styles.body}>

                    <View style={styles.menuItem}>
                        <TouchableOpacity onPress={handleSong} style={styles.menuItemButton}>
                        <Image source={require("../../assets/images/ImageManage/songmn.jpg")} style={styles.menuImage}></Image>  
                        <Text style={styles.menuItemText}>Bài hát</Text>   
                        </TouchableOpacity>
                        
                    </View>
                    <View style={styles.menuItem}>
                        <TouchableOpacity onPress={handlePlaylist} style={styles.menuItemButton}>
                        <Image source={require("../../assets/images/ImageManage/playlistmn.png")} style={styles.menuImage}></Image> 
                            <Text style={styles.menuItemText}>PlayList</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuItem}>
                        <TouchableOpacity onPress={handleUser} style={styles.menuItemButton}>
                        <Image source={require("../../assets/images/ImageManage/usermn.jpg")} style={styles.menuImage}></Image> 
                            <Text style={styles.menuItemText}>Người dùng</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuItem}>
                        <TouchableOpacity onPress={handleCount} style={styles.menuItemButton}>
                        <Image source={require("../../assets/images/ImageManage/countmn.jpg")} style={styles.menuImage}></Image> 
                            <Text style={styles.menuItemText}>Thống kê</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuItem}>
                        <TouchableOpacity onPress={handleInform} style={styles.menuItemButton}>
                        <Image source={require("../../assets/images/ImageManage/informmn.jpg")} style={styles.menuImage}></Image> 
                            <Text style={styles.menuItemText}>Thông tin cá nhân</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Content>
            <Footer></Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
    },
    headerImage:{
    
        height:200,
        justifyContent:"center",
        marginHorizontal:5,
        marginTop:10
    },
    body: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: 20,
        alignItems: "center",
        
    },
    menuItemButton: {
        width: '100%',
        height: '100%',
        
    },
    menuItem: {
        width: 160,
        height: 120,
        backgroundColor: '#FF6600',
        marginVertical: 30,
        marginHorizontal:9,
        borderRadius: 10,
    },
    menuItemText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign:"center",
        color:"white"
    },
    menuImage:{
        width:160,
        height:120
    }

});

export default ManageScreen;