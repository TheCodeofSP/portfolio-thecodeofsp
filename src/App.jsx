import { useEffect, useState } from "react";

import Intro from "./components/common/Intro.jsx";
import {
  DEFAULT_THEME,
  THEME_IDS,
  THEME_STORAGE_KEY,
  isTheme,
  normalizeTheme,
} from "./config/themes.config.js";
import AppRouter from "./routes/AppRouter.jsx";
import { trackEvent } from "./utils/analytics.js";

import "./app.scss";

function readStoredTheme() {
  const storedTheme = sessionStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme ? normalizeTheme(storedTheme) : null;
}

function App() {
  const [theme, setTheme] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const storedTheme = readStoredTheme();

    if (storedTheme) {
      setTheme(storedTheme);
      setShowIntro(false);
    }
  }, []);

  useEffect(() => {
    const selectedTheme = theme ? normalizeTheme(theme) : null;
    const roots = [document.documentElement, document.body];

    roots.forEach((root) => {
      THEME_IDS.forEach((themeId) => root.classList.remove(`theme-${themeId}`));
    });

    if (selectedTheme) {
      roots.forEach((root) => root.classList.add(`theme-${selectedTheme}`));
      sessionStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
    }

    return () => {
      roots.forEach((root) => {
        THEME_IDS.forEach((themeId) => root.classList.remove(`theme-${themeId}`));
      });
    };
  }, [theme]);

  const handleThemeSelect = (selectedTheme) => {
    if (!isTheme(selectedTheme)) return;

    setTheme(selectedTheme);
    setShowIntro(false);
    trackEvent("theme_selected", { theme_name: selectedTheme });
  };

  const resetIntro = () => {
    sessionStorage.removeItem(THEME_STORAGE_KEY);
    setTheme(null);
    setShowIntro(true);
  };

  if (showIntro) {
    return <Intro onSelectTheme={handleThemeSelect} />;
  }

  return <AppRouter theme={theme || DEFAULT_THEME} resetIntro={resetIntro} />;
}

export default App;
