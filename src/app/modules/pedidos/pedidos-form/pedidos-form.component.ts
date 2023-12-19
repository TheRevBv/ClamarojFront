import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ProdListComponent } from '@components/prod-list/prod-list.component';

import { EstatusService } from '@services/estatus.service';
import { PedidosService } from '@services/pedidos.service';
import { UsuariosService } from '@services/usuarios.service';
import { Estatus } from '@models/estatus';
import { Pedido } from '@models/pedidos';
import { Usuario } from '@models/usuarios';
import { debounceTime } from 'rxjs';
import { DetallePedido } from '@models/detallepedidos';
import { DetallesPedidosService } from '@services/detalles-pedidos.service';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css'],
  providers: [MessageService, DialogService, PedidosService, UsuariosService],
})
export class PedidosFormComponent implements OnInit, OnDestroy {
  ref: DynamicDialogRef | undefined;
  pedidoForm!: FormGroup;
  title: string = '';
  tipoForm: string = '';
  tiposPedido: any[] = [];
  tiposPago: any[] = [];
  tiposEnvio: any[] = [];
  estatus: Estatus[] = [];
  usuarios: Usuario[] = [];
  detallesPedido: DetallePedido[] = [];
  total: number = 0;
  pedido: Pedido = {
    idPedido: 0,
    idUsuario: 0,
    idStatus: 0,
    fecha: new Date(),
    fechaEntrega: new Date(),
    domicilio: '',
    telefono: '',
    razonSocial: '',
    rfc: '',
    tipoPago: '',
    tipoEnvio: '',
    tipoPedido: '',
    total: 0,
    detallesPedidos: [],
  };
  // El rfc debe tener 13 caracteres
  // Los primeros 4 caracteres deben ser letras mayúsculas
  // Los siguientes 6 caracteres deben ser números
  // Los últimos 3 caracteres pueden ser letras mayúsculas o números
  patternRFC: string = '^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$';
  maxDate!: Date;
  minDate: Date = new Date(1900, 0, 1);

  constructor(
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private statusSvc: EstatusService,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private router: Router,
    private pedidosSvc: PedidosService,
    private usuariosSvc: UsuariosService,
    private detallesPedidosService: DetallesPedidosService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.pedidoForm.controls['rfc'].valueChanges
      .pipe(
        debounceTime(300) // Ajusta el tiempo de espera según tus necesidades
      )
      .subscribe((newRfcValue) => {
        this.pedidoForm.controls['rfc'].setValue(newRfcValue.toUpperCase(), {
          emitEvent: false,
        });
      });
    this.getTipoPedido();
    this.getTipoPago();
    this.getTipoEnvio();
    this.getEstatus();
    this.getUsuarios();
    const id = this.route.snapshot.paramMap.get('id')!;
    this.getPedido(id);
    this.getDetallesPedido(+id);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  getDetallesPedido(idPedido: number) {
    this.detallesPedidosService.getDetallesPedidos(idPedido).subscribe(
      (data) => {
        this.detallesPedido = data;
        this.total =
          this.detallesPedido
            .map((detalle) => detalle.subtotal)
            .reduce((a, b) => a + b, 0) * 1.16;
        this.pedidoForm.controls['total'].setValue(this.total);
        console.log('Detalles de pedido: ', this.detallesPedido);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sendPedidoCliente() {
    this.pedidosSvc.sendPedidoCliente(this.pedido).subscribe(
      (data) => {
        this.messageSvc.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail: `Pedido enviado correctamente`,
        });
        this.router.navigate(['admin', 'pedidos']);
      },
      (err) => {
        this.messageSvc.add({
          severity: 'error',
          summary: '¡Error!',
          detail: `Error al enviar el pedido`,
        });
      }
    );
  }

  createForm() {
    let fechaActual = new Date();
    this.maxDate = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth() + 2,
      fechaActual.getDate()
    );
    this.pedidoForm = this.fb.group({
      idUsuario: new FormControl<Usuario | null>(null, Validators.required),
      idStatus: new FormControl<Estatus | null>(null, Validators.required),
      //La fecha de entrega inicializa se calcula en base a la fecha actual + 7 días
      fechaEntrega: new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth(),
        fechaActual.getDate() + 7
      ),
      domicilio: ['', Validators.required],
      telefono: ['', Validators.required],
      razonSocial: [''],
      rfc: [''],
      tipoPago: ['', Validators.required], // Tipos de pago: Efectivo, Tarjeta de crédito, Tarjeta de débito, Transferencia bancaria
      tipoEnvio: ['', Validators.required], // Tipos de envío: A domicilio (con costo), Recoger en tienda (sin costo)
      tipoPedido: ['', Validators.required], // Tipos de pedido: C Compra, V Venta
      total: 0,
    });
    this.pedidoForm.controls['rfc'].setValidators([
      Validators.required,
      Validators.pattern(this.patternRFC),
    ]);
    this.pedidoForm.controls['total'].disable();
  }

