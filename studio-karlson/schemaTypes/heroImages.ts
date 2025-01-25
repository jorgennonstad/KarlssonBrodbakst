export default {
    name: 'heroImage',
    type: 'document',
    title: 'Hovedbilde', // Translated to Norwegian
    fields: [
        {
            name: 'image1',
            type: 'image',
            title: 'Hovedbilde', // Translated to Norwegian
            options: {
                hotspot: true, // Valgfritt: Lar deg beskjære/zoome inn på bildet
            },
        },
    ],
};
