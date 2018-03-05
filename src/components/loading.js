import React, { Component } from "react";

import styled from "styled-components";
import { StyleSheet, PixelRatio } from "react-native";
import {
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  ActivityIndicator
} from "react-native";

export const LoadingScreen = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <ActivityIndicator size="large" />
  </View>
);