  show() {
    this.ref = this.dialogService.open(ProdListComponent, {
      header: 'Seleccione sus artículos',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((articulos: any[]) => {
      if (articulos) {
        this.messageSvc.add({
          severity: 'success',
          summary: 'Se han agregado articulos',
          detail: `${articulos.length} articulos agregados`,
        });
        let detallesPedido: DetallePedido;
        let fechaActual = new Date();
        articulos.forEach((articulo) => {
          detallesPedido = {
            idDetallePedido: 0,
            idPedido: 0,
            fecha: new Date(
              fechaActual.getFullYear(),
              fechaActual.getMonth(),
              fechaActual.getDate()
            ),
            idProducto: articulo.id,
            cantidad: articulo.cantidad,
            precioUnitario: articulo.precio,
            subtotal: articulo.subtotal,
          };
          this.total += articulo.subtotal;
          this.detallesPedido.push(detallesPedido);
        });
        // this.pedidoForm.controls['total'].setValue(this.total);
      } else {
        this.messageSvc.add({
          severity: 'info',
          summary: 'No se han agregado articulos',
          detail: ``,
        });
      }
      // if (this.receta.idReceta) {
      //   this.getIngredientesByReceta(this.receta.idReceta.toString());
      // }
    });

    // this.ref.onMaximize.subscribe((value) => {
    //   this.messageSvc.add({
    //     severity: 'info',
    //     summary: 'Maximized',
    //     detail: `maximized: ${value.maximized}`,
    //   });
    // });
  }

  getTipoPedido() {
    this.tiposPedido = this.pedidosSvc.getTipoPedido();
  }

  getTipoPago() {
    this.tiposPago = this.pedidosSvc.getTipoPago();
  }

  getTipoEnvio() {
    this.tiposEnvio = this.pedidosSvc.getTipoEnvio();
  }

  getEstatus() {
    this.statusSvc.getEstatus().subscribe((data) => {
      this.estatus = data;
    });
  }

  getUsuarios() {
    this.usuariosSvc.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  getPedido(id: string) {
    if (id !== null && id !== undefined && id !== '') {
      this.title = `Editar pedido ${id}`;
      this.tipoForm = 'E';
      this.pedidosSvc.getPedido(+id).subscribe((data) => {
        this.pedido = data;
        console.log(this.pedido);
        this.pedidoForm.patchValue({
          idUsuario: this.pedido.idUsuario,
          idStatus: this.pedido.idStatus,
          fecha: this.pedido.fecha,
          fechaEntrega: new Date(this.pedido.fechaEntrega),
          domicilio: this.pedido.domicilio,
          telefono: this.pedido.telefono,
          razonSocial: this.pedido.razonSocial,
          rfc: this.pedido.rfc,
          tipoPago: this.pedido.tipoPago,
          tipoEnvio: this.pedido.tipoEnvio,
          tipoPedido: this.pedido.tipoPedido,
          total: this.pedido.total,
        });
      });
    } else {
      this.title = 'Agregar pedido';
      this.tipoForm = 'N';
    }
  }

  onSubmit() {
    // console.log(this.pedidoForm);
    if (this.pedidoForm.invalid && this.detallesPedido.length === 0) {
      this.messageSvc.add({
        severity: 'error',
        summary: '¡Error!',
        detail: `Formulario inválido \n Considere que debe agregar al menos un artículo`,
      });
    }
    switch (this.tipoForm) {
      case 'N':
        this.agregar();
        break;
      case 'E':
        this.editar();
        break;
      default:
        break;
    }
  }

  cancelar() {
    this.router.navigate(['admin', 'pedidos']);
  }

  agregar() {
    let {
      idUsuario,
      idStatus,
      fechaEntrega,
      domicilio,
      telefono,
      razonSocial,
      rfc,
      tipoPago,
      tipoEnvio,
      tipoPedido,
    } = this.pedidoForm.value;

    let fechaActual = new Date();

    this.pedido = {
      idPedido: 0,
      idUsuario: idUsuario,
      idStatus: idStatus,
      fecha: new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth(),
        fechaActual.getDate()
      ),
      fechaEntrega: fechaEntrega,
      domicilio: domicilio,
      telefono: telefono
        .toString()
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')
        .replace('-', '')
        .replace(' ', '')
        .trim(),
      razonSocial: razonSocial,
      rfc: rfc,
      tipoPago: tipoPago,
      tipoEnvio: tipoEnvio,
      tipoPedido: tipoPedido,
      total: this.total,
      detallesPedidos: this.detallesPedido,
    };

    this.pedidosSvc.addPedido(this.pedido).subscribe(
      (data) => {
        this.messageSvc.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail: `Pedido agregado correctamente`,
        });
        this.router.navigate(['admin', 'pedidos']);
      },
      (err) => {
        this.messageSvc.add({
          severity: 'error',
          summary: '¡Error!',
          detail: `Error al agregar el pedido`,
        });
      }
    );
  }

  editar() {
    let {
      idUsuario,
      idStatus,
      fechaEntrega,
      domicilio,
      telefono,
      razonSocial,
      rfc,
      tipoPago,
      tipoEnvio,
      tipoPedido,
    } = this.pedidoForm.value;

    // Sumar los subtotales de los detalles de pedido y al final asignar el total multiplicado por 1.16
    let tot =
      this.detallesPedido
        .map((detalle) => detalle.subtotal)
        .reduce((a, b) => a + b, 0) * 1.16;

    this.pedido = {
      idPedido: this.pedido.idPedido,
      idUsuario: idUsuario,
      idStatus: idStatus,
      fecha: this.pedido.fecha,
      fechaEntrega: fechaEntrega,
      domicilio: domicilio,
      telefono: telefono
        .toString()
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')
        .replace(' ', '')
        .trim(),
      razonSocial: razonSocial,
      rfc: rfc,
      tipoPago: tipoPago,
      tipoEnvio: tipoEnvio,
      tipoPedido: tipoPedido,
      total: Number(tot.toFixed(2)),
      detallesPedidos: this.detallesPedido,
    };

    console.log(this.pedido);

    this.pedidosSvc.updatePedido(this.pedido).subscribe(
      (data) => {
        this.messageSvc.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail: `Pedido editado correctamente`,
        });
        this.router.navigate(['admin', 'pedidos']);
      },
      (err) => {
        this.messageSvc.add({
          severity: 'error',
          summary: '¡Error!',
          detail: `Error al editar el pedido`,
        });
      }
    );
  }
}
