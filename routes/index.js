const { Router } = require("express");
const { getCliente, getClienteByIdentificacion, postCreateCliente, deleteCliente, getProductos, postCreateProducto, getFactura, postCreateFactura, getFacturaByNumero, getDetalleFactura, postCreateDetalleFactura, getFacturaDetalle, getClienteById, getDetalleFacturaPorIdFactura } = require("../controller/cliente.controller");

const router= Router()
router.get("/clientes",getCliente)
router.get("/clienteById",getClienteById)
router.get("/clienteByIdentificacion",getClienteByIdentificacion)
router.post("/clientes",postCreateCliente)
router.put("/clientes",deleteCliente)
//Productos
router.get("/productos",getProductos)
router.post("/productos",postCreateProducto)
//Factura
router.get("/factura",getFactura)
router.post("/factura",postCreateFactura)
router.get("/facturaByNumero",getFacturaByNumero)
//Detalle Factura
router.get("/detallefactura",getDetalleFactura)
router.post("/detallefactura",postCreateDetalleFactura)
router.get("/facturaDetalle",getFacturaDetalle)
router.get("/detallefacturaIdFactura",getDetalleFacturaPorIdFactura)

module.exports=router