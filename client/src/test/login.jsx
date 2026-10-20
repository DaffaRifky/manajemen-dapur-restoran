import { useState } from "react";
import "../index.css"
export default function loginPage(props){
    return(
        <form className="bg-amber-950 w-5/12 h-100" onSubmit={props.handleSubmit}>
            <div className="">

                <input
                onChange={props.handleUsernameInput}  // update username state on change
                value={props.username} // controlled input by username state
                type='text'
                placeholder='Username' />

                <input
                onChange={props.handlePasswordInput} // update password state on change
                value={props.password} // controlled input by password state
                type='password'
                placeholder='Password' />
            </div>

            <button className="">
                {props.submitBtnText}
            </button>
        </form>
    )
}