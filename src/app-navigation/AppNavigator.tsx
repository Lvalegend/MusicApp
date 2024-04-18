import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Comments, HomeScreen, Login, Popular, Register, SplashScreen, User, Downloads, Favourite, PlayList, Song, SearchScreen, RankingScreen } from './types';




const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Song" screenOptions={{headerShown:false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Comments" component={Comments} />
        <Stack.Screen name="Song" component={Song} />
        <Stack.Screen name="Popular" component={Popular} />
        <Stack.Screen name="Favourite" component={Favourite} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="PlayList" component={PlayList} />
        <Stack.Screen name="Downloads" component={Downloads}/>
        <Stack.Screen name="SearchScreen" component={SearchScreen}/>
        <Stack.Screen name="RankingScreen" component={RankingScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;