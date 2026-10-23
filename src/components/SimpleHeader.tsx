import { copy, type Language } from "@/content";
import { homePath } from "@/lib/links";

// switchHref: where the language switch goes (the same page in the other language).
export default function SimpleHeader({ language, switchHref }: { language: Language; switchHref: string }) {
  const t = copy[language];
  return <header className="site-header simple-header"><a className="logo" href={homePath(language)}>{t.logo}</a><a className="language" href={switchHref}>{t.language}</a></header>;
}
