import { Router } from "express";
import * as venta from "../controllers/venta.js";

const router = Router();

router.get('/listarComponentes/', venta.listarComponentes)
router.get('/crudComponente/', venta.crudComponente)
router.get('/listarControlCajas/', venta.listarControlCajas)
router.get('/crudControlCaja/', venta.crudControlCaja)
router.get('/listarIngresos/', venta.listarIngresos)
router.get('/crudIngreso/', venta.crudIngreso)
router.get('/listarIngresoDetalles/', venta.listarIngresoDetalles)
router.get('/crudIngresoDetalle/', venta.crudIngresoDetalle)

router.get('/listarSucursalProductos/', venta.listarSucursalProductos)
router.get('/crudSucursalProdcuto/', venta.crudSucursalProdcuto)
router.get('/listarPedidos/', venta.listarPedidos)
router.get('/crudPedido/', venta.crudPedido)
router.get('/listarPedidoDetalles/', venta.listarPedidoDetalles)
router.get('/crudPedidoDetalle/', venta.crudPedidoDetalle)
router.get('/listarProductos/', venta.listarProductos)
router.get('/crudProducto/', venta.crudProducto)

router.get('/listarPromociones/', venta.listarPromociones)
router.get('/crudPromocion/', venta.crudPromocion)
router.get('/listarProveedores/', venta.listarProveedores)
router.get('/crudProveedor/', venta.crudProveedor)

router.get('/listarDashboard/', venta.listarDashboard)

export default router;