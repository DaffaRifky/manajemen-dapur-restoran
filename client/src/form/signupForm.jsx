import { NavLink, useNavigate } from "react-router";
import { InputField } from "./FormField";
import { useState } from "react";

export default function LoginForm(){
    // menyimpan data yang diinput
    const [signupVal, setSignupVal] = useState({
        restaurantName: "",
        username: "",
        email: "",
        pass: "",
        passConfirm: "",
    })

    // const navigate = useNavigate();

    // function handleSignup(e){
    //     e.preventDefault();
    //     const { restaurantName, username, email, pass, passConfirm } = signupVal;
    // }

    return(
        <form action="" className="flex flex-col p-8 bg-[#1F2232] w-100 rounded-xl">
            <InputField
                textColor="white"
                label="Restaurant Name"
                type="text"
                value={signupVal.restaurantName}
                onChange={e => {setSignupVal({...signupVal, restaurantName: e.target.value})}}
            />
            <InputField
                textColor="white"
                label="Username"
                type="text"
                value={signupVal.username}
                onChange={e => {setSignupVal({...signupVal, username: e.target.value})}}
            />
            <InputField
                textColor="white"
                label="Email"
                type="text"
                value={signupVal.email}
                onChange={e => {setSignupVal({...signupVal, email: e.target.value})}}
            />
            <InputField
                textColor="white"
                label="Password"
                type="password"
                value={signupVal.pass}
                onChange={e => {setSignupVal({...signupVal, pass: e.target.value})}}
            />
            <InputField
                textColor="white"
                label="Confirm Password"
                type="password"
                value={signupVal.passConfirm}
                onChange={e => {setSignupVal({...signupVal, passConfirm: e.target.value})}}
            />

            <NavLink to={"/"} className="bg-[#e6a23c] text-center py-2 rounded-xl">SignUp</NavLink>
        </form>
    )
}