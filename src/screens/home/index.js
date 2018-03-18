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
import { connect } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { compose } from "redux";
import Clock from "./clock";
import { baseURL, getTeamCode } from "../../store/utils.js";
class Login extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);

    this.state = {
      initialPosition: ""
    };
    this.props.fetchHuntSettings();
  }

  checkin(params) {
    if (this.state.checkingIn) {
      return;
    }

    this.setState({ checkingIn: true });
    navigator.geolocation.getCurrentPosition(
      position => {
        this.props.checkin(position);
        setTimeout(() => {
          this.setState({ checkingIn: false });
        }, 2000);
      },
      error => {
        this.setState({ checkingIn: false });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    const { auth: { data: { name } }, sites, settings } = this.props;

    const { startTime, endTime, endMessage, startMessage } = settings.data;

    const hasStarted = moment(startTime) < moment();
    const hasEnded = moment(endTime) < moment();
    const huntActive = hasStarted && !hasEnded;

    return (
      <View style={{ padding: 24, paddingTop: 64, flex: 1 }}>
        <Column style={{ justifyContent: "space-between", flex: 1 }}>
          <View>
            <Header style={{ marginBottom: 12 }}>{name}</Header>

            <Clock data={settings.data} />
          </View>
          <View>
            {huntActive && (
              <View>
                <Button onPress={() => this.checkin()}>
                  <ButtonText>Check in</ButtonText>
                </Button>
              </View>
            )}
          </View>
        </Column>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    sites: state.sites,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkin: async data => {
      dispatch({ type: "CHECKIN_SITE", data });
    },
    fetchHuntSettings: async () => {
      dispatch({ type: "FETCH_HUNT_SETTINGS" });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
