<<<<<<< HEAD
import { useState } from "react";
import LandingPage from "../src/LandingPage";
import Login from "../src/Login";

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
=======
import React, { useState } from "react";
import LandingPage from "./LandingPage";
import Login from "./Login";
import WaiterDashboard from "./WaiterDashboard";
import ChefDashboard from "./ChefDashboard";

export default function App() {
    const [currentPage, setCurrentPage] = useState("landing");
    const [loggedInUser, setLoggedInUser] = useState("csdc");

    // State Pesanan Bersama (Shared State antara Waiter & Chef)
    const [orders, setOrders] = useState([
        {
            id: 1,
            table: 1,
            customer: "anes",
            items: [{ name: "Ayam Bakar", price: 32000, qty: 1 }],
            total: 32000,
            status: "Siap diambil", // 'Diproses Dapur', 'Siap diambil', atau 'Sudah tersaji'
            elapsedMinutes: 0,
        },
    ]);

    const handleLoginSuccess = (role, username) => {
        if (username) setLoggedInUser(username);

        const lowerRole = role ? role.toLowerCase() : "";

        if (lowerRole === "waiter") {
            setCurrentPage("waiter-dashboard");
        } else if (lowerRole === "chef" || lowerRole === "koki") {
            setCurrentPage("chef-dashboard");
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
                    orders={orders}
                    setOrders={setOrders}
                    onLogout={() => setCurrentPage("landing")}
                />
            )}

            {currentPage === "chef-dashboard" && (
                <ChefDashboard
                    username={loggedInUser}
                    orders={orders}
                    setOrders={setOrders}
                    onLogout={() => setCurrentPage("landing")}
                />
>>>>>>> temp
            )}
        </div>
    );
}
