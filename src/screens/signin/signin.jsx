import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { BButton } from "../../components/BButton";
import { Input } from "../../components/input";
import { colors, modifiers } from "../../utils/theme";
import { Header } from "../../components/header";
import { TextButton } from "../../components/textButton";
import { firebase } from "../../services/firebaseConfig";
import { Loading } from "../../components/loading";
import { showToast } from "../../utils/help";
import Toast from "react-native-toast-message";

function Signin({ navigation }) {
  const [showPass, setShowPass] = useState(false);
  const [showloading, setShowLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleShowPass = () => {
    if (showPass === true) {
      setShowPass(false);
    } else if (showPass === false) {
      setShowPass(true);
    }
  };

  const goToSignup = () => {
    navigation.navigate("Signup");
  };

  // const goToMain = async () => {
  //     setShowLoading(true);

  //     firebase
  //         .auth().signInWithEmailAndPassword(email, password)

  //         .then((authResponce) => {
  //             setShowLoading(false);

  //             const userUid = authResponce.user.uid

  //             storeUserSession(userUid, "true")

  //             showToast("success", "You are The Authentic User", "top")
  //             navigation.navigate('Main');
  //         })
  //         .catch((authError) => {
  //             setShowLoading(false);
  //             showToast("error", authError, "top")
  //         })

  // }
  // console.log(email, password);
  const handleSignIn = async () => {
    setShowLoading(true);
    try {
      if (email.trim() === "" || password.trim() === "") {
        Alert.alert("Error", "Email and password are required.");
        return;
      }

      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("User signed in");
      setShowLoading(false);
      navigation.navigate("Home");
      showToast("success", "You are The Authentic User", "top");

    } catch (error) {
      setShowLoading(false);
      if (error.code === "auth/user-not-found") {
        Alert.alert(
          "Error",
          "User not found. Please check your email and try again."
        );
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Incorrect password. Please try again.");
      } else {
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
      console.error(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bgColors }}>
      <Header title={"Sign in"} />
      <View style={styles.formCon}>
        <Input
          placeholder={"Email"}
          showIcon={true}
          iconName={"mail-outline"}
          onChange={(text) => setEmail(text)}
        />

        <Input
          placeholder={"Password"}
          isSecure={!showPass}
          showIcon={true}
          iconName={showPass === false ? "eye-outline" : "eye-off-outline"}
          onIconPress={handleShowPass}
          onChange={(text) => setPassword(text)}
        />
        <View style={styles.textBtnCon}>
          <TextButton title={"Forgot your password?"} />
        </View>

        <BButton title="Sign in" onButtonPress={handleSignIn} />
        <View style={styles.textBtCon}>
          <TextButton title={"Create New Account?"} onPress={goToSignup} />
        </View>
      </View>
      {showloading === true && <Loading />}
      <Toast />
    </ScrollView>
  );
}

export { Signin };

const styles = StyleSheet.create({
  formCon: {
    height: 500,
    justifyContent: "center",
    paddingHorizontal: modifiers.containerPadding,
  },

  goToSignup: {
    alignItems: "center",
  },
  textBtnCon: {
    alignItems: "flex-end",
  },
  textBtCon: {
    alignItems: "center",
  },
});
