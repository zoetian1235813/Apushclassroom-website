import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { LessonProgressProvider } from "./state/lessonProgress";
import { AuthProvider } from "./state/authContext";
import SAQPractice from "./components/views/SAQPractice";
import { CheckInPage } from "./checkin/components/CheckInPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <LessonProgressProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/saq" element={<SAQPractice />} />
            <Route path="/saq/:year" element={<SAQPractice />} />
            <Route path="/checkin" element={<CheckInPage />} />
          </Routes>
        </BrowserRouter>
      </LessonProgressProvider>
    </AuthProvider>
  </React.StrictMode>
);
