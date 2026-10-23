import { FormEvent, useEffect, useMemo, useState } from "react";

type Language = "sq" | "en";

const copy = {
  sq: {
    logo: "Panorama-Rugovë",
    nav: ["Dhomat", "Restoranti", "Si të vini", "Kontakti"],
    primary: "Rezervo dhomën",
    language: "SQ | EN",
    heroEyebrow: "Shtupeq i Madh · Rugovë · 12 km nga Peja",
    heroTitle: "Zgjohu mbi luginën e Rugovës",
    heroText: "Mali në dritare, ushqimi nga fshati. Hotel me restorant mbi Shtupeqin e Madh.",
    heroSecondary: "Shkruani në WhatsApp",
    heroPhoto: "FOTO NGA KLIENTI — pamja nga hoteli (P-01)",
    introTitle: "Hotel dhe restorant në një vend",
    introText: "Panorama-Rugovë ka dhoma, një apartament dhe vilë, si dhe restorant me ushqim tradicional. Ndodhet në Shtupeq të Madh, në luginën e Rugovës.",
    facts: ["16 dhoma", "Hyrja 14:00 · Dalja 12:00", "12 km nga Peja"],
    roomsTitle: "Dhomat",
    roomsLead: "16 dhoma dyshe, treshe dhe katërshe me pamje nga mali, një apartament prej 60 m² dhe vilë.",
    rooms: [
      "Dhomë dyshe · Me pamje nga mali · 25 m² ⚑",
      "Dhomë treshe · Me pamje nga mali · 35 m² ⚑",
      "Dhomë katërshe · Me pamje nga mali · 40 m² ⚑",
      "Apartament · 60 m²",
      "Vilë · 40 m² ⚑ · Pyetni për kapacitetin.",
    ],
    roomNames: ["Dhomë dyshe", "Dhomë treshe", "Dhomë katërshe", "Apartament", "Vilë"],
    roomCta: "Pyet për këtë dhomë",
    roomNote: "Hyrja nga ora 14:00, dalja deri në 12:00. Për çmimet dhe disponueshmërinë, na shkruani ose na telefononi.",
    roomPhoto: "FOTO NGA KLIENTI — {dhoma} ({photo})",
    confirm: "për t'u konfirmuar",
    formTitle: "Kërkoni një dhomë",
    formIntro: "Na tregoni datat dhe sa veta jeni. Kjo është kërkesë, jo rezervim i konfirmuar: ju përgjigjemi me telefon, WhatsApp ose email.",
    form: {
      arrival: "Data e mbërritjes", departure: "Data e largimit", adults: "Të rritur",
      children: "Fëmijë", type: "Lloji i qëndrimit",
      types: ["Dhomë dyshe", "Dhomë treshe", "Dhomë katërshe", "Apartament", "Vilë", "Ende s'e di"],
      name: "Emri dhe mbiemri", phone: "Telefoni (me WhatsApp, nëse e keni)",
      email: "Email (opsional)", message: "Mesazhi (opsional)", consentBefore: "Pajtohem me ",
      consentLink: "politikën e privatësisë.", submit: "Dërgo kërkesën",
      alt: "Ose dërgojeni në WhatsApp",
      success: "Faleminderit! Kërkesa juaj u dërgua. Nëse doni, dërgojeni edhe në WhatsApp.",
    },
    errors: {
      required: "Kjo fushë është e detyrueshme.",
      past: "Data e mbërritjes nuk mund të jetë në të kaluarën.",
      order: "Data e largimit duhet të jetë pas datës së mbërritjes.",
      phone: "Shkruani një numër telefoni të vlefshëm.",
    },
    restaurantTitle: "Restoranti",
    restaurantLead: "Ushqim tradicional, mbi luginën e Rugovës.",
    restaurantFacts: [
      "250 vende në restorant dhe në veranda ⚑",
      "Gatime vendase të Rugovës dhe raki e bërë në vend ⚑",
      "Drekë dhe darkë ⚑",
    ],
    restaurantAsk: "Keni një pyetje për restorantin?",
    restaurantCall: "Telefononi",
    restaurantWa: "Shkruani në WhatsApp",
    restaurantPhotos: [
      "FOTO NGA KLIENTI — restoranti (P-07)",
      "FOTO NGA KLIENTI — verandat (P-08)",
      "FOTO NGA KLIENTI — gatimet (P-09)",
    ],
    settingTitle: "Rrethina",
    settingLines: [
      "Nga verandat shihen majat Lumbardhi dhe Guri i Kuq; në të majtë, Peklena dhe gryka e Rugovës. ⚑",
      "Shtigjet për ecje dhe për biçikletë janë afër hotelit. ⚑",
      "Rugova ndryshon me çdo stinë.",
    ],
    settingPhoto: "FOTO NGA KLIENTI — rrethina (P-10)",
    directionsTitle: "Si të vini",
    address: "Shtupeq i Madh, km 12, Rugovë, Pejë", distance: "12 km nga Peja",
    map: "Hapeni në Google Maps", mapFallback: "Harta",
    contactTitle: "Kontakti",
    contactLead: "Na telefononi ose na shkruani për dhomat dhe për restorantin.",
    phone: "Telefoni: +383 49 677 777", whatsapp: "WhatsApp: +383 49 677 777",
    email: "Email: hotelpanorama03@gmail.com",
    contactAddress: "Adresa: Shtupeq i Madh, km 12, Rugovë, Pejë",
    footerName: "Hotel Restaurant Panorama-Rugovë", privacy: "Politika e privatësisë",
    copyright: "© 2026 Hotel Restaurant Panorama-Rugovë", credit: "Web: Thrio",
    bar: ["Telefono", "WhatsApp", "Rezervo"],
    wa: {
      general: "Përshëndetje! Dua të pyes për një dhomë te Panorama-Rugovë.",
      room: "Përshëndetje! Dua të pyes për: {type}.",
      restaurant: "Përshëndetje! Kam një pyetje për restorantin.",
      form: "Përshëndetje! Kërkesë për dhomë: {arrival} – {departure}, {adults} të rritur, {children} fëmijë, {type}. Emri: {name}.",
    },
    privacyPage: {
      title: "Politika e privatësisë",
      lines: [
        "Kjo faqe i përket Hotel Restaurant Panorama-Rugovë, [EMRI LIGJOR DHE NUI — për t'u plotësuar, U-04].",
        "Kur na dërgoni një kërkesë, mbledhim emrin, telefonin, emailin (nëse e jepni), datat, numrin e personave dhe mesazhin tuaj.",
        "I përdorim vetëm për t'iu përgjigjur kërkesës suaj. Nuk i shesim dhe nuk ua japim të tjerëve për marketing.",
        "Nëse na shkruani në WhatsApp, mesazhi juaj kalon përmes shërbimit WhatsApp.",
        "Për të parë ose fshirë të dhënat tuaja, shkruani te hotelpanorama03@gmail.com.",
      ],
    },
    notFound: { title: "Faqja nuk u gjet", body: "Kjo faqe nuk ekziston ose është zhvendosur.", cta: "Kthehu në faqen kryesore" },
    seo: {
      homeTitle: "Panorama-Rugovë — Hotel dhe restorant në Rugovë, Pejë",
      homeDescription: "Hotel me restorant mbi Shtupeqin e Madh në Rugovë, 12 km nga Peja. Dhoma, apartament, vilë dhe ushqim tradicional. Rezervoni me telefon ose WhatsApp.",
      privacyTitle: "Politika e privatësisë — Panorama-Rugovë",
      privacyDescription: "Si i përdorim të dhënat që na dërgoni përmes formularit.",
    },
  },
  en: {
    logo: "Panorama-Rugovë",
    nav: ["Rooms", "Restaurant", "Getting here", "Contact"],
    primary: "Book a room", language: "SQ | EN",
    heroEyebrow: "Shtupeq i Madh · Rugova · 12 km from Pejë",
    heroTitle: "Wake up above the Rugova valley",
    heroText: "The mountain at your window, food from the village. A hotel and restaurant above Shtupeq i Madh.",
    heroSecondary: "Message us on WhatsApp",
    heroPhoto: "CLIENT PHOTO — view from the hotel (P-01)",
    introTitle: "A hotel and a restaurant in one place",
    introText: "Panorama-Rugovë has rooms, an apartment and a villa, and a restaurant serving traditional food. It sits in Shtupeq i Madh, in the Rugova valley.",
    facts: ["16 rooms", "Check-in 14:00 · Check-out 12:00", "12 km from Pejë"],
    roomsTitle: "Rooms",
    roomsLead: "16 double, triple and quadruple rooms with a mountain view, a 60 m² apartment and a villa.",
    rooms: [
      "Double room · Mountain view · 25 m² ⚑", "Triple room · Mountain view · 35 m² ⚑",
      "Quadruple room · Mountain view · 40 m² ⚑", "Apartment · 60 m²",
      "Villa · 40 m² ⚑ · Ask us about capacity.",
    ],
    roomNames: ["Double room", "Triple room", "Quadruple room", "Apartment", "Villa"],
    roomCta: "Ask about this room",
    roomNote: "Check-in from 14:00, check-out by 12:00. For prices and availability, message or call us.",
    roomPhoto: "CLIENT PHOTO — {room} ({photo})", confirm: "to be confirmed",
    formTitle: "Request a room",
    formIntro: "Tell us your dates and how many of you are coming. This is a request, not a confirmed booking: we reply by phone, WhatsApp or email.",
    form: {
      arrival: "Arrival date", departure: "Departure date", adults: "Adults", children: "Children",
      type: "Type of stay",
      types: ["Double room", "Triple room", "Quadruple room", "Apartment", "Villa", "Not sure yet"],
      name: "Full name", phone: "Phone (with WhatsApp, if you have it)", email: "Email (optional)",
      message: "Message (optional)", consentBefore: "I agree to the ", consentLink: "privacy policy.",
      submit: "Send request", alt: "Or send it on WhatsApp",
      success: "Thank you! Your request has been sent. If you like, send it on WhatsApp too.",
    },
    errors: {
      required: "This field is required.", past: "Arrival can't be in the past.",
      order: "Departure must be after arrival.", phone: "Enter a valid phone number.",
    },
    restaurantTitle: "The restaurant",
    restaurantLead: "Traditional food, above the Rugova valley.",
    restaurantFacts: [
      "250 seats in the restaurant and on the verandas ⚑",
      "Local Rugova dishes and locally made rakia ⚑", "Lunch and dinner ⚑",
    ],
    restaurantAsk: "A question about the restaurant?", restaurantCall: "Call us",
    restaurantWa: "Message us on WhatsApp",
    restaurantPhotos: [
      "CLIENT PHOTO — restaurant (P-07)", "CLIENT PHOTO — verandas (P-08)",
      "CLIENT PHOTO — dishes (P-09)",
    ],
    settingTitle: "Around the hotel",
    settingLines: [
      "From the verandas you see the peaks of Lumbardhi and Guri i Kuq; to the left, Peklena and the Rugova gorge. ⚑",
      "Hiking and biking trails are close to the hotel. ⚑", "Rugova changes with every season.",
    ],
    settingPhoto: "CLIENT PHOTO — surroundings (P-10)", directionsTitle: "Getting here",
    address: "Shtupeq i Madh, km 12, Rugovë, Pejë", distance: "12 km from Pejë",
    map: "Open in Google Maps", mapFallback: "Map", contactTitle: "Contact",
    contactLead: "Call or message us about rooms or the restaurant.",
    phone: "Phone: +383 49 677 777", whatsapp: "WhatsApp: +383 49 677 777",
    email: "Email: hotelpanorama03@gmail.com",
    contactAddress: "Address: Shtupeq i Madh, km 12, Rugovë, Pejë",
    footerName: "Hotel Restaurant Panorama-Rugovë", privacy: "Privacy policy",
    copyright: "© 2026 Hotel Restaurant Panorama-Rugovë", credit: "Web: Thrio",
    bar: ["Call", "WhatsApp", "Book"],
    wa: {
      general: "Hello! I'd like to ask about a room at Panorama-Rugovë.",
      room: "Hello! I'd like to ask about: {type}.",
      restaurant: "Hello! I have a question about the restaurant.",
      form: "Hello! Room request: {arrival} – {departure}, {adults} adults, {children} children, {type}. Name: {name}.",
    },
    privacyPage: {
      title: "Privacy policy",
      lines: [
        "This website belongs to Hotel Restaurant Panorama-Rugovë, [LEGAL NAME AND NUI — to be added, U-04].",
        "When you send a request, we collect your name, phone, email (if given), dates, number of guests and your message.",
        "We use them only to answer your request. We never sell them or share them with others for marketing.",
        "If you message us on WhatsApp, your message goes through the WhatsApp service.",
        "To see or delete your data, write to hotelpanorama03@gmail.com.",
      ],
    },
    notFound: { title: "Page not found", body: "This page doesn't exist or has moved.", cta: "Back to the home page" },
    seo: {
      homeTitle: "Panorama-Rugovë — Hotel and restaurant in Rugova, Pejë",
      homeDescription: "Hotel and restaurant above Shtupeq i Madh in Rugova, 12 km from Pejë. Rooms, apartment, villa and traditional food. Book by phone or WhatsApp.",
      privacyTitle: "Privacy policy — Panorama-Rugovë",
      privacyDescription: "How we use the data you send us through the form.",
    },
  },
} as const;

