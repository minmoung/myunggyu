import express from "express";
import * as tempviewController from "../controller/tempview";

const router = express.Router();

router.post("/api/temp/search", tempviewController.searchTemp);
router.post("/api/temp/insert", tempviewController.insertTemp);
router.post("/api/temp/update", tempviewController.updateTemp);
router.post("/api/temp/delete", tempviewController.deleteTemp);

export default router;