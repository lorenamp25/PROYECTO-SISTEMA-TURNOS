import { TipoMascota } from "./tipoMascota.enum"

export interface Turno {
    id: number
    email: string
    telefono: string
    fecha: string
    hora: string
    motivo: string
    tipoMascota: TipoMascota
}
