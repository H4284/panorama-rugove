import { FormEvent, useMemo, useState } from "react";
import { copy, type Language } from "@/content";
import { privacyPath, whatsapp } from "@/lib/links";

type FormValues = { arrival: string; departure: string; adults: string; children: string; type: string; name: string; phone: string; email: string; message: string; consent: boolean };
const initialForm: FormValues = { arrival: "", departure: "", adults: "", children: "", type: "", name: "", phone: "", email: "", message: "", consent: false };

export default function StayForm({ language }: { language: Language }) {
  const t = copy[language];
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [success, setSuccess] = useState(false);
  const formMessage = useMemo(() => t.wa.form.replace("{arrival}", values.arrival).replace("{departure}", values.departure).replace("{adults}", values.adults).replace("{children}", values.children).replace("{type}", values.type).replace("{name}", values.name), [t, values]);

  function update(name: keyof FormValues, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<Record<keyof FormValues, string>> = {};
    (["arrival", "departure", "adults", "children", "type", "name", "phone", "consent"] as (keyof FormValues)[]).forEach((field) => {
      if (!values[field]) next[field] = t.errors.required;
    });
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (values.arrival && new Date(`${values.arrival}T00:00:00`) < today) next.arrival = t.errors.past;
    if (values.arrival && values.departure && new Date(`${values.departure}T00:00:00`) <= new Date(`${values.arrival}T00:00:00`)) next.departure = t.errors.order;
    if (values.phone && !/^[+()\d\s-]{6,}$/.test(values.phone)) next.phone = t.errors.phone;
    setErrors(next);
    if (Object.keys(next).length === 0) setSuccess(true);
  }

  const field = (name: keyof FormValues, label: string, type = "text", optional = false) => (
    <label className={name === "message" ? "wide" : ""}><span>{label}</span>{name === "message" ? <textarea value={String(values[name])} onChange={(event) => update(name, event.target.value)} /> : <input type={type} value={String(values[name])} onChange={(event) => update(name, event.target.value)} aria-invalid={Boolean(errors[name])} required={!optional} min={type === "number" ? "0" : undefined} />}{errors[name] && <span className="error">{errors[name]}</span>}</label>
  );

  if (success) return <div className="success-panel" role="status"><p>{t.form.success}</p><a className="button" href={whatsapp(formMessage)}>{t.form.alt}</a></div>;

  return <form onSubmit={submit} noValidate><div className="form-grid">
    {field("arrival", t.form.arrival, "date")}{field("departure", t.form.departure, "date")}
    {field("adults", t.form.adults, "number")}{field("children", t.form.children, "number")}
    <label><span>{t.form.type}</span><select value={values.type} onChange={(event) => update("type", event.target.value)} aria-invalid={Boolean(errors.type)} required><option value="" disabled />{t.form.types.map((type) => <option key={type}>{type}</option>)}</select>{errors.type && <span className="error">{errors.type}</span>}</label>
    {field("name", t.form.name)}{field("phone", t.form.phone, "tel")}{field("email", t.form.email, "email", true)}{field("message", t.form.message, "text", true)}
    <label className="checkbox wide"><input type="checkbox" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} required /><span>{t.form.consentBefore}<a href={privacyPath(language)}>{t.form.consentLink}</a></span>{errors.consent && <span className="error">{errors.consent}</span>}</label>
  </div><div className="form-actions"><button className="button" type="submit">{t.form.submit}</button><a href={whatsapp(formMessage)}>{t.form.alt}</a></div></form>;
}
