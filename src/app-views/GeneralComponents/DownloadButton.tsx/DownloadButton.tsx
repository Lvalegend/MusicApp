import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, Button, Image, TouchableOpacity, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { iconDownload } from '../../../app-uikits/icon-svg';

const DownloadButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleDownload = () => {
    console.log('Bắt đầu tải xuống');
    setModalVisible(false);
    showAlert();
  };

  const showAlert = () => {
    Alert.alert('Thông báo', 'Tải xuống hoàn thành',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <SvgXml xml={iconDownload()} style={styles.image} />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Bạn có muốn tải xuống không?</Text>
            <TouchableOpacity onPress={handleDownload} style={[ styles.downloadButton]}>
              <Text style={styles.buttonText}>Tải xuống</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(false); }} style={[ styles.cancelButton]}>
              <Text style={styles.buttonText}>Hủy bỏ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: 50,
    height: 50,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:20
  },
  downloadButton: {
    paddingHorizontal: 42,
    paddingVertical:10,
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 5,
    backgroundColor: 'blue', 
    marginBottom:3
  },
  cancelButton: {
    paddingHorizontal: 50,
    paddingVertical:10,
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 5,
    backgroundColor: '#ff5c5c', 
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default DownloadButton;
