import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
//import MainPage from './pages/MainPage/MainPage'

function App() {
  return (
    <Routes>
      {/* 기본 진입은 로그인으로 */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 로그인 페이지 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 로그인 후 진입할 메인 페이지 */}
      {/* <Route path="/main" element={<MainPage />} /> */}

      {/* 그 외 경로는 모두 로그인으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
