const initialState = {
  isCheckingIn: false,
  isLoaded: false,
  isLoading: false,
  data: null,
  errors: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "FETCH_SITES_PENDING": {
      return {
        ...state,
        errors: null,
        isLoaded: false,
        isLoading: true,
        data: null
      };
    }

    case "FETCH_SITES_FAIL": {
      return {
        isLoaded: false,
        isLoading: false,
        data: null,
        errors: action.errors
      };
    }

    case "FETCH_SITES_SUCCESS": {
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

    case "CHECKIN_SITE_PENDING": {
      return {
        ...state,
        isCheckingIn: true
      };
    }

    case "CHECKIN_SITE_FAIL": {
      return {
        isCheckingIn: false
      };
    }

    case "CHECKIN_SITE_SUCCESS": {
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
