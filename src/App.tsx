import { Suspense, useState } from "react";
import { useRoutes, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import PaymentPage from "./components/PaymentPage";
import ControlDashboard from "./components/ControlDashboard";
import TokenPurchase from "./components/TokenPurchase";
import TermsAndPolicy from "./components/TermsAndPolicy";
import routes from "tempo-routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userTokens, setUserTokens] = useState(0);
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    console.log('Login:', { email, password });
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleRegister = (email: string, password: string, username: string) => {
    console.log('Register:', { email, password, username });
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleTokenPurchase = (tokenAmount: number) => {
    setUserTokens(prev => prev + tokenAmount);
    navigate('/dashboard');
  };

  return (
    <Suspense fallback={<div className="min-h-screen ultra-dark-bg flex items-center justify-center"><p className="text-white">Loading...</p></div>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              <LoginForm 
                onLogin={handleLogin}
                onSwitchToRegister={() => navigate('/register')}
              />
            } 
          />
          <Route 
            path="/register" 
            element={
              <RegisterForm 
                onRegister={handleRegister}
                onSwitchToLogin={() => navigate('/login')}
              />
            } 
          />
          <Route 
            path="/tokens" 
            element={<TokenPurchase onPurchase={handleTokenPurchase} />} 
          />
          <Route 
            path="/dashboard" 
            element={<ControlDashboard tokenBalance={userTokens} />} 
          />
          <Route 
            path="/terms" 
            element={<TermsAndPolicy />} 
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;