
CREATE SEQUENCE public.cliente_cli_id_seq;

CREATE TABLE public.cliente (
                cli_id INTEGER NOT NULL DEFAULT nextval('public.cliente_cli_id_seq'),
                cli_identificacion VARCHAR NOT NULL,
                cli_nombre VARCHAR NOT NULL,
                cli_direccion VARCHAR NOT NULL,
                cli_telefono VARCHAR(10) NOT NULL,
                cli_estado BOOLEAN NOT NULL,
                CONSTRAINT cliente_pk PRIMARY KEY (cli_id)
);


ALTER SEQUENCE public.cliente_cli_id_seq OWNED BY public.cliente.cli_id;

CREATE SEQUENCE public.factura_fac_id_seq;

CREATE TABLE public.factura (
                fac_id INTEGER NOT NULL DEFAULT nextval('public.factura_fac_id_seq'),
                cli_id INTEGER NOT NULL,
                fact_numero VARCHAR NOT NULL,
                fac_subtotal DOUBLE PRECISION NOT NULL,
                fac_total DOUBLE PRECISION NOT NULL,
                fac_tarifa0 DOUBLE PRECISION NOT NULL,
                fac_tarifa12 DOUBLE PRECISION NOT NULL,
                fac_iva DOUBLE PRECISION NOT NULL,
                fac_estado BOOLEAN NOT NULL,
                CONSTRAINT factura_pk PRIMARY KEY (fac_id)
);


ALTER SEQUENCE public.factura_fac_id_seq OWNED BY public.factura.fac_id;

CREATE SEQUENCE public.productos_pro_id_seq;

CREATE TABLE public.productos (
                pro_id INTEGER NOT NULL DEFAULT nextval('public.productos_pro_id_seq'),
                pro_codigo VARCHAR(13) NOT NULL,
                pro_nombre VARCHAR NOT NULL,
                pro_precio DOUBLE PRECISION NOT NULL,
                pro_iva BOOLEAN NOT NULL,
                pro_estado BOOLEAN NOT NULL,
                CONSTRAINT productos_pk PRIMARY KEY (pro_id)
);


ALTER SEQUENCE public.productos_pro_id_seq OWNED BY public.productos.pro_id;

CREATE SEQUENCE public.detalle_factura_det_fac_id_seq;

CREATE TABLE public.detalle_factura (
                det_fac_id INTEGER NOT NULL DEFAULT nextval('public.detalle_factura_det_fac_id_seq'),
                fac_id INTEGER NOT NULL,
                pro_id INTEGER NOT NULL,
                det_fac_cantidad INTEGER NOT NULL,
                det_fac_precio DOUBLE PRECISION NOT NULL,
                det_fac_total DOUBLE PRECISION NOT NULL,
                det_fac_estado BOOLEAN NOT NULL,
                CONSTRAINT detalle_factura_pk PRIMARY KEY (det_fac_id)
);


ALTER SEQUENCE public.detalle_factura_det_fac_id_seq OWNED BY public.detalle_factura.det_fac_id;

ALTER TABLE public.factura ADD CONSTRAINT cliente_factura_fk
FOREIGN KEY (cli_id)
REFERENCES public.cliente (cli_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.detalle_factura ADD CONSTRAINT factura_detalle_factura_fk
FOREIGN KEY (fac_id)
REFERENCES public.factura (fac_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.detalle_factura ADD CONSTRAINT productos_detalle_factura_fk
FOREIGN KEY (pro_id)
REFERENCES public.productos (pro_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;