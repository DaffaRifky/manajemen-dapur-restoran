// src/components/Contexts/DashboardProvider.jsx
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { DashboardContext } from "../Contexts/Context.jsx";

export const DashboardProvider = ({ children }) => {
    const [user, setUser] = useState( () => {
        const token = localStorage.getItem("token");
        if (token) return null;

        try {
            const decoded = jwtDecode(token);
            return { user: decoded.username };
        } catch {
            return null;
        }
    });

    const login = (token) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        setUser({ user: decoded.username });
    };

    const logout = () => {
        localStorage.removeItem("token");
    };

    return (
        <DashboardContext.Provider value={{ user, login, logout }}>
            {children}
        </DashboardContext.Provider>
    );
};