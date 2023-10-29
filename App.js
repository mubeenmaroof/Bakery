import { SafeAreaView } from "react-native-safe-area-context";
import { MainNav } from "./src/navigation/appNavigator";
import 'expo-dev-client';


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainNav />
    </SafeAreaView>
  );
}
