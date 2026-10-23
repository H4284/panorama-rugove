// Renders a line of copy, replacing the ⚑ marker with a "to be confirmed" tag.
export default function TaggedLine({ text, tag }: { text: string; tag: string }) {
  const [before, after = ""] = text.split("⚑");
  return <><span>{before.trim()}</span>{text.includes("⚑") && <span className="tag">{tag}</span>}{after && <span> {after.trim()}</span>}</>;
}
