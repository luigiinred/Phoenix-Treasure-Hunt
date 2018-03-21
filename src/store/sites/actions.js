import { baseURL, checkStatus, getTeamCode, pthAxios } from "../utils";
import { Alert, Platform } from "react-native";

export async function fetchSitesAction(userData) {
  try {
    const teamCode = await getTeamCode();
    const response = await fetch(
      `${baseURL}/get_sites.php?teamCode=${teamCode}`
    );

    checkStatus(response);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function checkinAction(location) {
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

    Alert.alert(data.statusText);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function rateSiteAction({ site, rating }) {
  try {
    const teamCode = await getTeamCode();

    const { data } = await pthAxios.post(
      "/set_rating.php",
      {
        teamCode: teamCode,
        site,
        rating,
        platform: Platform.OS
      },
      {
        withCredentials: false
      }
    );

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createSiteAction(location) {
  try {
    const teamCode = await getTeamCode();

    const { data } = await pthAxios.post(
      "/checkin.php",
      {
        teamCode: teamCode,
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        addSite: true,
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
