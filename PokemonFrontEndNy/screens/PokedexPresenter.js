import React, { useEffect, useState, useRef } from "react";
import { Animated, Button } from "react-native";
import { pokedexAPI, logoutAPI, refreshTokenAPI } from "../api";
import PokedexView from "./PokedexView";
import { useSelector, useDispatch } from "react-redux";
import { clearToken, setToken } from "../slices/authSlice";
import jwtDecode from "jwt-decode";

export default function PokedexPresenter({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageVisible, setMessageVisible] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const dispatch = useDispatch();

  const scrolling = useRef(new Animated.Value(0)).current;
  const translationHeader = scrolling.interpolate({
    inputRange: [0, 400, 500],
    outputRange: [0, 400, 400],
    extrapolate: "clamp",
  });

  const [colors, setColors] = useState({
    normal: "#80DA80",
    fire: "#FFA455",
    water: "#009AD5",
    grass: "#60AF20",
    electric: "#FFD36D",
    psychic: "#551839",
    ice: "#99D7EE",
    fighting: "#AA9155",
    flying: "#80A3D5",
    poison: "#005B00",
    ground: "#805B00",
    rock: "#402D00",
    bug: "#005B00",
    ghost: "#808080",
    steel: "FFFFFF",
    dragon: "#BF0000",
    dark: "black",
    fairy: "#556D8E",
  });

  const handleLogout = async () => {
    const accessTokenData = jwtDecode(accessToken);
    const refreshTokenData = jwtDecode(refreshToken);
    const currentTime = Date.now() / 1000;
    // console.log(instance.headers.common);

    if (refreshTokenData.exp > currentTime) {
      // RefreshToken still active
      if (accessTokenData.exp > currentTime) {
        // AccessToken still active
        const result = await logoutAPI();
      } else {
        const tokenResult = await refreshTokenAPI();
        if (tokenResult) {
          dispatch(
            setToken({
              accessToken: tokenResult.data.access,
              refreshToken: tokenResult.data.refresh,
              isAuthenticated: true,
            })
          );
          const logoutResult = await logoutAPI();
        }
      }
    }
    dispatch(clearToken());
  };

  const handleDisplayError = () => {
    setMessageVisible(!errorMessageVisible);
  };

  const handleGoToDetails = (pokemonData) => {
    // navigation.navigate("PokeDetails", {
    //   pokedata: pokemonData,
    //   color: colors[pokemonData.poketype],
    // });

    // Only used for testing, no request is needed since all data already is loaded
    test = async () => {
      try {
        const response = await pokedexAPI();
        navigation.navigate("PokeDetails", {
          pokedata: pokemonData,
          color: colors[pokemonData.poketype],
        });
      } catch (error) {
        const status = error.response.status;
        if (status === 503 || status === 404) {
          setErrorMessage("Server Error");
          handleDisplayError();
        }
      }
    };
    test();
  };

  const getPokemon = async () => {
    try {
      setLoading(true);
      const response = await pokedexAPI();
      if (response) {
        const pokeAPI = await response.data;
        setData(pokeAPI);
      }
    } catch (error) {
      const status = error.response.status;
      if (status === 503 || status === 404) {
        setErrorMessage("Server Error");
        handleDisplayError();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <PokedexView
      data={data}
      isLoading={isLoading}
      colors={colors}
      errorMessage={errorMessage}
      errorMessageVisible={errorMessageVisible}
      navigation={navigation}
      handleGoToDetails={handleGoToDetails}
      translationHeader={translationHeader}
      handleDisplayError={handleDisplayError}
      scrolling={scrolling}
      handleLogout={handleLogout}
    ></PokedexView>
  );
}
