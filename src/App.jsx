import React, { useState } from "react";
import LandingPage from "./LandingPage";
import Login from "./Login";

export default function App() {
    // State untuk melacak halaman aktif: 'landing' atau 'login'
    const [currentPage, setCurrentPage] = useState("landing");

    return (
        <div>
            {currentPage === "landing" ? (
                // Mengirim fungsi perpindahan ke LandingPage
                <LandingPage
                    onNavigateToLogin={() => setCurrentPage("login")}
                />
            ) : (
                // Mengirim fungsi kembali ke LandingPage dari halaman Login
                <Login onNavigateToHome={() => setCurrentPage("landing")} />
            )}
        </div>
    );
}
