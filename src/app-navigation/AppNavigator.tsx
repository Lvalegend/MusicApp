import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Comments, HomeScreen, Login, Register, SplashScreen, User, Downloads, UserAfterLoginOrRegister, ManageScreen, ManageCateScreen, ManageSongScreen, ManageUserScreen, ManageCountScreen, ManagePlaylistScreen, ManageInformScreen, ArtistInf, Favourite, RankingScreen } from './types';
import Manager from '../app-views/UserScreen/Manager';


export interface AppRoutes {
  OriginScreen: never
  test: never
  [key: string]: never
}
const Stack = createNativeStackNavigator();


function AppNavigator() {
  return (
    <GestureHandlerRootView>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Comments" component={Comments} />
          {/* <Stack.Screen name="Popular" component={Popular} /> */}
          <Stack.Screen name="Favourite" component={Favourite} />

      
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Downloads" component={Downloads} />
          <Stack.Screen name="ManageScreen" component={ManageScreen} />
          <Stack.Screen name="Manager" component={Manager} />
          <Stack.Screen name="RankingScreen" component={RankingScreen} />

          





          <Stack.Screen name="ManageCateScreen" component={ManageCateScreen} />
          <Stack.Screen name="ManageSongScreen" component={ManageSongScreen} />
          <Stack.Screen name="ManageUserScreen" component={ManageUserScreen} />
          <Stack.Screen name="ManageCountScreen" component={ManageCountScreen} />
          <Stack.Screen name="ManagePlaylistScreen" component={ManagePlaylistScreen} />
          <Stack.Screen name="ManageInformScreen" component={ManageInformScreen} />
          <Stack.Screen name="UserAfterLoginOrRegister" component={UserAfterLoginOrRegister} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default AppNavigator;