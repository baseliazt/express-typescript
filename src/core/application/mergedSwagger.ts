import YAML from "yamljs";
import merge from "deepmerge";
import path from "path";
import { JsonObject } from "type-fest";

// Define a type for the Swagger document
interface SwaggerDocument extends JsonObject {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
  };
  servers: Array<{ url: string; description: string }>;
  paths: { [path: string]: any };
  components?: { [component: string]: any };
  [key: string]: any; // Add an index signature for flexibility
}

// Load YAML files and assert their type
const swaggerBase = YAML.load(
  path.join(__dirname, "swagger-base.yaml")
) as SwaggerDocument;
const swaggerExtensions = YAML.load(
  path.join(__dirname, "swagger-extensions.yaml")
) as SwaggerDocument;

// Merge YAML files
const mergedSwagger = merge<SwaggerDocument>(swaggerBase, swaggerExtensions);
mergedSwagger.info.title = "Learn Typescript API";
mergedSwagger.info.description = "All created resource";

export default mergedSwagger;
