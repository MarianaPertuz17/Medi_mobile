import Checkbox from "expo-checkbox";
import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

const data = [
  { id: 1, txt: "Estrés", isChecked: false },
  { id: 2, txt: "Acabo de hacer/ estoy haciendo ejercicio", isChecked: false },
  { id: 3, txt: "Consumo de bebida energética (reciente)", isChecked: false },
  {
    id: 4,
    txt: "He fumado antes/durante la toma de la presión",
    isChecked: false,
  },
  { id: 5, txt: "He hablado durante la toma de la presión", isChecked: false },
  { id: 6, txt: "Otra", isChecked: false, other: true, otherCondition: "" },
];

export default function CheckBox({ ...props }) {
  const [condition, setCondition] = useState(data);
  const dispatch = useDispatch();

  const setConditions = (payload) => ({ type: "CONDITION_ARRAY", payload });

  let selected = condition.filter((condition) => condition.isChecked === true);

  useEffect(() => {
    dispatch(
      setConditions(
        condition
          .filter((condition) => condition.isChecked === true)
          .map((condition, index) => {
            if (condition.id !== 6) {
              return condition.txt;
            } else {
              return condition.txt, condition.otherCondition;
            }
          })
      )
    );
  }, [condition]);

  const handleChangeArray = (index) => {
    setCondition((previousVal) => {
      let newConditions = [...previousVal];
      newConditions[index].isChecked = !newConditions[index].isChecked;
      return newConditions;
    });
  };

  const handleChangeText = (e) => {
    setCondition((previousVal) => {
      let newConditions = [...previousVal];
      newConditions[5].otherCondition = e;
      return newConditions;
    });
  };

  return (
    <ScrollView>
      {condition.length > 0 &&
        condition.map((item, index) => {
          return (
            <View key={index} style={{ flexDirection: "row" }}>
              <Checkbox
                value={item.isChecked}
                onChange={() => {
                  handleChangeArray(index);
                }}
              />
              <Text>{item.txt}</Text>
            </View>
          );
        })}
      {selected[selected.length - 1] !== undefined &&
      selected[selected.length - 1].other > 0 ? (
        <TextInput
          style={{ height: 50, backgroundColor: "white" }}
          onChangeText={(e) => handleChangeText(e)}
          value={condition[5].otherCondition}
        />
      ) : null}
    </ScrollView>
  );
}
