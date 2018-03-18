import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
  FlatList,
  RefreshControl,
  Platform
} from "react-native";
import { Row, Column, Header, Button, ButtonText } from "../../components";
import { connect } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { compose } from "redux";
import globalStyles from "../../styles";

class Login extends Component {
  static navigatorStyle = Platform.OS === "ios"
    ? {}
    : {
        navBarBackgroundColor: globalStyles.colors.primary,
        navBarTextColor: "#FFFFFF",
        navBarButtonColor: "#FFFFFF",
        statusBarColor: globalStyles.colors.primaryDark
      };

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.props.fetchSites();
  }

  logout() {
    this.props.logout();
  }

  render() {
    const { answers, site } = this.props;
    if (!answers.data) return <View />;

    return (
      <View style={{ padding: 24, flex: 1 }}>
        <Column style={{ justifyContent: "space-between", flex: 1 }}>
          {answers.data.answers[site.number] ? (
            <View>
              <Header style={{ marginBottom: 12, fontSize: 24 }}>Answer</Header>
              <Text style={{ fontSize: 16 }}>
                {answers.data.answers[site.number]}
              </Text>
            </View>
          ) : (
            <View>
              <Button onPress={() => this.checkin()}>
                <ButtonText>Get Help</ButtonText>
              </Button>
            </View>
          )}
        </Column>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    answers: state.answers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSites: async data => {
      dispatch({ type: "FETCH_SITES" });
    },
    logout: async data => {
      dispatch({ type: "LOGOUT_AUTH", data });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
