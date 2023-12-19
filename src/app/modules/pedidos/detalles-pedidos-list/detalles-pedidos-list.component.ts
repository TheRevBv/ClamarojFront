import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallePedido, DetallePedidoDto } from '@models/detallepedidos';
import { DetallesPedidosService } from '@services/detalles-pedidos.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalles-pedidos-list',
  templateUrl: './detalles-pedidos-list.component.html',
  styleUrls: ['./detalles-pedidos-list.component.css'],
  providers: [MessageService],
})
export class DetallesPedidosListComponent {
  public detallesPedidos: DetallePedidoDto[] = [];
  public idPedido: number = 0;
  public cols: any[] = [
    { field: 'idDetallePedido', header: 'ID' },
    { field: 'fecha', header: 'Fecha' },
    { field: 'idPedido', header: 'ID Pedido' },
    { field: 'idProducto', header: 'ID Producto' },
    { field: 'codigoProducto', header: 'Código Producto' },
    { field: 'cantidad', header: 'Cantidad' },
    { field: 'precioUnitario', header: 'Precio Unitario' },
    { field: 'subtotal', header: 'Subtotal' },
  ];

  constructor(
    private detallesPedidosService: DetallesPedidosService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.idPedido = Number(this.route.snapshot.paramMap.get('id'));
    this.getDetallesPedido();
  }

  getDetallesPedido(): void {
    this.detallesPedidosService
      .getDetallesPedidosDto(this.idPedido)
      .subscribe((data) => {
        this.detallesPedidos = data;
      });
  }

  deleteDetallePedido(idDetallePedido: number): void {
    this.detallesPedidosService
      .deleteDetallePedido(this.idPedido, idDetallePedido)
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Detalle de pedido eliminado correctamente',
        });
        this.getDetallesPedido();
      });
  }
}
