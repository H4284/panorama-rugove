import { FormEvent, useMemo, useState } from "react";
import { copy, type Language } from "@/content";
import { privacyPath, whatsapp } from "@/lib/links";

type FormValues = { arrival: string; departure: string; adults: string; children: string; type: string; name: string; phone: string; email: string; message: string; consent: boolean };
const initialForm: FormValues = { arrival: "", departure: "", adults: "", children: "", type: "", name: "", phone: "", email: "", message: "", consent: false };

const wholeNumber = /^\d+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Local YYYY-MM-DD, the format of <input type="date"> values.
const toIsoDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const nextDay = (isoDate: string) => { const date = new Date(`${isoDate}T00:00:00`); date.setDate(date.getDate() + 1); return toIsoDate(date); };
const errorId = (name: keyof FormValues) => `form-${name}-error`;

export default function StayForm({ language }: { language: Language }) {
  const t = copy[language];
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [success, setSuccess] = useState(false);
  const todayIso = toIsoDate(new Date());
  // Empty form → the general WhatsApp greeting; otherwise the request template with "?" for unfilled slots.
  const formMessage = useMemo(() => {
    const slots = { arrival: values.arrival, departure: values.departure, adults: values.adults, children: values.children, type: values.type, name: values.name.trim() };
    if (Object.values(slots).every((value) => !value)) return t.wa.general;
    return Object.entries(slots).reduce((message, [key, value]) => message.replace(`{${key}}`, value || "?"), String(t.wa.form));
  }, [t, values]);

  function update(name: keyof FormValues, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<Record<keyof FormValues, string>> = {};
    (["arrival", "departure", "adults", "children", "type", "name", "phone", "consent"] as (keyof FormValues)[]).forEach((field) => {
      const value = values[field];
      if (typeof value === "string" ? !value.trim() : !value) next[field] = t.errors.required;
    });
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (values.arrival && new Date(`${values.arrival}T00:00:00`) < today) next.arrival = t.errors.past;
    if (values.arrival && values.departure && new Date(`${values.departure}T00:00:00`) <= new Date(`${values.arrival}T00:00:00`)) next.departure = t.errors.order;
    if (values.adults && (!wholeNumber.test(values.adults) || Number(values.adults) < 1)) next.adults = t.errors.adults;
    if (values.children && !wholeNumber.test(values.children)) next.children = t.errors.number;
    if (values.phone.trim() && (!/^[+()\d\s-]+$/.test(values.phone.trim()) || values.phone.replace(/\D/g, "").length < 6)) next.phone = t.errors.phone;
    if (values.email.trim() && !emailPattern.test(values.email.trim())) next.email = t.errors.email;
    setErrors(next);
    if (Object.keys(next).length === 0) setSuccess(true);
  }

  const invalidProps = (name: keyof FormValues) => ({ "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? errorId(name) : undefined });
  const errorText = (name: keyof FormValues) => errors[name] && <span className="error" id={errorId(name)}>{errors[name]}</span>;

  const field = (name: keyof FormValues, label: string, type = "text", optional = false, min?: string) => (
    <label className={name === "message" ? "wide" : ""}><span>{label}</span>{name === "message" ? <textarea value={String(values[name])} onChange={(event) => update(name, event.target.value)} /> : <input type={type} value={String(values[name])} onChange={(event) => update(name, event.target.value)} {...invalidProps(name)} required={!optional} min={min} step={type === "number" ? "1" : undefined} />}{errorText(name)}</label>
  );

  if (success) return <div className="success-panel" role="status"><p>{t.form.success}</p><a className="button" href={whatsapp(formMessage)}>{t.form.alt}</a></div>;

  return <form onSubmit={submit} noValidate><div className="form-grid">
    {field("arrival", t.form.arrival, "date", false, todayIso)}{field("departure", t.form.departure, "date", false, nextDay(values.arrival || todayIso))}
    {field("adults", t.form.adults, "number", false, "1")}{field("children", t.form.children, "number", false, "0")}
    <label><span>{t.form.type}</span><select value={values.type} onChange={(event) => update("type", event.target.value)} {...invalidProps("type")} required><option value="" disabled />{t.form.types.map((type) => <option key={type}>{type}</option>)}</select>{errorText("type")}</label>
    {field("name", t.form.name)}{field("phone", t.form.phone, "tel")}{field("email", t.form.email, "email", true)}{field("message", t.form.message, "text", true)}
    <label className="checkbox wide"><input type="checkbox" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} {...invalidProps("consent")} required /><span>{t.form.consentBefore}<a href={privacyPath(language)}>{t.form.consentLink}</a></span>{errorText("consent")}</label>
  </div><div className="form-actions"><button className="button" type="submit">{t.form.submit}</button><a href={whatsapp(formMessage)}>{t.form.alt}</a></div></form>;
}
