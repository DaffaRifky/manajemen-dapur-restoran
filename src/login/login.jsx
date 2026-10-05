import "../tailwind.css"

function inputText(value, placeholder, onChange,) {
  return (
    <input
      type="text"
      className="rounded-xl w-85 px-4 py-2 bg-gray-300 focus:outline-none focus:ring-none text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default function Login(props) {

  return (

    <div className='flex min-h-screen justify-center items-center content-center'>
      <form className='h-120 w-100 rounded-4xl bg-slate-800 flex flex-col justify-center items-center' onSubmit={props.handleSubmit}>

        {/* Username Input */}
        <div className='flex flex-col gap-2 mb-4' id='name-input-form'>
          <label className='text-white text-sm font-medium' htmlFor="username">Username / Nama Restoran</label>
          {inputText(props.username, "Enter username or restaurant name", props.handleUsernameInput)}
        </div>

        {/* Password Input */}
        <div className='flex flex-col gap-2 text-sm mb-4' id='pass-input-form'>
          <label className='text-white text-sm font-medium' htmlFor="password">Password</label>
          {inputText(props.password, "Enter password", props.handlePasswordInput)}
        </div>

        {/* Login Button */}
        <div className='flex flex-col gap-2 text-sm mt-8' id='login-button-form'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl w-85'>
            Login
          </button>
        </div>

      </form>
    </div>

  )
}
