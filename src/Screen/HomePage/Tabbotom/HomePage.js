import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
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

  const fetchTrips = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/drivers/trips`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrips(response.data.trips);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
    }
  };
  const handleTripPress = (tripId) => {
    navigation.navigate("BusTickets", { tripId }); // use item._id in handleTripPress
  };

  return (
    <View style={styles.container}>
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

      <FlatList
        ListHeaderComponent={
          <Text style={styles.subtitle}>
            Lịch trình ngày {selectedDate.toLocaleDateString()}
          </Text>
        }
        data={trips}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tripItem}
            onPress={() => handleTripPress(item._id)}
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
            <Text style={styles.tripText}>📋 Trạng thái:</Text>
            <DropDownPicker
              open={open}
              value={item.status}
              items={statusOptions}
              setOpen={() => setOpen(!open)}
              setValue={(callback) => {
                const newStatus = callback(item.status);
                updateTripStatus(item._id, newStatus);
              }}
              setItems={setStatusOptions}
              containerStyle={[
                styles.dropdownContainer,
                { marginBottom: open ? 115 : 5 },
              ]}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownList}
              textStyle={styles.dropdownText}
              placeholder="Chọn trạng thái"
              placeholderStyle={styles.placeholderStyle}
              selectedItemContainerStyle={styles.selectedItemContainer}
              selectedItemLabelStyle={styles.selectedItemLabel}
            />
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
