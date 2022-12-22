const { db } = require("../cnn")

const getCliente =async (req,res)=>{
    const response = await db.any('select * from cliente where cli_estado=true')
    res.json(response)
}

const getClienteByIdentificacion =async (req,res)=>{
    const {cli_identificacion}=req.body
    const response = await db.any(`select * from cliente 
    where cli_estado=true and cli_identificacion=$1`,[cli_identificacion])
    res.json(response)
}

const getClienteById =async (req,res)=>{
    const {cli_id}=req.body
    const response = await db.any(`select * from cliente 
    where cli_estado=true and cli_id=$1`,[cli_id])
    res.json(response)
}

const postCreateCliente =async (req,res)=>{
    const {cli_identificacion,cli_nombre,cli_direccion,cli_telefono}=req.body
    const response = await db.any(`INSERT INTO cliente (cli_identificacion,cli_nombre,cli_direccion,cli_telefono,cli_estado) 
    values($1,$2,$3,$4,true)`,[cli_identificacion,cli_nombre,cli_direccion,cli_telefono])
    res.json({
        message:'Cliente creado correctamente',
        body:{
            cli_identificacion,cli_nombre,cli_direccion,cli_telefono
        }
    })
}

const deleteCliente =async (req,res)=>{
    const {cli_id}=req.query
    const response = await db.any(`UPDATE cliente set  cli_estado=false  
    where cli_id=$1`,[cli_id])
    res.json({
        message:'Cliente eliminado correctamente',
        body:{
            cli_id
        }
    })
}

const getProductos =async (req,res)=>{
    const response = await db.any('select * from productos where pro_estado=true')
    res.json(response)
}

const postCreateProducto =async (req,res)=>{
    const {pro_codigo,pro_nombre,pro_precio,pro_iva}=req.body
    const response = await db.any(`INSERT INTO productos (pro_codigo,pro_nombre,pro_precio,pro_iva,pro_estado) 
    values($1,$2,$3,$4,true)`,[pro_codigo,pro_nombre,pro_precio,pro_iva])
    res.json({
        message:'Producto creado correctamente',
        body:{
            pro_codigo,pro_nombre,pro_precio,pro_iva
        }
    })
}

const getFactura =async (req,res)=>{
    const response = await db.any('select * from factura where fac_estado=true')
    res.json(response)
}

const getFacturaByNumero =async (req,res)=>{
    const {fac_numero}=req.body
    const response = await db.any('select * from factura where fac_estado=true and fac_numero=$1',[fac_numero])
    res.json(response)
}

const postCreateFactura =async (req,res)=>{
    const {cli_id,fac_numero,fac_subtotal,fac_total,fac_tarifa0,fac_tarifa12,fac_iva}=req.body
    const response = await db.any(`INSERT INTO factura (cli_id,fac_numero,fac_subtotal,fac_total,
        fac_tarifa0,fac_tarifa12,fac_iva,fac_estado) 
        values($1,$2,$3,$4,$5,$6,$7,true) returning*`,[cli_id,fac_numero,fac_subtotal,fac_total,fac_tarifa0,fac_tarifa12,fac_iva])
    res.json(response)
}

const getDetalleFactura =async (req,res)=>{
    const response = await db.any('select * from detalle_factura where det_fac_estado=true')
    res.json(response)
}

const getDetalleFacturaPorIdFactura =async (req,res)=>{
    const {fac_id}=req.body
    const response = await db.any('select * from detalle_factura where det_fac_estado=true and fac_id=$1',[fac_id])
    res.json(response)
}

const postCreateDetalleFactura =async (req,res)=>{
    const {fac_id,pro_id,det_fac_cantidad,det_fac_precio,det_fac_total}=req.body
    const response = await db.any(`INSERT INTO detalle_factura (fac_id,pro_id,det_fac_cantidad,det_fac_precio,
        det_fac_total,det_fac_estado) 
        values($1,$2,$3,$4,$5,true) returning*`,[fac_id,pro_id,det_fac_cantidad,det_fac_precio,det_fac_total])
    res.json(response)
}

const getFacturaDetalle = async (req, res) => { 
    try
        { 
            const facturas = await db.query(`select * from factura where fac_estado=true order by 1`); 
            let response=[]; 
            for (let i = 0; i < facturas.length; i++) { 
                let detalleFactura = await db.query(`select df.* from factura f, detalle_factura df where f.fac_id=df.fac_id and 
                    f.fac_estado=true and df.det_fac_estado=true and df.fac_id=$1`,[facturas[i].fac_id]); 
                response.push({ 
                factura:facturas[i],detalleFactura:detalleFactura 
                }) 
            } 
            res.json(response) 
    }catch (error){ 
        res.json({ message:'Problema al obtener el detalle' }) 
    } 
}

module.exports={
    getCliente,
    getClienteByIdentificacion,
    getClienteById,
    postCreateCliente,
    deleteCliente,
    getProductos,
    postCreateProducto,
    getFactura,
    postCreateFactura,
    getFacturaByNumero,
    getDetalleFactura,
    postCreateDetalleFactura,
    getFacturaDetalle,
    getDetalleFacturaPorIdFactura
}