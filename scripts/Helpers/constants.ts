// Externals
import { join } from "path";

export const OUTPUT_PATH = join(__dirname, "..", "..", "output");
export const OUTPUT_ENV_PATH = join(OUTPUT_PATH, "env.json");
export const APPS_SCRIPT_PATH = join(
  __dirname,
  "..",
  "..",
  "src",
  "Helpers",
  "AppsScript",
  "src"
);
export const APPS_SCRIPT_CONFIG_PATH = join(
  APPS_SCRIPT_PATH,
  "..",
  "appsscript.json"
);
