import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomBar from '../GeneralComponents/BottomBarCustom';
import { Downloads, HomeScreen } from '../../app-navigation/types';
import FavouriteScreen from '../FavouriteScreen/FavouriteScreen';
import PopularScreen from '../PopularScreen/PopularScreen';
import UserScreen from '../UserScreen/UserScreen';
import BottomBarCustom from '../GeneralComponents/BottomBarCustom';



//...

const Tab = createBottomTabNavigator();

const AppTabView = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={() =><BottomBarCustom />} >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Popular" component={PopularScreen} />
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Download" component={Downloads} />
        <Tab.Screen name="User" component={UserScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppTabView;
