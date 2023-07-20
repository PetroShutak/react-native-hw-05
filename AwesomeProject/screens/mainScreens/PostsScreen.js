import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "../nestedPostScreens/DefaultScreen";
import CommentsScreen from "../nestedPostScreens/CommentsScreen";
import MapScreen from "../nestedPostScreens/MapScreen";

const NestedPostsScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  return (
    <NestedPostsScreen.Navigator initialRouteName="DefaultPostScreen">
      <NestedPostsScreen.Screen
        options={{ headerShown: false }}
        name="DefaultPostScreen"
        component={DefaultScreen}
      />
      <NestedPostsScreen.Screen
        options={{
          title: "Коментарі",
          headerTitleStyle,
          headerTitleAlign: "center",

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("DefaultPostScreen")}
              title="Назад"
              color="#fff"
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedPostsScreen.Screen
        options={{
          title: "Карта",
          headerTitleStyle,
          headerTitleAlign: "center",

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("DefaultPostScreen")}
              title="Назад"
              color="#fff"
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="Map"
        component={MapScreen}
      />
    </NestedPostsScreen.Navigator>
  );
};
const headerTitleStyle = {
  fontWeight: "500",
  fontSize: 17,
};

export default PostsScreen;
