import { useState } from "react";
import { NavLink } from "react-router-dom";

import { MAIN_NAVIGATION } from "../../config/site.config.js";
import { classNames } from "../../utils/classNames.js";

import "./navbar.scss";

export default function Navbar({ resetIntro }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

  const handleThemeReset = () => {
    closeMenu();
    resetIntro();
  };

  return (
    <nav
      className={classNames("navbar", isMenuOpen && "navbar--open")}
      aria-label="Navigation principale"
    >
      <button
        type="button"
        className={classNames("navbar__burger", isMenuOpen && "is-open")}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation"
      >
        <span className="navbar__icon navbar__icon--burger" aria-hidden="true">
          ☰
        </span>
        <span className="navbar__icon navbar__icon--close" aria-hidden="true">
          ×
        </span>
      </button>

      <div
        className={classNames("navbar__overlay", isMenuOpen && "is-visible")}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <ul id="main-navigation" className="navbar__list">
        {MAIN_NAVIGATION.map(({ label, to }) => (
          <li className="navbar__item" key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                classNames("navbar__link", isActive && "active")
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          </li>
        ))}

        <li className="navbar__item">
          <button
            type="button"
            className="navbar__link navbar__link--theme"
            onClick={handleThemeReset}
          >
            Changer d’univers
          </button>
        </li>
      </ul>
    </nav>
  );
}
