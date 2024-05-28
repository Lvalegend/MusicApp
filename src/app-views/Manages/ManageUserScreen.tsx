import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconSreach, iconBack, iconChuX } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import axios from 'axios';
import { hostNetwork } from '../../host/HostNetwork';

interface Account {
    name: string;
    email: string;
    avatar: string;
}

const ManageUserScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState<Account>({
        name: '',
        email: '',
        avatar: ''
    });
    const [recentlyPlayedData, setRecentlyPlayedData] = useState<Account[]>([]);
    const [filteredData, setFilteredData] = useState<Account[]>([]);

    useEffect(() => {
        // Fetch data from the API
        axios.get(`http://${hostNetwork}:3000/infoUser`)
            .then(response => {
                setRecentlyPlayedData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleChangeName = (newName: string) => setFormData({ ...formData, name: newName });
    const handleChangeEmail = (newEmail: string) => setFormData({ ...formData, email: newEmail });

    const handleChangeText = (newText: string) => {
        setText(newText);
        const filteredData = recentlyPlayedData.filter(item =>
            item.name.toLowerCase().includes(newText.toLowerCase()) ||
            item.email.toLowerCase().includes(newText.toLowerCase())
        );
        setFilteredData(filteredData);
    };

    const handleManage = () => {
        navigation.navigate('ManageScreen');
    };

    const handleSave = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <Container colors={['#4c669f', 'red', '#192f6a']}>
            <Header>
                <View style={styles.containerHeader}>
                    <Pressable onPress={handleManage}>
                        <SvgXml xml={iconBack()} />
                    </Pressable>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 26, marginTop: 0 }}>Danh sách người dùng</Text>
                </View>
                <View style={styles.searchContainer}>
                    <SvgXml xml={iconSreach()} style={{ margin: 20, marginRight: 0 }} />
                    <TextInput
                        style={styles.input}
                        value={text}
                        onChangeText={handleChangeText}
                        placeholder="Search"
                    />
                </View>
            </Header>

            <Content>
                {filteredData.map((item) => (
                    <Pressable
                        key={item.name}
                        style={styles.item}
                    >
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>{item.name}</Text>
                            <Text style={{ color: 'white', marginTop: 8 }}>{item.email}</Text>
                        </View>
                        <TouchableOpacity>
                            <SvgXml xml={iconChuX()} style={{ marginTop: 18, marginLeft: 90 }} />
                        </TouchableOpacity>
                    </Pressable>
                ))}
            </Content>

            <Footer>
                
            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    containerHeader: {
        margin: 15,
        flexDirection: 'row'
    },
    searchContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 20
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },

    item: {
        backgroundColor: '#24242E',
        height: 100,
        width: 380,
        alignContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 20,
        flexDirection: 'row'
    },
    avatar: {
        height: 70,
        width: 70,
        borderRadius: 10,
    },
});

export default ManageUserScreen;
