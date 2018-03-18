import { call, put, takeEvery } from "redux-saga/effects";
import { fetchHuntSettingsAction } from "./actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchHuntSettings(action) {
  put({ type: "FETCH_HUNT_SETTINGS_PENDING" });

  try {
    const data = yield call(fetchHuntSettingsAction, action.data);

    yield put({ type: "FETCH_HUNT_SETTINGS_SUCCESS", data });
  } catch (e) {
    yield put({
      type: "FETCH_HUNT_SETTINGS_FAIL",
      errors: ["Invalid email/password."]
    });
  }
}

function* authSaga() {
  yield takeEvery("FETCH_HUNT_SETTINGS", fetchHuntSettings);
}

export default authSaga;
