import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Image, TextInput, Pressable, Modal, TouchableOpacity, ScrollView
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconBack, iconAdd, icon3Cham, iconSreach, iconChuX } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import { launchImageLibrary } from 'react-native-image-picker';
import { hostNetwork } from '../../host/HostNetwork';
import axios from 'axios';

interface Song {
  _id: string;
  nameSong: string;
  songLink: string;
  image: string;
}

const ManageSongScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    _id: '',
    nameSong: '',
    image: '',
  });
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [recentlyPlayedData, setRecentlyPlayedData] = useState<Song[]>([]);

  useEffect(() => {
    fetchRecentlyPlayedData();
  }, []);

  const fetchRecentlyPlayedData = async () => {
    try {
      const response = await axios.get(`http://${hostNetwork}:3000/songs`);
      setRecentlyPlayedData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangeID = (newID: string) => setFormData({ ...formData, _id: newID });
  const handleChangeName = (newName: string) => setFormData({ ...formData, nameSong: newName });

  const handleChangeText = (newText: string) => {
    setText(newText);
    const filteredData = recentlyPlayedData.filter(item =>
      item.nameSong.toLowerCase().includes(newText.toLowerCase())
    );
    setRecentlyPlayedData(filteredData);
  };

  const [image, setImage] = useState('')

  const handleManage = () => {
    navigation.navigate('ManageScreen');
  };

  const handleSave = async () => {
    try {
      if (formData.nameSong && formData.image) {
        await axios.post(`http://${hostNetwork}:3000/createSong`, formData);
        fetchRecentlyPlayedData();
        setModalVisible(false);
      } else {
        console.error('Please provide song name and image link.');
      }
    } catch (error) {
      console.error('Error saving song:', error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleEdit = () => {
    if (selectedSong) {
      setFormData({
        _id: selectedSong._id,
        nameSong: selectedSong.nameSong,
        image: selectedSong.songLink
      });
      setModalVisible(true);
      setMenuModalVisible(false);
    }
  };

  const handleDelete = async () => {
    if (selectedSong) {
      try {
        await axios.delete(`http://${hostNetwork}:3000/deleteSong/${selectedSong._id}`);
        fetchRecentlyPlayedData();
        setMenuModalVisible(false);
      } catch (error) {
        console.error('Error deleting song:', error);
      }
    }
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
          <Text style={{ color: 'white', fontSize: 26, marginTop: 0 }}>Danh sách bài hát</Text>
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
        <ScrollView>
          {recentlyPlayedData.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={styles.item}
              onPress={() => setSelectedSong(item)}
            >
              <Image source={{ uri: item.songLink }} style={styles.song} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>{item.nameSong}</Text>
              </View>
              <TouchableOpacity style={styles.menuIconContainer} onPress={() => setMenuModalVisible(true)}>
                <SvgXml xml={icon3Cham()} style={styles.menuIcon} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Content>

      <Footer>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} onPress={() => setModalVisible(true)}>
            <View style={styles.addImage}><SvgXml xml={iconAdd('white', 20, 20)} /></View>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="ID"
                style={styles.inputAdd}
                value={formData._id}
                onChangeText={handleChangeID}
              />
              <TextInput
                placeholder="Tên bài hát"
                style={styles.inputAdd}
                value={formData.nameSong}
                onChangeText={handleChangeName}
              />
              <TextInput
                placeholder="Linh nhạc"
                style={styles.inputAdd}
                value={formData.image}
                onChangeText={(newImage) => setFormData({ ...formData, image: newImage })}
              />

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
                  <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={styles.buttonClose}>
                  <Text style={styles.buttonText}>Hủy bỏ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={menuModalVisible}
          onRequestClose={() => {
            setMenuModalVisible(!menuModalVisible);
          }}>
          <View style={styles.centeredView}>
            <TouchableOpacity onPress={() => setMenuModalVisible(false)} style={styles.close}>
              <SvgXml xml={iconChuX()} />
            </TouchableOpacity>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={handleEdit} style={styles.menuEdit}>
                <Text style={styles.menuOptionText}>Sửa thông tin</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.menuDelete}>
                <Text style={styles.menuOptionText}>Xóa bài hát</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  footer: {
    height: 50,
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    opacity: 0.9
  },
  footerItem: {
    margin: 5,
    borderRadius: 5,
  },
  addImage: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  item: {
    backgroundColor: '#24242E',
    height: 100,
    width: 380,
    alignItems: 'center',
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
  itemTextContainer: {
    flexDirection: 'column',
    marginHorizontal: 18,
    justifyContent: 'center',
    flex: 1,
  },
  itemText: {
    color: 'white',
    fontSize: 22,
  },
  menuIconContainer: {
    marginTop: 5,
    marginLeft: 'auto',
  },
  menuIcon: {
  
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputAdd: {
    width: 200,
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  buttonSave: {
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonClose: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 5
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
    fontWeight: "bold"
  },
  menuEdit: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 60,
    elevation: 2,
    backgroundColor: "black",
    marginTop: 10
  },
  menuDelete: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 70,
    elevation: 2,
    backgroundColor: "black",
    marginTop: 10
  },
  menuOptionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    top: 290,
    right: 45,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: "gray",
    padding: 10,
    zIndex: 1
  },
});

export default ManageSongScreen;
