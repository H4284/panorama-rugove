import type { Photo } from "@/photos";

// Without a photo, shows the labelled placeholder box. With a photo, the image fills the same box
// (object-fit: cover), so the layout is identical either way. The <img> stays the last child so the
// `.photo > span:last-child` label styles never apply to the hero's mullion lines.
export default function PhotoBox({ label, hero = false, photo, alt = "" }: { label: string; hero?: boolean; photo?: Photo; alt?: string }) {
  return <div className={hero ? "photo hero-photo" : "photo"}>{hero && <><span className="mullion vertical" /><span className="mullion horizontal" /></>}{photo ? <img className="photo-img" src={photo.src} width={photo.width} height={photo.height} alt={alt} loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : undefined} decoding="async" /> : <span>{label}</span>}</div>;
}
