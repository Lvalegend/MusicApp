import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
<<<<<<< HEAD
import { Comments, HomeScreen, Login, Popular, Register, SplashScreen, User, Downloads, Favourite, Song } from './types';
=======

import { Comments, HomeScreen, Login, Register, SplashScreen, User, Downloads, PlayList, Song, UserAfterLoginOrRegister } from './types';
>>>>>>> cb282879cda04304949c3179bb03061c0e6d785b


export interface AppRoutes{
    OriginScreen: never
    test: never
    [key: string]: never

<<<<<<< HEAD

=======
>>>>>>> cb282879cda04304949c3179bb03061c0e6d785b
}
const Stack = createNativeStackNavigator();


function AppNavigator() {
  return (
<<<<<<< HEAD
    <GestureHandlerRootView>
=======
  <GestureHandlerRootView>
>>>>>>> cb282879cda04304949c3179bb03061c0e6d785b
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Comments" component={Comments} />
        <Stack.Screen name="Song" component={Song} />
        {/* <Stack.Screen name="Popular" component={Popular} />
        <Stack.Screen name="Favourite" component={Favourite} /> */}
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Downloads" component={Downloads} />
<<<<<<< HEAD
    
=======
        <Stack.Screen name="UserAfterLoginOrRegister" component={UserAfterLoginOrRegister} />
>>>>>>> cb282879cda04304949c3179bb03061c0e6d785b




      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default AppNavigator;