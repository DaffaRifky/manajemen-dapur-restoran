// import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";

export default function Layout(){
    // logout logic
    const navigate = useNavigate()
    async function handleLogout() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout failed:", error.message);
        }

        // checking if the logout succes or not
        const { data } = await supabase.auth.getSession();

        if (data.session !== null) {
            console.error("Logout verification failed: a session still exists");
            return;
        }

        console.log("Logout successful");

        navigate("/login", { replace: true });
    }

    // protected route
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) {
                navigate("/login", { replace: true });
            }
        })
    })

    return (
    <div>
        <Sidebar
            handleLogout={handleLogout}
        />
        <Navbar><p className="text-3xl">Header</p></Navbar>
        <main className="ml-64 p-8">
            <Outlet />
        </main>
    </div>
    );
}
