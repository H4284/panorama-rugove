import { copy, type Language } from "@/content";
import { phoneHref, whatsapp } from "@/lib/links";
import PhotoBox from "@/components/PhotoBox";
import TaggedLine from "@/components/TaggedLine";

export default function Restaurant({ language }: { language: Language }) {
  const t = copy[language];
  return <section id="restoranti" className="band"><div className="restaurant-top"><div className="section-heading"><h2>{t.restaurantTitle}</h2><p>{t.restaurantLead}</p></div><div className="restaurant-facts">{t.restaurantFacts.map((fact) => <p key={fact}><TaggedLine text={fact} tag={t.confirm} /></p>)}<p className="restaurant-ask">{t.restaurantAsk}</p><div className="inline-actions"><a className="button" href={phoneHref}>{t.restaurantCall}</a><a className="text-link" href={whatsapp(t.wa.restaurant)}>{t.restaurantWa}</a></div></div></div><div className="restaurant-photos">{t.restaurantPhotos.map((photo) => <PhotoBox label={photo} key={photo} />)}</div></section>;
}
