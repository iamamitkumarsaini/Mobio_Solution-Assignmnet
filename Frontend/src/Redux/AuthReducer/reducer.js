import * as types from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  userSignupData: [],
  userLoginData: [],
};

export const reducer = (oldState = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.USER_SIGNUP_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };

    case types.USER_SIGNUP_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        userSignupData: payload,
      };

    case types.USER_SIGNUP_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };

    case types.USER_lOGIN_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };

    case types.USER_lOGIN_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        userLoginData: payload,
      };

    case types.USER_lOGIN_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };

    default:
      return oldState;
  }
};
