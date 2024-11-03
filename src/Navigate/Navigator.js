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
        <Stack.Screen name="BusTickets" component={BusTickets} />
        <Stack.Screen name="CurrentTrips" component={CurrentTrips} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
