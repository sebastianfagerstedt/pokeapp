import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";

import Modal from "react-native-modal";

export default function PokeDetailsView({
  data,
  abilityInfo,
  handleOpenAbilityInfo,
  handleAbilityInfoVisible,
  abilityInfoVisible,
  translationBox,
  opacityLogo,
  handleGoBack,
}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../figures/pokemon_background.jpg")}
        resizeMode="cover"
        style={styles.backgroundimage}
      ></ImageBackground>
      <View style={styles.header}>
        <View style={styles.backbox}>
          <Button onPress={handleGoBack} title="Back to Pokedex" />
        </View>
        <Image
          style={styles.headerimage}
          source={require("../figures/pokemon_logo.png")}
        />
      </View>
      <View style={styles.screen}>
        <Animated.View
          style={[
            styles.displaybox,
            {
              backgroundColor: data.color,
              transform: [{ translateX: translationBox }],
              opacity: translationBox.interpolate({
                inputRange: [0, 25, 50],
                outputRange: [0, 0.4, 0.8],
              }),
            },
          ]}
        >
          <Animated.Image
            style={[
              styles.logo,
              {
                opacity: opacityLogo,
              },
            ]}
            source={{
              uri: data.pokedata.fig,
            }}
          />
          <Text style={styles.titletext}>{data.pokedata.name}</Text>
        </Animated.View>
        <View style={styles.infobox}>
          <Text style={styles.infotext}>
            Type: {data.pokedata.poketype} {"\n"}
            Height: {data.pokedata.height}
          </Text>
          <View style={styles.abilitiesRow}>
            <Text style={styles.infotext}>Abilities: </Text>
            <View style={styles.abilities}>
              {data.pokedata.abilities.map((abilities, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleOpenAbilityInfo(abilities.name)}
                  >
                    <View
                      style={[
                        styles.abilitybox,
                        { backgroundColor: data.color },
                      ]}
                    >
                      <Text style={styles.abilityNameText}>
                        {abilities.name} {"\t"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <Image
            style={styles.gif}
            source={{
              uri: data.pokedata.gif,
            }}
          />
        </View>
        <Modal
          isVisible={abilityInfoVisible}
          transparent={true}
          onBackdropPress={handleAbilityInfoVisible}
          propagateSwipe={true}
          swipeDirection={["down"]}
        >
          <View style={styles.abilityinfo}>
            <Button title="close" onPress={handleAbilityInfoVisible} />
            <ScrollView>
              <Text style={styles.abilityInfoText}>{abilityInfo}</Text>
            </ScrollView>
          </View>
        </Modal>
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
    // alignItems: "center",
    // justifyContent: "center",
  },
  displaybox: {
    width: "60%",
    aspectRatio: 1,
    alignItems: "center",
    borderRadius: 360,
    marginBottom: 20,
    marginTop: 10,
  },
  logo: {
    width: "80%",
    aspectRatio: 1,
  },
  titletext: {
    color: "black",
    fontSize: 24,
    lineHeight: 40,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  infobox: {
    borderRadius: 20,
    backgroundColor: "white",
    padding: 10,
    width: "90%",
    left: "5%",
  },
  infotext: {
    color: "black",
    fontSize: 16,
    lineHeight: 40,
    fontWeight: "bold",
    marginLeft: 20,
  },
  abilitiesRow: {
    flexDirection: "row",
    gap: 10,
  },
  abilities: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  abilitybox: {
    borderRadius: 10,
  },
  abilityNameText: {
    color: "black",
    fontSize: 16,
    lineHeight: 20,
    margin: 10,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  gif: {
    left: "40%",
    width: "20%",
    aspectRatio: 1,
    marginTop: 10,
  },
  abilityinfo: {
    flex: 1,
    left: "20%",
    right: "20%",
    position: "absolute",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  abilityInfoText: {
    color: "black",
    fontSize: 12,
    lineHeight: 20,
    margin: 15,
  },
  loadingspinner: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
  },
});
