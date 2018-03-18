import { baseURL, checkStatus, getTeamCode, pthAxios } from "../utils";
import { Alert, Platform } from "react-native";

export async function fetchHuntSettingsAction(userData) {
  try {
    const teamCode = await getTeamCode();
    const response = await fetch(
      `${baseURL}/get_hunt_settings.php?teamCode=${teamCode}`
    );

    checkStatus(response);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
