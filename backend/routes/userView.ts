import express from "express";
import * as userviewController from "../controller/userview";

const router = express.Router();
// router.get("/api/users/search", adminController.getAdmin);
router.post("/api/users/search", userviewController.searchUser);
router.post("/api/users/save", userviewController.saveUser);
//router.post("/api/users/insert", userviewController.searchUser);
router.post("/api/users/delete", userviewController.deleteUser);

export default router;