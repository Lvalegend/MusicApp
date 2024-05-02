import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Underline, iconFacebook, iconGoogle, iconMusic } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import CheckBox from '@react-native-community/checkbox';
import { setToken } from '../../secure-storage/SetToken';





interface RegisterProps {

}

const Register: React.FC<RegisterProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // validate form
    const [nameValidate, setNameValidate] = useState(false);
    const [emailValidate, setEmailValidate] = useState(false)
    const [passwordValidate, setPasswordValidate] = useState(false)

    const ValidationName = (name: any) => {
        setNameValidate(name.trim() !== '');
    };

    const ValidationEmail = (email: any) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        setEmailValidate(isValid);

    }
    const ValidationPassword = (password: any) => {
        const isValid = password.length >= 6
        setPasswordValidate(isValid);
    };
    //


    const handleLogin = () => {
        navigation.navigate('Login');
    };
    const handleResponse = async (responseData: any) => {
        const { message, redirect } = responseData;

        Alert.alert(message);
        if (redirect) {
            navigation.navigate(redirect.slice(1));
        }

    };


    const handleRegister = async () => {
        try {
            const userData = {
                name: name,
                email: email,
                password: password
            };
            const response = await axios.post('http://192.168.2.14:3000/register', userData);

            handleResponse(response.data)
            console.log('Response:', response);
            const token = response.data.token;

            // Lưu token vào Encrypted Storage
            await setToken(token);
            // console.log('Token đã được lưu trữ thành công!');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred. Please try again later.');
        }
    };

    return (
        <Container colors={['#4c669f', 'red', '#192f6a']} >
            <Header />
            <Content>
                <View style={styles.container}>
                    <SvgXml xml={iconMusic()} />
                    <Text style={[{ fontSize: 20, fontWeight: '600', marginVertical: 10, textAlign: 'center', color: '#0A777D' }]}>
                        Chào mừng đến với {'\n'} Music 60T
                    </Text>
                    <Text style={[styles.textColor, { fontSize: 28, fontWeight: '800' }]}>Create your account</Text>

                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Text style={[styles.textColor, { alignSelf: 'flex-start', marginBottom: 10 }]}>Name</Text>
                        {!nameValidate && name !== '' && <Text style={{ color: 'red', marginBottom: 10 }}>Invalid Name</Text>}
                        <TextInput
                            placeholder='Enter your name'
                            style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 10 }}
                            value={name}
                            onChangeText={text => { setName(text); ValidationName(text) }}
                        />
                    </View>

                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Text style={[styles.textColor, { alignSelf: 'flex-start', marginBottom: 5 }]}>Email</Text>
                        {!emailValidate && email !== '' && <Text style={{ color: 'red', marginBottom: 10 }}>Invalid Email</Text>}
                        <TextInput
                            placeholder='Enter your email'
                            style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 10 }}
                            value={email}
                            onChangeText={text => { setEmail(text); ValidationEmail(text) }}
                        />
                    </View>

                    <View style={{ width: '100%', marginTop: 15 }}>
                        <Text style={[styles.textColor, { alignSelf: 'flex-start', marginBottom: 5 }]}>Password</Text>
                        {!passwordValidate && password !== '' && <Text style={{ color: 'red', marginBottom: 10 }}>Password must have at least 6 characters</Text>}
                        <TextInput
                            placeholder='Enter your password'
                            style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 10 }}
                            secureTextEntry
                            value={password}
                            onChangeText={text => { setPassword(text); ValidationPassword(text) }}
                        />
                    </View>

                    <TouchableOpacity onPress={handleRegister} style={{ marginBottom: 20, width: '100%', marginTop: 30 }} disabled={!nameValidate || !emailValidate || !passwordValidate}>
                        <Text style={[styles.textColor, { padding: 15, backgroundColor: '#23D6E4', borderRadius: 105 }]}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.5 }}>
                        <SvgXml xml={Underline()} />
                        <Text style={[styles.textColor, { marginBottom: 5, marginHorizontal: 10, fontSize: 15 }]}>Or continue with</Text>
                        <SvgXml xml={Underline()} />
                    </View>

                    <TouchableOpacity style={{ marginVertical: 20, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 15 }}>
                        <SvgXml xml={iconGoogle()} />
                        <Text style={{ color: 'black', padding: 15 }}>Sign in with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginBottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 15 }}>
                        <SvgXml xml={iconFacebook()} />
                        <Text style={{ color: 'black', padding: 15 }}>Sign in with Facebook</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textColor, { fontSize: 18, marginTop: 10, marginRight: 10 }]}>Already have an account?</Text>
                        <TouchableOpacity onPress={handleLogin}>
                            <Text style={[styles.textColor, { fontSize: 18, marginTop: 10, color: '#23D6E4', fontWeight: '600' }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Content>
            <Footer />
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 780,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 25
    },
    textColor: {
        color: 'white',
        textAlign: 'center'
    }
});

export default Register;
