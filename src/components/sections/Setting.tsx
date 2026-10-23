import { copy, type Language } from "@/content";
import { photos } from "@/photos";
import PhotoBox from "@/components/PhotoBox";
import TaggedLine from "@/components/TaggedLine";

export default function Setting({ language }: { language: Language }) {
  const t = copy[language];
  return <section className="setting"><PhotoBox label={t.settingPhoto} photo={photos.setting} alt={t.photoAlt.setting} /><div><h2>{t.settingTitle}</h2><div className="setting-lines">{t.settingLines.map((line) => <p key={line}><TaggedLine text={line} tag={t.confirm} /></p>)}</div></div></section>;
}
