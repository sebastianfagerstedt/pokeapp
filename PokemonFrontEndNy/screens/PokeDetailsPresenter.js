import React, { useEffect, useState, useRef } from "react";
import { Animated, Dimensions } from "react-native";

import PokeDetailsView from "./PokeDetailsView";

export default function PokeDetailsPresenter({ navigation, route }) {
  const [abilityInfo, setAbilityInfo] = useState();
  const [abilityInfoVisible, setAbilityInfoVisible] = useState(false);
  const translationBox = useRef(new Animated.Value(0)).current;
  const opacityLogo = useRef(new Animated.Value(0.0)).current; //change to opacity

  const handleAbilityInfoVisible = () => {
    setAbilityInfoVisible(!abilityInfoVisible);
  };

  const handleOpenAbilityInfo = (abilityName) => {
    route.params.pokedata.abilities.forEach((ability) => {
      if (ability.name === abilityName) {
        setAbilityInfo(ability.description);
      }
    });
    handleAbilityInfoVisible();
  };

  const handleGoBack = () => {
    navigation.navigate("Pokedex", {});
  };

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translationBox, {
        toValue: Dimensions.get("window").width * 0.2,
        delay: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityLogo, {
        toValue: 1,
        delay: 1000,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <PokeDetailsView
      data={route.params}
      abilityInfo={abilityInfo}
      handleOpenAbilityInfo={handleOpenAbilityInfo}
      handleAbilityInfoVisible={handleAbilityInfoVisible}
      abilityInfoVisible={abilityInfoVisible}
      translationBox={translationBox}
      opacityLogo={opacityLogo}
      handleGoBack={handleGoBack}
    ></PokeDetailsView>
  );
}
