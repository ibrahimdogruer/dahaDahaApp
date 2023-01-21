import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigator from "./navigators/TabNavigator";
import PromoDetailScreen from "./screens/PromoDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
          <Stack.Navigator
            initialRouteName="Tab"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Tab" component={TabNavigator} />
            <Stack.Screen name="Campaign" component={PromoDetailScreen} />
          </Stack.Navigator>
          {/* <TabNavigator /> */}
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
