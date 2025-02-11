export default {
  name: 'sliderImage',
  title: 'Nyheter',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Bilde (16:9-forhold)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'altText',
      title: 'Alt-tekst',
      type: 'string',
    },
    {
      name: 'priority',
      title: 'Prioritet',
      type: 'number',
      description: 'Bruk dette feltet for å kontrollere rekkefølgen på bildene. Lavere tall vises først.',
      validation: (Rule: { min: (arg0: number) => { (): any; new(): any; integer: { (): any; new(): any; }; }; }) => Rule.min(0).integer(),
    },
  ],
};
