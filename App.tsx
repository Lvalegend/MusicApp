// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { SvgXml } from 'react-native-svg';

// import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Downloads, HomeScreen } from './src/app-navigation/types';
// import FavouriteScreen from './src/app-views/FavouriteScreen/FavouriteScreen';
// import PopularScreen from './src/app-views/PopularScreen/PopularScreen';
// import UserScreen from './src/app-views/UserScreen/UserScreen';
// import { iconDownload, iconFavourite, iconHome, iconPopular, iconUser } from './src/app-uikits/icon-svg';



// const BottomBarCustom: React.FC<any> = ({ state, descriptors, navigation }) => {
//   return (
//     <View style={styles.container}>
//       {state.routes.map((route: any, index: any) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//               ? options.title
//               : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         // Chọn biểu tượng dựa trên tên route
//         let icon;
//         if (route.name === 'Home') {
//           icon = iconHome();
//         } else if (route.name === 'Popular') {
//           icon = iconPopular();
//         } else if (route.name === 'Favourite') {
//           icon = iconFavourite();
//         } else if (route.name === 'Download') {
//           icon = iconDownload();
//         } else {
//           icon = iconUser();
//         }

//         return (
//           <TouchableOpacity key={index} onPress={onPress} style={styles.touch}>
//             <SvgXml xml={icon} />
//             <Text style={styles.text}>{label}</Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginHorizontal:10,
   




//     backgroundColor: 'black',
   


//   },
//   text: {
//     color: 'white',
//     marginTop: 5
//   },
//   touch: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop:10,
//     marginHorizontal:15
//   }
// });

// const Tab = createBottomTabNavigator();
// const CustomTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     background: 'tranparent', // Đặt màu nền của NavigationContainer
//   },
// };

// const App = () => {
//   return (
//     <NavigationContainer theme={CustomTheme}>
//       <Tab.Navigator
//         tabBar={props => <BottomBarCustom {...props} />}
        
//         screenOptions={{ 
//           headerShown: false,
//           tabBarBackground: () => (
//             <View style={{ backgroundColor: 'red'}} />
//           )
          
//           }}>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Popular" component={PopularScreen} />
//         <Tab.Screen name="Favourite" component={FavouriteScreen} />
//         <Tab.Screen name="Download" component={Downloads} />
//         <Tab.Screen name="User" component={UserScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
