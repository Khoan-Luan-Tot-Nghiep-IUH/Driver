import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Login from "../Screen/Home/Login";
import BusTickets from "../Screen/HomePage/Tabbotom/BusTickets";
import CurrentTrips from "../Screen/HomePage/TicketCar/CurrentTrips";
import TabNavigator from "./Tabbotom";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "../Redux/User/userSlice";

import IntroCar from "../Screen/HomePage/Info/intro";



const Stack = createStackNavigator();

const StackNavigator = () => {
  const token = useSelector((state) => state.user.userInfo?.token); // Access token from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Pass token when navigating to TabNavigator */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main">
          {(props) => <TabNavigator {...props} token={token} />}
        </Stack.Screen>
        <Stack.Screen name="intro" component={IntroCar} />
        
        {/* <Stack.Screen
          name="OperatingCar"
          component={OperatingCar}
          options={{ title: "Giới thiệu nhà xe" }}
        />
        <Stack.Screen
          name="PopularCar"
          component={PopularCar}
          options={{ title: "Lộ trình phổ biến" }}
        />
        <Stack.Screen
          name="TypeCar"
          component={TypeCar}
          options={{ title: "Văn phòng nhà xe" }}
        />
        <Stack.Screen
          name="SettingCar"
          component={SettingCar}
          options={{ title: "Quy chế hoạt động" }}
        />
        <Stack.Screen
          name="HelpCar"
          component={HelpCar}
          options={{ title: "Hỗ trợ" }}
        />
        <Stack.Screen
          name="Complant"
          component={Complant}
          options={{ title: "Góp ý" }}
        />
        <Stack.Screen
          name="ActivityRules"
          component={ActivityRules}
          options={{ title: "Quy chế hoạt động " }}
        /> */}
        <Stack.Screen name="BusTickets" component={BusTickets} />
        <Stack.Screen name="CurrentTrips" component={CurrentTrips} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
