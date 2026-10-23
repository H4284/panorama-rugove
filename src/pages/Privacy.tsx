import { copy, type Language } from "@/content";
import { otherLanguage, privacyPath } from "@/lib/links";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";

// Drops the ⚑ "to be confirmed" marker (tracked in content.ts, not shown) and spaces out the "lJ"
// in "EmailJS", which Nunito Sans otherwise draws so that the word reads as "EmaiUS".
function renderLine(line: string) {
  return line.replace("⚑", "").trim().split("EmailJS").flatMap((part, index) => (index === 0 ? [part] : [<span key={index}>Emai<span className="kern-lj">l</span>JS</span>, part]));
}

export default function Privacy({ language }: { language: Language }) {
  const t = copy[language];
  return <><SimpleHeader language={language} switchHref={privacyPath(otherLanguage(language))} /><main className="legal-page"><h1>{t.privacyPage.title}</h1><div className="legal-copy">{t.privacyPage.lines.map((line) => <p key={line}>{renderLine(line)}</p>)}</div></main><Footer language={language} /></>;
}
