import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
  backButton: {
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: 25,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 1,
    marginLeft: 30,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    flex: 1,
    color: "#FF8328",
  },
  tabBar: {
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  tabItemActive: {
    borderBottomColor: "#FF8328",
    borderBottomWidth: 2,
  },
  tabItemTitle: {
    fontSize: 16,
  },
  container: {
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 25,
  },
  progressContainer: {
    flex: 1,
    backgroundColor: "#CCCCCC",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressLoadingText: {
    fontSize: 16,
    lineHeight: 20,
    fontStyle: "italic",
  },
  progressErrorText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
  },
  progress: {
    backgroundColor: "#0084ff",
    height: 5,
  },
  sendLabelText: {
    fontWeight: "bold",
    color: "#FF8328",
  },
  textAvatar: {
    fontWeight: "normal",
  },
  leftAvatar: {
    marginRight: 0,
  },
});

export default styles;
