import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import PostItemSimple from "../../components/PostItemSimple/PostItemSimple";
import { userPosts } from "../../components/userPosts";

const image = "../../img//user-foto.jpg";

const DefaultPhotoScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState(userPosts);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.postsContainer}>
      <View style={styles.userContainer}>
        <Image source={require(image)} style={styles.userImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItemSimple data={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  userContainer: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userInfo: {
    display: "flex",

    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  userName: {
    textAlign: "left",
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 13,
  },
  userEmail: {
    textAlign: "left",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 11,
  },
});

export default DefaultPhotoScreen;
