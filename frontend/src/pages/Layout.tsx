import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
    return (
        <div className="m-3 max-h-screen">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
