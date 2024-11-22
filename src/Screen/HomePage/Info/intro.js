import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../../config";

const SettingCar = () => {
  const token = useSelector((state) => state.user.userInfo?.token);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [busType, setBusType] = useState("");

  const handleCreateExpense = async () => {
    if (!description || !amount || !expenseType) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      console.log(`${config.BASE_URL}/driver/expenses)`);
      const response = await axios.post(
        `${config.BASE_URL}/driver/expenses`,
        { description, amount, expenseType, busType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert(
        "Thành công",
        response.data.message || "Phiếu chi đã được tạo."
      );
      setDescription("");
      setAmount("");
      setExpenseType("");
      setBusType("");
    } catch (error) {
      console.error("Error creating expense:", error.message);
      Alert.alert("Lỗi", error.response?.data?.message || "Đã xảy ra lỗi.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo Phiếu Chi</Text>
      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Số tiền"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Loại chi phí"
        value={expenseType}
        onChangeText={setExpenseType}
      />
      <TextInput
        style={styles.input}
        placeholder="Loại xe (nếu có)"
        value={busType}
        onChangeText={setBusType}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateExpense}>
        <Text style={styles.buttonText}>Tạo Phiếu Chi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FF9000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
