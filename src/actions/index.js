import axios from "axios";
import { initialState } from "../reducers";

export const CREATE_USER = "createUser";
export const GET_USER = "getUser";
export const SIGN_IN = "signIn";

export const createUser = async (data) => {
  return async (dispatch) => {
    try {
      let res = await axios.post(
        `${initialState.api_host}/auth/register`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.status === "success") {
        dispatch({
          type: CREATE_USER,
          payload: res.data,
        });
      } else if (res.data.status === "failure") {
        dispatch({ error: "error" });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getUser = async () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${initialState.api_host}/user/profile`, {
        headers: {},
      });

      if (res.data) {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const logUser = async (data) => {
  return async (dispatch) => {
    try {
      let res = await axios.post(`${initialState.api_host}/auth/login`, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data[0].status === "success") {
        dispatch({
          type: SIGN_IN,
          payload: res.data[0].user,
        });
      } else if (res.data[0].status === "failure") {
        dispatch({ error: "error" });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
// export const createUser = ({ name, email, password, position }) => ({
//   type: CREATE_USER,
//   payload: {
//     name,
//     email,
//     password,
//     position,
//   },
// });
