import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../../config";
import styles from "../../../theme/HomePage/Tabottom/NotificationStyle";

const Notification = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null); // Track selected trip ID
  const [issueDescription, setIssueDescription] = useState("");
  const token = useSelector((state) => state.user.userInfo?.token);

  useEffect(() => {
    fetchTrips();
  }, []);
  // Fetch trips function
  const fetchTrips = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/drivers/trips`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrips(response.data.trips);
    } catch (error) {
      console.error(
        "Error fetching trips:",
        error.response?.data || error.message
      );
    }
  };
  // Report issue function
  const reportIssue = async () => {
    if (!selectedTripId || !issueDescription.trim()) {
      Alert.alert(
        "Error",
        "Please select a trip and enter an issue description."
      );
      return;
    }

    try {
      console.log(`${config.BASE_URL}/trips/${selectedTripId}/report`)
      const response = await axios.post(
        `${config.BASE_URL}/trips/${selectedTripId}/report`,
        { issueDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        Alert.alert("Success", response.data.message);
        setIssueDescription("");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Error reporting issue:", error);
      Alert.alert(
        "Error",
        error.response?.data.message || "Failed to report the issue."
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Báo cáo sự cố chuyến đi</Text>
        {/* Display Trips */}
        <Text style={styles.label}>Chọn chuyến đi:</Text>
        <FlatList
          data={trips}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tripItem,
                selectedTripId === item._id && styles.selectedTripItem,
              ]}
              onPress={() => {
                setSelectedTripId(item._id);
                console.log("lấy Trip ID:", item._id);
              }}
            >
              <Text style={styles.tripText}>
                {item.companyId?.name} -{" "}
                {new Date(item.departureTime).toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          )}
        />
        {/* Issue Description Input */}
        <Text style={styles.label}>Mô tả sự cố:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mô tả sự cố..."
          placeholderTextColor="#B0BEC5"
          value={issueDescription}
          onChangeText={setIssueDescription}
          multiline
        />
        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={reportIssue}>
          <Text style={styles.buttonText}>Gửi báo cáo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
