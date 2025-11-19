import { Router } from "express";
import * as juego from "../controllers/juego.js";

const router = Router();

router.get('/listarEquipo/', juego.listarEquipo)
router.get('/crudEquipo/', juego.crudEquipo)
router.get('/listarPartido/', juego.listarPartido)
router.get('/crudPartido/', juego.crudPartido)
router.get('/listarApuesta/', juego.listarApuesta)
router.get('/crudApuesta/', juego.crudApuesta)

export default router;