const navIds = ["dhomat", "restoranti", "drejtimet", "kontakti"];
const phoneHref = "tel:+38349677777";
const emailHref = "mailto:hotelpanorama03@gmail.com";
const whatsapp = (message: string) => `https://wa.me/38349677777?text=${encodeURIComponent(message)}`;

function Ridge() {
  return <svg className="ridge" viewBox="0 0 1440 34" preserveAspectRatio="none" aria-hidden="true"><path d="M0 25 L120 18 L225 24 L355 8 L455 22 L590 13 L710 24 L830 9 L950 21 L1070 14 L1180 24 L1310 10 L1440 23" /></svg>;
}

function TaggedLine({ text, tag }: { text: string; tag: string }) {
  const [before, after = ""] = text.split("⚑");
  return <><span>{before.trim()}</span>{text.includes("⚑") && <span className="tag">{tag}</span>}{after && <span> {after.trim()}</span>}</>;
}

function PhotoBox({ label, hero = false }: { label: string; hero?: boolean }) {
  return <div className={hero ? "photo hero-photo" : "photo"}>{hero && <><span className="mullion vertical" /><span className="mullion horizontal" /></>}<span>{label}</span></div>;
}

function Header({ language }: { language: Language }) {
  const t = copy[language];
  return <><header className="site-header"><a className="logo" href={language === "en" ? "/en" : "/"}>{t.logo}</a><nav>{t.nav.map((item, index) => <a key={item} href={`#${navIds[index]}`}>{item}</a>)}</nav><div className="header-actions"><a className="language" href={language === "en" ? "/" : "/en"}>{t.language}</a><a className="button light-button" href="#kerkesa">{t.primary}</a></div></header><Ridge /></>;
}

