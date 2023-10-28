import { NavigationContainer } from "@react-navigation/native";
import { Signin } from "../screens/signin/signin";
import { Signup } from "../screens/signup/signup";
import { Home } from "../screens/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WebPage } from "../screens/webPage/webPage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { firebase } from "../services/firebaseConfig";
import { showToast } from "../utils/help";
import { Settings } from "../screens/settings/settings";

const screenMain = "Home";
const screenWeb = "WebPage";
const setting = "Settings";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function WebPageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WebPage" component={WebPage} />
    </Stack.Navigator>
  );
}


function MainTabScreen() {
  return (
    <Tab.Navigator
      initialRouteName={Signin}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === screenMain) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === screenWeb) {
            iconName = focused ? "list" : "list-outline";
          } else if (rn === setting) {
            iconName = focused ? "list" : "list-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        headerShown: false,
        tabBarStyle: { height: 70, padding: 10 },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="WebPage" component={WebPageStack} />
    </Tab.Navigator>
  );
}
function CustomDrawerContent({ navigation }) {
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Successfully signed out
        showToast("success", "You are Successfully Sign out", "top");
        navigation.navigate("Signin"); // Redirect to the sign-in screen or any other desired destination
      })
      .catch((error) => {
        showToast("error", error, "top");
      });
  };
  return (
    <DrawerContentScrollView>
      {/* Add a custom Logout button */}
      <DrawerItem
        label="Sign in"
        onPress={() => navigation.navigate("Signin")}
      />

      {/* Add a custom Logout button */}
      <DrawerItem
        label="Sign up"
        onPress={() => navigation.navigate("Signup")}
      />
      <DrawerItem label="Home" onPress={() => navigation.navigate("Home")} />
      <DrawerItem
        label="WebPage"
        onPress={() => navigation.navigate("WebPage")}
      />
      <DrawerItem
        label="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
      <DrawerItem label="Log out" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
}

function MainNav() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Signin" component={Signin} />
        <Drawer.Screen name="Signup" component={Signup} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Home" component={MainTabScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export { MainNav };
