export default {
  name: "catering",
  type: "document",
  title: "Catering",
  fields: [
      {
          name: "title",
          type: "string",
          title: "Tittel",
      },
      {
          name: "description",
          type: "text",
          title: "Beskrivelse",
      },
      {
          name: "image",
          type: "image",
          title: "Forsidebilde",
          options: {
              hotspot: true,
          },
      },
      {
          name: "menuItems",
          type: "array",
          title: "Menyartikler",
          of: [
              {
                  type: "object",
                  fields: [
                      {
                          name: "name",
                          type: "string",
                          title: "Navn på rett",
                      },
                      {
                          name: "description",
                          type: "text",
                          title: "Beskrivelse",
                      },
                      {
                          name: "price",
                          type: "number",
                          title: "Pris (i NOK)",
                      },
                  ],
              },
          ],
      },
  ],
};
