import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import config from "../../../../config";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Hook for navigation
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for back icon

const PopularCar = () => {
  const [completedTripCount, setCompletedTripCount] = useState(null);
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [loadingSalaries, setLoadingSalaries] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.userInfo?.token); // Access token from Redux
  const navigation = useNavigation(); // Use navigation hook to handle navigation

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
        if (response.data.success) {
          setCompletedTripCount(response.data.completedTripCount);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Lỗi khi lấy dữ liệu chuyến đi");
      } finally {
        setLoadingTrips(false);
      }
    };

    const fetchSalaryRecords = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/driver/salary-records`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setSalaryRecords(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Lỗi khi lấy bảng lương");
      } finally {
        setLoadingSalaries(false);
      }
    };

    fetchCompletedTripCount();
    fetchSalaryRecords();
  }, [token]);

  const handleConfirmSalary = async (salaryRecordId) => {
    try {
      const response = await axios.put(
        `${config.BASE_URL}/driver/salary-records/${salaryRecordId}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        // Update the salaryRecords state with the confirmed status
        setSalaryRecords((prevRecords) =>
          prevRecords.map((record) =>
            record._id === salaryRecordId
              ? { ...record, confirm: true }
              : record
          )
        );
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Lỗi khi xác nhận bảng lương");
    }
  };

  if (loadingTrips || loadingSalaries) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Icon */}
      <View style={{ height: 27 }}></View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-circle" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin lương</Text>
      </View>

      {/* <Image
        style={styles.image}
        source={{
          uri: "https://via.placeholder.com/600x200.png?text=Popular+Car",
        }}
      /> */}

      <Text style={styles.title}>
        Số chuyến đi hoàn thành: {completedTripCount}
      </Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <Text style={styles.subtitle}>Bảng lương của bạn:</Text>

      {salaryRecords.length > 0 ? (
        <FlatList
          data={salaryRecords}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.salaryCard}>
              <Text style={styles.salaryText}>
                Ngày bắt đầu: {new Date(item.startDate).toLocaleDateString()}
              </Text>
              <Text style={styles.salaryText}>
                Ngày kết thúc: {new Date(item.endDate).toLocaleDateString()}
              </Text>
              <Text style={styles.salaryText}>
                Lương cơ bản: {item.baseSalary.toLocaleString()} VND
              </Text>
              <Text style={styles.salaryText}>
                Thưởng: {item.bonuses.toLocaleString()} VND
              </Text>
              <Text style={styles.salaryText}>
                Mức lương tổng: {item.totalSalary.toLocaleString()} VND
              </Text>
              <Text style={styles.salaryText}>
                Trạng thái: {item.confirm ? "Đã xác nhận" : "Chưa xác nhận"}
              </Text>
              {!item.confirm && (
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => handleConfirmSalary(item._id)}
                >
                  <Text style={styles.confirmButtonText}>Xác nhận</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>Chưa có bảng lương</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f3f6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginVertical: 10,
  },
  salaryCard: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  salaryText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PopularCar;
