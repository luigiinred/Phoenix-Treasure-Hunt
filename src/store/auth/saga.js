import { call, put, takeEvery } from "redux-saga/effects";
import { login } from "./actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  put({ type: "LOGIN_AUTH_PENDING" });

  try {
    const data = yield call(login, action.data);
    yield put({ type: "LOGIN_AUTH_SUCCESS", data });
  } catch (e) {
    yield put({ type: "LOGIN_AUTH_FAIL", errors: ["Invalid email/password."] });
  }
}

function* authSaga() {
  yield takeEvery("LOGIN_AUTH", fetchUser);
}

export default authSaga;
