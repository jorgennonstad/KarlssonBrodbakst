export default {
  name: 'footer',
  title: 'Bunntekst',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'contact',
      title: 'Kontaktinformasjon',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Telefonnummer',
          type: 'string',
        },
        {
          name: 'email',
          title: 'E-postadresse',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Adresse',
          type: 'string',
        },
        {
          name: 'orgnr',
          title: 'Organisasjonsnummer',
          type: 'string',
        },
      ],
    },
    {
      name: 'map',
      title: 'Kart Embed URL',
      type: 'string',
      description: 'Embed-URL for Google Maps',
    },
    {
      name: 'socialMedia',
      title: 'Sosiale Medier',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'instagramIcon',
          title: 'Instagram-ikon',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'facebookIcon',
          title: 'Facebook-ikon',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'instagramName',
          title: 'Instagram Navn',
          type: 'string',  // New field for Instagram name
        },
        {
          name: 'facebookName',
          title: 'Facebook Navn',
          type: 'string',  // New field for Facebook name
        },
      ],
    },
    {
      name: 'openingHours',
      title: 'Åpningstider',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Dag',
              type: 'string',
            },
            {
              name: 'hours',
              title: 'Åpningstider',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
};
