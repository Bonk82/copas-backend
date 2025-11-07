import { Router } from "express";
import * as juego from "../controllers/juego.js";

const router = Router();

router.get('/listarComponentes/', juego.listarComponentes)
router.get('/crudComponente/', juego.crudComponente)
router.get('/listarControlCajas/', juego.listarControlCajas)
router.get('/crudControlCaja/', juego.crudControlCaja)
router.get('/listarIngresos/', juego.listarIngresos)
router.get('/crudIngreso/', juego.crudIngreso)
router.get('/listarIngresoDetalles/', juego.listarIngresoDetalles)
router.get('/crudIngresoDetalle/', juego.crudIngresoDetalle)

router.get('/listarSucursalProductos/', juego.listarSucursalProductos)
router.get('/crudSucursalProdcuto/', juego.crudSucursalProdcuto)
router.get('/listarPedidos/', juego.listarPedidos)
router.get('/crudPedido/', juego.crudPedido)
router.get('/listarPedidoDetalles/', juego.listarPedidoDetalles)
router.get('/crudPedidoDetalle/', juego.crudPedidoDetalle)
router.get('/listarProductos/', juego.listarProductos)
router.get('/crudProducto/', juego.crudProducto)

router.get('/listarPromociones/', juego.listarPromociones)
router.get('/crudPromocion/', juego.crudPromocion)
router.get('/listarProveedores/', juego.listarProveedores)
router.get('/crudProveedor/', juego.crudProveedor)

router.get('/listarDashboard/', juego.listarDashboard)

export default router;