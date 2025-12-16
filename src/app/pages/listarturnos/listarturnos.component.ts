import { Component } from '@angular/core';
import { TablaturnosComponent } from '../../components/tablaturnos/tablaturnos.component';
import { TurnoService } from '../../services/turno.service';
import { Turno } from '../../models';

@Component({
  selector: 'app-listarturnos',
  imports: [TablaturnosComponent],
  templateUrl: './listarturnos.component.html',
  styleUrl: './listarturnos.component.css'
})
export class ListarturnosComponent {
  turnos:Turno[] = []

  constructor(private service: TurnoService) { 
    // Para tener tiempo de visualizar el placeholder
    setTimeout(()=>{
      this.listarTurnos()
    }, 5000)
  }

  listarTurnos() {
    this.service.getListaTurnos()
      .subscribe({
        next: (response) => {
          this.turnos = response
        },
        error: (error) => {
          // TODO: Component para mostrar error: Popup
          console.error(error)
        }
      })
  }
}

