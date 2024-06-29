import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <small>
        <div className="footer-content">
          <span>&copy; Centro Deportivo</span>
          <span className="separator">|</span>
          <a href="tel:+543804893207" className="contact-link">
            <span className="fa fa-phone"></span>
            54-351-2535003
          </a>
          <span className="separator">|</span>
          <span>Seguinos en:</span>
          <div className="social-links">
            <a
              className="redes facebook"
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i title="Facebook" className="fab fa-facebook-f"></i>
            </a>
            <a
              className="redes twitter"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i title="Twitter" className="fab fa-twitter"></i>
            </a>
            <a
              className="redes instagram"
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i title="Instagram" className="fab fa-instagram"></i>
            </a>
            <a
              className="redes whatsapp"
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i title="Whatsapp" className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </small>
    </footer>
  );
}

export { Footer };