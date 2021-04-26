import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default class CustomTabBar extends Component {
  render() {
    return (
      <View style={styles.tabBar}>
        <TouchableOpacity
          key={shortid.generate()}
          style={[styles.tabItem, index === i && styles.tabItemActive]}
          onPress={() => this.props.setIndex(i)}
          activeOpacity={0.7}
        >
          <Text>Doctor</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
