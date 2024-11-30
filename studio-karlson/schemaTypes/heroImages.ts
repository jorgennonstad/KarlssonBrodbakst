export default {
    name: 'heroImage',
    type: 'document',
    title: 'Hero Image',
    fields: [
        {
            name: 'image1',
            type: 'image',
            title: 'Hero Image', // Updated title
            options: {
                hotspot: true, // Optional: allows cropping/zooming of the image
            },
        }
    ]
}
