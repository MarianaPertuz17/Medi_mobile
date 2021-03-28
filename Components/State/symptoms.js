import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

const data = [
  {
    id: 1,
    src1: require("./icon1-1.png"),
    src2: require("./empty-circle.png"),
    src3: require("./check.png"),
    txt: "Estoy bien",
    isChecked: false,
  },
  {
    id: 2,
    src1: require("./icon2-1.png"),
    src2: require("./empty-circle.png"),
    src3: require("./check.png"),
    txt: "Dolor de Cabeza",
    isChecked: false,
  },
  {
    id: 3,
    src1: require("./icon3-1.png"),
    src2: require("./empty-circle.png"),
    src3: require("./check.png"),
    txt: "Cambios en la visión (borrosa/doble)",
    isChecked: false,
  },
  {
    id: 4,
    src1: require("./icon4-1.png"),
    src2: require("./empty-circle.png"),
    src3: require("./check.png"),
    txt: "Cambios repentinos de peso",
    isChecked: false,
  },
  {
    id: 5,
    src1: require("./icon5-1.png"),
    src2: require("./empty-circle.png"),
    src3: require("./check.png"),
    txt: "Náuseas o vómitos",
    isChecked: false,
  },
  {
    id: 6,
    src1: require("./icon6-1.png"),
    src2: require("./empty-circle.png"),
    src3: require("./check.png"),
    txt: "Dolor de estómago",
    isChecked: false,
  },
  {
    id: 7,
    src1: require("./icon7-1.png"),
    src2: require("./empty-circle.png"),
    src3: require("./check.png"),
    txt: "Poca orina por vez",
    isChecked: false,
  },
];

export default function Symptoms() {
  const [symptom, setSymptom] = useState(data);
  const dispatch = useDispatch();

  const setSymptoms = (payload) => ({ type: "SYMPTOM_ARRAY", payload });

  useEffect(() => {
    dispatch(
      setSymptoms(
        symptom
          .filter((symptom) => symptom.isChecked === true)
          .map((symptom, index) => {
            return symptom.txt;
          })
      )
    );
  }, [symptom]);

  const handleChangeArray = (index) => {
    setSymptom((previousVal) => {
      let newSymptoms = [...previousVal];
      newSymptoms[index].isChecked = !newSymptoms[index].isChecked;
      return newSymptoms;
    });
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        display: "flex",
        flexDirection: "row",
        borderBottomColor: "lightgray",
        borderBottomWidth: 0.55,
      }}
    >
      {symptom.length > 0 &&
        symptom.map((symptom, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                marginLeft: 20,
                marginRight: 15,
              }}
              onPress={() => handleChangeArray(index)}
            >
              <View>
                {symptom.isChecked ? (
                  <ImageBackground
                    source={symptom.src3}
                    style={styles.checkIcon}
                  ></ImageBackground>
                ) : (
                  <ImageBackground
                    source={symptom.src2}
                    style={styles.checkIcon}
                  ></ImageBackground>
                )}
                <ImageBackground
                  source={symptom.src1}
                  style={styles.icon}
                ></ImageBackground>
              </View>

              <Text style={styles.iconText}>{symptom.txt}</Text>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 70,
    height: 70,
    overflow: "hidden",
  },

  iconCircle: {
    width: 20,
    height: 20,
    marginRight: 5,
    overflow: "hidden",
  },

  iconText: {
    fontFamily: "Roboto_400Regular",
    color: "gray",
    fontSize: 12,
    width: 70,
    textAlign: "center",
    marginBottom: 5,
  },

  touchable: {
    marginRight: 15,
    width: 70,
  },

  checkIcon: {
    width: 15,
    height: 15,
    marginBottom: 5,
    overflow: "hidden",
    alignSelf: "center",
  },
});
