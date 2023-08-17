import { Component, OnInit } from '@angular/core';
// import * as FileSaver from 'file-saver';
import { Product } from '@models/product';
import { ProductService } from '@services/product.service';
import { Observable } from 'rxjs';

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
})
export class PortalListComponent implements OnInit {
  products!: Product[];
  selectedProduct!: Product;

  cols!: Column[];
  exportColumns!: ExportColumn[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.products);
        (doc as any).text('Hello world!', 10, 10);
        // doc.save('products.pdf');
        // doc.output('dataurlnewwindow');
        doc.setProperties({
          title: 'Title',
          subject: 'This is the subject',
          author: 'James Hall',
          creator: 'This is the creator',
        });

        doc.output('pdfobjectnewwindow');
      });
    });
  }
}
