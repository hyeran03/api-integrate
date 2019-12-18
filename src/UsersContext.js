import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

//초기 상태
const initialState = {
  users: {
    loading: false,
    data: null,
    error: null
  },
  user: {
    loading: false,
    data: null,
    error: null
  }
};

//요청중에 대한 결과값 관리(객체와 함수관리)
//loading중일때
const loadingState = {
  loading: true,
  data: null,
  error: null
};
//완료했을때
const success = data => ({
  loadgin: false,
  data,
  error: null
});
//에러가났을때
const error = e => ({
  loading: false,
  data: null,
  error: e
});

//GET_USERS
//GET_USERS_SUCCESS
//GET_USERS_ERROR
//GET_USER
//GET_USER_SUCCESS
//GET_USER_ERROR

function usersReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: loadingState
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        users: success(action.data)
      };
    case "GET_USERS_ERROR":
      return {
        ...state,
        users: error(action.error)
      };
    case "GET_USER":
      return {
        ...state,
        user: loadingState
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: success(action.data)
      };
    case "GET_USER_ERROR":
      return {
        ...state,
        user: error(action.error)
      };
    default:
      throw new Error("Unhandled action type", action.type);
  }
}

//상태(state)를 위한 context
const UsersStateContext = createContext(null);
//dispatch를 위한 context
const UsersDispatchContext = createContext(null);
//후 컴포넌트 최적화에 용이

export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <>
      <UsersStateContext.Provider value={state}>
        <UsersDispatchContext.Provider value={dispatch}>
          {children}
        </UsersDispatchContext.Provider>
      </UsersStateContext.Provider>
    </>
  );
}

// 커스텀훅 만들어서 내보내기
export function useUsersState() {
  const state = useContext(UsersStateContext);
  if (!state) {
    throw new Error("Cannot find UserProvider");
  }
  return state;
}

export function useUsersDispatch() {
  const dispatch = useContext(UsersDispatchContext);
  if (!dispatch) {
    throw new Error("Canno find UserProvider");
  }
  return dispatch;
}

//각각의 결과에 따라 특정 api를 dispatch하도록 함
export async function getUsers(dispatch) {
  dispatch({ type: "GET_USERS" });
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/"
    );
    dispatch({
      type: "GET_USERS_SUCCESS",
      data: response.data
    });
  } catch (e) {
    dispatch({
      type: "GET_USERS_ERROR",
      error: e
    });
  }
}
export async function getUser(dispatch, id) {
  dispatch({ type: "GET_USER" });
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    dispatch({
      type: "GET_USER_SUCCESS",
      data: response.data
    });
  } catch (e) {
    dispatch({
      type: "GET_USER_ERROR",
      error: e
    });
  }
}
