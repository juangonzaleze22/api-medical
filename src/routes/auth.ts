import { Router } from "express";
import { registerCtrl, loginCtrl, registerCtrlWithGoogle, loginCtrlWithGoogle } from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerCtrl);
router.post("/registerWithGoogle", registerCtrlWithGoogle);

router.post("/login", loginCtrl);
router.post("/loginWithGoogle", loginCtrlWithGoogle);

export { router };