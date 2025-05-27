import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/registration-form.css";

const RegistrationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, password } = location.state || {};

  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nickname || !phone || !gender || !email || !password) {
      setError("Будь ласка, заповніть усі поля.");
      return;
    }
  
    const registrationData = {
      Username: nickname,  // змінили nickname на Username
      Email: email,
      PhoneNumber: phone,
      PasswordHash: password,  // змінили password на PasswordHash
      Role: UserRole.Regular,  
      Sex: gender === "male" ? Sex.Male : gender === "female" ? Sex.Female : Child // адаптували gender до Sex
    };
  
    try {
      setLoading(true);
      setError("");
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Auth/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Помилка реєстрації");
      }
  
      alert("Реєстрація пройшла успішно!");
      navigate("/");
    } catch (err) {
      setError(err.message || "Сталася помилка під час реєстрації");
    } finally {
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
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <span className="text-wrapper-3">Номер телефону*</span>
        <div className="number-input-container">
          <input
            className="number-input"
            type="text"
            placeholder="+380999999999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <span className="text-wrapper-4">Стать</span>
        <div className="sex-input-container">
          <select
            className="sex-input"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled hidden>
              Оберіть стать
            </option>
            <option value="male">Чоловік</option>
            <option value="female">Жінка</option>
            <option value="">-</option>
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
