import EncryptedStorage from 'react-native-encrypted-storage';

// Hàm để lấy token từ Encrypted Storage
export const deleteToken = async () => {
    try {
   
        await EncryptedStorage.removeItem('userToken');
        console.log("Delete Successfully");
        
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};
