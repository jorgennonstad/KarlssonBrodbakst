// pages/Om_oss.tsx

import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us-page">
            <header className="about-us-header">
                <h1>Om Oss</h1>
                <p className="intro-text">Vi er et dedikert team som streber etter å gjøre din opplevelse best mulig.</p>
            </header>

            <section className="about-us-content">
                <div className="mission-statement">
                    <h2>Vår Visjon</h2>
                    <p>
                        Vår visjon er å revolusjonere kjøpsopplevelsen med kvalitetsprodukter til konkurransedyktige priser. 
                        Vi er lidenskapelig opptatt av å levere produkter som forbedrer våre kunders liv.
                    </p>
                </div>

                <div className="our-team">
                    <h2>Vårt Team</h2>
                    <p>
                        Vi er et team av dedikerte fagfolk med et felles mål om å gjøre handleopplevelsen enklere, raskere og mer personlig. 
                        Vi er alltid tilgjengelig for å svare på spørsmål og hjelpe deg med det du trenger.
                    </p>
                </div>

                <div className="company-values">
                    <h2>Våre Verdier</h2>
                    <ul>
                        <li><strong>Engasjement:</strong> Vi bryr oss om våre kunder og deres opplevelse.</li>
                        <li><strong>Innovasjon:</strong> Vi søker alltid etter nye måter å forbedre oss på.</li>
                        <li><strong>Integritet:</strong> Vi handler ærlig og åpent med våre kunder og partnere.</li>
                    </ul>
                </div>
            </section>

            <section className="contact-section">
                <h2>Kontakt Oss</h2>
                <p>
                    Har du spørsmål? Ta kontakt med oss via e-post på <strong>support@butikken.no</strong>.
                </p>
            </section>
        </div>
    );
};

export default AboutUs;
