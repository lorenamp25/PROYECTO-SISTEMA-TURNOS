export enum TipoMascota {
    Gato = 'gato',
    Perro = 'perro',
    Conejo = 'conejo',
    Ave = 'ave',
    Otros = 'otros'
}

export function convertToTipoMascota(tipoMascota: string): TipoMascota {
    switch (tipoMascota) {
        case 'gato':
            return TipoMascota.Gato
        case 'perro':
            return TipoMascota.Perro
        case 'conejo':
            return TipoMascota.Conejo
        case 'ave':
            return TipoMascota.Ave
        case 'otros':
            return TipoMascota.Otros
        default:
            throw new Error('Tipo de mascota invalido')
    }
}
