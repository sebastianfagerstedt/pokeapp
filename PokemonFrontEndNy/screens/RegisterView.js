import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

export default function RegisterView({
  handleRegisterUser,
  handleGoBack,
  username,
  password,
  email,
  firstname,
  lastname,
  setUsername,
  setPassword,
  setEmail,
  setFirstname,
  setLastname,
}) {
  return (
    <View styles={styles.container}>
      <ImageBackground
        source={require("../figures/pokemon_background.jpg")}
        resizeMode="cover"
        style={styles.backgroundimage}
      ></ImageBackground>
      <View style={styles.header}>
        <View style={styles.backbox}>
          <Button onPress={handleGoBack} title="Back to Login" />
        </View>
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
            placeholder="Firstname"
            onChangeText={setFirstname}
            value={firstname}
          />
        </View>
        <View style={styles.detailbox}>
          <TextInput
            style={styles.input}
            placeholder="Lastname"
            onChangeText={setLastname}
            value={lastname}
          />
        </View>
        <View style={styles.detailbox}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
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
          <TouchableOpacity
            onPress={() =>
              handleRegisterUser(username, firstname, lastname, email, password)
            }
          >
            <View style={styles.registerbox}>
              <Text style={styles.registertext}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  backbox: {
    position: "absolute",
    width: "25%",
    height: "50%",
    left: "5%",
    top: "50%",
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
    justifyContent: "center",
    alignItems: "center",
  },
  detailtext: {
    marginLeft: 20,
  },
  passwordbox: {
    backgroundColor: "white",
    height: 30,
    width: "80%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  passwordtext: {
    marginLeft: 20,
  },
  flexrowbox: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
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
    fontSize: 16,
    width: "100%",
    height: "100%",
  },
});
