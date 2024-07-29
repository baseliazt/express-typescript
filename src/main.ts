import { web } from "./core/application/web";
import { logger } from "./core/application/logging";

web.listen(3000, () => {
  logger.info("Listening on port 3000");
});
