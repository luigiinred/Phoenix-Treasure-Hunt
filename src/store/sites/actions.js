import { baseURL, checkStatus, getTeamCode } from "../constants";

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

export async function checkinAction(data) {
  try {
    const teamCode = await getTeamCode();

    const response = await fetch(`${baseURL}/update_location_or_checkin.php`, {
      method: "POST",
      body: JSON.stringify({
        teamCode: teamCode,
        lat: data.coords.latitude,
        lon: data.coords.longitude,
        checkIn: true
      })
    });

    checkStatus(response);

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}
