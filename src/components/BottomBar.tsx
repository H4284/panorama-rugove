import { copy, type Language } from "@/content";
import { phoneHref, whatsapp } from "@/lib/links";

export default function BottomBar({ language }: { language: Language }) {
  const t = copy[language];
  return <div className="bottom-bar"><a href={phoneHref}>{t.bar[0]}</a><a href={whatsapp(t.wa.general)}>{t.bar[1]}</a><a href="#kerkesa">{t.bar[2]}</a></div>;
}
