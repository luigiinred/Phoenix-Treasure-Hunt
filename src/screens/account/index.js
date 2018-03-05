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
import { Row, Column } from "../../components";
import Button from "./components/button";
import { connect } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { compose } from "redux";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  container: {
    flex: 1,
    flexDirection: "row"
  },
  containerRow: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  formContainer: {
    height: 230,
    padding: 20,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  input: {
    flexGrow: 1,
    flexDirection: "row",
    height: 40,
    marginBottom: 20
  }
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  render() {
    const { firebase: auth, persistor, firebase } = this.props;

    const append = val => () => this.append(val);
    return (
      <PersistGate persistor={persistor}>
        <View>
          <Column
            style={{
              alignItems: "center"
            }}
          >
            <Row style={{ justifyContent: "center" }}>
              <Button
                value={"Logout"}
                onPress={() => {
                  this.logout();
                }}
              />
            </Row>
          </Column>
        </View>
      </PersistGate>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: async data => {
      dispatch({ type: "LOGOUT_AUTH", data });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
