import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../../config";

const SettingCar = () => {
  const token = useSelector((state) => state.user.userInfo?.token);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseType, setExpenseType] = useState(null);
  const [selectedBusType, setSelectedBusType] = useState(null);
  const [busTypes, setBusTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const expenseTypes = [
    { label: "Fuel", value: "Fuel" },
    { label: "Repair", value: "Repair" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Other", value: "Other" },
  ];

  useEffect(() => {
    const fetchBusTypes = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/bus-types/get-all`
        );
        setBusTypes(response.data.data);
      } catch (err) {
        Alert.alert("Lỗi", "Không thể tải danh sách loại xe.");
      } finally {
        setLoading(false);
      }
    };
    fetchBusTypes();
  }, []);

  const handleCreateExpense = async () => {
    if (!description || !amount || !expenseType) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      const response = await axios.post(
        `${config.BASE_URL}/driver/expenses`,
        { description, amount, expenseType, busType: selectedBusType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert(
        "Thành công",
        response.data.message || "Phiếu chi đã được tạo thành công."
      );
      setDescription("");
      setAmount("");
      setExpenseType(null);
      setSelectedBusType(null);
    } catch (error) {
      console.error("Error creating expense:", error.message);
      Alert.alert("Lỗi", error.response?.data?.message || "Đã xảy ra lỗi.");
    }
  };

  return (
    <ScrollView style={styles.container}>
    <View style={{ marginBottom: 30 }}></View>
      <Text style={styles.title}>Tạo Phiếu Chi</Text>

      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mô tả</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mô tả chi phí"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Số tiền</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số tiền"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Loại chi phí</Text>
          <RNPickerSelect
            onValueChange={(value) => setExpenseType(value)}
            items={expenseTypes}
            style={pickerSelectStyles}
            placeholder={{
              label: "Chọn loại chi phí...",
              value: null,
            }}
            value={expenseType}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Loại xe</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#3498db" />
          ) : (
            <RNPickerSelect
              onValueChange={(value) => setSelectedBusType(value)}
              items={busTypes.map((type) => ({
                label: type.name,
                value: type._id,
              }))}
              style={pickerSelectStyles}
              placeholder={{
                label: "Chọn loại xe...",
                value: null,
              }}
              value={selectedBusType}
            />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreateExpense}>
          <Text style={styles.buttonText}>Tạo Phiếu Chi</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1A202C",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#4A5568",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#EDF2F7",
  },
  button: {
    backgroundColor: "#3182CE",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#CBD5E0",
    borderRadius: 8,
    color: "#1A202C",
    backgroundColor: "#EDF2F7",
    paddingRight: 30,
  },
});
