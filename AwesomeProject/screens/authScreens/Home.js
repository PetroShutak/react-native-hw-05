import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileScreen from "../mainScreens/ProfileScreen";
import CreatePostsScreen from "../mainScreens/CreatePostsScreen";
import PostsScreen from "../mainScreens/PostsScreen";

const MainBottomTabs = createBottomTabNavigator();

const HomeTabs = ({ navigation }) => {
  return (
    <MainBottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size = 24 }) => {
          let iconName;

          switch (route.name) {
            case "Posts":
              iconName = focused ? "grid" : "grid-outline";
              break;

            case "Create":
              iconName = focused ? "add-outline" : "add";
              break;

            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "grid";
              break;
          }

          return (
            <View
              style={{
                ...styles.tarBarElement,
                backgroundColor: focused ? "#FF6C00" : "transparent",
              }}
            >
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
      })}
    >
      <MainBottomTabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerStyle,

          headerTitleStyle,
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              title="Info"
              color="#fff"
              style={{ marginRight: 16 }}
            >
              <Ionicons name="ios-exit-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <MainBottomTabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleStyle,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Posts")}
              title="Info"
              color="#fff"
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <MainBottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </MainBottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tarBarElement: {
    color: "white",
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

const headerStyle = {
  backgroundColor: "#fff",
  borderBottomWidth: 1,
  borderBottomColor: "rgba(0, 0, 0, 0.3)",
};

const headerTitleStyle = {
  fontWeight: "500",
  fontSize: 17,
};

const tabBarStyle = {
  height: 83,
  paddingBottom: 32,
  paddingTop: 8,
  paddingLeft: 80,
  paddingRight: 80,
  borderTopWidth: 1,
  borderTopColor: "rgba(0, 0, 0, 0.3)",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

export default HomeTabs;
