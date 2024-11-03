import Image from "next/image";
import Hero from "./components/Hero";
import Newest from "./components/Newest";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="bg-white pd-6 sm:pd-8 lg:pd-12">
      <Hero />
      <Newest />
    </div>
  );
}
