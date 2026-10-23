import { copy, type Language } from "@/content";
import { homePath, otherLanguage, privacyPath } from "@/lib/links";

export default function SimpleHeader({ language }: { language: Language }) {
  const t = copy[language];
  return <header className="site-header simple-header"><a className="logo" href={homePath(language)}>{t.logo}</a><a className="language" href={privacyPath(otherLanguage(language))}>{t.language}</a></header>;
}
