export default {
  name: "product",
  type: "document",
  title: "Produkt",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Produktnavn",
      description: "Navnet på produktet",
    },
    {
      name: "images",
      type: "array",
      title: "Produktbilder",
      description: "Bilder av produktet",
      of: [{ type: "image" }],
    },
    {
      name: "description",
      type: "text",
      title: "Produktbeskrivelse",
      description: "Detaljert beskrivelse av produktet",
    },
    {
      name: "slug",
      type: "slug",
      title: "Produkt-slug",
      description: "Unik slug for produktet (brukes i URL)",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "price",
      type: "number",
      title: "Pris",
      description: "Prisen på produktet i NOK",
    },
    {
      name: "price_id",
      title: "Stripe Pris-ID",
      type: "string",
      description: "Stripe-ID for produktet (brukes for betaling)",
    },
    {
      name: "naeringsinnhold",
      type: "array",
      title: "Næringsinnhold",
      description: "Liste over næringsinnhold (f.eks. Protein: 10g, Fett: 5g)",
      of: [{ type: "string" }],
    },
    {
      name: "allergener",
      type: "array",
      title: "Allergener",
      description: "Liste over allergener (f.eks. Gluten, Melk)",
      of: [{ type: "string" }],
    },
    {
      name: "availableInAbonnement",
      type: "boolean",
      title: "Tilgjengelig i abonnement?",
      description: "Kryss av hvis dette produktet kan velges i abonnementet",
    },
    {
      name: "maxOrdersPerDay",
      type: "boolean",
      title: "Maks 50 ordre per dag?",
      description: "Kryss av hvis dette produktet har en grense på maks 50 ordre per dag.",
    },
    {
      name: 'maxOrdersPerCustomer',
      type: 'number',
      title: 'Maks antall per kunde',
      description: 'Hvor mange av dette produktet en kunde kan bestille i dag',
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(1), // Ensures it's always set
    },
  ],
};
