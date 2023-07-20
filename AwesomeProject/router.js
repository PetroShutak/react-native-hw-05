import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

import HomeTabs from "./screens/authScreens/Home";
import Login from "./screens/authScreens/Login";
import Register from "./screens/authScreens/Register";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <AuthStack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }
  return <HomeTabs />;
};
