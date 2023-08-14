export interface Pedido {
  idPedido: number;
  idUsuario: number;
  idStatus: number;
  fecha: Date;
  fechaEntrega: Date;
  domicilio: string;
  telefono: string;
  razonSocial?: string;
  rfc?: string;
  tipoPago: string;
  tipoEnvio: string;
  tipoPedido: string;
  total: number;
}
