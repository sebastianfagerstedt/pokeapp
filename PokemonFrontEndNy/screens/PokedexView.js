import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Button,
} from "react-native";

import Modal from "react-native-modal";

export default function PokedexView({
  data,
  isLoading,
  colors,
  errorMessage,
  errorMessageVisible,
  handleGoToDetails,
  translationHeader,
  handleDisplayError,
  scrolling,
  handleLogout,
}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../figures/pokemon_background.jpg")}
        resizeMode="cover"
        style={styles.backgroundimage}
      ></ImageBackground>

      {isLoading ? (
        <ActivityIndicator
          style={styles.loadingspinner}
          size="large"
          color="blue"
        />
      ) : (
        <Animated.ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrolling } },
              },
            ],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
        >
          <Animated.View
            style={[
              styles.headerpopup,
              {
                transform: [{ translateY: translationHeader }],
              },
            ]}
          >
            <Image
              style={styles.popupheaderimage}
              source={require("../figures/pokemon_logo.png")}
            />
            <View style={styles.signoutbox}>
              <Button onPress={handleLogout} title="Sign Out" />
            </View>
          </Animated.View>
          <View style={styles.pokedex}>
            {data.map((pokemon, index) => {
              return (
                <TouchableOpacity
                  key={pokemon.id}
                  style={[
                    styles.box,
                    {
                      backgroundColor: colors[pokemon.poketype],
                    },
                  ]}
                  onPress={() => handleGoToDetails(pokemon)}
                >
                  <Image
                    style={styles.logo}
                    source={{
                      uri: pokemon.fig,
                    }}
                  />
                  <Text style={styles.text}>{pokemon.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Modal
            isVisible={errorMessageVisible}
            transparent={true}
            onBackdropPress={handleDisplayError}
            propagateSwipe={true}
            swipeDirection={["down"]}
          >
            <View style={styles.errormessage}>
              <Text style={{ color: "red" }}>{errorMessage}</Text>
            </View>
          </Modal>
        </Animated.ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  bigheaderimage: {
    width: 150,
    height: 50,
  },
  popupheaderimage: {
    position: "absolute",
    width: "40%",
    height: "45%",
    left: "30%",
    top: "40%",
  },
  headerpopup: {
    height: 120,
    backgroundColor: "#72C5B2",
    zIndex: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  signoutbox: {
    position: "absolute",
    width: "25%",
    height: "50%",
    left: "70 %",
    top: "50%",
  },
  bigheaderbox: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  pokedex: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around" /* Distribute items evenly
                                       Start and end gaps are half the size of the space
                                       between each item */,
    gap: 10 /* add margin around entire container*/,
    padding: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  backgroundimage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.8,
  },

  box: {
    width: 160,
    height: 160,
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    color: "black",
    fontSize: 16,
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  loadingspinner: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
  },
  errormessage: { alignItems: "center", justifyContent: "center" },
});
