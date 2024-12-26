
import express from "express";
import * as fileUpload_ctl from "../../controller/dashboard/fileUpload_ctl";
// import { fileUpload } from "../../controller/dashboard/fileUpload_ctl";

const router = express.Router();

router.post("/upload", fileUpload_ctl.fileUpload);
// router.post('/upload', asyncHandler(fileUpload));

export default router;