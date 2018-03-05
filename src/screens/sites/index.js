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
  RefreshControl
} from "react-native";
import {
  Row,
  Column,
  ListItem,
  ListTitle,
  ListSubtitle,
  Divider
} from "../../components";
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
    this.props.fetchSites();
  }

  logout() {
    this.props.logout();
  }

  render() {
    const { sites } = this.props;

    const append = val => () => this.append(val);
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              this.props.fetchSites();
            }}
          />
        }
      >
        {sites.isLoaded && (
          <FlatList
            data={sites.data}
            ItemSeparatorComponent={() => (
              <Divider style={{ marginLeft: 24 }} />
            )}
            renderItem={({ item }) => (
              <TouchableHighlight key={item.number}>
                <ListItem style={{ paddingLeft: 24 }}>
                  <Column>
                    <ListSubtitle>Site {item.number}</ListSubtitle>
                    <ListTitle>{item.checkedIn ? item.name : "???"}</ListTitle>
                  </Column>
                </ListItem>
              </TouchableHighlight>
            )}
          />
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    sites: state.sites
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
