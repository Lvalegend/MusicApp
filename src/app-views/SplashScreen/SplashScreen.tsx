import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

interface SplashScreenProps {
  
}

const SplashScreen: React.FC<SplashScreenProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login')
  }
  return (
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SplashScreen</Text>
      <Button
        title="Go to HomeScreen"
      
      />
    </View>
    <TouchableOpacity onPress={handleLogin}></TouchableOpacity>
    </>
  );
};

export default SplashScreen;
