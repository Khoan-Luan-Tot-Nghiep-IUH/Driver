import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import Home from "../Screen/HomePage/Tabbotom/HomePage";
import Notification from "../Screen/HomePage/Tabbotom/Notification";
import Profile from "../Screen/HomePage/Tabbotom/Profile";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ token }) => {
  const navigation = useNavigation();

  // Check if token is null or undefined
  if (!token) {
    navigation.navigate("Login");
    return null; // Return null to prevent rendering the TabNavigator
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Trang chủ") iconName = "home";
          else if (route.name === "Vé xe") iconName = "bus";
          else if (route.name === "Tra cứu") iconName = "search";
          else if (route.name === "Báo cáo") iconName = "notifications";
          else if (route.name === "Thông tin") iconName = "person";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#D3D3D3",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 5,
          backgroundColor: "#007BFF",
          borderTopWidth: 0,
          height: 60,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          fontWeight: "700",
        },
        tabBarItemStyle: {
          padding: 5,
        },
        headerShown: false, // Đặt headerShown ở đây
      })}
    >
      <Tab.Screen name="Trang chủ">
        {(props) => <Home {...props} token={token} />}
      </Tab.Screen>
      {/* <Tab.Screen name="Vé xe">
        {(props) => <BusTickets {...props} token={token} />}
      </Tab.Screen> */}
      <Tab.Screen name="Báo cáo">
        {(props) => <Notification {...props} token={token} />}
      </Tab.Screen>
      <Tab.Screen name="Thông tin">
        {(props) => <Profile {...props} token={token} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5,
    backgroundColor: "#007BFF",
    borderTopWidth: 0,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});

export default TabNavigator;
