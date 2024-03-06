import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filler: {
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "gray",
  },
  normal: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  buttonDefault: {
    backgroundColor: "lightgray",
    color: "#000",
    borderRadius: 8,
    padding: 24,
    marginHorizontal: 12,
  },
});
