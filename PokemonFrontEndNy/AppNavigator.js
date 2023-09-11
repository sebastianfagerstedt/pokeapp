import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPresenter from "./screens/LoginPresenter";
import RegisterPresenter from "./screens/RegisterPresenter";
import PokedexPresenter from "./screens/PokedexPresenter";
import PokeDetailsPresenter from "./screens/PokeDetailsPresenter";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Pokedex" component={PokedexPresenter} />
            <Stack.Screen name="PokeDetails" component={PokeDetailsPresenter} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginPresenter} />
            <Stack.Screen name="Register" component={RegisterPresenter} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
