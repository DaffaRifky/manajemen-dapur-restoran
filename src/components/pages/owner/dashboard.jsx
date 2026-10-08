import "../../../tailwind.css"
import { useContext } from "react"
import { useNavigate } from "react-router"
import { DashboardContext } from "../../../components/Contexts/Context.jsx"

export default function Dashboard() {

    const { user, logout } = useContext(DashboardContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmation = confirm('Are you sure you wanna logout?');
        if (confirmation) {
            logout(); // Remove token from localStorage
            navigate('/'); // Redirect to home page (login screen)
        }
    };

    return (
        <div className='flex min-h-screen justify-center items-center content-center'>
            <div className='h-120 w-100 rounded-4xl bg-slate-800 flex flex-col justify-center items-center'>
                <h1 className='text-white text-2xl font-bold mb-4'>Dashboard</h1>
                <p className='text-white text-sm'>Welcome to the dashboard, {user.user || 'Guest'}!</p>
                <button onClick={handleLogout} className='mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                    Logout
                </button>
            </div>
        </div>
    )
}