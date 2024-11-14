import express from "express";
import * as comm_002_ctl from "../../../../controller/dashboard/comm/comm_002/comm_002_ctl";

const router = express.Router();

router.post("/api/comm_002/search1", comm_002_ctl.search01);
router.post("/api/comm_002/insert1", comm_002_ctl.insert01);
router.post("/api/comm_002/update1", comm_002_ctl.update01);
router.post("/api/comm_002/delete1", comm_002_ctl.delete01);

router.post("/api/comm_002/search2", comm_002_ctl.search02);
router.post("/api/comm_002/insert2", comm_002_ctl.insert02);
router.post("/api/comm_002/update2", comm_002_ctl.update02);
router.post("/api/comm_002/delete2", comm_002_ctl.delete02);

export default router;