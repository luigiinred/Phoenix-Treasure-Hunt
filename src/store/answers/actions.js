import { baseURL, checkStatus, getTeamCode, pthAxios } from "../utils";
import { Alert, Platform } from "react-native";

export async function fetchAnswersAction(userData) {
  try {
    const teamCode = await getTeamCode();
    const response = await fetch(
      `${baseURL}/get_answers.php?teamCode=${teamCode}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function buyAnswerAction(location) {
  try {
    const teamCode = await getTeamCode();

    const { data } = await pthAxios.post(
      "/checkin.php",
      {
        teamCode: teamCode,
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        checkIn: true,
        platform: Platform.OS
      },
      {
        withCredentials: false
      }
    );
    console.warn(teamCode);

    Alert.alert(data.statusText);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
