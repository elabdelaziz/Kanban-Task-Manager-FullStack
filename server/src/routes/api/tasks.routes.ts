import { Router } from "express";
import * as controllers from "../../controllers/tasks.controllers";
import verifyAuthToken from "../../middleware/verifyToken";

const routes = Router();

// routes
//   .route("/")
//   .get(verifyAuthToken, controllers.getAll)
//   .post(controllers.create);
routes
  .route("/")
  // .get(verifyAuthToken, controllers.getSingleUser)
  .post(controllers.create);

routes
  .route("/:id")
  .get(controllers.getUserTasks)
  .delete(controllers.deleteTask);

export default routes;
