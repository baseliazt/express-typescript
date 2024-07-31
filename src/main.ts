import { web } from "./core/application/web";
import { logger } from "./core/application/logging";
import path from "path";

web.listen(3000, () => {
  logger.info(path.join(__dirname, "swagger-base.yaml"));
  logger.info("Listening on port 3000");
});
