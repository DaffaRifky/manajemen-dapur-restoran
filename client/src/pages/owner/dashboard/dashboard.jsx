import { Card } from "../../../components/cards"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { supabase } from "../../../lib/supabase"
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {

    const { data, isPending, error } = useQuery({
        queryKey: ["authed-user"],
        queryFn: async () => {
            const { data: { session }, error: sessionError } =
            await supabase.auth.getSession();

            if (sessionError) throw sessionError;
            if (!session) throw new Error("No active session");

            const response = await fetch("/api/auth/user", {
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
            });

            if (!response.ok) {
            throw new Error(`Could not load user (${response.status})`);
            }

            return response.json();
        },
    });

    return(
        <div className="grid gap-5 grid-cols-5">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <div className="bg-white shadow rounded-2xl w-full h-80 col-span-2 flex items-center justify-center ">
                <div className="bg-gray-300 hover:bg-gray-400 w-10 h-10 rounded-full shadow-md mr-auto -ml-5 flex items-center justify-center"><ChevronLeft /></div>
                <div className="bg-gray-300 hover:bg-gray-400 w-10 h-10 rounded-full shadow-md ml-auto -mr-5 flex items-center justify-center"><ChevronRight /></div>
            </div>
            <div className="bg-white shadow rounded-2xl w-full h-80 col-span-3">
            </div>
            <p>welcome {data?.user.username}</p>
            <p>you are logged in as the {data?.user.role} of {data?.restaurant.name} Restaurant</p>

        </div>
    )
}