import React from "react";

function Footer() {
  return (
    <footer className="footer footer-center bg-base-100 text-base-content p-4 absolute bottom-0">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Ritik
          Raj
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
