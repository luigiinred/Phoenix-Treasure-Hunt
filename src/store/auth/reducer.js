const initialState = {
  isLoggingIn: false,
  isloggedIn: false,
  data: {},
  errors: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "LOGOUT_AUTH": {
      return {
        isloggedIn: false,
        isloggingIn: false,
        data: {},
        errors: null
      };
    }

    case "LOGIN_AUTH_PENDING": {
      return {
        ...state,
        errors: null,
        isloggedIn: false,
        isloggingIn: true,
        data: null
      };
    }

    case "LOGIN_AUTH_FAIL": {
      return {
        isloggedIn: false,
        isloggingIn: false,
        data: {},
        errors: action.errors
      };
    }

    case "LOGIN_AUTH_SUCCESS": {
      const { data } = action;

      return {
        ...state,
        errors: null,
        isloggedIn: true,
        isloggingIn: false,
        data
      };
    }

    default:
      return state;
  }
}
