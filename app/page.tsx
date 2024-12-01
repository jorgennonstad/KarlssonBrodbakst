import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/footer";
import AllProductsPage from "./components/AllProductsPage/AllProductsPage";
import Abonnement from "./components/Abonnement/Abonnement";
import NewsSlider from "./components/NewsSlider/NewsSlider";



export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="bg-white pd-6 sm:pd-8 lg:pd-12">
      <Hero />
      <AllProductsPage />
      <Abonnement />
      <NewsSlider />
      <Footer />
    </div>
  );
}
