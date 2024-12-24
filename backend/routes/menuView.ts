import express from "express";
import * as menuviewController from "../controller/menuview";

const router = express.Router();
// router.get("/api/users/search", adminController.getAdmin);
router.post("/api/menu/search", menuviewController.searchMenu);
router.post("/api/menu/save", menuviewController.saveMenu);
// router.post("/api/users/insert", userviewController.searchUser);
router.post("/api/menu/delete", menuviewController.deleteMenu);

router.post("/api/menu/searchTop", menuviewController.searchTopMenu);
router.post("/api/menu/saveTop", menuviewController.saveTopMenu);
// router.post("/api/users/insert", userviewController.searchUser);
router.post("/api/menu/deleteTop", menuviewController.deleteTopMenu);

export default router;