import { useReducer, useEffect, useCallback } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null
      };

    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null
      };

    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error
      };

    default:
      throw new Error(`Unhandled actiontype: ${action.type}`);
  }
}

//커스텀 훅
//두개의 파라미터
//- callback함수(API를 호출하는 함수),
//  dependences(로딩, 값의 변경이 일어날때 API를 재요청할때 useEffect의 두번째 파라미터에 넣는 daps를 그대로 받아와 사용)

//사용자의 액션시에 발동되도록
function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null
  });

  const fetchData = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  }, [callback]);

  useEffect(() => {
    if (skip) {
      return;
    }
    //skip이 true라면 아래의 내용이 진행되지 않음
    fetchData();
    //eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;
