const initialState = {
  isCheckingIn: false,
  isLoaded: false,
  isLoading: false,
  data: {},
  errors: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ANSWERS_PENDING": {
      return {
        ...state,
        errors: null,
        isLoaded: false,
        isLoading: true,
        data: null
      };
    }

    case "FETCH_ANSWERS_FAIL": {
      return {
        isLoaded: false,
        isLoading: false,
        data: null,
        errors: action.errors
      };
    }

    case "FETCH_ANSWERS_SUCCESS": {
      const { data } = action;
      console.warn("done");
      return {
        ...state,
        errors: null,
        isLoaded: true,
        isLoading: false,
        data
      };
    }

    case "BUY_ANSWER_PENDING": {
      return {
        ...state,
        isCheckingIn: true
      };
    }

    case "BUY_ANSWER_FAIL": {
      return {
        isCheckingIn: false
      };
    }

    case "BUY_ANSWER_SUCCESS": {
      const { data } = action;
      return {
        ...state,
        isCheckingIn: false,
        checkinData: data
      };
    }

    default:
      return state;
  }
}
