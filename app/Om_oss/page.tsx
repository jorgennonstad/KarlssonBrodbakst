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
                <div className="about-us-image-placeholder">Bilde 1</div>
                <div className="about-us-image-placeholder">Bilde 2</div>
            </div>

            {/* Section for one wider image */}
            <div className="about-us-wide-image-container">
                <div className="about-us-wide-image">
                    <h1>Vår Historie</h1>    
                </div> {/* This div will hold the image */}
            </div>

            <div className="about-us-text-container">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Quidem eius laudantium autem soluta veniam maiores hic minima accusamus mollitia voluptates quaerat corporis natus corrupti temporibus, eaque eveniet amet voluptate debitis? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem dolorem soluta dolores sapiente sed explicabo placeat corrupti nemo quibusdam maiores? Natus recusandae adipisci excepturi eum! Natus inventore accusamus quas temporibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates magni dolores velit esse odio obcaecati ad, quas quaerat incidunt maiores, sunt, fugit voluptatibus quisquam suscipit. Aspernatur impedit ut quaerat minima.</p>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
