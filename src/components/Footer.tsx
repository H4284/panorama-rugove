import { copy, type Language } from "@/content";
import { homePath, privacyPath } from "@/lib/links";

export default function Footer({ language }: { language: Language }) {
  const t = copy[language];
  return <footer><a className="footer-name" href={homePath(language)}>{t.footerName}</a><div className="footer-meta"><a href={privacyPath(language)}>{t.privacy}</a><span>{t.copyright}</span><span>{t.credit}</span></div></footer>;
}
