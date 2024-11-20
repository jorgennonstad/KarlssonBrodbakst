// ./schemas/sliderImage.js
export default {
  name: 'sliderImage',
  title: 'Slider Image',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
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
  ],
};
