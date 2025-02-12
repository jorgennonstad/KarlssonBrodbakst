import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import "./ErrorStripe.css"; // Import external CSS

export default function ErrorStripe() {
  return (
    <div className="error-container">
      <div className="error-card">
        <AlertTriangle className="error-icon" />
        <div className="error-text">
          <h2>Something went wrong...</h2>
          <p>There was an issue with your payment. Please try again later.</p>

          <Button asChild className="error-button">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
