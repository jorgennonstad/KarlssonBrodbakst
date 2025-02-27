import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list"; // ✅ Import ordering plugin

export default defineConfig({
  name: "default",
  title: "karlson",

  projectId: "koixe24m",
  dataset: "production",
  basePath: "/admin",

  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content') // Replace with your section title
          .items([
            // Orderable list for 'product' documents
            orderableDocumentListDeskItem({
              type: 'product', // Use your document type here
              title: 'Produkter', // Title for the section
              id: 'orderedProducts', // ID for the list
              params: {
                lang: 'no_NO', // Filter by Norwegian
              },
              createIntent: false, // Disable item creation if not needed
              menuItems: [], // Custom menu items for the orderable list
              S, // Pass the structure tool
              context, // Pass the context
            }),

            // Orderable list for 'cateringItems' documents
            orderableDocumentListDeskItem({
              type: 'cateringItems', // Catering items document type
              title: 'Catering Varer', // Title for the section
              id: 'orderedCateringItems', // ID for the list
              params: {
                lang: 'no_NO', // Filter by Norwegian
              },
              createIntent: false, // Disable item creation if not needed
              menuItems: [], // Custom menu items for the orderable list
              S, // Pass the structure tool
              context, // Pass the context
            }),

            // Automatically include other document types as normal list items
            ...schemaTypes.filter((type) => type.name !== 'product' && type.name !== 'cateringItems').map((type) =>
              S.listItem()
                .title(type.title || type.name) // Use the title or name of the document type
                .child(S.documentTypeList(type.name)) // List the other document types
            ),
          ]);
      },
    }),
    visionTool(), // Place visionTool here inside the plugins array
  ],

  schema: {
    types: schemaTypes, // Ensure this points to your schema types
  },
});
