import { SafeAreaView, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import styles from "../../../theme/HomePage/Tabottom/BusTicketsStyle";
import CurrentTrips from "../../../Screen/HomePage/TicketCar/CurrentTrips";

const BusTickets = () => {
  const route = useRoute();
  const { tripId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chuyến Của Tài Xế</Text>
      </View>
      <View style={styles.content}>
        <CurrentTrips tripId={tripId} />
      </View>
    </SafeAreaView>
  );
};

export default BusTickets;
