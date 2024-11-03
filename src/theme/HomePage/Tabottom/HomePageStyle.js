import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f2f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 20,
    textAlign: "center",
  },
  weekNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  navButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  dayContainer: {
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#e9ecef",
    width: 45,
  },
  selectedDay: {
    backgroundColor: "#007bff",
  },
  dayText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#495057",
  },
  dateText: {
    fontSize: 18,
    color: "#212529",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#343a40",
  },
  tripItem: {
    backgroundColor: "#e9ecef",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  tripText: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 16,
    color: "#868e96",
    textAlign: "center",
    marginTop: 20,
  },
  dropdownContainer: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 115,

  },
  dropdown: {
    backgroundColor: "#ffffff",
    borderColor: "#d1d1d1",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  dropdownList: {
    backgroundColor: "#ffffff",
    borderColor: "#d1d1d1",
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 550,
    elevation: 3,
    position: "absolute",
    top: 40,
    zIndex: 1000,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333333",
  },
  placeholderStyle: {
    color: "#9b9b9b",
    fontSize: 16,
  },
  selectedItemContainer: {
    backgroundColor: "#e6f7ff",
  },
  selectedItemLabel: {
    color: "#007bff",
    fontWeight: "bold",
  },
  
});

export default styles;
