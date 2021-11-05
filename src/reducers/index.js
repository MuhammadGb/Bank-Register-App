import { CREATE_USER, GET_USER, SIGN_IN } from "../actions";

export const initialState = {
  api_host: "https://intaviewer-api.herokuapp.com/api",
  redirect_data: null,
  user: {},
  logged_in: false,
  client_details: {},
  client_form: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: action.payload,
        logged_in: true,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        logged_in: true,
      };
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
