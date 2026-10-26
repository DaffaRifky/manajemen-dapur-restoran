import React, { useState, useEffect } from "react";
import initialMenuList from "./data/menu.js";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import WaiterDashboard from "./pages/WaiterDashboard.jsx";
import ChefDashboard from "./pages/ChefDashboard.jsx";
import PesanMenu from "./pages/PesanMenu.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [loggedInUser, setLoggedInUser] = useState("csdc");

  // State Pesanan Bersama (Shared State antara Pelanggan, Waiter & Chef)
  const [orders, setOrders] = useState([]);

  const menuList = initialMenuList;

  // Sinkronisasi otomatis URL browser berdasarkan state currentPage dengan format nama role masing-masing
  useEffect(() => {
    let path = "/landingpage";
    if (currentPage === "pesanmenu") path = "/pesanmenu";
    else if (currentPage === "login") path = "/login";
    else if (currentPage === "waiter-dashboard") path = "/dashboardwaiter";
    else if (currentPage === "chef-dashboard") path = "/dashboardkoki";

    window.history.pushState({ page: currentPage }, "", path);
  }, [currentPage]);

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
          onNavigateToPesanMenu={() => setCurrentPage("pesanmenu")}
          menuList={menuList}
        />
      )}

      {currentPage === "pesanmenu" && (
        <PesanMenu
          menuList={menuList}
          orders={orders}
          setOrders={setOrders}
          onNavigateToHome={() => setCurrentPage("landing")}
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
          menuList={menuList}
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
