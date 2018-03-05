import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";

export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={0.3}
        onPress={this.props.onPress}
      >
        <View
          style={{
            border: 4,
            width: 75,
            height: 75,
            margin: 10,
            borderWidth: 2,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            {this.props.value}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}
