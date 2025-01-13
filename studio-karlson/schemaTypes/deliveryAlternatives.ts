export default {
    name: "deliveryAlternatives",
    title: "Leveringsalternativer",
    type: "document",
    fields: [
      {
        name: "pickupPriceId",
        title: "Henting Pris ID",
        type: "string",
        description: "Stripe pris-ID for henting av varer (Pickup).",
      },
      {
        name: "deliveryPriceId",
        title: "Levering Pris ID",
        type: "string",
        description: "Stripe pris-ID for levering av varer.",
      },
    ],
  };
  