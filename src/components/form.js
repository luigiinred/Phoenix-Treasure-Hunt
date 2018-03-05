import styled from "styled-components";

export const Form = styled.View`
  padding: 0 24px;
  flex: 1;
  justify-content: center;
`;

export const Input = styled.TextInput`
  font-family: "Exo 2";
  padding: 8px;
  border: 2px solid #dedede;
  font-size: 18;
  border-radius: 3px;
`;

export const Header = styled.Text`
  font-family: "Exo 2";
  font-weight: bold;
  font-size: 32;
`;

export const Label = styled.Text`
  font-family: "Exo 2";
  font-weight: bold;
  font-size: 18;
  margin-top: 22px;
  padding-bottom: 2px;
`;

export const Button = styled.TouchableHighlight`
  margin-top: 32px;
  font-family: "Exo 2";
  font-weight: bold;
  padding: 12px;
  color: white;
  border: 3px;

  border-radius: 3px;
`;

export const ButtonText = styled.Text`
  font-family: "Exo 2";
  font-weight: bold;
  color: white;
  font-size: 18;
  text-align: center;
`;

export const Link = styled.Text`
  font-family: "Exo 2";
  text-align: center;
  font-size: 16;
  margin-top: 32px;
  padding-bottom: 2px;
`;
