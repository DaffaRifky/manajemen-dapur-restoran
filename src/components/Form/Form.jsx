import "../../tailwind.css"

export default function Form(props) {
  const inputStyle = "rounded-xl w-85 px-4 py-2 bg-gray-300 focus:outline-none focus:ring-none text-sm"
  return (

    <div className="flex min-h-screen justify-center items-center content-center">
      <div className="h-120 w-100 rounded-4xl bg-slate-800 flex flex-col justify-center items-center">
        <form onSubmit={props.handleSubmit}>

          {/* Username Input */}
          <div className="flex flex-col gap-2 mb-4" id="name-input-form">
            <label className="text-white text-sm font-medium" htmlFor="username">Username</label>
            <input type="text" className={inputStyle} value={props.username} onChange={props.handleUsernameInput} />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2 text-sm mb-4" id="pass-input-form">
            <label className="text-white text-sm font-medium" htmlFor="password">Password</label>
            <input type="password" className={inputStyle} value={props.password} onChange={props.handlePasswordInput} />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col gap-2 text-sm mt-8" >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl w-85">
              {props.submitButtonText}
            </button>
          </div>

        </form>

        {/* register/login toggle */}
        <div className="mt-4 flex flex-row gap-2 text-xs">
          <p className="text-white">{props.Text}</p>
          <button onClick={props.handleText} className="text-blue-500 hover:text-blue-700">
            {props.toggleBtnText}
          </button>
        </div>

      </div>
    </div>

  )
}
