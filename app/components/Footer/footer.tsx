"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/app/lib/sanity";
import "./footer.css";
import Image from "next/image"; // Import Image from next/image

// Define the FooterData type here or import it if it’s already defined elsewhere
interface FooterData {
  logo: {
    asset: {
      url: string;
    };
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    orgnr: string;
  };
  map: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    instagramIcon: {
      asset: {
        url: string;
      };
    };
    facebookIcon: {
      asset: {
        url: string;
      };
    };
    instagramName: string;
    facebookName: string;
  };
  openingHours: { day: string; hours: string }[];
}

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null); // Use the FooterData type

  useEffect(() => {
    console.log("5")
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
            instagramName,
            facebookName
          },
          openingHours
        }
      `);
      setFooterData(data); // Set the data with the correct type
    };

    fetchFooterData();
  }, []);

  if (!footerData) return <div>Loading...</div>;

  return (
    <footer className="footer no-break">
      <div className="footer-logo-container">
        <Image
          src={footerData.logo.asset.url}
          alt="Company Logo"
          className="footer-logo"
          width={200}
          height={100}
          layout="intrinsic"
        />
      </div>

      <div className="footer-content">
        {/* Contact Section */}
        <div className="footer-section contact-section">
          <h3>Kontakt</h3>
          <ul>
            <li>
              <strong>Telefon: </strong>
              <a href={`tel:${footerData.contact.phone}`}>{footerData.contact.phone}</a>
            </li>
            <li>
              <strong>E-post: </strong>
              <a href={`mailto:${footerData.contact.email}`}>{footerData.contact.email}</a>
            </li>
            <li>
              <strong>Adresse: </strong>
              {footerData.contact.address}
            </li>
            <li>
              <strong>Org. Nr.: </strong>
              {footerData.contact.orgnr}
            </li>
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
            {footerData.openingHours?.map((item, index) => (
              <li key={index}>
                <strong>{item.day}:</strong> {item.hours}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social-section">
          <h3>Følg oss</h3>
          <div className="social-icons">
            <div className="social-icon-container">
              <a
                href={footerData.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Image
                  src={footerData.socialMedia.instagramIcon.asset.url}
                  alt="Instagram"
                  className="social-icon instagram"
                  width={30}
                  height={30}
                  layout="intrinsic"
                />
                <span className="social-username">
                  {footerData.socialMedia.instagramName || "Instagram"}
                </span>
              </a>
            </div>
            <div className="social-icon-container">
              <a
                href={footerData.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Image
                  src={footerData.socialMedia.facebookIcon.asset.url}
                  alt="Facebook"
                  className="social-icon facebook"
                  width={30}
                  height={30}
                  layout="intrinsic"
                />
                <span className="social-username">
                  {footerData.socialMedia.facebookName || "Facebook"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2024 Karlson Brødbakst. | <i>Designet og utviklet av <span><a href="https://deviro.no/" target="_blank">Deviro.no</a></span></i>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
