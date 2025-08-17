import { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./navigation.module.css";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={s.nav}>
      <div className={s.brand}>
        <span className={s.appName}>QR Generator</span>
      </div>

      <div className={`${s.links} ${isOpen ? s.active : ""}`}>
        <NavLink
          to="/generate"
          className={({ isActive }) => isActive ? `${s.navLink} ${s.activeLink}` : s.navLink}
          onClick={() => setIsOpen(false)}
        >
          Генерировать QR код
        </NavLink>
        <NavLink
          to="/scan"
          className={({ isActive }) => isActive ? `${s.navLink} ${s.activeLink}` : s.navLink}
          onClick={() => setIsOpen(false)}
        >
          Сканировать QR код
        </NavLink>
        <NavLink
          to="/scanHistory"
          className={({ isActive }) => isActive ? `${s.navLink} ${s.activeLink}` : s.navLink}
          onClick={() => setIsOpen(false)}
        >
          История сканирования
        </NavLink>
        <NavLink
          to="/generateHistory"
          className={({ isActive }) => isActive ? `${s.navLink} ${s.activeLink}` : s.navLink}
          onClick={() => setIsOpen(false)}
        >
          История генерирования
        </NavLink>
      </div>

      <button className={s.burger} onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
};
