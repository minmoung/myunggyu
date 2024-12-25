import express from "express";
import * as fileUploadController from "../../controller/dashboard/fileUpload_ctl";

const router = express.Router();

router.post("/upload", fileUploadController.fileUpload);

export default router;