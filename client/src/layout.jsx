import { Outlet } from "react-router";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

export default function Layout(){

    return (
    <div>
        <Sidebar />
        <Navbar><p className="text-3xl">Header</p></Navbar>
        <main className="ml-64 p-8">
            <Outlet />
        </main>
    </div>
    );
}
