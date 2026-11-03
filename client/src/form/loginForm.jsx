import { NavLink } from "react-router";
import { InputField } from "./FormField";

export default function LoginForm(){
    return(
        <form action="" className="flex flex-col p-8 bg-[#1F2232] w-100 rounded-xl">
            <InputField textColor="white" label="Email" type="email"/>
            <InputField textColor="white" label="Password" type="password"/>
            <p></p>

            <NavLink to={"/dashboard"} className="bg-[#e6a23c] text-center py-2 rounded-xl">Login</NavLink>
        </form>
    )
}