import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F8FA",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E2A38",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginTop: 20,
    marginBottom: 10,
  },
  tripItem: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#DADCE0",
  },
  selectedTripItem: {
    backgroundColor: "#007BFF",
    borderColor: "#0056b3",
  },
  tripText: {
    color: "#495057",
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    height: 120,
    borderColor: "#DADCE0",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    fontSize: 16,
    color: "#333333",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 2,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});
