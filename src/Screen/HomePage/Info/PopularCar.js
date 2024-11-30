import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import config from "../../../../config";
import { useSelector } from "react-redux";
const PopularCar = () => {
  const [completedTripCount, setCompletedTripCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.userInfo?.token); // Access token from Redux
  useEffect(() => {
    const fetchCompletedTripCount = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/drivers/completed-trips/count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setCompletedTripCount(response.data.completedTripCount);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchCompletedTripCount();
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Số chuyến đi hoàn thành: {completedTripCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
});

export default PopularCar;
