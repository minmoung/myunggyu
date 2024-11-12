import express from "express";
import * as comm_001_ctl from "../../../../controller/dashboard/comm/comm_001/comm_001_ctl";

const router = express.Router();

router.post("/api/comm_001/search", comm_001_ctl.search01);
router.post("/api/comm_001/insert", comm_001_ctl.insert01);
router.post("/api/comm_001/update", comm_001_ctl.update01);
router.post("/api/comm_001/delete", comm_001_ctl.delete01);

export default router;