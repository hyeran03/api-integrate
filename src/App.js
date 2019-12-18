import React from "react";
import Users from "./Users";
import UsersUseReducer from "./Users-useReducer";
import UsersUseAsync from "./UsersUseAsync";

function App() {
  return (
    <>
      {/* <Users /> */}
      {/* <UsersUseReducer /> */}
      <UsersUseAsync />
    </>
  );
}

export default App;
