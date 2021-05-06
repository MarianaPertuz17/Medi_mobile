import React, { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import moment from "moment";
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
import DateTimePicker from "@react-native-community/datetimepicker";

function MyLineChart2() {
  const [labels, setLabels] = useState(null);
  const [weight, setWeight] = useState([]);
  const userToken = useSelector((state) => state.userInfo.token);
  const [userData, setUserData] = useState(null);
  const [
    currentUserSystolicChartData,
    setCurrentUserSystolicChartData,
  ] = useState(null);
  const [
    currentUserDiastolicChartData,
    setCurrentUserDiastolicChartData,
  ] = useState(null);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);

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
    if (
      startDate &&
      endDate &&
      userData.user !== undefined &&
      userData.length > 0
    ) {
      console.log(userData, "la data");
      // console.log(startDate, "inciio");
      const length = userData.user.historicPressure.length;
      const lastMonth = userData.user.historicPressure[length - 1].date.split(
        "-"
      )[1];

      const labelsPressure = userData.user.historicPressure
        .map((pressureObject, index) => {
          const completePressureDateString = pressureObject.date;

          // console.log(formattedStartDate, "format");
          const systolicPressure = parseFloat(pressureObject.diastolicPressure);
          const diastolicPressure = parseFloat(pressureObject.systolicPressure);

          const array = {
            date: completePressureDateString,
            systolic: systolicPressure,
            diastolic: diastolicPressure,
          };
          // console.log(array, "elarray");
          // for month graph
          return array;
        })
        .filter((e) => {
          if (
            new Date(e.date) >= new Date(startDate) &&
            new Date(e.date) <= new Date(endDate)
          ) {
            return true;
          }
        })
        .map((pressureObject, index) => {
          const object =
            pressureObject.date.split("-")[2].split("T")[0] +
            "/" +
            pressureObject.date.split("-")[1];
          return object;
        });

      const valuesSystolic = userData.user.historicPressure
        .map((pressureObject, index) => {
          const completePressureDateString = pressureObject.date;

          const systolicPressure = parseFloat(pressureObject.diastolicPressure);
          const diastolicPressure = parseFloat(pressureObject.systolicPressure);

          const array = {
            date: completePressureDateString,
            systolic: systolicPressure,
            diastolic: diastolicPressure,
          };

          // for month graph
          return array;
        })
        .filter((e) => {
          if (
            new Date(e.date) >= new Date(startDate) &&
            new Date(e.date) <= new Date(endDate)
          ) {
            return true;
          }
        })
        .map((systolicPressureObject, index) => {
          return systolicPressureObject.systolic;
        });

      const valuesDiastolic = userData.user.historicPressure
        .map((pressureObject, index) => {
          const completePressureDateString = pressureObject.date;

          const systolicPressure = parseFloat(pressureObject.diastolicPressure);
          const diastolicPressure = parseFloat(pressureObject.systolicPressure);

          const array = {
            date: completePressureDateString,
            systolic: systolicPressure,
            diastolic: diastolicPressure,
          };

          // for month graph
          return array;
        })
        .filter((e) => {
          if (
            new Date(e.date) >= new Date(startDate) &&
            new Date(e.date) <= new Date(endDate)
          ) {
            return true;
          }
        })
        .map((diastolicPressureObject, index) => {
          return diastolicPressureObject.diastolic;
        });

      if (
        labelsPressure[0] !== null &&
        valuesDiastolic[0] !== null &&
        valuesSystolic[0] !== null
      ) {
        setCurrentUserSystolicChartData(valuesDiastolic);
        setCurrentUserDiastolicChartData(valuesSystolic);
        setLabels(labelsPressure); //x label
        setStartYear(
          new Date(startDate).toString().split(" ")[1] +
            " " +
            new Date(startDate).toString().split(" ")[2] +
            " " +
            new Date(startDate).toString().split(" ")[3]
        );

        setEndYear(
          new Date(endDate).toString().split(" ")[1] +
            " " +
            new Date(endDate).toString().split(" ")[2] +
            " " +
            new Date(endDate).toString().split(" ")[3]
        );
      }
    }
  }, [userData, startDate, endDate]);

  const showDatepicker1 = () => {
    showModeStart("date");
  };

  const showDatepicker2 = () => {
    showModeEnd("date");
  };

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowStart(false);

    const d = new Date(currentDate);
    d.setHours(d.getHours() - 24);

    setStartDate(d);

    console.log(startDate, "la fecaha de START");
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowEnd(false);
    const d = new Date(currentDate);
    d.setHours(d.getHours() - 24);

    setEndDate(d);
    console.log(currentDate, "la fecha de END");
  };

  const showModeStart = (currentMode) => {
    setShowStart(true);
    setMode(currentMode);
  };

  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setMode(currentMode);
  };

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
          Presión
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          height: Dimensions.get("window").height - 100,
        }}
      >
        <View
          style={{
            marginBottom: 10,
            display: "flex",
            flexDirection: "row",
            width: Dimensions.get("window").width - 100,
            alignSelf: "center",
            justifyContent: "space-between",
            marginTop: 50,
          }}
        >
          <TouchableOpacity onPress={showDatepicker1} style={styles.buttonDate}>
            <Text
              style={{
                color: "#6a9fb4",
                fontFamily: "Roboto_400Regular",
                fontSize: 15,
                alignSelf: "center",
              }}
            >
              Elegir fecha inicial
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={showDatepicker2} style={styles.buttonDate}>
            <Text
              style={{
                color: "#6a9fb4",
                fontFamily: "Roboto_400Regular",
                fontSize: 15,
                alignSelf: "center",
              }}
            >
              Elegir fecha final
            </Text>
          </TouchableOpacity>
        </View>
        {startYear && endYear && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignSelf: "center",
              color: "gray",
              marginBottom: 15,
            }}
          >
            <Text style={{ alignSelf: "center", color: "gray" }}>
              {startYear}
            </Text>
            <Text style={{ alignSelf: "center", color: "gray" }}> - </Text>
            <Text style={{ alignSelf: "center", color: "gray" }}>
              {endYear}
            </Text>
          </View>
        )}

        {showStart && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={onChangeStart}
          />
        )}
        {showEnd && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={onChangeEnd}
          />
        )}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: 300,
            alignSelf: "center",
            justifyContent: "space-around",
          }}
        ></View>
        {currentUserSystolicChartData &&
        labels &&
        currentUserDiastolicChartData &&
        startYear &&
        endYear &&
        currentUserSystolicChartData.length > 0 &&
        labels.length > 0 &&
        currentUserDiastolicChartData.length > 0 ? (
          <LineChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: currentUserSystolicChartData,
                  strokeWidth: 2,
                  color: (opacity = 1) => `green`,
                },
                {
                  data: currentUserDiastolicChartData,
                  borderColor: "red",
                  borderWidth: 2,
                  label: "Presión Diastólica",
                  backgroundColor: "green",
                  strokeWidth: 2,

                  color: (opacity = 1) => `dodgerblue`,
                },
              ],
              legend: ["Presión Sistólica", "Presión Diastólica"],
            }}
            width={Dimensions.get("window").width - 16} // from react-native
            height={470}
            verticalLabelRotation={-50} //Degree to rotate
            xLabelsOffset={12}
            chartConfig={{
              backgroundColor: "white",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 0) => `lightgray`,
              labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
              style: {
                borderRadius: 16,
                alignContent: "center",
                justifyContent: "center",
                alignSelf: "center",
                backgroundColor: "red",
              },
              propsForDots: {
                r: "2",
                strokeWidth: "2",
                stroke: "#0A4C66",
              },
              propsForBackgroundLines: {
                strokeDasharray: "", // solid background lines with no dashes
                color: "blue",
                backgroundColor: "green",
              },
            }}
            style={{
              marginVertical: 20,
              borderRadius: 16,
              alignContent: "center",
              justifyContent: "center",
            }}
          />
        ) : (
          <Text>No se han ingresado datos aún</Text>
        )}
      </View>
    </>
  );
}

export default MyLineChart2;

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
  buttonFilter: {
    padding: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    marginBottom: 10,
  },

  buttonFilterOn: {
    padding: 5,
    borderBottomColor: "#0A4C66",
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  textButtonFilter: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "gray",
  },
  textButtonFilterOn: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#0A4C66",
  },

  buttonDate: {
    backgroundColor: "transparent",
    color: "#6a9fb4",
    borderColor: "#6a9fb4",
    borderWidth: 1.5,
    padding: 5,

    alignContent: "center",
  },
});
