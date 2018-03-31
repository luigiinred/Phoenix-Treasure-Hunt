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
import { Row, Column, Header, ButtonText } from "../../components";
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
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);

    this.state = {
      code: []
    };

    this.login = this.login.bind(this);
  }

  login() {
    if (this.state.code.length < 6) return;

    this.props.login({
      teamCode: this.state.code.join("")
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ error: !!props.auth.errors });
  }

  append(val) {
    if (this.state.code.length >= 6) return;
    this.setState({ code: this.state.code.concat([val]) });
  }

  render() {
    const { auth, persistor } = this.props;
    const { error } = this.state;

    const append = val => () => this.append(val);
    return (
      <PersistGate persistor={persistor}>
        <View style={{ paddingTop: 54 }}>
          <Column
            style={{
              alignItems: "center"
            }}
          >
            {error && (
              <Text style={{ fontSize: 16, color: "red" }}>
                Invalid Team Code
              </Text>
            )}

            <Text style={{ fontSize: 18 }}>Enter Team Code:</Text>
            <Row style={{ justifyContent: "space-between" }}>
              {Array.apply(null, Array(6)).map((_, idx) => (
                <Header style={{ margin: 8 }}>
                  {this.state.code[idx] == null ? "•" : this.state.code[idx]}
                </Header>
              ))}
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Button value={1} onPress={append(1)} />
              <Button value={2} onPress={append(2)} />
              <Button value={3} onPress={append(3)} />
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Button value={4} onPress={append(4)} />
              <Button value={5} onPress={append(5)} />
              <Button value={6} onPress={append(6)} />
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Button value={7} onPress={append(7)} />
              <Button value={8} onPress={append(8)} />
              <Button value={9} onPress={append(9)} />
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Button
                value={"Clear"}
                onPress={() => this.setState({ code: [], error: false })}
              />
              <Button value={0} onPress={append(0)} />
              <Button
                value={"Enter"}
                onPress={() => {
                  this.login();
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
    login: async data => {
      dispatch({ type: "LOGIN_AUTH", data });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
