import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { useEffect, useState } from "react";
import Homepage from "./assets/Pages/Homepage";
import Coindetail from "./assets/Pages/Coindetail";
import { Provider } from "react-redux";
import { store } from "./slice/store";
import { createStore } from "redux/dist/redux";
import BottomTabNavigator from "./componenets/BottomTabNavigator";
import Assets from "./assets/Pages/assest";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="root"
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal",
          }}
        >
          <Stack.Screen
            name="root"
            options={{ headerShown: false }}
            component={BottomTabNavigator}
          ></Stack.Screen>

          <Stack.Screen
            name="coinDetails"
            options={{ headerShown: false }}
            component={Coindetail}
          ></Stack.Screen>
          <Stack.Screen
            name="assets"
            options={{ headerShown: false }}
            component={Assets}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
