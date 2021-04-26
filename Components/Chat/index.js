import React, { useContext, useState, useEffect } from "react";
import {
  View,
  TouchableHighlight,
  Dimensions,
  Keyboard,
  Text,
} from "react-native";
import { TabView } from "react-native-tab-view";
import database from "@react-native-firebase/database";
import styles from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomTabBar from "./customTabBar";
import CustomChat from "./customChat";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { useSelector, useDispatch } from "react-redux";

export default function Chat(props) {
  // const { user, child } = useContext(StateContext);
  const userInfo = useSelector((state) => state);
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userInfo.token);
  const [doctorData, setDoctorData] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const { navigation } = props;
  const [index, setIndex] = useState(0);

  const getUserInfoPatient = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          "x-auth-token": userToken,
        },
      };
      const res = await axios.get("http://3.14.73.151/userapps/", config);
      setPatientData(res.data);
      console.log(res.data, "patient");
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    // getUserInfoDoctor();
    getUserInfoPatient();
  }, []);

  const initialLayout = { width: Dimensions.get("window").width };

  const onIndexChange = (_index) => {
    Keyboard.dismiss();
    setIndex(_index);
  };

  //id del medico "605a4eb042f114041fe7ede8"

  const renderScene = ({ route }) => {
    return (
      <CustomChat
        chatReference={database()
          .ref()
          .child("Mediplus")
          .child("chat")
          .child(route.key)
          .child(patientData.user._id)}
      />
    );
  };
  console.log(patientData, "pacienteeee");
  return (
    <View {...props} noScroll>
      <View style={styles.headerContainer}>
        <TouchableHighlight
          style={styles.backButton}
          onPress={navigation.goBack}
          underlayColor={"#FF8328"}
        >
          <MaterialIcons name="keyboard-arrow-left" size={35} color={"black"} />
        </TouchableHighlight>
        <Text type="title" style={styles.title}>
          Chat
        </Text>
      </View>
      {patientData.user ? (
        <TabView
          navigationState={{
            index: index,
            routes: {
              key: patientData.user.doctorId,
              title: "Doctor",
            },
          }}
          renderScene={renderScene}
          onIndexChange={onIndexChange}
          initialLayout={initialLayout}
          style={{ backgroundColor: "white" }}
          renderTabBar={(p) => <CustomTabBar {...p} setIndex={onIndexChange} />}
        />
      ) : null}
    </View>
  );
}
