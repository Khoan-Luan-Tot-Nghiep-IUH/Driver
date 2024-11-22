import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8", // Nền sáng nhẹ
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#34495E", // Màu chủ đạo tối
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  totalAmountText: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#34495E",
  marginBottom: 10,
  textAlign: "center",
},
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#FFB74D", // Màu cam dịu
    alignSelf: "flex-start",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 8,
    fontWeight: "600",
  },
  passengerItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1E88E5", // Xanh dương đậm
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495E",
    marginBottom: 6,
  },
  email: {
    fontSize: 13,
    color: "#95A5A6",
    marginBottom: 4,
    gap: 10,
  },
  phone: {
    fontSize: 14,
    color: "#95A5A6",
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  checkedIn: {
    color: "#2ECC71", // Xanh lá
  },
  notCheckedIn: {
    color: "#E74C3C", // Đỏ
  },
  emptyText: {
    fontSize: 16,
    color: "#BDC3C7", // Xám nhạt
    textAlign: "center",
    marginTop: 30,
  },
  checkInButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  checkInButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  headerow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  separator1: {
    borderBottomWidth: 2,
    borderColor: "#FFB74D",
    marginBottom: 15,
  },
});
