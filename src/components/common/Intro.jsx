import { useEffect, useRef, useState } from "react";

import { SITE } from "../../config/site.config.js";
import { getThemeConfig, THEME_STORAGE_KEY } from "../../config/themes.config.js";
import { INTRO_CONTENT, INTRO_RESULTS } from "../../content/intro.content.js";

import "./intro.scss";
const TYPING_DELAY = 1;
const RESULTS_DELAY = 10;
const RESULT_STAGGER = 15;
const THEME_TRANSITION_DELAY = 100;

export default function Intro({ onSelectTheme }) {
  const [typingText, setTypingText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const timersRef = useRef([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  const finishIntroInstantly = () => {
    clearAllTimers();
    setTypingText(INTRO_CONTENT.searchText);
    setShowResults(true);
    setVisibleCount(INTRO_RESULTS.length);
    setIsAnimationComplete(true);
  };

  const revealResultsSequentially = () => {
    setShowResults(true);

    INTRO_RESULTS.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleCount(index + 1);

        if (index === INTRO_RESULTS.length - 1) {
          setIsAnimationComplete(true);
        }
      }, RESULT_STAGGER * (index + 1));

      timersRef.current.push(timer);
    });
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypingText(INTRO_CONTENT.searchText);
      setShowResults(true);
      setVisibleCount(INTRO_RESULTS.length);
      setIsAnimationComplete(true);
      return () => clearAllTimers();
    }

    let index = 0;

    const typeNext = () => {
      if (index < INTRO_CONTENT.searchText.length) {
        setTypingText(INTRO_CONTENT.searchText.slice(0, index + 1));
        index += 1;

        const timer = setTimeout(typeNext, TYPING_DELAY);
        timersRef.current.push(timer);
        return;
      }

      const timer = setTimeout(() => {
        revealResultsSequentially();
      }, RESULTS_DELAY);

      timersRef.current.push(timer);
    };

    typeNext();

    return () => clearAllTimers();
  }, []);

  const applyTheme = (theme) => {
    setIsTransitioning(true);
    clearAllTimers();

    setTimeout(() => {
      sessionStorage.setItem(THEME_STORAGE_KEY, theme);
      onSelectTheme(theme);
    }, THEME_TRANSITION_DELAY);
  };

  const handleSkipIntro = (event) => {
    const clickedButton = event.target.closest(".intro__result-button");
    if (clickedButton) return;

    if (!isAnimationComplete) {
      finishIntroInstantly();
    }
  };

  return (
    <main
      className={`intro ${isTransitioning ? "intro--fade-out" : ""}`}
      onClick={handleSkipIntro}
      onTouchStart={handleSkipIntro}
    >
      <div className="intro__container">
        <header className="intro__hero">
          <h1 className="intro__title">
            {INTRO_CONTENT.title}
          </h1>
        </header>

        <section className="intro__search" aria-label="Recherche simulée">
          <div className="intro__searchbar">
            <span className="intro__search-icon" aria-hidden="true">⌕</span>
            <span className="intro__typing-text">{typingText}</span>

            {visibleCount === 0 && (
              <span className="intro__cursor" aria-hidden="true">
                |
              </span>
            )}
          </div>

          <p className="intro__eyebrow">{INTRO_CONTENT.eyebrow}</p>
          <p className="intro__theme-note">{INTRO_CONTENT.note}</p>

          {!isAnimationComplete && (
            <p className="intro__skip-hint">
              <span className="intro__skip-hint--mobile">
                Touchez pour passer l’animation
              </span>
              <span className="intro__skip-hint--desktop">
                Cliquez pour passer l’animation
              </span>
            </p>
          )}
        </section>

        <section
          className={`intro__results ${showResults ? "visible" : ""}`}
          aria-label="Résultats de recherche simulés"
        >
          <ul className="intro__results-list">
            {INTRO_RESULTS.map((result, index) => (
              <li
                key={result.theme}
                className={`intro__result-item intro__result-item--${result.theme} ${
                  index < visibleCount ? "visible" : ""
                }`}
              >
                <article className="intro__result-card">
                  <button
                    type="button"
                    onClick={() => applyTheme(result.theme)}
                    className="intro__result-button"
                    aria-label={`Choisir ${result.title}`}
                  >
                    <header className="intro__result-header">
                      <img
                        src={getThemeConfig(result.theme).icon}
                        alt=""
                        className="intro__result-logo"
                        aria-hidden="true"
                      />

                      <p className="intro__result-meta">
                        <span className="intro__result-domain">
                          {SITE.domain}/
                        </span>
                        <span className="intro__result-theme">
                          {result.meta}
                        </span>
                      </p>
                    </header>

                    <div className="intro__result-divider" aria-hidden="true">
                      <h2 className="intro__result-title">{result.title}</h2>
                      <p className="intro__result-description">
                        {result.description}
                      </p>
                    </div>
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
