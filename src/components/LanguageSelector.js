import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import Images from "../constants/Images";

const LanguageSelector = ({ activeLang, setActiveLang, containerStyle }) => {
  const [isShown, setIsShown] = useState(false);

  const onLanguageChange = (langRef) => {
    setActiveLang(langRef);
    setIsShown(false);
  };
  return (
    <View style={[styles.container, containerStyle]}>
      {!isShown && (
        <TouchableOpacity
          onPress={() => setIsShown(true)}
          style={styles.active_flag_container}
        >
          <Image
            source={activeLang == "tr" ? Images.turkey_flag : Images.usa_flag}
            style={styles.flag}
          />
        </TouchableOpacity>
      )}
      {isShown && (
        <Animatable.View
          animation={"bounceIn"}
          style={styles.flags_list_container}
        >
          <TouchableOpacity
            onPress={() => onLanguageChange("tr")}
            style={[
              styles._flag_container,
              activeLang == "tr" && { borderWidth: 1 },
            ]}
          >
            <Image source={Images.turkey_flag} style={styles.flag} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onLanguageChange("en")}
            style={[
              styles._flag_container,
              activeLang == "en" && { borderWidth: 1 },
            ]}
          >
            <Image source={Images.usa_flag} style={styles.flag} />
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );
};

export { LanguageSelector };

const styles = StyleSheet.create({
  flag: {
    height: 30,
    width: 30,
  },
  active_flag_container: {},
  container: {
    zIndex: 1,
  },
  flags_list_container: {
    backgroundColor: "white",
   
    borderRadius: 7,
    margin: 2,

    shadowColor: "#143450",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,

    elevation: 5,
  },
  _flag_container: {
    margin: 3,
    borderStyle: "dotted",
    padding:4,
    borderRadius: 1,
    borderRadius: 25,
    borderColor:"gray",
  },
});
