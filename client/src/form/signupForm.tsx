import { NavLink ,useNavigate } from "react-router";
import { InputField } from "./FormField";
import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  ChefHat
} from "lucide-react";

// custom type untuk menunjukan error duplikat
type FieldErrors = Partial<Record<"restaurantName" | "username" | "email" | "password" | "confirmPassword", string>>;

class SignupRequestError extends Error {
    fieldErrors?: FieldErrors;

    constructor(message: string, fieldErrors?: FieldErrors) {
        super(message);
        this.name = "SignupRequestError";
        this.fieldErrors = fieldErrors!;
    }
}

export default function SignupForm(){
    // inputed value
    const [signupVal, setSignupVal] = useState({
        restaurantName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    // error message
    const [validationError, setValidationError] = useState({
        passErr: "",
        restoErr: "",
        userErr: "",
        emailErr: "",
    });

    // logika respon dari server
    const navigate = useNavigate();

    const signupMutation = useMutation<{ restaurantId: number }, SignupRequestError, Omit<typeof signupVal, "confirmPassword">>({
        mutationFn: async (signupData) => {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupData),
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({})) as {
                    message?: string;
                    fieldErrors?: FieldErrors;
                };
                throw new SignupRequestError(
                    error.message ?? "Signup failed. Please try again.",
                    error.fieldErrors,
                );
            }

            return response.json();
        },

        onSuccess: () => navigate("/login"),
        onError: (error) => {
            setValidationError((current) => ({
                ...current,
                restoErr: error.fieldErrors?.restaurantName ?? "",
                userErr: error.fieldErrors?.username ?? "",
                emailErr: error.fieldErrors?.email ?? "",
                passErr: error.fieldErrors?.password ?? "",
            }));
        },
    });

    // logika submit form
    function handleSubmit(e: SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        setValidationError({
            passErr: "",
            restoErr: "",
            userErr: "",
            emailErr: ""
        });
        if (signupVal.password !== signupVal.confirmPassword) {
            setValidationError(prev => ({...prev, passErr: "Passwords do not match."}));
            return;
        } else if (signupVal.password.length < 8) {
            setValidationError(prev => ({...prev, passErr: "Password must be at least 8 characters."}));
            return;
        } else if (signupVal.restaurantName.trim() === "") {
            setValidationError(prev => ({...prev, restoErr: "Restaurant name is required."}));
            return;
        } else if (signupVal.username.trim() === "") {
            setValidationError(prev => ({...prev, userErr: "Username is required."}));
            return;
        } else if (signupVal.email.trim() === "") {
            setValidationError(prev => ({...prev, emailErr: "Email is required."}));
            return;
        }

        signupMutation.mutate({
            restaurantName: signupVal.restaurantName,
            username: signupVal.username,
            email: signupVal.email,
            password: signupVal.password,
        });
    }

    return(
        <form className="flex flex-col p-8 bg-white w-110 rounded-4xl shadow" onSubmit={handleSubmit} noValidate>

            {/* Logo dan Judul */}
            <div className="text-center space-y-1 mb-4">
                <div className="inline-flex text-[#9e6d3b] mb-1">
                    <ChefHat className="w-12 h-12 stroke-[1.6]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-900 tracking-tight">
                    Buat Akun Baru
                </h2>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                    DAFTARKAN RESTORAN ANDA DAN MULAI KELOLA DAPUR ANDA
                </p>
            </div>

            <hr className="text-gray-300 mb-4"/>

            {/* global error message */}
            {signupMutation.error && !signupMutation.error.fieldErrors &&
                <div className="mb-2 p-3 bg-red-200 rounded-xl text-red-700 text-xs">
                    <p role="alert">{signupMutation.error.message}</p>
                </div>
            }

            {/* Input Fields */}
            <InputField
                textColor="black"
                label="Restaurant Name"
                type="text"
                required
                value={signupVal.restaurantName}
                onChange={
                    (e: ChangeEvent<HTMLInputElement>) => {
                        setSignupVal({...signupVal, restaurantName: e.target.value})
                    }
                }
                error={validationError.restoErr}
            />
            <InputField
                textColor="black"
                label="Username"
                type="text"
                required
                value={signupVal.username}
                onChange={
                    (e: ChangeEvent<HTMLInputElement>) => {
                        setSignupVal({...signupVal, username: e.target.value})
                    }
                }
                error={validationError.userErr}
            />
            <InputField
                textColor="black"
                label="Email"
                type="email"
                required
                value={signupVal.email}
                onChange={
                    (e: ChangeEvent<HTMLInputElement>) => {
                        setSignupVal({...signupVal, email: e.target.value})
                    }
                }
                error={validationError.emailErr}
            />
            <InputField
                textColor="black"
                label="Password"
                type="password"
                required
                minLength={8}
                value={signupVal.password}
                onChange={
                    (e: ChangeEvent<HTMLInputElement>) => {
                        setSignupVal({...signupVal, password: e.target.value})
                    }
                }
                error={validationError.passErr}
            />
            <InputField
                textColor="black"
                label="Confirm Password"
                type="password"
                required
                minLength={8}
                value={signupVal.confirmPassword}
                onChange={
                    (e: ChangeEvent<HTMLInputElement>) => {
                        setSignupVal({...signupVal, confirmPassword: e.target.value})
                    }
                }
                error={validationError.passErr}
            />

            <hr className="text-gray-300 mt-4"/>

            <button type="submit" disabled={signupMutation.isPending} className="bg-[#e6a23c] hover:bg-[#d49b3a] cursor-pointer text-center py-2.5 shadow-lg rounded-xl disabled:opacity-60 text-sm mt-6 text-white font-semibold">
                {signupMutation.isPending ? "Creating account..." : "Sign Up"}
            </button>

            <p className="text-sm text-gray-600 text-center pt-4">
                Kembali ke halaman{" "}
                <NavLink to="/login" className="text-amber-500 hover:underline">
                    Login
                </NavLink>
            </p>
        </form>
    )
}