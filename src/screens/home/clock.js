import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight
} from "react-native";
import { Row, Column, Header, Button, ButtonText } from "../../components";
import moment from "moment";

class Clock extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);

    this.state = {
      initialPosition: ""
    };

    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  render() {
    const append = val => () => this.append(val);
    const { startTime, endTime, endMessage, startMessage } = this.props.data;
    const hasStarted = moment(startTime) < moment();
    const hasEnded = moment(endTime) < moment();

    let time = moment(hasStarted ? endTime : startTime).diff(moment()) / 1000;
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time / 60) % 60);
    const hours = Math.floor((time / 60 / 60) % 24);
    const days = Math.floor(time / 60 / 60 / 24);

    return hasEnded ? (
      <Text>{endMessage}</Text>
    ) : (
      <View>
        <Text>
          {days ? `${days} days ` : ""}
          {hours ? `${hours} hours ` : ""}
          {minutes ? `${minutes} minutes ` : ""}
          {hasStarted ? "until hunt ends." : "until hunt begins."}
        </Text>
        <Text />
        {!hasStarted && <Text>{startMessage}</Text>}
      </View>
    );
  }
}

export default Clock;
