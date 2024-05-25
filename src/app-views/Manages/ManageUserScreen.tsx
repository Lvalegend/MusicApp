import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, StyleSheet, Modal, TextInput, ImageBackground, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconSreach, iconBack } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import BottomBar from '../GeneralComponents/BottomBar/BottomBar';
import { ReactNode, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';



interface ManageUserScreenProps {

}

const ManageUserScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        phone: '',
        email:'',
        image: null
    });
    const [recentlyPlayedData, setRecentlyPlayedData] = useState([
        { id: '1', name: 'Pham Cao Hoang Anh', phone: '583573985', email: 'anhVu@gmail.com', image: require('../../assets/images/ImageUserScreen/avatar-dep-8.jpg') },
        { id: '2', name: 'Do Thanh Chung', phone: '583573985', email: 'anhVu@gmail.com', image: require('../../assets/images/ImageUserScreen/avatar-dep-38.jpg') },
        { id: '3', name: 'Vu Duc Khang', phone: '583573985', email: 'anhVu@gmail.com', image: require('../../assets/images/ImageUserScreen/avatar-dep-76.jpg') },
        { id: '4', name: 'Nguyen Van Bach', phone: '583573985', email: 'anhVu@gmail.com', image: require('../../assets/images/ImageUserScreen/avatar-dep-97.jpg') },
        { id: '5', name: 'Le Thi Hong Nhung', phone: '583573985', email: 'anhVu@gmail.com', image: require('../../assets/images/ImageUserScreen/avatar-dep-117.jpg') },
        { id: '6', name: 'Bui Thi Mai Thao', phone: '583573985', email: 'anhVu@gmail.com', image: require('../../assets/images/ImageUserScreen/avatar-dep-149.jpg') },
    ]);

    const handleChangeID = (newID: string) => setFormData({ ...formData, id: newID });
    const handleChangeName = (newName: string) => setFormData({ ...formData, name: newName });
    const handleChangephone = (newphone: string) => setFormData({ ...formData, phone: newphone });
    const handleChangeemail = (newemail: string) => setFormData({ ...formData, email: newemail });

    const handleChangeText = (newText: string) => {
        setText(newText);
        const filteredData = recentlyPlayedData.filter(item =>
            item.name.toLowerCase().includes(newText.toLowerCase()) ||
            item.phone.toLowerCase().includes(newText.toLowerCase())
        );
        setRecentlyPlayedData(filteredData);
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
                {recentlyPlayedData.map((item) => (
                    <Pressable
                        key={item.id}
                        style={styles.item}
                    >
                        <Image source={item.image} style={styles.song} />
                        <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>{item.name}</Text>
                            <Text style={{ color: 'white' }}>{item.phone}</Text>
                            <Text style={{ color: 'white', marginTop: 8 }}>{item.email}</Text>
                        </View>
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
    song: {
        height: 70,
        width: 70,
        borderRadius: 10,
    },
});
export default ManageUserScreen;