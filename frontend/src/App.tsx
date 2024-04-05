import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home_page/HomePage";
import SignInPage from "./pages/signin/SignInPage";
import LoginPage from "./pages/login/LoginPage";
import Layout from "./layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<h1>Search Page</h1>} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="*" element={<h1>404 error page not found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
