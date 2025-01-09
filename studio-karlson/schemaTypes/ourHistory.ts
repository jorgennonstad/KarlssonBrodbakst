// schemas/ourHistory.js
export default {
    name: 'ourHistory',
    type: 'document',
    title: 'Vår Historie',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Tittel',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: 'content',
        type: 'array',
        title: 'Innhold',
        of: [{ type: 'block' }],
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
    ],
  };
  