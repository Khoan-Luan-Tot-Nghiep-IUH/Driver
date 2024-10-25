import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Picker,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../../config";
import styles from "../../../theme/HomePage/Tabottom/HomePageStyle";

const HomePage = ({ navigation }) => {
  const [trips, setTrips] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);
  const token = useSelector((state) => state.user.userInfo?.token);
  const [selectedStatus, setSelectedStatus] = useState("");
  useEffect(() => {
    fetchTrips();
  }, [selectedDate, weekOffset]);
const updateTripStatus = async (tripId, newStatus) => {
    try {
      const response = await axios.put(
        `${config.BASE_URL}/trips/${tripId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Cập nhật trạng thái thành công:", response.data.message);
      // Nếu cần thiết, có thể cập nhật danh sách trips trong state
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error.response?.data.message || error.message);
    }
  };
  async function fetchTrips() {
    try {
      const response = await axios.get(`${config.BASE_URL}/drivers/trips`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the header
        },
      });
      setTrips(response.data.trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  }

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startOfWeek = new Date();
  startOfWeek.setDate(
    startOfWeek.getDate() - startOfWeek.getDay() + weekOffset * 7
  );

  const datesInWeek = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const filterTripsByDate = (date) => {
    return trips.filter(
      (trip) =>
        new Date(trip.departureTime).toLocaleDateString() ===
        date.toLocaleDateString()
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}></View>
      <Text style={styles.title}>Lịch trình hàng tuần</Text>

      <View style={styles.weekNavigation}>
        <TouchableOpacity
          onPress={() => setWeekOffset(weekOffset - 1)}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>← Tuần trước</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setWeekOffset(weekOffset + 1)}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>Tuần sau →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekContainer}>
        {datesInWeek.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              date.toDateString() === selectedDate.toDateString() &&
                styles.selectedDay,
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={styles.dayText}>{daysOfWeek[date.getDay()]}</Text>
            <Text style={styles.dateText}>{date.getDate()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.subtitle}>
            Lịch trình ngày {selectedDate.toLocaleDateString()}
          </Text>
        }
        data={filterTripsByDate(selectedDate)}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tripItem}
            onPress={() =>
              navigation.navigate("TripDetails", { tripId: item._id })
            }
          >
            <Text style={styles.tripText}>
              🚗 Công ty: {item.companyId?.name}
            </Text>
            <Text style={styles.tripText}>
              📍 Xuất phát: {item.departureLocation?.name} -{" "}
              {item.arrivalLocation?.name}
            </Text>
            <Text style={styles.tripText}>
              🕒 Ngày: {new Date(item.departureTime).toLocaleDateString()}
            </Text>
            {/* <View style={styles.statusContainer}>
              <Text style={styles.tripText}>📋 Trạng thái:</Text>
              <Picker
                selectedValue={item.status}
                style={styles.picker}
                onValueChange={(value) => {
                  setSelectedStatus(value);
                  updateTripStatus(item._id, value); // Cập nhật trạng thái trên server
                }}
              >
                <Picker.Item label="Scheduled" value="Scheduled" />
                <Picker.Item label="Ongoing" value="Ongoing" />
                <Picker.Item label="Delayed" value="Delayed" />
                <Picker.Item label="Cancelled" value="Cancelled" />
                <Picker.Item label="Completed" value="Completed" />
              </Picker>
            </View> */}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Không có lịch trình cho ngày này.
          </Text>
        }
      />
    </View>
  );
};

export default HomePage;
