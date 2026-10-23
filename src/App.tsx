import { useEffect } from "react";
import { copy, type Language } from "@/content";
import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const language: Language = path === "/en" || path.startsWith("/en/") ? "en" : "sq";
  const isHome = path === "/" || path === "/en";
  const isPrivacy = path === "/privatesia" || path === "/en/privacy";
  const t = copy[language];
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = isPrivacy ? t.seo.privacyTitle : isHome ? t.seo.homeTitle : t.seo.notFoundTitle;
    let description = document.querySelector('meta[name="description"]');
    if (!description) { description = document.createElement("meta"); description.setAttribute("name", "description"); document.head.appendChild(description); }
    description.setAttribute("content", isPrivacy ? t.seo.privacyDescription : isHome ? t.seo.homeDescription : t.notFound.body);
  }, [isHome, isPrivacy, language, t]);
  if (isHome) return <Home language={language} />;
  if (isPrivacy) return <Privacy language={language} />;
  return <NotFound language={language} />;
}
