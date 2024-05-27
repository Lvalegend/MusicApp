import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, StyleSheet, PermissionsAndroid, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconSreach, iconBack, iconAdd, icon3Cham, iconChuX } from '../../app-uikits/icon-svg';
import { Header, Content, Footer, Container } from '../../app-layout/Layout';
import { launchImageLibrary } from 'react-native-image-picker';

interface ManageSongScreenProps {
  handleNavigateBack: () => void;
  id: string;
}

const ManageSongScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    artist: '',
    duration: '',
    category: '',
    image: null
  });
  const [selectedSong, setSelectedSong] = useState(null);
  const [recentlyPlayedData, setRecentlyPlayedData] = useState([
    { id: '1', title: 'Le Luu Ly', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/Leluuly.jpg') },
    { id: '2', title: 'Anh Mat Troi', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/anhMatTroi.jpg') },
    { id: '3', title: 'Khi Anh Gan Em', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/KhiAnhGanEm.jpg') },
    { id: '4', title: 'Hoa Cuoi', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/Hoacuoijpg.jpg') },
    { id: '5', title: 'Tinh Yeu Sai', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/OIP.jpg') },
    { id: '6', title: 'Mehaboba', artist: 'Nguyen Kim Tuyen', duration: '3:50', image: require('../../assets/images/song/Leluuly.jpg') },
  ]);

  const handleChangeID = (newID: string) => setFormData({ ...formData, id: newID });
  const handleChangeName = (newName: string) => setFormData({ ...formData, name: newName });
  const handleChangeArtist = (newArtist: string) => setFormData({ ...formData, artist: newArtist });
  const handleChangeDuration = (newDuration: string) => setFormData({ ...formData, duration: newDuration });
  const handleChangeCategory = (newCategory: string) => setFormData({ ...formData, category: newCategory });

  const handleChangeText = (newText: string) => {
    setText(newText);
    const filteredData = recentlyPlayedData.filter(item =>
      item.title.toLowerCase().includes(newText.toLowerCase()) ||
      item.artist.toLowerCase().includes(newText.toLowerCase())
    );
    setRecentlyPlayedData(filteredData);
  };

  const [image, setImage] = useState('')
  const requesCameraPermissions = async () => {
    try {
      const checkPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
      if (checkPermissions === PermissionsAndroid.RESULTS.GRANTED) {

        const result: any = await launchImageLibrary({ mediaType: 'mixed' })
        setImage(result.assets[0].uri)

        console.log(result);

      }
      else {
        console.log('Refuse');

      }
    } catch (error) {
      console.log(error);

    }

  }

  const handleManage = () => {
    navigation.navigate('ManageScreen');
  };

  const handleSave = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleEdit = () => {
    if (selectedSong) {
      setFormData(selectedSong);
      setModalVisible(true);
      setMenuModalVisible(false);
    }
  };

  const handleDelete = () => {
    if (selectedSong) {
      setMenuModalVisible(false);
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
        {recentlyPlayedData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
          >
            <Image source={item.image} style={styles.song} />
            <View style={{ flexDirection: 'column', marginHorizontal: 18, justifyContent: 'center' }}>
              <Text style={{ color: 'white' }}>{item.title}</Text>
              <Text style={{ color: 'white' }}>{item.artist}</Text>
              <Text style={{ color: 'white', marginTop: 8 }}>{item.duration}</Text>
            </View>
            <TouchableOpacity>
              <SvgXml xml={icon3Cham()} style={{ marginTop: 18, marginLeft: 90 }} onPress={() => setMenuModalVisible(true)} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
              <TouchableOpacity onPress={() => requesCameraPermissions()} style={{ padding: 15, borderRadius: 50, backgroundColor: '#23D6E4', marginHorizontal: 10, marginBottom: 10 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', textAlign: 'center' }}>Chọn ảnh</Text>
              </TouchableOpacity>
              <TextInput
                placeholder="ID"
                style={styles.inputAdd}
                value={formData.id}
                onChangeText={handleChangeID}
              />
              <TextInput
                placeholder="Tên bài hát"
                style={styles.inputAdd}
                value={formData.name}
                onChangeText={handleChangeName}
              />
              <TextInput
                placeholder="Ca sĩ"
                style={styles.inputAdd}
                value={formData.artist}
                onChangeText={handleChangeArtist}
              />
              <TextInput
                placeholder="Thời lượng"
                style={styles.inputAdd}
                value={formData.duration}
                onChangeText={handleChangeDuration}
              />
              <TextInput
                placeholder="Thể loại"
                style={styles.inputAdd}
                value={formData.category}
                onChangeText={handleChangeCategory}
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
                <Text style={styles.menuOptionText}>Xóa</Text>
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
    paddingHorizontal: 100,
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