import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [postName, setPostName] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [postLocationGPS, setPostLocationGPS] = useState(null);
  const [photo, setPhoto] = useState("");
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const postNameHandler = (text) => setPostName(text.trim());
  const postLocationHandler = (text) => setPostLocation(text.trim());

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "Access denied. Permission is required to access the camera."
        );
        return;
      }
    };

    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "Access denied. Permission is required to access the location."
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setPostLocationGPS(coords);
    };

    getCameraPermission();
    getLocationPermission();
  }, []);

  const isSubmitButtonDisabled = () => {
    return !photo || postName === "" || postLocation === "" ? true : false;
  };

  const onSubmitHandler = async () => {
    console.log("SENDING NEW POST =====>", postLocation);
    console.log("postLocationGPS", postLocationGPS);
    const newPost = {
      id: 2888,
      title: postName,
      image: photo,
      comments: 0,
      likes: 0,
      location: { country: postLocation, ...postLocationGPS },
    };
    console.log(newPost);
    navigation.navigate("DefaultPostScreen", {
      newPost,
    });
    clearPostMeta();
    Keyboard.dismiss();
  };

  const clearPostMeta = () => {
    setPostName("");
    setPostLocation("");
    setPhoto("");
  };

  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View>
          <View
            style={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <View>
              {photo ? (
                <View style={styles.takenPhotoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={{ height: 240, width: "100%" }}
                  />
                  <TouchableOpacity
                    style={styles.newPhotoButton}
                    onPress={() => setPhoto("")}
                  >
                    <Ionicons name="camera-reverse" size={24} color="white" />
                    <Text style={{ color: "#FFFFFF" }}>Змінити фото</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Camera ref={setCamera} style={styles.camera}>
                  <TouchableOpacity
                    style={styles.takePhotoButton}
                    onPress={takePhoto}
                  >
                    <Ionicons name="camera-sharp" size={20} color="#BDBDBD" />
                  </TouchableOpacity>
                </Camera>
              )}

              <View style={styles.formBox}>
                <TouchableOpacity>
                  <Text style={styles.loadLabel}>Завантажте фото</Text>
                </TouchableOpacity>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <TextInput
                    value={postName}
                    onChangeText={postNameHandler}
                    placeholder="Назва..."
                    placeholderTextColor="#BDBDBD"
                    style={styles.input}
                    onFocus={() => {
                      setIsKeyboardShow(true);
                    }}
                  />
                  <View>
                    <Ionicons
                      style={styles.locationIcon}
                      name="location-outline"
                      size={22}
                      color="#BDBDBD"
                    />
                    <TextInput
                      value={postLocation}
                      onChangeText={postLocationHandler}
                      placeholder="Місцевість..."
                      placeholderTextColor="#BDBDBD"
                      style={[styles.input, styles.addPlace]}
                      onFocus={() => {
                        setIsKeyboardShow(true);
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    title={"Опублікувати"}
                    onPress={onSubmitHandler}
                    accessibilityLabel="Опублікувати"
                    activeOpacity={0.8}
                    style={[
                      styles.submitButton,
                      isSubmitButtonDisabled()
                        ? styles.invalidButton
                        : styles.validButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.submitBtnText,
                        isSubmitButtonDisabled()
                          ? styles.invalidBtn
                          : styles.validBtn,
                      ]}
                    >
                      Опублікувати
                    </Text>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 55,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
  },

  backBtn: {
    position: "absolute",
    top: 55,
    left: 16,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
    marginTop: 32,
  },
  takenPhotoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 32,
  },
  takePhotoButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 50,
  },
  cameraIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  loadLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#BDBDBD",
    marginBottom: 32,
  },
  formBox: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
    fontWeight: "400",
    height: 48,
    padding: 16,
    marginBottom: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  location: {
    position: "absolute",
    left: 0,
    bottom: 15,
  },
  addPlace: {
    paddingLeft: 28,
  },
  locationIcon: {
    position: "absolute",
    top: 10,
    left: 4,
  },

  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 100,
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#F6F6F6",
  },
  validButton: {
    backgroundColor: "#FF6C00",
    color: "#FFFFFF",
  },
  invalidButton: {
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
  },
  submitBtnText: { fontFamily: "Roboto" },
  deleteWrapp: {
    height: 40,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
  newPhotoButton: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});
