import express from "express";
import * as signInCtl from "../controller/signIn_ctl";

const router = express.Router();
// router.get("/api/users/search", adminController.getAdmin);
router.post("/api/sign-in", signInCtl.searchSign);

export default router;