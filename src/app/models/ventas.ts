export interface Ventas {
    id: number,
    cliente?: string,
    cliente_id: number,
    status: string,
    total: number,
    subtotal: number,
    iva: number,
    nota: string,
    update_date?: string,
    create_date?: string,
}
