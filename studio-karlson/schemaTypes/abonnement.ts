export default {
  name: 'abonnement',
  title: 'Abonnement',
  type: 'document',
  fields: [
      {
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'The title of the subscription',
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
          name: 'discountPercentage',
          title: 'Discount Percentage',
          type: 'number',
          description: 'The percentage discount to apply to the total price (e.g., 20 for 20%)',
          validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): { (): any; new(): any; error: { (arg0: string): any; new(): any; }; }; new(): any; }; }; new(): any; }; }; }) =>
              Rule.required()
                  .min(0)
                  .max(100)
                  .error('Discount percentage must be between 0 and 100'),
      },
      {
          name: 'deliveryFee',
          title: 'Delivery Fee',
          type: 'number',
          description: 'A static fee to add for delivery or handling',
          validation: (Rule: { required: () => { (): any; new(): any; positive: { (): any; new(): any; }; }; }) => Rule.required().positive(),
      },
  ],
};
