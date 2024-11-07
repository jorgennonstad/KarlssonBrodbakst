import Image from "next/image";
import Hero from "./components/Hero/Hero";
import Newest from "./components/Newest/Newest";
import AllProductsPage from "./components/AllProductsPage/AllProductsPage";
import Abonnement from "./components/Abonnement/Abonnement";


export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="bg-white pd-6 sm:pd-8 lg:pd-12">
      <Hero />
      <AllProductsPage />
      <Abonnement />
      <Newest />
    </div>
  );
}
