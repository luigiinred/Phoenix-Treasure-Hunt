import { call, put, takeEvery } from "redux-saga/effects";
import { fetchSitesAction, checkinAction } from "./actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchSites(action) {
  put({ type: "FETCH_SITES_PENDING" });

  try {
    const data = yield call(fetchSitesAction, action.data);

    yield put({ type: "FETCH_SITES_SUCCESS", data });
  } catch (e) {
    yield put({
      type: "FETCH_SITES_FAIL",
      errors: ["Invalid email/password."]
    });
  }
}

function* checkin(action) {
  put({ type: "CHECKIN_SITE_PENDING" });
  try {
    const data = yield call(checkinAction, action.data);

    yield put({ type: "CHECKIN_SITE_SUCCESS", data });
    yield put({ type: "FETCH_SITES" });
  } catch (e) {
    yield put({
      type: "CHECKIN_SITE_FAIL",
      errors: ["Invalid email/password."]
    });
  }
}

function* authSaga() {
  yield takeEvery("FETCH_SITES", fetchSites);
  yield takeEvery("CHECKIN_SITE", checkin);
}

export default authSaga;
