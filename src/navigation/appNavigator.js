import { NavigationContainer } from "@react-navigation/native";
import { Signin } from "../screens/signin/signin";
import { Signup } from "../screens/signup/signup";
import { Home } from "../screens/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WebPage } from "../screens/webPage/webPage";
import { createDrawerNavigator } from "@react-navigation/drawer";

const screenMain = "Home";
const screenWeb = "WebPage";
const Tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();
const drawer = createDrawerNavigator();

function TabNav() {
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
      <Tab.Screen name="WebPage" component={WebPage} />
    </Tab.Navigator>
  );
}

function StackNav() {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="Signin" component={Signin} />
      <stack.Screen name="Home" component={TabNav} />
      <stack.Screen name="Signup" component={Signup} />
    </stack.Navigator>
  );
}

function AppDrawer() {
  return (
    <drawer.Navigator>
      <drawer.Screen name="Home" component={StackNav} />
      <drawer.Screen name="WebPage" component={WebPage} />
    </drawer.Navigator>
  );
}

function MainNav() {
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  );
}

export { MainNav };
