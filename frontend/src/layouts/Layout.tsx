import "../output.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { UserSettingsProvider } from "../context/UserSettingsContext";
import { RaceDataProvider } from "../context/RaceFeedContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserSettingsProvider>
            <RaceDataProvider>
                <div className="flex flex-col items-center place-content-start min-h-screen bg-white dark:bg-gray-900">
                    <Header />
                    {children}
                    <Analytics />
                    <SpeedInsights />
                    <Footer />
                </div>
            </RaceDataProvider>
        </UserSettingsProvider>
    );
};

export default Layout;
