// components/RecipientInfo.js
import React, { useState } from "react";
import "../styles/recipient-info.css";

const RecipientInfo = ({ phoneNumber }) => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    phone: { phoneNumber },
  });

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    phone: "",
  });

  const validateLastName = (value) => {
    if (!value.trim()) return "Прізвище обов'язкове";
    if (!/^[А-Яа-яЄєІіЇїҐґ'\s-]+$/.test(value))
      return "Тільки українські літери";
    return "";
  };

  const validateFirstName = (value) => {
    if (!value.trim()) return "Ім'я обов'язкове";
    if (!/^[А-Яа-яЄєІіЇїҐґ'\s-]+$/.test(value))
      return "Тільки українські літери";
    return "";
  };

  const validateMiddleName = (value) => {
    if (value && !/^[А-Яа-яЄєІіЇїҐґ'\s-]*$/.test(value))
      return "Тільки українські літери";
    return "";
  };

  const validatePhone = (value) => {
    if (!value.trim()) return "Телефон обов'язковий";
    if (!/^\+380\d{9}$/.test(value)) return "Формат: +380XXXXXXXXX";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change
    let error = "";
    switch (name) {
      case "lastName":
        error = validateLastName(value);
        break;
      case "firstName":
        error = validateFirstName(value);
        break;
      case "middleName":
        error = validateMiddleName(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "lastName":
        error = validateLastName(value);
        break;
      case "firstName":
        error = validateFirstName(value);
        break;
      case "middleName":
        error = validateMiddleName(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div className="recipient-container">
      <h2 className="recipient-title">Отримувач</h2>
      
      <div className="recipient-fields">
        <div className="fields-row">
          <div className="field-group">
            <label className="field-label">Прізвище*</label>
            <div className="field-input-wrapper">
              <input
                type="text"
                className={`field-input ${errors.lastName ? "error" : ""}`}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Введіть ваше прізвище"
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Ім'я*</label>
            <div className="field-input-wrapper">
              <input
                type="text"
                className={`field-input ${errors.firstName ? "error" : ""}`}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Введіть ваше ім'я"
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
          </div>
        </div>

        <div className="fields-row">
          <div className="field-group">
            <label className="field-label">По батькові</label>
            <div className="field-input-wrapper">
              <input
                type="text"
                className={`field-input ${errors.middleName ? "error" : ""}`}
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Введіть по батькові (необов'язково)"
              />
              {errors.middleName && <span className="error-message">{errors.middleName}</span>}
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Телефон*</label>
            <div className="field-input-wrapper">
              <input
                type="tel"
                className={`field-input ${errors.phone ? "error" : ""}`}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+380XXXXXXXXX"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientInfo;
