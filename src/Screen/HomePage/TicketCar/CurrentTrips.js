import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../../../../config";
import styles from "../../../theme/HomePage/MenutabStyle/TicketCar/CompletedTrips";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const CurrentTrips = ({ tripId }) => {
  // Receive navigation prop
  const [passengers, setPassengers] = useState([]);
  const token = useSelector((state) => state.user.userInfo?.token);
  const navigation = useNavigation();
  useEffect(() => {
    if (tripId) {
      fetchPassengers();
    }
  }, [tripId]);

  const fetchPassengers = async () => {
    try {
      const response = await axios.get(
        `${config.BASE_URL}/drivers/trips/${tripId}/passengers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPassengers(response.data.passengers || []);
    } catch (error) {
      console.error(
        "Error fetching passengers:",
        error.response?.data || error.message
      );
    }
  };

  const handleCheckIn = async (bookingId) => {
    try {
      console.log(
        `Attempting check-in for tripId: ${tripId}, bookingId: ${bookingId}`
      );
      const response = await axios.put(
        `${config.BASE_URL}/drivers/${tripId}/passengers/${bookingId}/checkin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", response.data.message);

        setPassengers((prevPassengers) =>
          prevPassengers.map((passenger) =>
            passenger.bookingId === bookingId
              ? { ...passenger, isCheckedIn: true }
              : passenger
          )
        );
      } else {
        Alert.alert("Error", response.data.message || "Check-in failed.");
      }
    } catch (error) {
      console.error(
        "Error checking in passenger:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Could not check in passenger.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button at the top */}
      <View style={styles.headerow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#333" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Danh sách hành khách</Text>
      </View>
      <View style={styles.separator1}></View>

      <FlatList
        data={passengers}
        keyExtractor={(item) => item.bookingId}
        renderItem={({ item }) => (
          <View style={styles.passengerItem}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="person-circle-outline"
                size={28}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.fullName}</Text>
              <View style={styles.statusContainer}>
                <MaterialIcons name="email" size={16} color="#4A90E2" />
                <Text style={styles.email}> {item.email}</Text>
              </View>
              <View style={styles.statusContainer}>
                <MaterialIcons name="phone" size={16} color="#4A90E2" />
                <Text style={styles.phone}> {item.phoneNumber}</Text>
              </View>
              <View style={styles.statusContainer}>
                <Ionicons
                  name={item.isCheckedIn ? "checkmark-circle" : "close-circle"}
                  size={16}
                  color={item.isCheckedIn ? "#4CAF50" : "#FF3B30"}
                />
                <Text
                  style={[
                    styles.statusText,
                    item.isCheckedIn ? styles.checkedIn : styles.notCheckedIn,
                  ]}
                >
                  {item.isCheckedIn ? " Đã lên xe" : " Chưa lên xe"}
                </Text>
              </View>
            </View>
            {!item.isCheckedIn && (
              <TouchableOpacity
                style={styles.checkInButton}
                onPress={() => handleCheckIn(item.bookingId)}
              >
                <Text style={styles.checkInButtonText}>Check In</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có hành khách.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default CurrentTrips;
