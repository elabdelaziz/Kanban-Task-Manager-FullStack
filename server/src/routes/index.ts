import { Router } from "express";
import usersRoutes from "./api/users.routes";
import tasksRoutes from "./api/tasks.routes";
// import productsRoutes from "./api/products.routes";
// import ordersRoutes from "./api/orders.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/tasks", tasksRoutes);
// routes.use("/products", productsRoutes);
// routes.use("/orders", ordersRoutes);

export default routes;
