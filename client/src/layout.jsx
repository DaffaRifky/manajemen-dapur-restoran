import { Outlet } from "react-router";
import Sidebar from "./components/sidebar";

export default function Layout(){

    return (
    <div>
        <Sidebar />
        <main className="ml-64 p-8">
            <Outlet />
        </main>
    </div>
    );
}
