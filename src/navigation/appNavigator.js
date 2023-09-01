import { NavigationContainer } from "@react-navigation/native"
import { Signin } from "../screens/signin/signin";
import { Signup } from "../screens/signup/signup";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";


const screensignin = 'Signin';
const screenSignUp = 'Signup';



function MainNav() {


    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>

            <Tab.Navigator
                initialRouteName={screenSignUp}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === screensignin) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === screenSignUp) {
                            iconName = focused ? 'list' : 'list-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
                    headerShown: false,
                    tabBarStyle: { height: 70, padding: 10 }



                })}




            >
                <Tab.Screen name="Signin" component={Signin} />
                <Tab.Screen name="Signup" component={Signup} />

            </Tab.Navigator>
        </NavigationContainer>


    );
}

export { MainNav };

const styles = StyleSheet.create({
    navBottom: {
        height: 100,
        justifyContent: 'space-between',
        paddingBottom: 20,

    }
})