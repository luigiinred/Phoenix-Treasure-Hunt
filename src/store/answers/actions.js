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

export async function buyAnswerAction(site) {
  try {
    const teamCode = await getTeamCode();

    const { data } = await pthAxios.post(
      "/buy_answer.php",
      {
        teamCode: teamCode,
        site,
        platform: Platform.OS
      },
      {
        withCredentials: false
      }
    );
    console.warn(teamCode);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
