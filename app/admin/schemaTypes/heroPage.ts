export default {
    name: 'heroPage',
    type: 'document',
    title: 'Hero Page', // English for clarity, adjust as needed
    fields: [
        {
            name: 'image1',
            type: 'image',
            title: 'Hero Image',
            options: {
                hotspot: true, // Allows cropping/zooming
            },
        },
        {
            name: 'logo',
            type: 'image',
            title: 'Logo',
            options: {
                hotspot: true, // Optional for fine-tuning logo appearance
            },
        },
        {
            name: 'slogan',
            type: 'string',
            title: 'Slogan',
            description: 'A short tagline or slogan for the hero section',
        },
    ],
};
