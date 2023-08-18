import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ventas } from '@models/Ventas';
import { Cliente } from '@models/clientes';
import { ApiService } from '@services/api.service';
import { ClientesService } from '@services/clientes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  template: '',
  //   templateUrl: './checkout.component.html',
  styleUrls: ['../../home.component.scss'],
})
export class CheckoutComponent implements OnInit {
  id = null;
  cliente: Cliente = {
    idCliente: 0,
    direccion: '',
    telefono: '',
    rfc: '',
    usuario: {
      id: 0,
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
      foto: '',
      fechaNacimiento: new Date(1900, 0, 1),
      fechaRegistro: new Date(),
      idStatus: 0,
    },
  };

  userLog: boolean = false;
  venta: any = [];
  ventadet: any = [];
  pago: any = {
    id: null,
    tipo: 'VENTA',
    venta: '',
    tarjeta: '',
    pagodesc: '',
    fechaven: '',
    cvv: '',
    total: '',
    status: 1,
  };

  paymentForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClientesService,
    private api: ApiService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.paymentForm = this.fb.group({
      c_nombre: ['', [Validators.required]],
      c_apaterno: ['', [Validators.required]],
      c_amaterno: ['', [Validators.required]],
      c_email: ['', [Validators.required]],
      c_telefono: ['', [Validators.required]],
      c_direccion: ['', [Validators.required]],
      p_pagodesc: ['', [Validators.required]],
      p_tarjeta: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      p_fechaven: [
        '',
        [
          Validators.required,
          Validators.pattern('(0[1-9]|1[0-2])/(2[2-9]|[3-9][0-9])'),
        ],
      ],
      p_cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
    });
  }

  ngOnInit(): void {
    let data = JSON.parse(this.clienteService.cliente);
    if (!data) {
      this.userLog = false;
    } else {
      this.userLog = true;
      this.cliente = data;
      this.id = this.activatedRoute.snapshot.params['id'];
      this.getVenta(this.id);

      this.paymentForm.setValue({
        c_nombre: this.cliente.usuario.nombre,
        c_paterno: this.cliente.usuario.apellido,
        c_email: this.cliente.usuario.correo,
        c_telefono: this.cliente.telefono,
        c_direccion: this.cliente.direccion,
        p_pagodesc: this.pago.pagodesc,
        p_tarjeta: this.pago.tarjeta,
        p_fechaven: this.pago.fechaven,
        p_cvv: this.pago.cvv,
      });
    }
  }

  getVenta(idventa: any) {
    /*if (parseInt(idventa) && parseInt(idventa) > 0) {
      this.id = parseInt(idventa);
      this.api.uri = `api/ventas?id=${this.id}`;
      this.api.get().then((item) => {
        if (!item.message) {
          this.venta = item;
          console.log(item.cliente_id);
          console.log(this.cliente.id);
          this.ventadet = this.getVentaDet();
        } else {
          this.toastr.warning('No tienes permisos para ver esta venta');
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.toastr.warning('No tienes permisos para ver esta venta');
      this.router.navigate(['/home']);
    }*/
  }
  getVentaDet() {
    /*if (parseInt(this.id) && parseInt(this.id) > 0) {
      this.id = parseInt(this.id);
      this.api.uri = `api/ventasdet?id=${this.id}`;
      this.api.get().then((item) => {
        if (!item.message) {
          this.ventadet = item.data;
        } else {
          this.toastr.warning(item.message);
        }
      });
    } else {
      this.id = null;
    }*/
  }

  onSubmit() {
    /*if (this.paymentForm.valid) {
      this.api.uri = 'api/clientes';
      // Obtener los valores del formulario
      this.cliente.nombre = this.paymentForm.value.c_nombre;
      this.cliente.apaterno = this.paymentForm.value.c_apaterno;
      this.cliente.amaterno = this.paymentForm.value.c_amaterno;
      this.cliente.email = this.paymentForm.value.c_email;
      this.cliente.telefono = this.paymentForm.value.c_telefono;
      this.cliente.direccion = this.paymentForm.value.c_direccion;

      this.api.put(this.cliente).then((response) => {
        if (!response.message) {
          this.api.uri = `api/pago`;
          this.pago.venta = this.venta.id;
          this.pago.pagodesc = this.paymentForm.value.p_pagodesc;
          this.pago.tarjeta = this.paymentForm.value.p_tarjeta;
          this.pago.fechaven = this.paymentForm.value.p_fechaven;
          this.pago.cvv = this.paymentForm.value.p_cvv;
          this.pago.total = this.venta.total;

          this.api.post(this.pago).then((response) => {
            if (!response.message) {
              this.toastr.success('Pago realizado con exito');
              this.router.navigate(['/home/shopping-cart/validate']);
            } else {
              this.toastr.warning(response.message);
            }
          });
        } else {
          this.toastr.warning(response.message);
        }
      });
    }*/
  }

  validateCreditCardNumber(cardNumber: string) {
    // Remove any non-digit characters from the input value
    const sanitizedValue = cardNumber.replace(/\D+/g, '');

    // Use regular expressions to match credit card number patterns
    const patterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    };

    let valid = false;
    let cardType = '';

    if (valid) {
      // Perform Luhn algorithm check
      let sum = 0;
      let shouldDouble = false;
      for (let i = sanitizedValue.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedValue.charAt(i), 10);
        if (shouldDouble) {
          if ((digit *= 2) > 9) {
            digit -= 9;
          }
        }
        sum += digit;
        shouldDouble = !shouldDouble;
      }
      valid = sum % 10 === 0;
    }

    return { valid, cardType };
  }
}
