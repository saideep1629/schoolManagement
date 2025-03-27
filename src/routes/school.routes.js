import { Router } from "express";
import { listSchools, registerSchool } from "../controllers/school.controller.js";

const router = Router();

router.route("/addSchool").post(registerSchool)
router.route("/listSchools").get(listSchools)

export default router;