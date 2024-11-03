import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2230",
  },
  header: {
    backgroundColor: "#FF9000",
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleContainer: {
    backgroundColor: "#FFE0B2",
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 15,
  },
  titleText: {
    fontSize: 18,
    color: "#FF9000",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  messageText: {
    display: "flex",
    flex:1,
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 10,
  },
});

export default styles;
