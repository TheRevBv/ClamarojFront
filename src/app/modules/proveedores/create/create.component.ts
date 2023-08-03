import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from '@app/models/proveedores';
import { ProveedorService } from '@app/services/proveedores.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  public proveedor: Proveedor = {
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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }


  async sendData(e: any) {
    let lazyEvent;
    if (e.form.status === "VALID") {
      this.services.addProveedor(this.proveedor)
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
