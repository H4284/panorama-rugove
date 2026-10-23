import { copy, type Language } from "@/content";
import { whatsapp } from "@/lib/links";
import { photos } from "@/photos";
import PhotoBox from "@/components/PhotoBox";
import TaggedLine from "@/components/TaggedLine";

export default function Rooms({ language }: { language: Language }) {
  const t = copy[language];
  return <section id="dhomat" className="band"><div className="section-heading"><h2>{t.roomsTitle}</h2><p>{t.roomsLead}</p></div><div className="room-grid">{t.rooms.map((room, index) => <article className="room-card" key={room}><PhotoBox label={t.roomPhoto.replace(language === "en" ? "{room}" : "{dhoma}", t.roomNames[index]).replace("{photo}", `P-0${index + 2}`)} photo={photos.rooms[index]} alt={t.roomNames[index]} /><div className="room-card-copy"><h3><TaggedLine text={room} tag={t.confirm} /></h3><a href={whatsapp(t.wa.room.replace("{type}", t.roomNames[index]))} className="card-link">{t.roomCta}</a></div></article>)}</div><p className="room-note">{t.roomNote}</p></section>;
}
