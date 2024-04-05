import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import Footer from "../components/footer/Footer";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="main-layout">
      <div className="layout-header">
        <Header />
        <Hero />
      </div>
      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
