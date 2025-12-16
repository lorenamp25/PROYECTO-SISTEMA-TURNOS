import { Component } from '@angular/core';

@Component({
  selector: 'dialogcomponent',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  mensaje: any;
  mostrar: boolean = false;

  mostrarMensaje(mensaje: string) {
    this.mensaje = mensaje
    this.mostrar = true
  }

  cerrar() {
    this.mostrar = false
  }

}
