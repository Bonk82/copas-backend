import { Router } from "express";
import * as login from "../controllers/login.js";
import * as utils from "../functions/utils.js";

const router = Router();

/**********LOGIN*/
router.get('/login/', login.login)
router.get('/signUp/', login.signUp)
router.get('/generarcrud/', utils.generarCRUDPostgres)

export default router;