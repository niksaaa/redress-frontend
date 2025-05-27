import React from "react";
import "../styles/footer.css"; // Якщо потрібні окремі стилі

const FooterDynamic = () => {
  return (
    <footer className="footer1">
      <div className="footer-top1">
        {/* ЗАГОЛОВКИ ТЕКСТІВ */}
        <div>
          <p className="text-elem11">Завантажуй прямо зараз</p>
          <p className="text-elem21">Купуй та продавай у будь-який час</p>
        </div>

        {/* СЛУЖБА ПІДТРИМКИ */}
        <nav className="additional-menu1">
          <span className="service1">Служба підтримки</span>
          <span className="policy1">Політика конфіденційності</span>
          <span className="contract1">Договір-оферта</span>
        </nav>

        {/* СОЦ. МЕРЕЖІ */}
        <section className="social-media1">
          <h3 className="sm-text1">Ми у соц. мережах</h3>
          <div className="sm-icons1">
            <div className="facebook-icon1"></div>
            <div className="instagram-icon1"></div>
            <div className="twitter-icon1"></div>
            <div className="youtube-icon1"></div>
          </div>
        </section>
      </div>

      <div className="footer-middle1">
        {/* ЗАВАНТАЖЕННЯ ДОДАТКУ */}
        <div className="download1">
          <div className="download-btn1"></div>
          <div className="download-img1"></div>
          <span className="download-text1">Завантажити додаток</span>
        </div>

        {/* КОНТАКТИ */}
        <section className="contacts1">
          <h2 className="contacts-text1">КОНТАКТИ</h2>
          <div className="contacts-info1">
            <span className="email1">Email: redress@gmail.com</span>
            <span className="numbers1">+380(66) 766-36-36</span>
            <span className="numbers1">+380(50) 766-36-36</span>
            <span className="numbers1">+380(95) 766-36-36</span>
          </div>
        </section>
      </div>

      <div className="footer-bottom1">
        <p className="text-elem31">
          Речі за покликом серця! Усі права захищені
        </p>
        <div className="copyright1">
          <div className="copyright-icon1"></div>
          <span className="copyright-text1">2025 REDRESS.UA</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterDynamic;
