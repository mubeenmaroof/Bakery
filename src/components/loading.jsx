import { View, StyleSheet, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";

function Loading() {
  return (
    <View style={styles.mainCon}>
      <LottieView
        source={require("../../assets/Animation/loadingAnimation.json")}
        autoPlay
        loop
      />
    </View>
  );
}

export { Loading };

const styles = StyleSheet.create({
  mainCon: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
  },
});
