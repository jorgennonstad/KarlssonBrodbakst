export default {
  name: 'footer',
  title: 'Bunntekst', // Translated to Norwegian
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true, // Lar deg beskjære/zoome inn på bildet
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
      description: 'Embed-URL for Google Maps (Bruk URL-en fra delingsalternativet i Google Maps)', // Translated
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
            hotspot: true, // Lar deg beskjære/zoome inn på bildet
          },
        },
        {
          name: 'facebookIcon',
          title: 'Facebook-ikon',
          type: 'image',
          options: {
            hotspot: true, // Lar deg beskjære/zoome inn på bildet
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
          description: 'Eksempel: 09:00 - 17:00', // Translated
        },
        {
          name: 'saturday',
          title: 'Lørdag',
          type: 'string',
          description: 'Eksempel: 10:00 - 14:00', // Translated
        },
        {
          name: 'sunday',
          title: 'Søndag',
          type: 'string',
          description: 'Eksempel: Stengt', // Translated
        },
      ],
    },
  ],
};
