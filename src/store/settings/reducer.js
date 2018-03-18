const initialState = {
  isLoaded: false,
  isLoading: false,
  data: {},
  errors: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "FETCH_HUNT_SETTINGS_PENDING": {
      return {
        ...state,
        errors: null,
        isLoaded: false,
        isLoading: true,
        data: null
      };
    }

    case "FETCH_HUNT_SETTINGS_FAIL": {
      return {
        isLoaded: false,
        isLoading: false,
        data: null,
        errors: action.errors
      };
    }

    case "FETCH_HUNT_SETTINGS_SUCCESS": {
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

    default:
      return state;
  }
}
