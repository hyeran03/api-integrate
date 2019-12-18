import React from "react";
import Users from "./Users";
import UsersUseReducer from "./UsersUseReducer";
import UsersUseAsync from "./UsersUseAsync";
import { UsersProvider } from "./UsersContext";

function App() {
  return (
    <>
      {/* <Users /> */}
      {/* <UsersUseReducer /> */}
      {/* <UsersUseAsync /> */}
      <UsersProvider>
        <UsersUseAsync />
      </UsersProvider>
    </>
  );
}

export default App;
