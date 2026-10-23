// Renders a line of copy that may contain the ⚑ marker. ⚑ marks a fact the client still has to
// confirm; it stays in content.ts for tracking but is not shown to visitors (removed in step 11).
export default function TaggedLine({ text }: { text: string }) {
  const [before, after = ""] = text.split("⚑");
  return <><span>{before.trim()}</span>{after.trim() && <span> {after.trim()}</span>}</>;
}
