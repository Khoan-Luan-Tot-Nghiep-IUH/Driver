import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../../config";
import styles from "../../../theme/HomePage/Tabottom/HomePageStyle";

const HomePage = ({ navigation }) => {
  const [trips, setTrips] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);
  const token = useSelector((state) => state.user.userInfo?.token);
  const [open, setOpen] = useState(false);
  const [statusOptions, setStatusOptions] = useState([
    { label: "Completed", value: "Completed" },
    { label: "Ongoing", value: "Ongoing" },
    { label: "Scheduled", value: "Scheduled" },
  ]);

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
      // Nếu cần thiết, cập nhật lại danh sách trips
      fetchTrips();
    } catch (error) {
      console.error(
        "Lỗi khi cập nhật trạng thái:",
        error.response?.data.message || error.message
      );
    }
  };

  async function fetchTrips() {
    try {
      const response = await axios.get(`${config.BASE_URL}/drivers/trips`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
          <View style={styles.tripItem}>
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
            <Text style={styles.tripText}>📋 Trạng thái:</Text>
            <DropDownPicker
              open={open}
              value={item.status}
              items={statusOptions}
              setOpen={() => setOpen(!open)} // Thay đổi trạng thái open
              setValue={(callback) => {
                const newStatus = callback(item.status);
                updateTripStatus(item._id, newStatus); // Gọi API để cập nhật trạng thái
              }}
              setItems={setStatusOptions}
              containerStyle={[
                styles.dropdownContainer,
                { marginBottom: open ? 115 : 5 }, // Điều chỉnh marginBottom dựa trên open
              ]}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownList}
              textStyle={styles.dropdownText}
              placeholder="Chọn trạng thái"
              placeholderStyle={styles.placeholderStyle}
              selectedItemContainerStyle={styles.selectedItemContainer}
              selectedItemLabelStyle={styles.selectedItemLabel}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Không có lịch trình cho ngày này.
          </Text>
        }
      />
      <Text style={styles.emptyText}>Không có lịch trình cho ngày này.</Text>
    </View>
  );
};

export default HomePage;
