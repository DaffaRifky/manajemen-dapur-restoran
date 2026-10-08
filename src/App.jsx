import MainPage from "./components/pages/login.jsx";
import Dashboard from "./components/pages/owner/dashboard.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { DashboardProvider } from "./components/Providers/Provider.jsx";

function App() {
  return (
    <Router>

      <DashboardProvider>
        <Routes>
          <Route path='/' element={<MainPage />} />

          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </DashboardProvider>
    </Router>
  );
}

export default App;