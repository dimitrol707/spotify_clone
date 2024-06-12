import { Route, Routes } from "react-router-dom";
import { RequiredAuthRoute } from "./router/RequiredAuthRoute";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { CallbackLayout } from "./layouts/CallbackLayout";
import { RootLayout } from "./layouts/RootLayout";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<CallbackLayout />} />
        <Route element={<RequiredAuthRoute />}>
          <Route path="/" element={<HomePage />}>
            <Route path={"/search"} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
