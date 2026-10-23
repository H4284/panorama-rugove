export default function PhotoBox({ label, hero = false }: { label: string; hero?: boolean }) {
  return <div className={hero ? "photo hero-photo" : "photo"}>{hero && <><span className="mullion vertical" /><span className="mullion horizontal" /></>}<span>{label}</span></div>;
}
