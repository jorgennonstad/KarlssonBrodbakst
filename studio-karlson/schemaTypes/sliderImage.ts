export default {
  name: 'sliderImage',
  title: 'Slider Image',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image (16:9 ratio)',
      type: 'image',
      options: {
        hotspot: true, // Allows for cropping/zooming of the image
      },
    },
    {
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Use this field to control the order of the images. Lower numbers appear first.',
      validation: (Rule: { min: (arg0: number) => { (): any; new(): any; integer: { (): any; new(): any; }; }; }) => Rule.min(0).integer(), // Ensure positive integers
    },
  ],
};
