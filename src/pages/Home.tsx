import type { Language } from "@/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import Ridge from "@/components/Ridge";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Rooms from "@/components/sections/Rooms";
import Request from "@/components/sections/Request";
import Restaurant from "@/components/sections/Restaurant";
import Setting from "@/components/sections/Setting";
import Directions from "@/components/sections/Directions";
import Contact from "@/components/sections/Contact";

export default function Home({ language }: { language: Language }) {
  return <><Header language={language} /><main>
    <Hero language={language} />
    <Intro language={language} />
    <Ridge />
    <Rooms language={language} />
    <Request language={language} />
    <Ridge />
    <Restaurant language={language} />
    <Setting language={language} />
    <Ridge />
    <Directions language={language} />
    <Contact language={language} />
  </main><Footer language={language} /><BottomBar language={language} /></>;
}
