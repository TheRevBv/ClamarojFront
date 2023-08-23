import { Component, OnInit } from '@angular/core';
// import * as FileSaver from 'file-saver';
import { Product } from '@models/product';
import { Pedido } from '@models/pedidos';
import { Usuario } from '@models/usuarios';
import { ProductService } from '@services/product.service';
import { PedidosService } from '@services/pedidos.service';
import { ProveedoresService } from '@services/proveedores.service';
import { MessageService } from 'primeng/api';
import { DetallesPedidosService } from '@services/detalles-pedidos.service';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-portal-list',
  templateUrl: './portal-list.component.html',
  styleUrls: ['./portal-list.component.css'],
  providers: [MessageService],
})
export class PortalListComponent implements OnInit {
  // products!: Product[];
  // selectedProduct!: Product;
  pedidos: Pedido[] = [];
  selectedPedido!: Pedido;
  proveedor!: Usuario;
  loading: boolean = true;
  pedido: Pedido = {
    idPedido: 0,
    fecha: new Date(),
    total: 0,
    idStatus: 0,
    idUsuario: 0,
    domicilio: '',
    telefono: '',
    tipoPago: '',
    razonSocial: '',
    rfc: '',
    tipoPedido: '',
    fechaEntrega: new Date(),
    tipoEnvio: '',
    detallesPedidos: [],
  };
  cols!: Column[];
  exportColumns!: ExportColumn[];

  constructor(
    private messageSvc: MessageService,
    private productService: ProductService,
    private pedidoSvc: PedidosService,
    private detallePedidoSvc: DetallesPedidosService,
    private proveedorSvc: ProveedoresService
  ) {}

  ngOnInit(): void {
    this.proveedor = this.proveedorSvc.proveedor!;
    this.getPedidosPorProveedor(this.proveedor.id!);
    // this.productService.getProductsMini().then((data) => {
    //   this.products = data;
    // });
    this.cols = [
      {
        field: 'idDetallePedido',
        header: 'Artículo',
        customExportHeader: 'Orden de Compra',
      },
      { field: 'Cantidad', header: 'Cantidad' },
      { field: 'precioUnitario', header: 'Precio Unitario' },
      { field: 'Subtotal', header: 'Subtotal' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Entregado':
        return 'success';
      case 'Enviado':
        return 'info';
      case 'Pendiente':
        return 'warning';
      case 'Cancelado':
        return 'danger';
      default:
        return 'dark';
    }
  }

  getPedidosPorProveedor(idUsuario: number) {
    //se hardcodea el id del usuario para pruebas
    //TODO: cambiar el id del usuario por el id del usuario logueado
    this.loading = true;
    setTimeout(() => {
      this.pedidoSvc.getPedidosByIdUsuario(idUsuario).subscribe((res) => {
        this.pedidos = res;
        this.loading = false;
      });
    }, 1000);
  }

  onRowSelect(event: any) {
    // this.selectedPedido = event.data;
    this.getDetallesPedido(this.selectedPedido.idPedido!);
    console.log(this.selectedPedido);
    this.messageSvc.add({
      severity: 'info',
      summary: 'O.C seleccionado',
      detail: `Pedido ${this.selectedPedido.idPedido}`,
    });
  }

  getDetallesPedido(idPedido: number) {
    this.pedido = this.selectedPedido;
    this.detallePedidoSvc.getDetallesPedidos(idPedido).subscribe((res) => {
      this.pedido.detallesPedidos = res;
      console.log(this.pedido);
    });
  }

  //Generate PDF to show details of the order
  exportPdf() {
    if (this.pedido.detallesPedidos.length > 0) {
      let fecha = this.pedido.fecha.toString().split('T')[0];
      console.log(fecha);
      import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
          const doc = new jsPDF.default('p', 'px', 'a4');
          (doc as any).autoTable(
            this.exportColumns,
            this.pedido.detallesPedidos
          );
          doc.setFontSize(12);
          doc.setProperties({
            title: `Orden de Compra ${fecha.replaceAll('-', '')}${
              this.pedido.idPedido
            }`,
            // subject: 'This is the subject',
            // author: 'James Hall',
            // creator: 'This is the creator',
          });
          doc.text(
            `Orden de Compra ${fecha.replaceAll('-', '')}${
              this.pedido.idPedido
            }`,
            300,
            10
          );
          doc.text(`Fecha: ${fecha}`, 325, 20);
          // doc.save(`OC-${this.pedido.idPedido}.pdf`);
          doc.output('pdfobjectnewwindow');
        });
      });
    }
  }
}

// import('jspdf').then((jsPDF) => {
//   import('jspdf-autotable').then((x) => {
//     const doc = new jsPDF.default('p', 'px', 'a4');
//     // (doc as any).autoTable(this.exportColumns, this.products);
//     (doc as any).autoTable(this.exportColumns, this.pedido.detallesPedidos);
//     (doc as any).text('Hello world!', 10, 10);
//     // doc.save('products.pdf');
//     // doc.output('dataurlnewwindow');

//     doc.output('pdfobjectnewwindow');
//   });
// });
