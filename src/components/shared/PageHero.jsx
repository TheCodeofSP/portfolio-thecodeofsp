import { classNames } from "../../utils/classNames.js";

export default function PageHero({ children, className, intro, kicker, title }) {
  return (
    <section className={classNames("portfolio-page-hero", className)}>
      <div className="portfolio-shell">
        {kicker && <p className="portfolio-kicker">{kicker}</p>}
        <h1>{title}</h1>
        {intro && <p className="portfolio-lead">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
