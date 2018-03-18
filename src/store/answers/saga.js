import { call, put, takeEvery } from "redux-saga/effects";
import { fetchAnswersAction, buyAnswerAction } from "./actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAnswers(action) {
  put({ type: "FETCH_ANSWERS_PENDING" });

  try {
    const data = yield call(fetchAnswersAction, action.data);

    yield put({ type: "FETCH_ANSWERS_SUCCESS", data });
  } catch (e) {
    yield put({
      type: "FETCH_ANSWERS_FAIL",
      errors: ["Invalid email/password."]
    });
  }
}

function* buyAnswer(action) {
  put({ type: "BUY_ANSWER_PENDING" });
  try {
    const data = yield call(buyAnswerAction, action.data);

    yield put({ type: "BUY_ANSWER_SUCCESS", data });
    yield put({ type: "FETCH_ANSWERS" });
  } catch (e) {
    yield put({
      type: "BUY_ANSWER_FAIL",
      errors: ["Invalid email/password."]
    });
  }
}

function* authSaga() {
  yield takeEvery("FETCH_ANSWERS", fetchAnswers);
  yield takeEvery("BUY_ANSWER", buyAnswer);
}

export default authSaga;
