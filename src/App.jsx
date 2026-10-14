import React, { useState } from "react";
import LandingPage from "./LandingPage";
import Login from "./Login";
import WaiterDashboard from "./WaiterDashboard";

export default function App() {
    // State untuk melacak halaman aktif: 'landing', 'login', atau 'waiter-dashboard'
    const [currentPage, setCurrentPage] = useState("landing");
    const [loggedInUser, setLoggedInUser] = useState("fdfd");

    const handleLoginSuccess = (role, username) => {
        if (username) setLoggedInUser(username);

        if (role === "waiter") {
            setCurrentPage("waiter-dashboard");
        } else {
            alert(
                `Login berhasil sebagai [${role.toUpperCase()}]. Dashboard untuk role ini sedang dalam pengembangan.`,
            );
        }
    };

    return (
        <div>
            {currentPage === "landing" && (
                <LandingPage
                    onNavigateToLogin={() => setCurrentPage("login")}
                />
            )}

            {currentPage === "login" && (
                <Login
                    onNavigateToHome={() => setCurrentPage("landing")}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}

            {currentPage === "waiter-dashboard" && (
                <WaiterDashboard
                    username={loggedInUser}
                    onLogout={() => setCurrentPage("landing")}
                />
            )}
        </div>
    );
}
