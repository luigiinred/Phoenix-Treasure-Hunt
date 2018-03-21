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
  Platform,
  Alert
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
  }

  buyAnswer(number) {
    Alert.alert(
      `Buy the answer for site ${number}?`,
      null,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },

        { text: "Buy it!", onPress: () => this.props.buyAnswer(number) }
      ],
      { cancelable: true }
    );
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
          ) : answers.data.can_get[site.number] ? (
            <View>
              <Button onPress={() => this.buyAnswer(site.number)}>
                <ButtonText>Get Help</ButtonText>
              </Button>
            </View>
          ) : (
            <Text>Nothing to see here... ¯\_(ツ)_/¯</Text>
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
    buyAnswer: async data => {
      dispatch({ type: "BUY_ANSWER", data });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
