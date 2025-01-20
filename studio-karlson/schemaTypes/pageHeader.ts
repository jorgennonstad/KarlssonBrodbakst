// schemas/pageHeader.js
export default {
    name: 'pageHeader',
    type: 'document',
    title: 'Om Oss Sideoverskrift',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Tittel',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: 'subtitle',
        type: 'string',
        title: 'Undertekst',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
    ],
  };
  