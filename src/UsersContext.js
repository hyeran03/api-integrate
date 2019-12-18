import React, { createContext, useReducer, useContext } from "react";
import * as api from "./api";
import createAsyncDispatcher, {
  initialAsyncState,
  createAsyncHandler
} from "./asyncActionUtils";

//초기 상태
const initialState = {
  users: initialAsyncState,
  user: initialAsyncState
};

//GET_USERS
//GET_USERS_SUCCESS
//GET_USERS_ERROR
//GET_USER
//GET_USER_SUCCESS
//GET_USER_ERROR

const usersHandler = createAsyncHandler("GET_USERS", "users");
const userHandler = createAsyncHandler("GET_USER", "user");

function usersReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
    case "GET_USERS_SUCCESS":
    case "GET_USERS_ERROR":
      return usersHandler(state, action);

    case "GET_USER":
    case "GET_USER_SUCCESS":
    case "GET_USER_ERROR":
      return userHandler(state, action);

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

export const getUsers = createAsyncDispatcher("GET_USERS", api.getUsers);
export const getUser = createAsyncDispatcher("GET_USER", api.getUser);
