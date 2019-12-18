import React, { useState } from "react";
import Axios from "axios";
import useAsync from "./useAsync";
import User from "./User";

async function getUsers() {
  const response = await Axios.get(
    "https://jsonplaceholder.typicode.com/users/"
  );
  return response.data;
}

function UsersUseAsync() {
  // [], true 는 컴포넌트가 처음 렌더링될때 행동을 생략하게함
  const [state, refetch] = useAsync(getUsers, [], true);
  const [userId, setUserId] = useState(null);

  const { loading, data: users, error } = state;
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다..</div>;
  if (!users) return <button onClick={refetch}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username}({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default UsersUseAsync;
