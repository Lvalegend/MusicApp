import EncryptedStorage from 'react-native-encrypted-storage';


export const setToken = async (token: any) => {
    try {
        await EncryptedStorage.setItem('userToken', token);
        console.log('Save token successful ', "Token" + token);
    } catch (error) {
        console.error('Error while save token: ', error);
    }
};
