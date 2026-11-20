import { useState } from "react";
import { useNavigate, NavLink } from "react-router";
import { InputField } from "./FormField";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { ChefHat } from "lucide-react";

export default function LoginForm(){
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, password }),
            });

            const body = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(body.message ?? "Login failed.");
            }

            const { error } = await supabase.auth.setSession({
                access_token: body.access_token,
                refresh_token: body.refresh_token,
            });

            if (error) throw new Error("Could not create a login session.");
            return body;
        },
        onSuccess: () => {
            navigate("/dashboard")
            console.log("Login successful")
        },
    });

    function handleSubmit(event) {
        event.preventDefault();
        loginMutation.mutate();
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col p-8 bg-white w-110 rounded-4xl shadow">

            {/* Logo dan Judul */}
            <div className="text-center space-y-1 mb-4">
                <div className="inline-flex text-[#9e6d3b] mb-1">
                    <ChefHat className="w-12 h-12 stroke-[1.6]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-900 tracking-tight">
                    Selamat Datang
                </h2>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                    MASUK DAN MULAI KELOLA DAPUR ANDA
                </p>
            </div>

            <hr className="text-gray-300 mb-4"/>

            {loginMutation.error && !loginMutation.error.fieldErrors &&
                <div className="mb-2 p-3 bg-red-200 rounded-xl text-red-700 text-xs">
                    <p role="alert">{loginMutation.error.message}</p>
                </div>
            }

            <InputField
                textColor="black"
                label="Username or Email"
                type="text"
                required
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
            />
            <InputField
                textColor="black"
                label="Password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <hr className="text-gray-300 mt-2 mb-4"/>

            <button type="submit" disabled={loginMutation.isPending} className="bg-[#e6a23c] text-center py-2 rounded-xl disabled:opacity-60 text-sm text-white font-semibold transition hover:bg-[#d49b3a] shadow-lg">
                {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-gray-600 text-center pt-4">
                Belum punya akun?{" "}
                <NavLink to="/signup" className="text-amber-500 hover:underline">
                    Daftar di sini
                </NavLink>
            </p>
        </form>
    )
}