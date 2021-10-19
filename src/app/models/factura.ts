import { elementos } from "./Elementos";

export class factura {
    IdFactura?: number;
    NumeroFactura: string;
    Fecha: Date;
    TipodePago: string;
    DocumentoCliente: string;
    NombreCliente: string;
    Items: elementos[];
    Subtotal: number;
    Descuento: number;
    Iva: number;
    TotalDescuento: number;
    TotalImpuesto: number;
    Total: number;    
    constructor(numeroFactura: string, fecha: Date, tipodePago: string, documentoCliente: string, nombreCliente: string,items: elementos[],  subtotal: number, descuento: number, iva: number, totalDescuento: number, totalImpuesto: number, total: number ) {
        this.NumeroFactura = numeroFactura;
        this.Fecha = fecha;
        this.TipodePago = tipodePago;
        this.DocumentoCliente = documentoCliente;
        this.NombreCliente= nombreCliente;
        this.Items= items;
        this.Subtotal = subtotal;
        this.Descuento = descuento;
        this.Iva = iva;
        this.TotalDescuento = totalDescuento;
        this.TotalImpuesto = totalImpuesto;
        this.Total = total;
    }
}