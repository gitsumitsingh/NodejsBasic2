import { fileURLToPath } from "url";
import { dirname } from "path";

export const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
export const __dirname = dirname(__filename); // get the name of the directory
