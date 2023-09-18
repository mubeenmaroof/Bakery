import { ScrollView } from "react-native";

import { colors } from "../../utils/theme";
import { Header } from "../../components/header";
import { TouchableOpacity } from "react-native";

function Home({ navigation }) {
  const goToSigiup = () => {
    navigation.navigate("Signup");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bgColors }}>
      <TouchableOpacity>
        <Header title={"Main"} onPress={goToSigiup} />
      </TouchableOpacity>
    </ScrollView>
  );
}

export { Home };
