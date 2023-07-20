import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";

import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  Pressable,
  Text,
} from "react-native";

const image = "../../img/photo-bg.jpg";

const Register = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isShowPass, setIsShowPass] = useState(true);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const loginHandler = (text) => setLogin(text);
  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);
  const showPassToggle = () => {
    setIsShowPass(!isShowPass);
  };

  const onRegister = () => {
    console.log(`User login: ${login}, Password: ${password}, Email: ${email}`);
    setEmail("");
    setPassword("");
    setLogin("");
    navigation.navigate("Home");
  };

  const keyBoardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <ImageBackground source={require(image)} style={styles.imageBg}>
        <View style={styles.registerContainer}>
          <View
            style={[
              styles.avatar,
              {
                transform: [{ translateY: -50 }, { translateX: 50 }],
              },
            ]}
          >
            {/* <Pressable
              style={{
                transform: [{ translateY: 75 }, { translateX: 10 }],
              }}
            >
              <Ionicons name="add-circle-outline" size={13} color="#FF6C00" />
            </Pressable> */}
            <Pressable
              style={styles.addButton}
              onPress={() => {
                console.log("2023");
              }}
            >
              <MaterialIcons
                name="highlight-remove"
                size={24}
                color="#FF6C00"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 50,
                  transform: [{ rotate: "45deg" }],
                }}
              />
            </Pressable>
          </View>
          <Text style={styles.registerTitle}>Реєстрація</Text>

          <View style={styles.formBox}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              keyboardVerticalOffset={300}
            >
              <TextInput
                value={login}
                onChangeText={loginHandler}
                placeholder="Логін"
                style={styles.input}
                onFocus={() => setIsKeyboardShow(true)}
              />
              <TextInput
                value={email}
                onChangeText={emailHandler}
                placeholder="Адресa електронної пошти"
                style={styles.input}
                onFocus={() => setIsKeyboardShow(true)}
              />
              <View
                style={{
                  ...styles.showPasscontainer,
                  marginBottom: isKeyboardShow ? 62 : 89,
                }}
              >
                <TextInput
                  value={password}
                  onChangeText={passwordHandler}
                  placeholder="Пароль"
                  secureTextEntry={isShowPass}
                  style={[styles.inputPassword, styles.input]}
                  onFocus={() => setIsKeyboardShow(true)}
                />
                <TouchableOpacity
                  onPress={showPassToggle}
                  accessibilityLabel="Показати пароль"
                  style={styles.showPass}
                >
                  <Text style={[styles.showPassLabel]}>Показати</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
          <TouchableOpacity
            onPress={onRegister}
            accessibilityLabel="Зареєструватися"
            style={styles.buttonRegister}
          >
            <Text style={styles.buttonRegisterLabel}>Зареєструватися</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            accessibilityLabel="Зареєструватися"
            style={{
              marginBottom: isKeyboardShow ? 16 : 78,
            }}
          >
            <Text style={styles.linkRegister}>Вже маєте акаунт? Увійти</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    position: "relative",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: 0,
    right: "50%",
    borderRadius: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },

  registerTitle: {
    fontFamily: "Roboto",
    fontSize: 30,
    marginTop: 92,
    marginBottom: 32,
    fontWeight: "500",
    textAlign: "center",
  },
  formBox: {
    width: "100%",
  },
  input: {
    width: "100%",
    fontFamily: "Roboto",
    height: 48,
    padding: 16,
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    borderRadius: 8,
    border: "1px solid #E8E8E8",
  },
  showPasscontainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    backgroundColor: "#F6F6F6",
    marginBottom: 62,
    borderRadius: 8,
    border: "1px solid #E8E8E8",
    position: "relative",
  },

  showPassLabel: {
    position: "absolute",
    fontFamily: "Roboto",
    top: 12,
    right: 16,
    height: 25,
    fontSize: 16,
    color: "#1B4371",
  },

  buttonRegister: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    width: "100%",
    height: 48,
    borderRadius: 100,
    marginBottom: 16,
  },
  buttonRegisterLabel: {
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  linkRegister: {
    color: "#1B4371",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default Register;
