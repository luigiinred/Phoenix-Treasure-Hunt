import { baseURL, checkStatus } from "../utils";

export async function login(userData) {
  try {
    const response = await fetch(
      `${baseURL}/get_team.php?teamCode=${userData.teamCode}`
    );

    checkStatus(response);

    const data = await response.json();

    return { ...data, teamCode: userData.teamCode };
  } catch (error) {
    throw new Error(error);
  }
}
