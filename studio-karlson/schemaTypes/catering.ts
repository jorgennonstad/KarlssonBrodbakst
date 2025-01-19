export default {
    name: "catering",
    type: "document",
    title: "Catering",
    fields: [
      {
        name: "title",
        type: "string",
        title: "Title",
      },
      {
        name: "description",
        type: "text",
        title: "Description",
      },
      {
        name: "image",
        type: "image",
        title: "Hero Image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "menuItems",
        type: "array",
        title: "Menu Items",
        of: [
          {
            type: "object",
            fields: [
              {
                name: "name",
                type: "string",
                title: "Dish Name",
              },
              {
                name: "description",
                type: "text",
                title: "Description",
              },
              {
                name: "price",
                type: "number",
                title: "Price (in NOK)",
              },
            ],
          },
        ],
      },
    ],
  };
  