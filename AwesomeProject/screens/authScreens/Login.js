import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const image = "../../img/photo-bg.jpg";

const Login = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isShowPass, setIsShowPass] = useState(true);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);
  const showPassToggle = () => setIsShowPass(!isShowPass);

  const onLogin = () => {
    console.log(`User Password: ${password}, Email: ${email}`);
    setEmail("");
    setPassword("");
    navigation.navigate("Home");
  };
  const keyBoardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <ImageBackground source={require(image)} style={styles.imageBg}>
        <View style={styles.loginContainer}>
          <Text style={styles.registerTitle}>Увійти</Text>
          <View style={styles.formBox}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
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
                  style={styles.input}
                  onFocus={() => setIsKeyboardShow(true)}
                />
                <TouchableOpacity
                  title={"Показати"}
                  onPress={showPassToggle}
                  accessibilityLabel="Показати пароль"
                  style={styles.showPass}
                >
                  <Text style={[styles.showPassLabel]}>Показати</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                title={"Увійти"}
                onPress={onLogin}
                accessibilityLabel="Увійти"
                style={styles.buttonLogin}
              >
                <Text style={styles.buttonLoginLabel}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                accessibilityLabel="Зареєструватися"
                style={{
                  marginBottom: isKeyboardShow ? 16 : 144,
                }}
              >
                <Text style={styles.linkLogin}>
                  Немає акаунту? Зареєструватися
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  registerTitle: {
    fontFamily: "Roboto",
    fontSize: 30,
    marginTop: 32,
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
  buttonLogin: {
    width: "100%",
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
  },
  buttonLoginLabel: {
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  linkLogin: {
    color: "#1B4371",
    fontSize: 16,
    textDecorationLine: "underline",
    fontFamily: "Roboto",
    textAlign: "center",
  },
});

export default Login;
