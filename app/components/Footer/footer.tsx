"use client";

import React, { useEffect, useState } from 'react';
import { client } from "@/app/lib/sanity";
import './footer.css';

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      const data = await client.fetch(`
        *[_type == "footer"][0] {
          logo {
            asset -> {
              url
            }
          },
          contact,
          map,
          socialMedia {
            instagram,
            facebook,
            instagramIcon {
              asset -> {
                url
              }
            },
            facebookIcon {
              asset -> {
                url
              }
            },
            instagramName,  // Fetch Instagram Name
            facebookName     // Fetch Facebook Name
          },
          openingHours
        }
      `);
      setFooterData(data);
    };

    fetchFooterData();
  }, []);

  if (!footerData) return <div>Loading...</div>;

  return (
    <footer className="footer no-break">
      <div className="footer-logo-container">
        <img src={footerData.logo.asset.url} alt="Company Logo" className="footer-logo" />
      </div>

      <div className="footer-content">

        {/* Contact Section */}
        <div className="footer-section contact-section">
          <h3>Kontakt</h3>
          <ul>
            <li><strong>Telefon: </strong><a href={`tel:${footerData.contact.phone}`}>{footerData.contact.phone}</a></li>
            <li><strong>E-post: </strong><a href={`mailto:${footerData.contact.email}`}>{footerData.contact.email}</a></li>
            <li><strong>Adresse: </strong>{footerData.contact.address}</li>
            <li><strong>Org. Nr.: </strong>{footerData.contact.orgnr}</li>
          </ul>
        </div>

        {/* Map Section */}
        <div className="footer-section map-section">
          <h3>Finn oss her</h3>
          <div className="map-container">
            <iframe
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Hunnsvegen%204B,%202821%20Gj%C3%B8vik+(Karlson%20Br%C3%B8dbakst)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        
        {/* Opening Hours Section */}
        <div className="footer-section opening-hours-section">
          <h3>Åpningstider</h3>
          <ul>
            {footerData.openingHours?.map((item: any, index: number) => (
              <li key={index}><strong>{item.day}:</strong> {item.hours}</li>
            ))}
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social-section">
          <h3>Følg oss</h3>
          <div className="social-icons">
            <div className="social-icon-container">
              <a href={footerData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                <img 
                  src={footerData.socialMedia.instagramIcon.asset.url} 
                  alt="Instagram" 
                  className="social-icon instagram" 
                />
                <span className="social-username">{footerData.socialMedia.instagramName || "Instagram"}</span>
              </a>
            </div>
            <div className="social-icon-container">
              <a href={footerData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                <img 
                  src={footerData.socialMedia.facebookIcon.asset.url} 
                  alt="Facebook" 
                  className="social-icon facebook" 
                />
                <span className="social-username">{footerData.socialMedia.facebookName || "Facebook"}</span>
              </a>
            </div>
          </div>
        </div>



      </div>
            
      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>&copy; 2024 Karlson Brødbakst. | <i>Designet og utviklet av <span><a href="https://deviro.no/" target="_blank">Deviro.no</a></span></i></p>
      </div>
    </footer>
  );
};

export default Footer;
