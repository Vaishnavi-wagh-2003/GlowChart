import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native";

import Onboarding from "../screens/OnboardingScreen";
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import BottomTabs from "./BottomTabs";
import { UserContext } from "../context/UserContext";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user, loadingUser } = useContext(UserContext);

  if (loadingUser) {
    return <ActivityIndicator size="large" color="#B84953" style={{ flex: 1 }} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <Stack.Screen name="Main" component={BottomTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
