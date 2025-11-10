import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { LessonProgressProvider } from "./state/lessonProgress";
import { AuthProvider } from "./state/authContext";
import SAQPractice from "./components/views/SAQPractice";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 将全局进度 Provider 放在应用最外层，确保所有组件能读取/更新步骤完成度 */}
    <AuthProvider>
      <LessonProgressProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/saq" element={<SAQPractice />} />
          </Routes>
        </BrowserRouter>
      </LessonProgressProvider>
    </AuthProvider>
  </React.StrictMode>
);
