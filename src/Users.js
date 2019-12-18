import React, { useState, useEffect } from "react";
import Axios from "axios";

// 1.요청의 결과
// 2.로딩상태
// 3.에러

function Users() {
  //결과물
  const [users, setUsers] = useState(null);
  //현재 api가 요청중인지 아닌지를 알려줌
  const [loading, setLoading] = useState(false);
  //error
  const [error, setError] = useState(null);

  //useEffect밖에 존재할 경우 재사용할수잇도록 할수 잇음
  const fetchUsers = async () => {
    try {
      //Users, Error 값을 null로 바꾸어 초기화 해줌
      setUsers(null);
      setError(null);
      //loading이 시작됨을 의미
      setLoading(true);
      //다음에서 응답해라
      const response = await Axios.get(
        "https://jsonplaceholder.typicode.com/users/"
      );
      //응답의 결과값을 보기위함 - response.data값을 조회하여 Users값으로
      setUsers(response.data);
      //error가 발생했을시
    } catch (e) {
      setError(e);
      console.log(e.response.status);
    }
    //loading이 끝났음
    setLoading(false);
  };

  //컴포넌트가 처음렌더링될때 다음의 효과를 사용하겠다 axios를 사용해서 api를 렌더링
  useEffect(() => {
    //try catch 문을 사용하여 error발생시, 발생하지않을시의 실행코드를 정한다

    fetchUsers();
  }, []);

  //상태에따라 다른 결과물 렌더링
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다..</div>;
  //로딩은 끝났으나 users배열이 유효하지 않은 값이라면
  if (!users) return null;

  //users배열이 유효할 때
  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username}({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Users;
