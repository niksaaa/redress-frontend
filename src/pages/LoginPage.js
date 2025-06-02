import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from '@react-oauth/google';
import { fetchProfile } from "../api/profile";
import "../styles/login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log('Рендер LoginPage', { isAuthenticated });

  const handleLogin = async () => {
    console.log('Обробка входу', { email, password });
    if (!email || !password) {
      const errorMsg = "Будь ласка, введіть email та пароль";
      console.warn(errorMsg);
      setErrorMessage(errorMsg);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    console.log('Початок процесу входу...');

    try {
      const response = await login({ email, password });
      console.log('Вхід успішний, перевіряємо роль користувача');
      
      // Отримуємо роль користувача з відповіді
      const userRole = response.user.role;
      
      // Перенаправляємо користувача в залежності від ролі
      switch (userRole) {
        case 0: // Адміністратор
          navigate("/admin");
          break;
        case 1: // Модератор
          navigate("/moderator");
          break;
        default: // Звичайний користувач
          navigate("/main-page");
          break;
      }
    } catch (error) {
      const errorMsg = error.message || "Помилка входу. Спробуйте ще раз.";
      console.error('Помилка входу:', errorMsg);
      setErrorMessage(errorMsg);
    } finally {
      console.log('Завершення процесу входу');
      setIsLoading(false);
    }
  };

  const handleRegistrationClick = () => {
    console.log('Перехід на сторінку реєстрації');
    navigate("/registration");
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await login({ idToken: credentialResponse.credential });
      
      // Отримуємо роль користувача з відповіді
      const userRole = response.data.role;
      
      // Перенаправляємо користувача в залежності від ролі
      switch (userRole) {
        case 0: // Адміністратор
          navigate("/admin");
          break;
        case 1: // Модератор
          navigate("/moderator");
          break;
        default: // Звичайний користувач
          navigate("/main-page");
          break;
      }
    } catch (error) {
      const errorMsg = error.message || "Помилка входу через Google. Спробуйте ще раз.";
      console.error('Помилка входу через Google:', errorMsg);
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setErrorMessage("Помилка входу через Google. Спробуйте ще раз.");
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
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="filled_blue"
            shape="rectangular"
            text="continue_with"
            locale="uk"
          />
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