import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "./src/lib/sanity.client";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const projectId = sanityProjectId;
const dataset = sanityDataset;

export default defineConfig({
  name: "ctt-impulse",
  title: "ЦТТ Импульс",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: sanityApiVersion })],
  schema: {
    types: schemaTypes,
  },
});
