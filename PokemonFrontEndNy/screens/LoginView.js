import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function LoginView({
  handleLogin,
  handleGoToRegister,
  username,
  password,
  setUsername,
  setPassword,
  errorMessage,
}) {
  return (
    <View styles={styles.container}>
      <ImageBackground
        source={require("../figures/pokemon_background.jpg")}
        resizeMode="cover"
        style={styles.backgroundimage}
      ></ImageBackground>
      <View style={styles.header}>
        <Image
          style={styles.headerimage}
          source={require("../figures/pokemon_logo.png")}
        />
      </View>
      <View style={styles.screen}>
        <View style={styles.detailbox}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
          />
        </View>
        <View style={styles.detailbox}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <View style={styles.flexrowbox}>
          <TouchableOpacity onPress={() => handleLogin()}>
            <View style={styles.loginbox}>
              <Text style={styles.logintext}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGoToRegister()}>
            <View style={styles.registerbox}>
              <Text style={styles.registertext}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
        {errorMessage !== "" && (
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundimage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.8,
  },
  header: {
    height: 120,
    backgroundColor: "#72C5B2",
    zIndex: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerimage: {
    position: "absolute",
    width: "40%",
    height: "45%",
    left: "30%",
    top: "40%",
  },
  screen: {
    height: "100%",
    rowGap: 20,
    marginTop: 100,
    alignItems: "center",
  },
  detailbox: {
    backgroundColor: "white",
    height: 30,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  usernametext: {
    marginLeft: 20,
  },
  passwordtext: {
    marginLeft: 20,
  },
  flexrowbox: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loginbox: {
    backgroundColor: "white",
    height: 50,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logintext: {
    // marginLeft: 20,
    // alignItems: "center",
  },
  registerbox: {
    backgroundColor: "white",
    height: 50,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  registertext: {
    // marginLeft: 20,
    // alignItems: "center",
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 16,
  },
});
