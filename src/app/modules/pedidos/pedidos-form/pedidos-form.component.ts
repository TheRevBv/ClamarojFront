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
    private usuariosSvc: UsuariosService
  ) {}

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
      header: 'Seleccione sus productos',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((productos: any[]) => {
      if (productos) {
        this.messageSvc.add({
          severity: 'success',
          summary: 'Se han agregado productos',
          detail: `${productos.length} productos agregados`,
        });
      } else {
        this.messageSvc.add({
          severity: 'info',
          summary: 'No se han agregado productos',
          detail: ``,
        });
      }
      // if (this.receta.idReceta) {
      //   this.getIngredientesByReceta(this.receta.idReceta.toString());
      // }
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageSvc.add({
        severity: 'info',
        summary: 'Maximized',
        detail: `maximized: ${value.maximized}`,
      });
    });
  }

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
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
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
        this.pedidoForm.patchValue({
          idUsuario: this.pedido.idUsuario,
          idStatus: this.pedido.idStatus,
          fecha: this.pedido.fecha,
          fechaEntrega: this.pedido.fechaEntrega,
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
    console.log(this.pedidoForm.value);
    switch (this.tipoForm) {
      case 'N':
        // agregar();
        break;
      case 'E':
        // editar();
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
      total,
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
      telefono: telefono,
      razonSocial: razonSocial,
      rfc: rfc,
      tipoPago: tipoPago,
      tipoEnvio: tipoEnvio,
      tipoPedido: tipoPedido,
      total: total,
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
      total,
    } = this.pedidoForm.value;

    this.pedido = {
      idPedido: this.pedido.idPedido,
      idUsuario: idUsuario,
      idStatus: idStatus,
      fecha: this.pedido.fecha,
      fechaEntrega: fechaEntrega,
      domicilio: domicilio,
      telefono: telefono,
      razonSocial: razonSocial,
      rfc: rfc,
      tipoPago: tipoPago,
      tipoEnvio: tipoEnvio,
      tipoPedido: tipoPedido,
      total: total,
    };

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
