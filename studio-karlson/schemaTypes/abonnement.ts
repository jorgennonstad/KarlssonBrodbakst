// schemas/abonnement.js
export default {
    name: 'abonnement',
    title: 'Abonnement',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The title of the subscription (e.g., 190 Kr/mnd)',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: 'subtitle1',
        title: 'Subtitle 1',
        type: 'string',
        description: 'The subtitle under the title(Valgfritt brød på døren)',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: 'subtitle2',
        title: 'Subtitle 2',
        type: 'string',
        description: 'The subtitle under the first subtitle(Hver torsdag kl 08:00)',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'Detailed description of the subscription offer',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: 'backgroundImage',
        title: 'Background Image',
        type: 'image',
        description: 'Background image for the subscription card',
        options: {
          hotspot: true, // Allows users to adjust focal point
        },
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        description: 'The price of the subscription in the smallest currency unit (e.g., cents)',
        validation: (Rule: { required: () => { (): any; new(): any; positive: { (): any; new(): any; }; }; }) => Rule.required().positive(),
      },
      {
        name: 'stripePriceId',
        title: 'Stripe Price ID',
        type: 'string',
        description: 'The price ID from Stripe associated with this product',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
    ],
  };
  