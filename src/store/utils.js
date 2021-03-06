import { store } from "./";
import axios from "axios";

export const baseURL = "http://pth.byon.com/api";
export function checkStatus(response) {
  if (response.status >= 400) {
    console.error(response.status);
    throw new Error();
  }
}

export async function getTeamCode() {
  const { auth: { data: { teamCode } } } = store.getState();

  return teamCode;
}

export const pthAxios = axios.create({
  baseURL: "http://pth.byon.com/api"
});
