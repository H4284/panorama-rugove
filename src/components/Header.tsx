import { useEffect, useRef, useState } from "react";
import { copy, navIds, type Language } from "@/content";
import { homePath, otherLanguage } from "@/lib/links";
import Ridge from "@/components/Ridge";

export default function Header({ language }: { language: Language }) {
  const t = copy[language];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledAway, setScrolledAway] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);

  // Sticky header that slides away while scrolling down and comes back as soon as the visitor scrolls up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return; // ignore tiny jitter
      setScrolledAway(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: Escape closes it and returns focus to the toggle; widening past 1024px closes it.
  useEffect(() => {
    if (!menuOpen) return;
    const wide = window.matchMedia("(min-width: 1025px)");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); toggleRef.current?.focus(); }
    };
    const onWide = () => { if (wide.matches) setMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onWide);
    return () => { document.removeEventListener("keydown", onKeyDown); wide.removeEventListener("change", onWide); };
  }, [menuOpen]);

  return <><header className={scrolledAway && !menuOpen ? "site-header is-scrolled-away" : "site-header"}><a className="logo" href={homePath(language)}>{t.logo}</a><nav>{t.nav.map((item, index) => <a key={item} href={`#${navIds[index]}`}>{item}</a>)}</nav><div className="header-actions"><a className="language" href={homePath(otherLanguage(language))}>{t.language}</a><a className="button light-button" href="#kerkesa">{t.primary}</a><button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? t.menuClose : t.menu}</button></div>
    <div className="menu-drawer" id="site-menu" hidden={!menuOpen}><nav aria-label={t.menu}>{t.nav.map((item, index) => <a key={item} href={`#${navIds[index]}`} onClick={closeMenu}>{item}</a>)}</nav><div className="menu-drawer-actions"><a className="button light-button" href="#kerkesa" onClick={closeMenu}>{t.primary}</a></div></div>
  </header><Ridge /></>;
}
