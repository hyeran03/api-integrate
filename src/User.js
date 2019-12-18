//특정파라미터에서 특정컴포넌트를 가져오기위해서
import React from "react";
import axios from "axios";
// import useAsync from "./useAsync";
import { useAsync } from "react-async";

async function getUser({ id }) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User({ id }) {
  // id값이 바뀔때마다 getUser을 호출하겠다
  const { data: user, error, isLoading } = useAsync({
    promiseFn: getUser,
    id,
    //id값이 바뀌면 다시 다음을 호출하겟다
    watch: id
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다..</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email: </b> {user.email}
      </p>
    </div>
  );
}

export default User;
