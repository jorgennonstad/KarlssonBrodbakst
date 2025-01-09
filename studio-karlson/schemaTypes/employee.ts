// schemas/employee.js
export default {
    name: 'employee',
    type: 'document',
    title: 'Ansatte',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Navn',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: 'image',
        type: 'image',
        title: 'Bilde',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'bio',
        type: 'text',
        title: 'Biografi',
        validation: (Rule: { max: (arg0: number) => { (): any; new(): any; warning: { (arg0: string): any; new(): any; }; }; }) => Rule.max(500).warning('Kortere biografier er mer lesbare.'),
      },
    ],
  };
  