import './AboutUs.css';
import Footer from "../components/Footer/footer";

const AboutUs = () => {
    return (
        <div className="about-us-page">
            <div className="about-us-hero-container">
                <div className="about-us-hero-images-container">
                    <div className="about-us-hero-overlay"></div>
                    <div className="about-us-hero-text-content">
                        <h1 className="about-us-hero-title">Om Oss</h1>
                        <p className="about-us-hero-subtitle">
                            Hvem er vi som driver bakeriet
                        </p>
                    </div>
                </div>
            </div>

            {/* Section for two side-by-side placeholders */}
            <div className="about-us-images-section">
    <div className="about-us-image bilde-1">
        <div className="hover-text">
            <h2>Johan Karlsson</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>
    <div className="about-us-image bilde-2">
        <div className="hover-text">
            <h2>Jonas Jensen</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>
</div>

            {/* Section for one wider image */}
            {/* Section for one wider image */}
<div className="about-us-wide-image-container">
    <div className="about-us-wide-image">
        <div className="about-us-wide-image-overlay"></div>
        <h1>Vår Historie</h1>
    </div> {/* This div will hold the image */}
</div>

<div className="about-us-text-container">
    <p>
        Vår historie startet med en lidenskap for ekte håndverksbaking og kvalitet. 
        Fra små begynnelse har vi utviklet oss til å bli et sted hvor tradisjon og innovasjon møtes. 
        Vi tror på ekte håndverk, og vår kjærlighet til baking gjenspeiles i hver eneste bit. 
        Gjennom årene har vi lært, vokst, og endret oss, men vårt mål har alltid vært det samme – å tilby deg bakervarer av høyeste kvalitet.
    </p>
    <p>
        Vi er stolte av å være en del av et samfunn som verdsetter tradisjon, håndverk og kvalitet. 
        Bli med oss på reisen gjennom vår historie og oppdag hvordan vi har utviklet oss fra vår første dag.
        Vi er stolte av å være en del av et samfunn som verdsetter tradisjon, håndverk og kvalitet. 
        Bli med oss på reisen gjennom vår historie og oppdag hvordan vi har utviklet oss fra vår første dag.
        Vi er stolte av å være en del av et samfunn som verdsetter tradisjon, håndverk og kvalitet. 
        Bli med oss på reisen gjennom vår historie og oppdag hvordan vi har utviklet oss fra vår første dag.
        Vi er stolte av å være en del av et samfunn som verdsetter tradisjon, håndverk og kvalitet. 
        Bli med oss på reisen gjennom vår historie og oppdag hvordan vi har utviklet oss fra vår første dag.
        Vi er stolte av å være en del av et samfunn som verdsetter tradisjon, håndverk og kvalitet. 
        Bli med oss på reisen gjennom vår historie og oppdag hvordan vi har utviklet oss fra vår første dag.
        Vi er stolte av å være en del av et samfunn som verdsetter tradisjon, håndverk og kvalitet. 
        Bli med oss på reisen gjennom vår historie og oppdag hvordan vi har utviklet oss fra vår første dag.
    </p>
</div>

            <Footer />
        </div>
    );
};

export default AboutUs;
