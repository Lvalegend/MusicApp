import EncryptedStorage from 'react-native-encrypted-storage';

// Hàm để lấy token từ Encrypted Storage
export const getToken = async () => {
    try {
        // Lấy giá trị của token từ Encrypted Storage
        const token = await EncryptedStorage.getItem('userToken');
        
        // Kiểm tra xem token có tồn tại hay không
        if (token !== null) {
            console.log('Token đã được lấy ra thành công:', token);
            return token; // Trả về token
        } else {
            console.log('Không tìm thấy token');
            return null; // Không có token
        }
    } catch (error) {
        console.error('Lỗi khi lấy token:', error);
        return null;
    }
};
