import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '@models/clientes';
import { Estatus } from '@models/estatus';
import { ClientesService } from '@services/clientes.service';
import { EstatusService } from '@services/estatus.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['../home.component.scss'],
  providers: [MessageService],
})
export class SingupComponent implements OnInit {
  singupForm!: FormGroup;
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
  estatus: Estatus[] = [];
  minDate: Date = new Date('1900-01-01');
  maxDate!: Date;
  // El rfc debe tener 13 caracteres
  // Los primeros 4 caracteres deben ser letras mayúsculas
  // Los siguientes 6 caracteres deben ser números
  // Los últimos 3 caracteres pueden ser letras mayúsculas o números
  patternRFC: string = '^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$';

  constructor(
    private route: ActivatedRoute,
    private clienteSvc: ClientesService,
    private statusSvc: EstatusService,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private router: Router
  ) {
    this.singupForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      correo: [''],
      password: [''],
      telefono: [''],
      direccion: [''],
      foto: [''],
      rfc: [''],
      idStatus: new FormControl<Estatus | null>(null),
      fechaNacimiento: new Date(1900, 0, 1),
    });
    this.statusSvc.getEstatus().subscribe((estatus) => {
      console.log(estatus);
      this.estatus = estatus;
    });
  }

  ngOnInit(): void {}
}
