import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/registration-form.css";

const RegistrationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const { email, password } = location.state || {};

  console.log('Рендер RegistrationForm', { email });

  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sex, setSex] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    console.log('Спроба реєстрації', { 
      username, 
      phoneNumber, 
      sex, 
      email 
    });

    if (!username || !phoneNumber || sex === null || sex === undefined) {
      const errorMsg = "Будь ласка, заповніть усі обов'язкові поля.";
      console.warn(errorMsg);
      setError(errorMsg);
      return;
    }

    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      const errorMsg = "Будь ласка, введіть коректний номер телефону.";
      console.warn(errorMsg);
      setError(errorMsg);
      return;
    }

    const userData = {
      Username: username,
      Email: email,
      PhoneNumber: phoneNumber,
      PasswordHash: password,
      Role: 2,
      Sex: sex
    };

    console.log('Дані для реєстрації:', userData);

    try {
      setLoading(true);
      setError("");
      console.log('Відправка даних на сервер...');

      await register(userData);
      console.log('Реєстрація успішна, перенаправляємо на головну');
      navigate("/");
    } catch (err) {
      const errorMsg = err.message || "Сталася помилка під час реєстрації";
      console.error('Помилка реєстрації:', errorMsg);
      setError(errorMsg);
    } finally {
      console.log('Завершення процесу реєстрації');
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="background-image-2"></div>
      <div className="registration-add-form">
        <div className="background-2"></div>

        <div className="login-container">
          <button
            type="button"
            className="login-option-btn-1"
            onClick={() => navigate("/")}
          >
            Вхід
          </button>
        </div>

        <div className="registration-container">
          <button
            type="button"
            className="registration-option-btn-1"
            onClick={() => navigate("/registration")}
          >
            Реєстрація
          </button>
        </div>

        <span className="text-wrapper-1">Заповніть додаткові дані</span>

        <span className="text-wrapper-2">Нікнейм*</span>
        <div className="username-input-container">
          <input
            className="username-input"
            type="text"
            placeholder="Введіть нікнейм"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <span className="text-wrapper-3">Номер телефону*</span>
        <div className="number-input-container">
          <input
            className="number-input"
            type="text"
            placeholder="+380999999999"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <span className="text-wrapper-4">Стать</span>
        <div className="sex-input-container">
          <select
            className="sex-input"
            required
            value={sex}
            onChange={(e) => setSex(Number(e.target.value))} 
          >
            <option value="" disabled hidden>
              Оберіть стать
            </option>
            <option value={0}>Чоловік</option>
            <option value={1}>Жінка</option>
            <option value={2}>-</option>
          </select>
        </div>

        {error && (
          <div style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </div>
        )}

        <div className="register-btn-container">
          <button
            type="button"
            className="register-btn"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Реєстрація..." : "Зареєструватися"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default RegistrationForm;