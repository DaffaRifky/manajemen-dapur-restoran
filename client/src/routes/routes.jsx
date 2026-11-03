// import lucide icons 
import {
  LayoutDashboard,
  BookOpen,
  HandPlatter,
  ChefHat,
  Coins,
  IdCard
} from "lucide-react"
// import pages
import Login from "../pages/login";
import Signup from "../pages/signup";
import Dashboard from "../pages/owner/dashboard/dashboard";
import Menu from "../pages/owner/menu/menu";
import Waiter from "../pages/owner/staff/waiterCRUD/waiter";
import Chef from "../pages/owner/staff/chefCRUD/chef";
import Cashier from "../pages/owner/staff/cashierCRUD/cashier";

// rute yang bisa diakses semua orang
export const publicRoutes = [
  { path: "/",  element: <Login /> },
  { path: "/signup", element: <Signup />},
];

// rute yang hanya bisa diakses oleh pengguna yg login
export const appRoutes = [
  { path: "/dashboard", element: <Dashboard />, label: "Dashboard", icon: <LayoutDashboard /> },
  { path: "/menu", element: <Menu />, label: "Menu", icon: <BookOpen /> },
];

export const subAppRoutes = [
  { path: "/staff/waiter", element: <Waiter />, label: "Waiter", icon: <HandPlatter /> },
  { path: "/staff/chef", element: <Chef />, label: "Chef", icon: <ChefHat /> },
  { path: "/staff/cashier", element: <Cashier />, label: "Cashier", icon: <Coins /> },
]