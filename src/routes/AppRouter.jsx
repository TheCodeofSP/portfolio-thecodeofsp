import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AnalyticsTracker from "../components/common/AnalyticsTracker.jsx";
import ConsentBanner from "../components/common/ConsentBanner.jsx";
import Footer from "../components/common/Footer.jsx";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import { LEGACY_ROUTES } from "../config/site.config.js";
import Contact from "../pages/Contact.jsx";
import Home from "../pages/Home.jsx";
import Legal from "../pages/Legal.jsx";
import NotFound from "../pages/NotFound.jsx";
import Privacy from "../pages/Privacy.jsx";
import ProjectDetail from "../pages/ProjectDetail.jsx";
import Projects from "../pages/Projects.jsx";
import ServicesMethod from "../pages/ServicesMethod.jsx";
import SiteMap from "../pages/SiteMap.jsx";

export default function AppRouter({ resetIntro, theme }) {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnalyticsTracker />

      <div className={`app theme-${theme}`}>
        <Header theme={theme} resetIntro={resetIntro} />

        <main>
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/services" element={<ServicesMethod theme={theme} />} />
            <Route path="/realisations" element={<Projects theme={theme} />} />
            <Route
              path="/realisations/:slug"
              element={<ProjectDetail theme={theme} />}
            />
            <Route path="/contact" element={<Contact theme={theme} />} />
            <Route path="/legal" element={<Legal theme={theme} />} />
            <Route path="/privacy" element={<Privacy theme={theme} />} />
            <Route path="/sitemap" element={<SiteMap theme={theme} />} />

            {LEGACY_ROUTES.map(({ from, to }) => (
              <Route
                key={from}
                path={from}
                element={<Navigate to={to} replace />}
              />
            ))}

            <Route path="*" element={<NotFound theme={theme} />} />
          </Routes>
        </main>

        <Footer theme={theme} />
        <ConsentBanner theme={theme} />
      </div>
    </BrowserRouter>
  );
}
