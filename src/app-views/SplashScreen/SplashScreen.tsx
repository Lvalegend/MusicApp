import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface SplashScreenProps {
  
}

const SplashScreen: React.FC<SplashScreenProps & { navigation: NavigationProp<any> }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SplashScreen</Text>
      <Button
        title="Go to HomeScreen"
        onPress={() => navigation.navigate('HomeScreen')}
      />
    </View>
  );
};

export default SplashScreen;
