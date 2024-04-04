import * as React from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { iconGoldStar, iconMusic } from '../../app-uikits/icon-svg';
import { Container, Content, Footer, Header } from '../../app-layout/Layout';
import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';




interface LoginProps {

}

const Login: React.FC<LoginProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <>
            <Container backgroundColor={'black'}>



                <Header>

                </Header>

                <Content>

                    <View style={styles.container}>
                        <SvgXml xml={iconMusic()}></SvgXml>
                        <Text style={[{ fontSize: 20, fontWeight: '600', marginVertical: 10, textAlign: 'center', color: '#0A777D' }]}>Chào mừng đến với {'\n'} Music 60T</Text>
                        <Text style={[styles.textColor, { fontSize: 28, fontWeight: '600' }]}>Sign in to your account</Text>
                        <View style={{ width: '100%', marginVertical: 10 }}>
                            <Text style={[styles.textColor, { alignSelf: 'flex-start', marginVertical: 10 }]}>Email</Text>
                            <TextInput placeholder='Enter your email' style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 10 }}></TextInput>
                        </View>
                        <View style={{ width: '100%', marginVertical: 10 }}>
                            <Text style={[styles.textColor, { alignSelf: 'flex-start', marginVertical: 10 }]}>Password</Text>
                            <TextInput placeholder='Enter your password' style={{ backgroundColor: 'white', borderRadius: 10, paddingLeft: 10 }}></TextInput>
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

                            <Text style={{ fontSize: 15, color: '#1E94A9', marginLeft: 45 }}>Forgot your password?</Text>
                        </View>

                        <TouchableOpacity style={{ marginVertical: 20, width: '100%' }}>
                            <Text style={[styles.textColor, { padding: 15, backgroundColor: '#23D6E4', borderRadius: 105 }]}>Sign In</Text>
                        </TouchableOpacity>

                        <View>
                            <Text style={styles.textColor}>---------or continue with---------</Text>
                        </View>

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
        marginHorizontal: 20


    },
    textColor: {
        color: 'white',
        textAlign: 'center'
    }
})

export default Login;
