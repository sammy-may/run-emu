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
    toggleTheme: () => void;
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

    const toggleTheme = () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <UserSettingsContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </UserSettingsContext.Provider>
    );
};
