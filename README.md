# TodoList

> [원티드 프리온보딩 프론트엔드 선발 과제](https://github.com/walking-sunset/selection-task)를 위해 만들어졌습니다.

할 일을 적어 관리할 수 있는 간단한 투두리스트 웹사이트입니다.

## 기능

-   [x] `/` 경로에 로그인 / 회원가입 기능
-   [x] 이메일과 비밀번호 유효성 검사
-   [x] 로그인 API를 호출하고, 올바른 응답을 받았을 때 `/todo` 경로로 이동
-   [x] 로그인 여부에 따른 리다이렉트 처리

-   [x] `/todo` 경로에 투두 리스트 기능
-   [x] 투두 리스트 추가, 수정, 삭제 기능

## 사용한 라이브러리

-   `react-router-dom ^6.4.5`
-   `styled-components ^5.3.6`
-   `react-icons ^4.7.1`

## src 구조

```
📦src
 ┣ 📂components
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜SignForm.tsx
 ┃ ┗ 📜Todo.tsx
 ┣ 📂pages
 ┃ ┣ 📜AuthPage.tsx
 ┃ ┗ 📜TodoListPage.tsx
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┗ 📜reportWebVitals.ts
```

## 실행 방법

1. 원격저장소를 복제한 뒤 모듈을 설치합니다.

```bash
git clone wanted-pre-onboarding-frontend.git
yarn
```

2. 앱을 실행합니다.

```bash
yarn start
```

3. [API](https://github.com/walking-sunset/selection-task)에 문제가 있다면 로컬 서버로 구동하세요.

```bash
npm install
npm start
```
