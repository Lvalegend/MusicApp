import * as React from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Underline, iconBack, iconFacebook, iconGoogle, iconMusic } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';
import axios from 'axios';
import { setToken } from '../../secure-storage/SetToken';




interface LoginProps {

}

const Login: React.FC<LoginProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false)



    // validate form
    const [emailValidate, setEmailValidate] = useState(false)
    const [passwordValidate, setPasswordValidate] = useState(false)

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

    const handleResponse = async (responseData: any) => {
        const { message, redirect } = responseData;

        Alert.alert(message);
        if (redirect) {
            navigation.navigate(redirect.slice(1));
        }
    };

    const handleLogin = async () => {
        if (emailValidate && passwordValidate) {
            try {
                const userData = {
                    email: email,
                    password: password
                };
                const response = await axios.post('http://192.168.2.14:3000/login', userData);

                handleResponse(response.data)
                console.log('Response:', response);
                const token = response.data.token;

                // Lưu token vào Encrypted Storage
                await setToken(token);
                // console.log('Token đã được lưu trữ thành công!');
            } catch (error) {
                console.error(error);
                Alert.alert('Error: ' + error);
            }
        }
        else {
            Alert.alert('Invalid Email Or Password')
        }
    };

    return (
        <>
            <Container colors={['#4c669f', 'black', '#192f6a']} >

                <Header>
                <Pressable onPress={() => navigation.goBack()}
                style = {{padding: 20}}>
                    <SvgXml xml={iconBack()} />
                </Pressable>
                </Header>

                <Content>

                    <View style={styles.container}>

                        <SvgXml xml={iconMusic()}></SvgXml>
                        <Text style={[{ fontSize: 20, fontWeight: '600', marginVertical: 10, textAlign: 'center', color: '#23D6E4' }]}>Chào mừng đến với {'\n'} Music 60T</Text>
                        <Text style={[styles.textColor, { fontSize: 28, fontWeight: '800' }]}>Sign in to your account</Text>



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


                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 45 }}>
                                <CheckBox
                                    value={toggleCheckBox}
                                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                    tintColors={{ true: 'white', false: 'white' }}
                                />
                                <Text style={[styles.textColor, { fontSize: 15 }]}>Remember me</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 15, color: '#23D6E4', marginLeft: 45, fontWeight: '500' }}>Forgot your password?</Text>
                            </TouchableOpacity>

                        </View>




                        <TouchableOpacity style={{ marginVertical: 20, width: '100%' }} onPress={handleLogin} disabled={!emailValidate || !passwordValidate}>
                            <Text style={[styles.textColor, { padding: 15, backgroundColor: '#23D6E4', borderRadius: 105 }]}>Sign In</Text>
                        </TouchableOpacity>




                        <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.5 }}>
                            <SvgXml xml={Underline()}></SvgXml>
                            <Text style={[styles.textColor, { marginBottom: 5, marginHorizontal: 10, fontSize: 15 }]}>Or continue with</Text>
                            <SvgXml xml={Underline()}></SvgXml>
                        </View>



                        <TouchableOpacity style={{ marginVertical: 20, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 15 }}>
                            <SvgXml xml={iconGoogle()}></SvgXml>
                            <Text style={{ color: 'black', padding: 15 }}>Sign in with Google</Text>
                        </TouchableOpacity>



                        <TouchableOpacity style={{ marginBottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 15 }}>
                            <SvgXml xml={iconFacebook()}></SvgXml>
                            <Text style={{ color: 'black', padding: 15 }}>Sign in with Facebook</Text>
                        </TouchableOpacity>





                    </View>

                </Content>

                <Footer>

                </Footer>

            </Container>

        </>
    );
};
const styles = StyleSheet.create({
    container: {

        height: 780,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,


    },
    textColor: {
        color: 'white',
        textAlign: 'center'
    }
})

export default Login;
