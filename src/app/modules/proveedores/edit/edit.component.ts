import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Proveedor } from '@app/models/proveedores';
import { ProveedorService } from '@app/services/proveedores.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public proveedor: Proveedor = {
    idProveedor: 0,
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    password: '',
    foto: '',
    rfc: '',
    razonSocial: '',
    idStatus: 1,
  }

  constructor(
    private services: ProveedorService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let { id } = this.activatedRoute.snapshot.params;
    this.services.getProveedor(id).subscribe((res) => {
      this.proveedor = res;
    })
  }

  async UpdateData(e: any) {
    let lazyEvent;

    if (e.form.status === "VALID") {
      this.services.updateProveedor(this.proveedor)
        .subscribe((res) => {
          console.log(res);
          /*this.proveedores = proveedor;
          this.totalRecords = proveedor.length;
          this.loading = false;*/
        });
    } else {
      alert('Ingresa todos los datos')
    }
  }
}
