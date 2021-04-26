import React, { useContext, useEffect, useState } from "react";
import { GiftedChat, Send, Avatar, Text } from "react-native-gifted-chat";
import moment from "moment";
import "moment/locale/es";
import styles from "./styles";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { useSelector, useDispatch } from "react-redux";

export default function CustomChat(props) {
  // const { user, child } = useContext(StateContext);
  const userInfo = useSelector((state) => state);
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userInfo.token);
  const [doctorData, setDoctorData] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const { chatReference } = props;
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    chatReference.on("value", (e) => {
      if (e.val()) {
        const _messages = [];
        Object.keys(e.val())
          .sort((a, b) => e.val()[a].date < e.val()[b].date)
          .map((key) => {
            switch (e.val()[key].media_type) {
              case 1:
                _messages.push({
                  _id: key,
                  audio: e.val()[key].media_uri,
                  createdAt: moment(
                    e.val()[key].date,
                    "YYYY-MM-DD HH:mm:ss"
                  ).toDate(),
                  user: {
                    _id: e.val()[key].userId,
                    name: e.val()[key].name,
                  },
                });
                break;
              default:
                _messages.push({
                  _id: key,
                  text: e.val()[key].message,
                  createdAt: moment(
                    e.val()[key].date,
                    "YYYY-MM-DD HH:mm:ss"
                  ).toDate(),
                  user: {
                    _id: e.val()[key].userId,
                    name: e.val()[key].name,
                  },
                });
                break;
            }
          });
        setMessages(GiftedChat.append([], _messages));
      }
    });
    return () => {
      chatReference.off();
    };
  }, []);

  const onSend = (_messages) => {
    for (let i = 0; i < _messages.length; i += 1) {
      const {
        createdAt,
        text,
        user: { _id, name },
      } = _messages[i];
      const message = {
        date: moment(createdAt).format("YYYY-MM-DD HH:mm:ss"),
        media_type: 0,
        message: text,
        name,
        read: false,
        userId: _id,
      };
      chatReference.push(message);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: patientData.id,
        name: `${patientData.name} ${patientData.lastName}`,
      }}
      placeholder="Escribe un mensaje..."
      renderUsernameOnMessage
      alwaysShowSend
      isKeyboardInternallyHandled
      locale="es"
      dateFormat="DD MMMM YYYY"
      timeFormat="hh:mm A"
      renderSend={(p) => (
        <Send {...p} label="Enviar" textStyle={styles.sendLabelText} />
      )}
      renderAvatar={(p) => (
        <Avatar
          {...p}
          textStyle={styles.textAvatar}
          containerStyle={{ left: styles.leftAvatar }}
        />
      )}
    />
  );
}
