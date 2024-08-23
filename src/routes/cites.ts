import { Router } from "express";
import { 
    getCitesCtrl, 
    addCiteCtrl, 
    getCiteByIdCtrl, 
    getCiteByUserCtrl,
    updateCiteByIdCtrl 
} from "../controllers/cites.controller";
import { checkJwt } from "../middlewares/session";
import upload from "../config/multer-condig";

const router = Router();

router.get(["/:typeCite", '/'], checkJwt, getCitesCtrl);

router.post("/", checkJwt, upload.single('image'), addCiteCtrl);

router.get("/:id", checkJwt, getCiteByIdCtrl);

router.get("/user/:id/:typeCite", checkJwt, getCiteByUserCtrl);

router.put("/:id",  checkJwt, updateCiteByIdCtrl);

/* router.delete("/:id", checkJwt, deleteCiteByIdCtrl);

router.post("/:id", checkJwt, deleteCiteByIdCtrl); */



export { router };