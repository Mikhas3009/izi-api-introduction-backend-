import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

export function setupSwagger(app: Express): void {
  const swaggerPath = path.resolve(__dirname, "../../docs/swagger.yaml");
  const swaggerDocument = YAML.load(swaggerPath);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
