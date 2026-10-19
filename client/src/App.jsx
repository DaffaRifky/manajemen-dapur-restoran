import React, { useState } from "react";
import LandingPage from "./LandingPage";
import Login from "./Login";
import WaiterDashboard from "./WaiterDashboard";
import ChefDashboard from "./ChefDashboard";
import PesanMenu from "./PesanMenu";

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [loggedInUser, setLoggedInUser] = useState("csdc");

  // State Pesanan Bersama (Shared State antara Pelanggan, Waiter & Chef)
  const [orders, setOrders] = useState([]);

  // State menuList 40 Menu untuk Sinkronisasi Ketersediaan Menu
  const [menuList, setMenuList] = useState([
    // 20 Makanan
    {
      id: 1,
      name: "Nasi Goreng Special",
      category: "Makanan",
      price: 25000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Ayam Bakar Madu",
      category: "Makanan",
      price: 32000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Mie Goreng Jawa",
      category: "Makanan",
      price: 23000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Sate Ayam Madura",
      category: "Makanan",
      price: 28000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      name: "Bebek Goreng",
      category: "Makanan",
      price: 38000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1514944298352-fff884140a3e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      name: "Soto Ayam Lamongan",
      category: "Makanan",
      price: 22000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      name: "Bakso Sapi Urat",
      category: "Makanan",
      price: 20000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      name: "Gado-Gado Jakarta",
      category: "Makanan",
      price: 18000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      name: "Nasi Uduk Komplit",
      category: "Makanan",
      price: 24000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      name: "Capcay Kuah Seafood",
      category: "Makanan",
      price: 27000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 11,
      name: "Nasi Padang Rendang",
      category: "Makanan",
      price: 30000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 12,
      name: "Kwetiau Goreng",
      category: "Makanan",
      price: 23000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 13,
      name: "Ikan Gurame Bakar",
      category: "Makanan",
      price: 65000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1514944298352-fff884140a3e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 14,
      name: "Nasi Campur Bali",
      category: "Makanan",
      price: 32000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 15,
      name: "Ayam Penyet Sambal Ijo",
      category: "Makanan",
      price: 26000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 16,
      name: "Soup Buntut Sapi",
      category: "Makanan",
      price: 45000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 17,
      name: "Mie Ayam Jamur",
      category: "Makanan",
      price: 19000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 18,
      name: "Nasi Goreng Seafood",
      category: "Makanan",
      price: 29000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 19,
      name: "Tahu Telor Asin",
      category: "Makanan",
      price: 21000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 20,
      name: "Bubur Ayam Special",
      category: "Makanan",
      price: 17000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    },

    // 20 Minuman
    {
      id: 21,
      name: "Es Teh Manis",
      category: "Minuman",
      price: 6000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 22,
      name: "Jus Jeruk Segar",
      category: "Minuman",
      price: 14000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 23,
      name: "Es Jeruk Nipis",
      category: "Minuman",
      price: 10000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 24,
      name: "Es Campur Bandung",
      category: "Minuman",
      price: 18000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 25,
      name: "Jus Alpukat",
      category: "Minuman",
      price: 16000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 26,
      name: "Es Teler Special",
      category: "Minuman",
      price: 19000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 27,
      name: "Kopi Susu Gula Aren",
      category: "Minuman",
      price: 20000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 28,
      name: "Teh Tawar Hangat",
      category: "Minuman",
      price: 4000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 29,
      name: "Es Lemon Tea",
      category: "Minuman",
      price: 12000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 30,
      name: "Jus Mangga",
      category: "Minuman",
      price: 17000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 31,
      name: "Es Kelapa Muda",
      category: "Minuman",
      price: 15000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 32,
      name: "Soda Gembira",
      category: "Minuman",
      price: 16000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 33,
      name: "Milkshake Chocolate",
      category: "Minuman",
      price: 22000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 34,
      name: "Milkshake Strawberry",
      category: "Minuman",
      price: 22000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 35,
      name: "Wedang Jahe",
      category: "Minuman",
      price: 12000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 36,
      name: "Bajigur Hangat",
      category: "Minuman",
      price: 13000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 37,
      name: "Es Lychee Tea",
      category: "Minuman",
      price: 18000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 38,
      name: "Jus Jambu Merah",
      category: "Minuman",
      price: 15000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 39,
      name: "Mineral Water 600ml",
      category: "Minuman",
      price: 5000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 40,
      name: "Es Timun Suri",
      category: "Minuman",
      price: 14000,
      isAvailable: true,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
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
          setMenuList={setMenuList}
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
