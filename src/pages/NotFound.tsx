import { copy, type Language } from "@/content";
import { homePath, otherLanguage } from "@/lib/links";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";

export default function NotFound({ language }: { language: Language }) {
  const t = copy[language];
  return <><SimpleHeader language={language} switchHref={homePath(otherLanguage(language))} /><main className="not-found"><h1>{t.notFound.title}</h1><p>{t.notFound.body}</p><a className="button" href={homePath(language)}>{t.notFound.cta}</a></main><Footer language={language} /></>;
}
