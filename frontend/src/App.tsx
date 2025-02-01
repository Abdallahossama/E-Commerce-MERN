import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/Auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
