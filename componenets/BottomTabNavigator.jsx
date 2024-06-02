import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "../assets/Pages/Homepage";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Profile from "../assets/Pages/profile";
import { Fontisto } from "@expo/vector-icons";
import WatchList from "../assets/Pages/watchList";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          backgroundColor: "#181818",
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Homepage}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="home" size={focused ? 26 : 24} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="profile" size={focused ? 26 : 20} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="watchlist"
        component={WatchList}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Fontisto name="favorite" size={focused ? 26 : 20} color={color} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
