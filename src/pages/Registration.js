import React, { useState } from "react";
import "../styles/registration.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginClick = () => {
    navigate("/");
  };

  const handleRegistrationFormRedirect = () => {
    if (!email || !password) {
      setErrorMessage("Будь ласка, введіть email та пароль.");
      return;
    }

    // Передати email і пароль у форму (можна через state management або URL search params — тут через state):
    navigate("/registration-form", { state: { email, password } });
  };

  return (
    <main>
      <div className="background-image-1"></div>
      <div className="registration-form">
        <div className="background-1"></div>

        <div className="registration-btn-container">
          <button
            type="button"
            className="registration-btn"
            id="loginBtn"
            onClick={handleRegistrationFormRedirect}
          >
            Зареєструватися
          </button>
        </div>

        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
            {errorMessage}
          </div>
        )}

        <div className="login-container-1">
          <button
            type="button"
            className="login-option-button"
            onClick={handleLoginClick}
          >
            Вхід
          </button>
        </div>

        <div className="registration-container-1">
          <button
            type="button"
            className="registration-option-button"
            id="registrationOptionBtn"
          >
            Реєстрація
          </button>
        </div>

        <span className="registration-text">Електронна пошта*</span>
        <span className="password-text">Пароль*</span>

        <div className="registration-input-container">
          <input
            className="registration-input"
            type="text"
            placeholder="Введіть email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="password-input-container">
          <input
            className="password-input"
            type="password"
            placeholder="Введіть пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    </main>
  );
};

export default Registration;
