import { View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { colors } from "../../utils/theme";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { AddReciepy } from '../../components/addRecipy/';



function Home() {
  const [showAddRecipy, setShowAddRecipy] = useState(false);
  return (
    <View
      style={{ flex: 1 }}>

      <Toast />
      <FloatingAction
        color={colors.primary}
        onPressMain={() => { setShowAddRecipy(true) }}

      />
      <AddReciepy show={showAddRecipy}
        onClose={() => setShowAddRecipy(false)}
      />




    </View>
  );
}

export { Home };
