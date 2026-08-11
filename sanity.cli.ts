import { defineCliConfig } from "sanity/cli";

import { sanityDataset, sanityProjectId } from "./src/lib/sanity.client";

export default defineCliConfig({
  api: {
    projectId: sanityProjectId,
    dataset: sanityDataset,
  },
  studioHost: "tennis-impuls",
});
