import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "../../../theme/HomePage/MenutabStyle/TicketCar/CompletedTrips";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const CompletedTrips = ({  }) => {
  return (
    <View style={styles.container}>
       <Text>Danh sách hàng khách đã lên chuyến</Text>   
    </View>
  );
};

export default CompletedTrips;
