import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { title } = route.params;
  const [comments, setComments] = useState("");

  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const commentsdHandler = (text) => setComments(text);
  const handlerSubmit = () => {
    console.log("comments", comments);
  };
  return (
    <ScrollView
      // nestedScrollEnabled={true}
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        width: "100%",
      }}
    >
      <Text style={postLabel}>{title}</Text>
      {/* <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostItemSimple data={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
          /> */}
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={submitComment}>
          <TextInput
            value={comments}
            onChangeText={commentsdHandler}
            placeholder="Прокоментувати"
            style={inputComments}
            onFocus={() => setIsKeyboardShow(true)}
          />
          <Pressable
            onPress={handlerSubmit}
            style={submitIcon}
            accessibilityLabel="Показати пароль"
          >
            <Ionicons name="arrow-up-circle" size={34} color="#FF6C00" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CommentsScreen;

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

export const submitComment = StyleSheet.create({
  position: "relative",
  flex: 1,
});
export const inputComments = StyleSheet.create({
  fontFamily: "Roboto",
  height: 50,
  padding: 16,
  backgroundColor: "#F6F6F6",
  borderRadius: 100,
  border: "1px solid ##E8E8E8",
  width: windowWidth - 32,
  alignSelf: "flex-end",
});
export const postLabel = StyleSheet.create({
  fontSize: 16,
  fontWeight: "500",
  marginBottom: 12,
  textAlign: "left",
  fontFamily: "Roboto",
});
export const submitIcon = StyleSheet.create({
  position: "absolute",
  top: 8,
  right: 8,
});
