import '../../tailwind.css'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DashboardContext } from '../Contexts/Context.jsx';
import Form from '../Form/Form.jsx';
import { loginUser, registerUser } from '../Services/Service.jsx';

export default function App() {
    // styling
    const errorStatus ="bg-red-500 text-white font-medium py-2 px-4 rounded-xl w-85 text-center";

    // hooks
    const {login} = useContext(DashboardContext);

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [data, setData] = useState("");
    const [err, setErr] = useState(null);

    const [isLoginMode, setLoginMode] = useState(true);

    const submitBtnText = isLoginMode ? 'Login' : 'Sign up';
    const toggleBtnText = isLoginMode ? 'Sign up' : 'Login';
    const modeText = isLoginMode ? 'No account yet?' : 'Already have an account?';

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const calledFunction = isLoginMode ? loginUser : registerUser;
            const result = await calledFunction(username, password);

            setData(result);

            if(result.token) {
                login(result.token);
                navigate('/dashboard');
            }
        } catch (error) {
            setErr(error.message);
        }
    };

    // Toggle between login and signup modes
    const handleSignUpText = () => {
    setLoginMode(prev => !prev);
    };

    // Handle input updates
    const handleUsernameInput = (e) => {
    setUsername(e.target.value);
    };

    const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    };

      return (
    <>
      {/* Display server messages */}

      {data.message && !data.success && (
        <div className={errorStatus}>
          {data.message}
        </div>
      )}

      {/* Our reusable form component */}
      <Form
        handleSubmit={handleSubmit}
        handleUsernameInput={handleUsernameInput}
        handlePasswordInput={handlePasswordInput}
        username={username}
        password={password}
        isLoginMode={isLoginMode}
        submitButtonText={submitBtnText}
        handleText={handleSignUpText}
        toggleBtnText={toggleBtnText}
        Text={modeText}
      />

    </>
  );
}


