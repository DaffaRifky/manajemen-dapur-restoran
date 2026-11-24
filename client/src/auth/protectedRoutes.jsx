import { useState ,useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Navigate, useLocation, Outlet } from "react-router";

export default function ProtectedRoutes(){
    const authed = "authed"
    const unauthed = "unauthed"
    const [status, setStatus] = useState("unauthenticated")
    const location = useLocation()

    useEffect(() => {
        let isMounted = true

        supabase.auth.getSession().then(({data, error}) => {
            if (!isMounted) return;
            setStatus(error || !data.session ? unauthed : authed)
        });

        const {data: {subscription}, } = supabase.auth.onAuthStateChange((_event, session) => {
            if (isMounted) {
                setStatus(session ? authed : unauthed)
            }
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        }
    }, []);

    if (status === unauthed) {
        return (
            <Navigate
                to = "/login"
                replace
                state = {{from: location.pathname}}
            />
        )
    }

    return <Outlet />
}