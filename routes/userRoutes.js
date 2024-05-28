import express from "express";
import { currentuser, loginuser, registeruser } from "../controllers/UserController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/current").get(validateToken,currentuser)

export default router;