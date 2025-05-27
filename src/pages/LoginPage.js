import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { login, isAuthenticated } from "../api/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated()) {
      navigate("/main-page");
    }
  }, [navigate]);

  const handleRegistrationClick = () => {
    navigate("/registration");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!email || !password) {
      setErrorMessage("Будь ласка, заповніть усі поля.");
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate("/main-page");
    } catch (error) {
      setErrorMessage(error.message || "Невірний email або пароль.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="background-image"></div>
      <div className="login-form">
        <div className="background"></div>
        <span className="additional">Не можете увійти? Забули пароль?</span>

        <div className="login-btn-container">
          <button
            type="button"
            className="login-btn"
            id="loginBtn"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Завантаження..." : "Увійти"}
          </button>
        </div>

        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
            {errorMessage}
          </div>
        )}

        <span className="or-text">або</span>
        <div className="facebook-auth-btn-container">
          <button className="facebook-auth-btn" id="facebookAuthBtn">
            <div className="facebook-auth-icon"></div>
            <span className="facebook-auth-text">Продовжити з Facebook</span>
          </button>
        </div>
        <div className="google-auth-btn-container">
          <button className="google-auth-btn" id="googleAuthBtn">
            <span className="google-auth-text">Продовжити з Google</span>
            <div className="google-auth-icon"></div>
          </button>
        </div>
        <div className="login-container">
          <button type="button" className="login-option-btn">
            Вхід
          </button>
        </div>
        <div className="registration-container">
          <button
            type="button"
            className="registration-option-btn"
            id="registrationOptionBtn"
            onClick={handleRegistrationClick}
          >
            Реєстрація
          </button>
        </div>
        <span className="login-text">Електронна пошта*</span>
        <span className="password-text">Пароль*</span>
        <div className="login-input-container">
          <input
            className="login-input"
            type="email"
            placeholder="Введіть email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="password-input-container">
          <input
            className="password-input"
            type="password"
            placeholder="Введіть пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
