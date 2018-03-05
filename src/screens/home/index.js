import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
  Button
} from "react-native";
import { Row, Column } from "../../components";
import { connect } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { compose } from "redux";

import { baseURL, getTeamCode } from "../../store/constants.js";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: ""
    };
  }

  checkin(params) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.props.checkin(position);
      },
      error => {},
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    const { auth: { data: { name } }, sites } = this.props;

    const append = val => () => this.append(val);
    return (
      <View>
        <Column
          style={{
            alignItems: "center"
          }}
        >
          <Text>{name}</Text>
          <Text>{JSON.stringify(sites)}</Text>

          <Button onPress={() => this.checkin()} title="Check In" />
          <Button
            onPress={() => this.checkin({ checkin: 1 })}
            title="Check In"
          />
        </Column>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    sites: state.sites
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkin: async data => {
      dispatch({ type: "CHECKIN_SITE", data });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
