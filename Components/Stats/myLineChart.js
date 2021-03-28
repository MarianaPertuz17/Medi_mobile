import React, { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import "chart.js";
import { AppLoading } from "expo";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  BottomNavigation,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

function MyLineChart() {
  const [labels, setLabels] = useState(null);
  const [weight, setWeight] = useState([]);
  const userToken = useSelector((state) => state.userInfo.token);
  const [userData, setUserData] = useState(null);
  const [currentUserWeightChartData, setCurrentUserWeightChartData] = useState(
    null
  );

  const getUserInfo = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          "x-auth-token": userToken,
        },
      };
      const res = await axios.get("http://192.168.1.29:3001/userapps/", config);
      setUserData(res.data);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userData) {
      console.log(userData, "userDataLine");

      const labelsWeight = userData.user.historicWeight.map(
        (weightObject, index) => {
          const completeWeightDateString = weightObject.date;
          const formattedWeightDateString = completeWeightDateString.substring(
            0,
            completeWeightDateString.indexOf("T")
          );

          return formattedWeightDateString;
        }
      );

      const valuesWeight = userData.user.historicWeight.map(
        (weightObject, index) => {
          const weight = parseFloat(weightObject.weight);
          console.log(weight, "weight1");
          return weight;
        }
      );

      console.log(valuesWeight, "los valores reales");

      if (valuesWeight !== "undefined" && labelsWeight[0] !== null) {
        console.log("aja ya no es undefined");
        setCurrentUserWeightChartData(valuesWeight);
        console.log(currentUserWeightChartData, "los valores falsos");
        setLabels(labelsWeight);
      }

      console.log(labelsWeight, "labels1");
    }
  }, [userData]);

  useEffect(() => {
    if (currentUserWeightChartData) {
      console.log(currentUserWeightChartData, "labelsWeight");
    }
  }, [currentUserWeightChartData]);
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Actions.pop("stats")}>
          <ImageBackground
            source={require("./leftarrow.png")}
            style={{
              width: 25,
              height: 25,
              overflow: "hidden",
            }}
          ></ImageBackground>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Roboto_400Regular",
            marginLeft: 15,
            fontSize: 20,
            color: "#0A4C66",
          }}
        >
          Peso
        </Text>
      </View>
      {currentUserWeightChartData &&
        labels &&
        currentUserWeightChartData.length > 0 &&
        labels.length > 0 && (
          <LineChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: currentUserWeightChartData,
                },
              ],
            }}
            width={Dimensions.get("window").width - 16} // from react-native
            height={220}
            yAxisLabel={"$"}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
              propsForBackgroundLines: {
                strokeDasharray: "", // solid background lines with no dashes
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )}
    </>
  );
}

export default MyLineChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    alignContent: "center",
    padding: 10,
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    paddingLeft: 15,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});
