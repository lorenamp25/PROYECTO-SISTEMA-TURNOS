import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoMascota, Turno } from '../../models';
import { CapitalizePipe } from '../../common/capitalize.pipe';

@Component({
  selector: 'formturno',
  imports: [FormsModule, ReactiveFormsModule, CapitalizePipe],
  templateUrl: './formturno.component.html',
  styleUrls: ['./formturno.component.css'] // Corrección: styleUrls (en plural)
})
export class FormturnoComponent {
  @Input() turno!: Turno
  @Output() turnoSolicitadoEvent = new EventEmitter<Turno>()
  @Output() cancelSolicitudEvent = new EventEmitter()

  tiposMascotas = Object.values(TipoMascota)

  telefonoPattern = /^(\+34|0034)?[6-9]\d{8}$/

  turnoForm = new FormGroup({
      fecha: new FormControl(),
      hora: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.email]),
      motivo: new FormControl('', [Validators.required]),
      tipoMascota: new FormControl(TipoMascota.Otros),
      telefono: new FormControl('', [Validators.required, Validators.pattern(this.telefonoPattern)])
    })

  ngOnInit() {
    this.turnoForm.get('fecha')?.setValue(this.turno.fecha)
    this.turnoForm.get('hora')?.setValue(this.turno.hora)
  }

  submit() {
    // if (this.turnoForm.invalid) {
    //   this.turnoForm.markAllAsTouched();
    //   return;
    // }

    this.turno.fecha = this.turnoForm.get('fecha')?.value
    this.turno.hora = this.turnoForm.get('hora')?.value
    // this.turno.email = this.turnoForm.get('email')?.value
    // this.turno.motivo = this.turnoForm.get('motivo')?.value
    // this.turno.tipoMascota = this.turnoForm.get('tipoMascota')?.value
    // this.turno.telefono = this.turnoForm.get('telefono')?.value

    this.turnoSolicitadoEvent.emit(this.turno)
  }

  cancel() {
    this.cancelSolicitudEvent.emit()
  }
}
