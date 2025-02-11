import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { deskTool } from "sanity/desk";

export default defineConfig({
  name: 'default',
  title: 'karlson',

  projectId: 'koixe24m',
  dataset: 'production',
  basePath: "/admin",

  plugins: [structureTool(), visionTool(), deskTool()],

  schema: {
    types: schemaTypes,
  },
})
