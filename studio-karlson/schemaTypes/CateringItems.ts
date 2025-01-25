
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
        validation: (Rule: { required: () => { (): any; new(): any; error: { (arg0: string): any; new(): any; }; }; }) => Rule.required().error("Tittel er påkrevd."),
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
        description:
          "Liste med beskrivelser av rettene, f.eks. 'Nybakt surdeigsbrød med sprø skorpe'.",
        validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; error: { (arg0: string): any; new(): any; }; }; new(): any; }; }; }) =>
          Rule.required().min(1).error("Minst én beskrivelse er påkrevd."),
      },
      {
        name: "price",
        title: "Pris",
        type: "string",
        description: "Prisen på menyen, f.eks. 'Kr. 249,-'.",
        validation: (Rule: { required: () => { (): any; new(): any; error: { (arg0: string): any; new(): any; }; }; }) => Rule.required().error("Pris er påkrevd."),
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
    ],
  };
  