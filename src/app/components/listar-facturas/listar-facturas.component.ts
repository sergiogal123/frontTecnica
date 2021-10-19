import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { elementos } from 'src/app/models/Elementos';
import { factura } from 'src/app/models/factura';
import { FacturaService } from 'src/app/services/factura.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listar-facturas',
  templateUrl: './listar-facturas.component.html',
  styleUrls: ['./listar-facturas.component.css']
})
export class ListarFacturasComponent implements OnInit {
  elemento = new elementos();
  facturaForm: FormGroup;
  listFactura: factura[] = [];  
  dataarray: any[] = [];
  closeResult?: string;

  constructor(private modalService: NgbModal, 
    private _facturaService: FacturaService, 
    private toastr: ToastrService,
    private fb: FormBuilder) {
      this.facturaForm= fb.group({
        NumeroFactura: ['', Validators.required],
        Fecha: ['', Validators.required], 
        TipodePago: ['', Validators.required], 
        DocumentoCliente: ['', Validators.required], 
        NombreCliente: ['', Validators.required], 
        Subtotal: ['', Validators.required],
        Descuento: ['', Validators.required], 
        Iva: ['', Validators.required], 
        TotalDescuento: ['', Validators.required],
        TotalImpuesto: ['', Validators.required], 
        Total: ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.elemento = new elementos();
    this.dataarray.push(this.elemento);
    this.obtenerFacturas(); 
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  obtenerFacturas() {
    this._facturaService.getFacturas().subscribe(data=> {
      console.log(data);
      this.listFactura= data;
    },
    error => {
      console.error(error);
    })
  }

  eliminarFactura(id: any) {
    this._facturaService.eliminarfactura(id).subscribe(data=> {
      this.toastr.error('La factura fue eliminada', 'Factura eliminada');
      this.obtenerFacturas();
    },
    error=> {
      console.error(error);
    })
  }

  addForm() {
    this.elemento = new elementos();
    this.dataarray.push(this.elemento);
    console.log(this.dataarray);
  }

  onsubmit() {
    console.log(this.facturaForm);
    console.log(this.dataarray);
  }

  removeForm(index: number) {
    this.dataarray.splice(index);
  }

  agregarfactura() {
    const FACTURA: factura = {
      NumeroFactura: this.facturaForm.get("NumeroFactura")?.value,
      Fecha: this.facturaForm.get("Fecha")?.value,
      TipodePago: this.facturaForm.get("TipodePago")?.value,
      DocumentoCliente: this.facturaForm.get("DocumentoCliente")?.value,
      NombreCliente: this.facturaForm.get("NombreCliente")?.value, 
      Items: this.facturaForm.get("Items")?.value, 
      Subtotal: this.facturaForm.get("Subtotal")?.value, 
      Descuento: this.facturaForm.get("Descuento")?.value, 
      Iva: this.facturaForm.get("Iva")?.value, 
      TotalDescuento: this.facturaForm.get("TotalDescuento")?.value,
      TotalImpuesto: this.facturaForm.get("TotalImpuesto")?.value,
      Total: this.facturaForm.get("Total")?.value
    }
    console.log(FACTURA);
    this._facturaService.guardarfactura(FACTURA).subscribe(data=> {
      this.toastr.success("El registro se guardo con exito","Factura Guardada");
      this.obtenerFacturas();
    },
    error=>{
      this.toastr.error("Error al guardar factura","Factura no guardada");
      this.facturaForm.reset();
    })
  } 

}
