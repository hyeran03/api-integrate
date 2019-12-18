import React, { useState } from "react";
import Axios from "axios";
// import useAsync from "./useAsync";
import { useAsync } from "react-async";
import User from "./User";

async function getUsers() {
  const response = await Axios.get(
    "https://jsonplaceholder.typicode.com/users/"
  );
  return response.data;
}

function UsersUseAsync() {
  const [userId, setUserId] = useState(null);
  const { data: users, error, isLoading, reload, run } = useAsync({
    // promiseFn: getUsers
    //사용자이벤트에 따라 요청이 나오도록
    deferFn: getUsers
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다..</div>;
  if (!users) return <button onClick={run}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username}({user.name})
          </li>
        ))}
      </ul>
      <button onClick={reload}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default UsersUseAsync;
