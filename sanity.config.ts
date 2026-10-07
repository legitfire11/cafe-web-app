import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';

export default defineConfig({
  basePath: '/studio',
  name: 'cafe-studio',
  title: 'Velvet & Bean Admin',
  projectId: 't2kujpb6',
  dataset: 'production',
  plugins: [structureTool()],
  schema: schema,
});
