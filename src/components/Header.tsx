import { copy, navIds, type Language } from "@/content";
import { homePath, otherLanguage } from "@/lib/links";
import Ridge from "@/components/Ridge";

export default function Header({ language }: { language: Language }) {
  const t = copy[language];
  return <><header className="site-header"><a className="logo" href={homePath(language)}>{t.logo}</a><nav>{t.nav.map((item, index) => <a key={item} href={`#${navIds[index]}`}>{item}</a>)}</nav><div className="header-actions"><a className="language" href={homePath(otherLanguage(language))}>{t.language}</a><a className="button light-button" href="#kerkesa">{t.primary}</a></div></header><Ridge /></>;
}
