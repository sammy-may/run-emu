import "../output.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { RaceDataProvider } from "../context/RaceFeedContext";
import { Analytics } from "@vercel/analytics/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <RaceDataProvider>
            <div className="flex-row items-center place-content-between justify-between m-3 max-h-screen min-h-screen">
                <Header />
                {children}
                <Analytics />
                <Footer />
            </div>
        </RaceDataProvider>
    );
};

export default Layout;
