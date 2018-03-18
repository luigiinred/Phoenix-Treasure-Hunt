import styled from "styled-components";
import globalStyles from "../styles";

export const Form = styled.View`
  padding: 0 24px;
  flex: 1;
  justify-content: center;
`;

export const Input = styled.TextInput`
  padding: 8px;
  border: 2px solid #dedede;
  font-size: 18;
  border-radius: 3px;
`;

export const Header = styled.Text`
  font-weight: 900;
  font-size: 36;
  text-align: left;
  color: #000000;
`;

export const Label = styled.Text`
  font-weight: bold;
  font-size: 18;
  margin-top: 22px;
  padding-bottom: 2px;
`;

export const Button = styled.TouchableHighlight`
  padding: 12px;
  background-color: ${globalStyles.colors.primary};
  border-radius: 3px;
  width: 100%;
  margin-vertical: 8px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16;
  text-align: center;
`;

export const Link = styled.Text`
  text-align: center;
  font-size: 16;
  margin-top: 32px;
  padding-bottom: 2px;
`;
