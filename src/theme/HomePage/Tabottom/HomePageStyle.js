import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: "#f0f2f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
  },
  subtitle1: {
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },

  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#007bff",
  },
  navButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
  },
  dayContainer: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    width: 45,
  },
  selectedDay: {
    backgroundColor: "#007bff",
    color: "#ffffff",
    borderRadius: 8,
    paddingVertical: 10,
  },
  dayText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#495057",
  },
  dateText: {
    fontSize: 16,
    color: "#212529",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
    marginVertical: 15,
  },
  tripItem: {
    backgroundColor: "#ffffff",
    padding: 18,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#007bff",
  },
  tripText: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 16,
    color: "#868e96",
    textAlign: "center",
    marginTop: 20,
  },
  dropdownContainer: {
    width: "100%",
    marginTop: 10,
  },
  dropdown: {
    backgroundColor: "#ffffff",
    borderColor: "#d1d1d1",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropdownList: {
    backgroundColor: "#ffffff",
    borderColor: "#d1d1d1",
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 200,
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
  weekNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 10,
    backgroundColor: "#007bff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  navButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default styles;
