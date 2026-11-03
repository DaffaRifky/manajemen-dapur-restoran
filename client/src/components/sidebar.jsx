import { NavLink, useLocation } from "react-router";
import { appRoutes, subAppRoutes } from "../routes/routes";
import { IdCard, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Sidebar(){
    // styling tailwind
    const line = "w-full mx-auto rounded-2xl opacity-50"
    const button = "block text-left p-1.5 mt-2 rounded-xl hover:cursor-pointer"
    const unactivebutton = `${button} hover:bg-[#596475] text-white`
    const activeButton = `${button} bg-[#e6a23c] text-black`

    // hooks, variables, and functions
    const [ddActive, setddActive] = useState(false) // check apakah dropdown aktif
    function handleDD(){
        setddActive((active) => !active) // mengubah isi ddActive menjadi true dan sebaliknya
    }

    const location = useLocation();
    const isStaffRoute = subAppRoutes.some(({ path }) => location.pathname === path);
    const staffOpen = ddActive || isStaffRoute; // check apakah dropdown aktif atau link didalam dropdown aktif

    return(
        <nav className="flex flex-col h-screen w-64 fixed inset-y-0 left-0 overflow-y-auto bg-[#1F2232] text-white border-r-2 border-black px-4">

            {/* top */}
            <p className="bg-[#E6A23C] p-2 my-2 text-xl mx-auto text-black">LOGO</p>

            <hr className={line}/> {/* pembatas */}
            {/* middle */}
            {appRoutes.map(({ label, path, icon }) => (
                <NavLink
                key={path}
                to={path}
                className={({ isActive }) => isActive ? activeButton : unactivebutton }>
                    <div className="flex flex-row gap-2">
                        {icon}
                        {label}
                    </div>
                </NavLink>
            ))}

            <button
            onClick={handleDD}
            className={ unactivebutton }
            disabled={isStaffRoute}>
                <div className="flex flex-row gap-2">
                    <IdCard />
                    Staff
                    <div className="ml-auto">
                        {staffOpen ? <ChevronUp /> : <ChevronDown />}
                    </div>
                </div>
            </button>

            {staffOpen &&
                <div className="flex flex-row">
                    <div className="w-0.5 h-30 bg-amber-50 my-2.25 mx-4 rounded-2xl"></div>
                    <div className="w-full">
                        {subAppRoutes.map(({ label, path, icon }) => (
                            <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>isActive ? activeButton : unactivebutton }>
                                <div className="flex flex-row gap-2">
                                    {icon}
                                    {label}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            }

            <hr className={`${line} mt-auto`}/> {/* pembatas */}
            {/* bottom */}
            <NavLink to={"/"} className="hover:bg-red-500/30 text-red-500 text-left p-1.5 my-2 rounded-xl ">Logout</NavLink> {/* logout */}
        </nav>
    )
}