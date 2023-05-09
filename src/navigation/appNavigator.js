import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Signin } from "../screens/signin/signin";
import { Signup } from "../screens/signup/signup";
import { webPage } from "../screens/webPage/webPage";

function MainNav() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="WebPage" component={webPage} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Signin" component={Signin} />
            </Stack.Navigator>
        </NavigationContainer>


    );
}

export { MainNav }