type FormValues = { arrival: string; departure: string; adults: string; children: string; type: string; name: string; phone: string; email: string; message: string; consent: boolean };
const initialForm: FormValues = { arrival: "", departure: "", adults: "", children: "", type: "", name: "", phone: "", email: "", message: "", consent: false };

function StayForm({ language }: { language: Language }) {
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
    <label className="checkbox wide"><input type="checkbox" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} required /><span>{t.form.consentBefore}<a href={language === "en" ? "/en/privacy" : "/privatesia"}>{t.form.consentLink}</a></span>{errors.consent && <span className="error">{errors.consent}</span>}</label>
  </div><div className="form-actions"><button className="button" type="submit">{t.form.submit}</button><a href={whatsapp(formMessage)}>{t.form.alt}</a></div></form>;
}

function Footer({ language }: { language: Language }) {
  const t = copy[language];
  return <footer><a className="footer-name" href={language === "en" ? "/en" : "/"}>{t.footerName}</a><div className="footer-meta"><a href={language === "en" ? "/en/privacy" : "/privatesia"}>{t.privacy}</a><span>{t.copyright}</span><span>{t.credit}</span></div></footer>;
}

function BottomBar({ language }: { language: Language }) {
  const t = copy[language];
  return <div className="bottom-bar"><a href={phoneHref}>{t.bar[0]}</a><a href={whatsapp(t.wa.general)}>{t.bar[1]}</a><a href="#kerkesa">{t.bar[2]}</a></div>;
}

