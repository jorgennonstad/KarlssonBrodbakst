// DeliveryPopup.tsx
"use client"

import { Button } from '@/components/ui/button';  // Ensure this is your button component
import './DeliveryPopup.css'; // Import the associated CSS file

interface DeliveryPopupProps {
  onProceedToCheckout: () => void;
  allowedPostalCodes: string[];
}

export default function DeliveryPopup({ onProceedToCheckout, allowedPostalCodes }: DeliveryPopupProps) {
  return (
    <div className="delivery-popup-overlay">
      <div className="delivery-popup-content">
        <h2>Vi leverer kun hjem til disse postnummerene:</h2>
        <p>{allowedPostalCodes.join(', ')}</p>
        <Button onClick={onProceedToCheckout} className="delivery-popup-button">
          Fortsett til betaling
        </Button>
      </div>
    </div>
  );
}
