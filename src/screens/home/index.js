import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
  Linking,
  Platform
} from "react-native";
import { Row, Column, Header, Button, ButtonText } from "../../components";
import { connect } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { compose } from "redux";
import Clock from "./clock";
import { baseURL, getTeamCode } from "../../store/utils.js";
import moment from "moment";
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

  openMap(address) {
    Linking.openURL(`http://maps.apple.com/maps?daddr=${address}`);

    Platform.select({
      ios: () => {
        console.error("hasStarted");
        Linking.openURL(`http://maps.apple.com/maps?daddr=${address}`);
      },
      android: () => {
        Linking.openURL(`http://maps.google.com/maps?daddr=${address}`);
      }
    });
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

  createSite(params) {
    if (this.state.checkingIn) {
      return;
    }

    this.setState({ checkingIn: true });
    navigator.geolocation.getCurrentPosition(
      position => {
        this.props.createSite(position);
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
    const { auth: { data: user }, sites, settings } = this.props;

    const {
      startTime,
      endTime,
      endMessage,
      startMessage,
      startAddress,
      endAddress
    } = settings.data;

    const hasStarted = moment(startTime) < moment();
    const hasEnded = moment(endTime) < moment();
    const huntActive = hasStarted && !hasEnded;

    return (
      <View style={{ padding: 24, paddingTop: 64, flex: 1 }}>
        <Column style={{ justifyContent: "space-between", flex: 1 }}>
          <View>
            <Header style={{ marginBottom: 12 }}>{user.name}</Header>

            <Clock data={settings.data} />
          </View>
          <View>
            {user.admin === "1" ? (
              <View>
                <Button onPress={() => this.createSite()}>
                  <ButtonText>Create Site Here</ButtonText>
                </Button>
              </View>
            ) : null}
            {huntActive || user.admin === "1" ? (
              <View>
                <Button onPress={() => this.checkin()}>
                  <ButtonText>Check in</ButtonText>
                </Button>
              </View>
            ) : null}
            {!hasStarted || user.admin === "1" ? (
              <View>
                <Button onPress={() => this.openMap(startAddress)}>
                  <ButtonText>Directions to Start</ButtonText>
                </Button>
              </View>
            ) : null}
            {hasEnded || user.admin === "1" ? (
              <View>
                <Button onPress={() => this.openMap(endAddress)}>
                  <ButtonText>Directions to Banquet</ButtonText>
                </Button>
              </View>
            ) : null}
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
    createSite: async data => {
      dispatch({ type: "CREATE_SITE", data });
    },
    fetchHuntSettings: async () => {
      dispatch({ type: "FETCH_HUNT_SETTINGS" });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