function Home({ language }: { language: Language }) {
  const t = copy[language];
  return <><Header language={language} /><main>
    <section className="hero"><div className="hero-copy"><p className="eyebrow">{t.heroEyebrow}</p><h1>{t.heroTitle}</h1><p className="hero-lead">{t.heroText}</p><div className="hero-actions"><a className="button" href="#kerkesa">{t.primary}</a><a className="text-link" href={whatsapp(t.wa.general)}>{t.heroSecondary}</a></div></div><PhotoBox label={t.heroPhoto} hero /></section>
    <section className="intro"><div><h2>{t.introTitle}</h2></div><div><p className="large-copy">{t.introText}</p><div className="fact-row">{t.facts.map((fact) => <p key={fact}>{fact}</p>)}</div></div></section>
    <Ridge />
    <section id="dhomat" className="band"><div className="section-heading"><h2>{t.roomsTitle}</h2><p>{t.roomsLead}</p></div><div className="room-grid">{t.rooms.map((room, index) => <article className="room-card" key={room}><PhotoBox label={t.roomPhoto.replace(language === "en" ? "{room}" : "{dhoma}", t.roomNames[index]).replace("{photo}", `P-0${index + 2}`)} /><div className="room-card-copy"><h3><TaggedLine text={room} tag={t.confirm} /></h3><a href={whatsapp(t.wa.room.replace("{type}", t.roomNames[index]))} className="card-link">{t.roomCta}</a></div></article>)}</div><p className="room-note">{t.roomNote}</p></section>
    <section id="kerkesa" className="request band-dark"><div className="section-heading"><h2>{t.formTitle}</h2><p>{t.formIntro}</p></div><StayForm language={language} /></section>
    <Ridge />
    <section id="restoranti" className="band"><div className="restaurant-top"><div className="section-heading"><h2>{t.restaurantTitle}</h2><p>{t.restaurantLead}</p></div><div className="restaurant-facts">{t.restaurantFacts.map((fact) => <p key={fact}><TaggedLine text={fact} tag={t.confirm} /></p>)}<p className="restaurant-ask">{t.restaurantAsk}</p><div className="inline-actions"><a className="button" href={phoneHref}>{t.restaurantCall}</a><a className="text-link" href={whatsapp(t.wa.restaurant)}>{t.restaurantWa}</a></div></div></div><div className="restaurant-photos">{t.restaurantPhotos.map((photo) => <PhotoBox label={photo} key={photo} />)}</div></section>
    <section className="setting"><PhotoBox label={t.settingPhoto} /><div><h2>{t.settingTitle}</h2><div className="setting-lines">{t.settingLines.map((line) => <p key={line}><TaggedLine text={line} tag={t.confirm} /></p>)}</div></div></section>
    <Ridge />
    <section id="drejtimet" className="directions band"><div className="section-heading"><h2>{t.directionsTitle}</h2><p>{t.address}</p><p>{t.distance}</p><a className="button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.address)}`}>{t.map}</a></div><iframe title={t.mapFallback} src={`https://www.google.com/maps?q=${encodeURIComponent(t.address)}&output=embed`} loading="lazy" /></section>
    <section id="kontakti" className="contact"><h2>{t.contactTitle}</h2><p className="contact-lead">{t.contactLead}</p><div className="contact-grid"><a href={phoneHref}>{t.phone}</a><a href={whatsapp(t.wa.general)}>{t.whatsapp}</a><a href={emailHref}>{t.email}</a><p>{t.contactAddress}</p></div></section>
  </main><Footer language={language} /><BottomBar language={language} /></>;
}

