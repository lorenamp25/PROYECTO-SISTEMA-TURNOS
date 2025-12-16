import { Component, ViewChild } from '@angular/core';
import { TablaturnosComponent } from '../../components/tablaturnos/tablaturnos.component';
import { FormturnoComponent } from '../../components/formturno/formturno.component';
import { TipoMascota, Turno } from '../../models';
import { TurnoService } from '../../services/turno.service';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-solicitarturno',
  imports: [TablaturnosComponent, FormturnoComponent, DialogComponent],
  templateUrl: './solicitarturno.component.html',
  styleUrl: './solicitarturno.component.css'
})
export class SolicitarturnoComponent {
  @ViewChild(DialogComponent) dialog!: DialogComponent

  disponibles:Turno[] = []
  mostrarformulario:boolean = false
  turno: any;

  constructor(private service: TurnoService) { 
    // Para tener tiempo de visualizar el placeholder
    setTimeout(()=>{
      this.listarDisponibles()
    }, 2000)

    this.turno = {
          id: 0,
          email: '',
          telefono: '',
          fecha: '',
          hora: '',
          motivo: '',
          tipoMascota: TipoMascota.Otros
    }
  }

  listarDisponibles() {
    this.service.getTurnosDisponibles()
      .subscribe({
        next: (response) => {
          this.disponibles = response
        },
        error: (error) => {
          // TODO: Component para mostrar error: Popup
          console.error(error)
        }
      })
  }

  turnoseleccionado(turno: Turno) {
    this.turno.fecha = turno.fecha
    this.turno.hora = turno.hora
    this.turno.motivo = ''
    
    this.mostrarformulario = true

    // this.service.reservarTurno(turno.fecha, turno.hora)
    // .subscribe({
    //   next: (response) => {
    //     this.mostrarformulario = true
    //   },
    //   error: (error) => {
    //     // TODO: Component para mostrar error: Popup
    //     console.error(error)
    //   }
    // })

  }

  turnoSolicitado(turno: Turno) {
    console.log('Turno solicitado: ')
    console.log(turno)

    this.mostrarformulario = false
    this.dialog.mostrarMensaje("Turno Solicitado.")

    // window.open("http://localhost:4200/printturno/" + turno.id)
    window.open("http://localhost:4200/printturno/44")

    // this.service.solicitarTurno(turno)
    // .subscribe({
    //   next: (response) => {
    //     this.mostrarformulario = false
    //     // TODO: Informar que se grabo el turno y mostrar el ID
    //     alert(response)
    //    // TODO: Abrir nav url (otra pagina) formato impresion pasamos el id

    //     this.listarDisponibles()
    //   },
    //   error: (error) => {
    //     // TODO: Component para mostrar error: Popup
    //     console.error(error)
    //   }
    // })
  }
  
  cancelarSolicitud($event: any) {
    this.mostrarformulario = false
    // TODO: Liberar espacio
  }
}
