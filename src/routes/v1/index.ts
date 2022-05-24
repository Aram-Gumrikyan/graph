import { Router } from "express";
import graphRoutes from "./graphRoutes";

const router = Router();

router.use("/graph", graphRoutes);

export default router;
