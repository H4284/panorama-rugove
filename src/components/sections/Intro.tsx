import { copy, type Language } from "@/content";

export default function Intro({ language }: { language: Language }) {
  const t = copy[language];
  return <section className="intro"><div><h2>{t.introTitle}</h2></div><div><p className="large-copy">{t.introText}</p><div className="fact-row">{t.facts.map((fact) => <p key={fact}>{fact}</p>)}</div></div></section>;
}
