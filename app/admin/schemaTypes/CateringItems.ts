import { Rule } from '@sanity/types'; // Explicitly import Rule

export default {
  name: "cateringItems",
  title: "CateringVarer",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      description: "Navnet på cateringmenyen, f.eks. Brødplate.",
      validation: (Rule: Rule) => Rule.required().error("Tittel er påkrevd."),
    },
    {
      name: "note",
      title: "Notat",
      type: "string",
      description: "Et notat som beskriver menyens formål eller anledning.",
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: "array",
      of: [{ type: "string" }],
      description: "Liste med beskrivelser av rettene, f.eks. 'Nybakt surdeigsbrød med sprø skorpe'.",
      validation: (Rule: Rule) => Rule.required().min(1).error("Minst én beskrivelse er påkrevd."),
    },
    {
      name: "price",
      title: "Pris",
      type: "string",
      description: "Prisen på menyen, f.eks. 'Kr. 249,-'.",
      validation: (Rule: Rule) => Rule.required().error("Pris er påkrevd."),
    },
    {
      name: "image",
      title: "Bilde",
      type: "image",
      description: "Et bilde som representerer menyen.",
      options: {
        hotspot: true, // Allow cropping
      },
    },
    // Add orderRank for sorting
    {
      name: "orderRank", // Added for ordering
      type: "string", // The field must be a string
      title: "Order Rank",
      description: "Rekkefølge av cateringmenyen i listen",
      hidden: true, // Hide this field from the UI
      initialValue: () => "0", // Adjust initial value if necessary
    },
  ],
};
