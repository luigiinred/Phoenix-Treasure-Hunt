import styled from "styled-components";
import { StyleSheet, PixelRatio } from "react-native";

export const ListItem = styled.View`
  padding: 12px 0px;
  padding-left: 0px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const ListIndex = styled.Text`
  font-size: 20;
  padding: 0;
  margin: 0;
  width: 64px;
  text-align: center;
`;

export const ListTitle = styled.Text`
  font-weight: 700;
  color: #151515;
  font-size: 18;
`;

export const ListSubtitle = styled.Text`
  font-weight: 700;
  color: #7a7a7a;
  font-size: 14;
`;

export const ListPill = styled.Text``;

export const Divider = styled.View`
  background-color: #d3d3d3;
  height: ${1 / PixelRatio.get()};
  margin-left: 64px;
`;
