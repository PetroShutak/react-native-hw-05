import React from "react";
import { View, Image, Pressable, Text } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import {
  postImage,
  postLabel,
  commentsWrapper,
  locationLabel,
  postItem,
  metaWrapper,
  socialWrapper,
  socialLabel,
} from "./PostItem.styles";

const PostItem = ({ data, navigation }) => {
  const { title, image, location, comments, likes } = data;

  return (
    <View style={postItem}>
      <Image source={image} style={postImage} />
      <Text style={postLabel}>{title}</Text>
      <View style={metaWrapper}>
        <View style={socialWrapper}>
          <View style={commentsWrapper}>
            <Pressable onPress={() => navigation.navigate("CommentsScreen")}>
              <FontAwesome name="comment" size={18} color="#FF6C00" />
            </Pressable>
            <Text style={socialLabel}>{comments}</Text>
          </View>
          <View style={socialWrapper}>
            <Pressable>
              <Ionicons name="thumbs-up-outline" size={18} color="black" />
            </Pressable>
            <Text style={socialLabel}>{likes}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Ionicons name="location-outline" size={18} color="#BDBDBD" />
          <Text style={locationLabel}>{location?.country || "невідомо"}</Text>
        </View>
      </View>
    </View>
  );
};

export default PostItem;
