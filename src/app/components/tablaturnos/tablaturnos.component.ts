import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Turno } from '../../models';

@Component({
  selector: 'tablaturnos',
  imports: [],
  templateUrl: './tablaturnos.component.html',
  styleUrl: './tablaturnos.component.css'
})
export class TablaturnosComponent {
  @Input() turnos: any
  @Input() datosCompletos: any
  @Output() turnoSeleccionadoEvent = new EventEmitter<Turno>()

  onDoubleClickRow(turno: any) {
    this.turnoSeleccionadoEvent.emit(turno)
    // TODO: Pintar el renglon seleccionado
  }
}
