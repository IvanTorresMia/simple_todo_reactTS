import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import { Login } from "./pages/login/login";
import { Home } from "./pages/home/home";
import Layout from "./pages/layout/Layout";
import { Deleted } from "./pages/deleted/deleted";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/deleted" element={<Deleted />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
