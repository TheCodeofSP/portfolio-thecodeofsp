import { Link } from "react-router-dom";

import { SITE } from "../../config/site.config.js";
import { getThemeConfig } from "../../config/themes.config.js";
import Navbar from "./Navbar.jsx";

import "./header.scss";

export default function Header({ resetIntro, theme }) {
  const { headerLogo } = getThemeConfig(theme);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo-link" aria-label="Retour à l’accueil">
          <img src={headerLogo} alt={SITE.name} className="header__logo" />
        </Link>

        <Navbar resetIntro={resetIntro} />
      </div>
    </header>
  );
}
