import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import "./StripeSuccess.css"; // Import the external CSS file

export default function StripeSuccess() {
  return (
    <div className="success-page">
      <div className="success-container">
        <CheckCheck className="success-icon" />
        <div className="success-text">
          <h3 className="success-title">Betaling fullført!</h3>
          <p className="success-message">
            Takk for at du handlet hos Karlsson Brødbakst!
          </p>
          <p className="success-subtext">Ha en fin dag!</p>

          <Button asChild className="success-button">
            <Link href="/">Gå tilbake til forsiden</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
