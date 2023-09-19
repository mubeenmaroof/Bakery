import { ScrollView } from "react-native";
import { colors } from "../../utils/theme";

function Home() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bgColors }}
    ></ScrollView>
  );
}

export { Home };