function SimpleHeader({ language }: { language: Language }) {
  const t = copy[language];
  return <header className="site-header simple-header"><a className="logo" href={language === "en" ? "/en" : "/"}>{t.logo}</a><a className="language" href={language === "en" ? "/privatesia" : "/en/privacy"}>{t.language}</a></header>;
}

function PrivacyPage({ language }: { language: Language }) {
  const t = copy[language];
  return <><SimpleHeader language={language} /><main className="legal-page"><h1>{t.privacyPage.title}</h1><div className="legal-copy">{t.privacyPage.lines.map((line, index) => <p className={index === 0 ? "unfinished" : ""} key={line}>{line}</p>)}</div></main><Footer language={language} /></>;
}

function NotFound({ language }: { language: Language }) {
  const t = copy[language];
  return <><SimpleHeader language={language} /><main className="not-found"><h1>{t.notFound.title}</h1><p>{t.notFound.body}</p><a className="button" href={language === "en" ? "/en" : "/"}>{t.notFound.cta}</a></main><Footer language={language} /></>;
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const language: Language = path === "/en" || path.startsWith("/en/") ? "en" : "sq";
  const isHome = path === "/" || path === "/en";
  const isPrivacy = path === "/privatesia" || path === "/en/privacy";
  const t = copy[language];
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = isPrivacy ? t.seo.privacyTitle : isHome ? t.seo.homeTitle : t.notFound.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) { description = document.createElement("meta"); description.setAttribute("name", "description"); document.head.appendChild(description); }
    description.setAttribute("content", isPrivacy ? t.seo.privacyDescription : isHome ? t.seo.homeDescription : t.notFound.body);
  }, [isHome, isPrivacy, language, t]);
  if (isHome) return <Home language={language} />;
  if (isPrivacy) return <PrivacyPage language={language} />;
  return <NotFound language={language} />;
}
