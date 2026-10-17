import React, { useState } from "react";
import LandingPage from "./LandingPage";
import Login from "./Login";
import WaiterDashboard from "./WaiterDashboard";
import ChefDashboard from "./ChefDashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [loggedInUser, setLoggedInUser] = useState("csdc");

  // State Pesanan Bersama (Shared State antara Waiter & Chef)
  // Dikosongkan total [] agar tidak ada pesanan bawaan sebelum Waiter membuatnya
  const [orders, setOrders] = useState([]);

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
        <LandingPage onNavigateToLogin={() => setCurrentPage("login")} />
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
      )}
    </div>
  );
}
