import { Router } from "express";
import * as controllers from "../../controllers/users.controllers";
import verifyAuthToken from "../../middleware/verifyToken";

const routes = Router();

routes
  .route("/")
  .get(verifyAuthToken, controllers.getAll)
  .post(controllers.create);
routes
  .route("/:id")
  .get(verifyAuthToken, controllers.getSingleUser)
  .patch(verifyAuthToken, controllers.updateSingleUser)
  .delete(verifyAuthToken, controllers.deleteSingleUser);

//auth
routes.route("/auth").post(controllers.auth);

export default routes;
