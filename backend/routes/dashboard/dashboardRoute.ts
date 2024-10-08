import express from "express";
import * as dashboardController from "../../controller/dashboard/dashboardController";

const router = express.Router();

router.post("/api/dashboard/searchMenuTop", dashboardController.searchTopMenu);

export default router;