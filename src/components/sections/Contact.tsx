import { copy, type Language } from "@/content";
import { emailHref, phoneHref, whatsapp } from "@/lib/links";

export default function Contact({ language }: { language: Language }) {
  const t = copy[language];
  return <section id="kontakti" className="contact"><h2>{t.contactTitle}</h2><p className="contact-lead">{t.contactLead}</p><div className="contact-grid"><a href={phoneHref}>{t.phone}</a><a href={whatsapp(t.wa.general)}>{t.whatsapp}</a><a href={emailHref}>{t.email}</a><p>{t.contactAddress}</p></div></section>;
}
