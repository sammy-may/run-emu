import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactElement,
} from "react";

// Define the shape of the theme context
interface UserSettingsContextType {
    theme: "light" | "dark";
    degrees: "C" | "F";
    distUnits: "K" | "M";
    toggleTheme: () => void;
    toggleDegrees: () => void;
    toggleDistUnits: () => void;
}

// Create the context
const UserSettingsContext = createContext<UserSettingsContextType | undefined>(
    undefined,
);

// Custom hook to access the context
export const useUserSettings = (): UserSettingsContextType => {
    const context = useContext(UserSettingsContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

type ChildrenType = {
    children?: ReactElement | ReactElement[] | undefined;
};

// Provider component
export const UserSettingsProvider = ({
    children,
}: ChildrenType): ReactElement => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const [degrees, setDegrees] = useState<"C" | "F">("F");
    const [distUnits, setDistUnits] = useState<"K" | "M">("M");

    // Load the saved theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as
            | "light"
            | "dark"
            | null;
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // Default to system preference
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches;
            setTheme(prefersDark ? "dark" : "light");
        }

        const savedDegrees = localStorage.getItem("degrees") as
            | "C"
            | "F"
            | null;
        if (savedDegrees) {
            setDegrees(savedDegrees);
        }

        const savedDistUnits = localStorage.getItem("distUnits") as
            | "K"
            | "M"
            | null;
        if (savedDistUnits) {
            setDistUnits(savedDistUnits);
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Save theme to localStorage on change
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("degrees", degrees);
    }, [degrees]);

    useEffect(() => {
        localStorage.setItem("distUnits", distUnits);
    }, [distUnits]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"));

    const toggleDegrees = () =>
        setDegrees((prev) => (prev === "F" ? "C" : "F"));

    const toggleDistUnits = () =>
        setDistUnits((prev) => (prev === "M" ? "K" : "M"));

    return (
        <UserSettingsContext.Provider
            value={{
                theme,
                degrees,
                distUnits,
                toggleTheme,
                toggleDegrees,
                toggleDistUnits,
            }}
        >
            {children}
        </UserSettingsContext.Provider>
    );
};
