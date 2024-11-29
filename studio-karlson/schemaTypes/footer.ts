// ./schemas/footer.js

export default {
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
        options: {
          hotspot: true, // Allows for cropping/zooming of the image
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
        title: 'Map Embed URL',
        type: 'string',
        description: 'Embed URL for Google Maps (Use the URL from the "Share" option on Google Maps)',
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
            title: 'Instagram Icon',
            type: 'image',
            options: {
              hotspot: true, // Allows for cropping/zooming of the image
            },
          },
          {
            name: 'facebookIcon',
            title: 'Facebook Icon',
            type: 'image',
            options: {
              hotspot: true, // Allows for cropping/zooming of the image
            },
          },
        ],
      },
      {
        name: 'openingHours',
        title: 'Åpningstider',
        type: 'object',
        fields: [
          {
            name: 'mondayToFriday',
            title: 'Mandag - Fredag',
            type: 'string',
            description: 'Example: 09:00 - 17:00',
          },
          {
            name: 'saturday',
            title: 'Lørdag',
            type: 'string',
            description: 'Example: 10:00 - 14:00',
          },
          {
            name: 'sunday',
            title: 'Søndag',
            type: 'string',
            description: 'Example: Stengt',
          },
        ],
      },
    ],
  };
  