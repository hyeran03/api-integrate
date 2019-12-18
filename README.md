# API 연동

1. API 연동의 기본
2. useReducer로 요청상태 관리하기
3. useAsync 커스텀 hook 만들어서 사용하기
4. react-async로 요청상태 관리하기
5. context에서 비동기작업상태 관리하기
6. context에서 비동기작없상태 관리하기 - 리팩토링

### 정리

> context로 비동기 작업상태를 관리할시 특정 상태가 전역적으로 관리될 때 사용할 것을 권장
> 규모가 큰 프로젝트의 경우 redux, mopX 같은 상태관리 라이브러리를 함께 사용하기도 함 - middleware를 사용하여 체계적 관리가능
