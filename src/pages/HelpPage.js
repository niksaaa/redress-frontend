import React, { useState } from "react";
import "../styles/help-page.css";

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "Як зареєструватися на платформі?",
      answer:
        "Щоб створити обліковий запис, натисніть кнопку, яка нагадує людину, введіть необхідні дані (номер телефону, ім'я, email, пароль), є можливість увійти через електронну пошту.",
    },
    {
      question: "Що можна продавати на REDRESS?",
      answer:
        "Це онлайн-маркетплейс, де можна продавати вживаний одяг, взуття, аксесуари для жінок, чоловіків та дітей.",
    },
    {
      question: "Як зв'язатися зі службою підтримки?",
      answer:
        "Для того, щоб зв'язатися з службою підтримки достатньо написати нам на пошту або зателефонувати на один з контактних номерів.",
    },
    {
      question: "Як продати річ?",
      answer:
        "Для початку зареєструйся і ти зможеш побачити свій особистий кабінет, в ньому ти зможеш додавати нові товари для аукціону, а також для звичайного продажу.",
    },
    {
      question: "Які є способи оплати?",
      answer:
        "На нашій платформі задіяна функція банки, куди Ви зможете надсилати кошти для покупки речей та участі у аукціоні.",
    },
  ];

  return (
    <div className="help-container">
      <div className="help-content">
        <h1 className="help-title">
          Потрібна допомога? Перегляньте наші найчастіші питання
        </h1>

        <div className="faq-section">
          {faqItems.map((item, index) => (
            <div className="faq-item" key={index}>
              <h3 onClick={() => toggleAnswer(index)} className="faq-question">
                {item.question}
                <span
                  className={`arrows ${activeIndex === index ? "open" : ""}`}
                >
                  ▼
                </span>
              </h3>
              <p
                className={`faq-answer ${
                  activeIndex === index ? "visible" : "hidden"
                }`}
              >
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
