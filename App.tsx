import React from 'react';
import { View } from 'react-native';
import Header from './src/app-layout/Header';
import { Text } from 'react-native';
import Content from './src/app-layout/Content';
import Footer from './src/app-layout/Footer';
import { Image } from 'react-native';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <View>
          <Text style={{}}>jfuisdhjjkgvnjksdnfkhsjadfhjkdshnj</Text>
        </View>
      </Header>
      <Content>
        <View>
          <Text style={{}}>jfuisdhjjkgvnjksdnfkhsjadfhjkdshnj</Text>
          {/* <Image source={require('./src/assets/images/avatar_trắng.jpg')} /> */}
        </View>
      </Content>
      <Footer>
        <View>
          <Text style={{}}>jfuisdhjjkgvnjksdnfkhsjadfhjkdshnj</Text>
        </View>
      </Footer>

    </View>
  );
};

export default App;
