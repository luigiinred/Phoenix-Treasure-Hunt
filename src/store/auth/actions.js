import { baseURL, checkStatus } from "../utils";
import packageJson from "../../../package.json";
import { Platform } from "react-native";

export async function login(userData) {
  try {
    const response = await fetch(
      `${baseURL}/get_team.php?teamCode=${userData.teamCode}&version=${
        packageJson.version
      }&platform=${Platform.OS}`
    );

    checkStatus(response);

    const data = await response.json();

    return { ...data, teamCode: userData.teamCode };
  } catch (error) {
    throw new Error(error);
  }
}
