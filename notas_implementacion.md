Angular: empezamos con routing (la ruta va a ser directa pero teniendo un boton de volver), tambien va a haber una ruta con children(seguramente con parametros, si no es aqui lo va a mandar en otra ruta) los parametros van a ser de padre a hijo y de hijo a padre, ademas de llamar un metodo del hijo con template. va ha haber tanto una clase como un interface. nos va a mandar mostrar datos desde una base de datos y un formulario para guardar datos en la base. siempre se va a estar mostrando algo en la parte superior tipo nav. 
Cuando vallamos a visualizar va ha tocar un for o un if seguramente una tabla va a pedir algo dentro de un iframe seguremante un hijo. Y el formulario va ha haber uno basado en platillas (ngModel) y uno reactivo. Va ha caer un @defer ya sea por tiempo o por la interaccion con tecla desde la carpeta public va a haber que pedir algo ya sea un json o unas imagenes, va a preguntar alguna pipe seguramente pero probablemente sea sencillito, pero en el formulario reactivo va a caer si o si una validacion personalizada con una regExp que nos pasara el puede que sean dos metodos, los cuales se importaran desde un archivo externo y dentro del formulario reactivo habra algun @if y seguramente caigan un formgroup dentro de otro formgroup

* Routing
Ver `app_routes.ts`

```
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'listarturnos', component: ListarturnosComponent },
  { path: 'solicitarturno', component: SolicitarturnoComponent },
  { path: 'printturno/:turnoid', component: PrintturnoComponent },
  { path: '**', component: PageNotFoundComponent }
];
```
- 'printturno/:turnoid' para tener un parametro en la ruta
- '**' para tener una pagina por default

* `Properties (Pasar un dato del padre a hijo)
Ver `formturno.component.ts` (Hijo)
```
  @Input() turno!: Turno
```
El hijo `formturno` define una propiedad `turno` la cual el padre se la asigna en el html (`[turno]="turno"`) el padre es `solicitarturno.component.html`:
```
 <formturno [turno]="turno" (turnoSolicitadoEvent)="turnoSolicitado($event)" (cancelSolicitudEvent)="cancelarSolicitud($event)"></formturno>

```

* Eventos (Pasar un dato del hijo al padre)
- Responder evento de un hijo
Ver `solicitarturno.component.html`
```
<formturno [turno]="turno" (turnoSolicitadoEvent)="turnoSolicitado($event)" (cancelSolicitudEvent)="cancelarSolicitud($event)"></formturno>
```
El hijo define el evento `turnoSolicitadoEvent` y es atendido por el metodo en el padre `turnoSolicitado($event)`

Ver `formturno.component.ts` donde se define el evento
```
  @Output() turnoSolicitadoEvent = new EventEmitter<Turno>()
```
Se define el evento `turnoSolicitadoEvent` que emitirá ademas un objeto `Turno`


* Definir interface
- Se crea un archivo model, ver `turno.model.ts`
```
export interface Turno {
    id: number
    email: string
    telefono: string
    fecha: string
    hora: string
    motivo: string
    tipoMascota: TipoMascota
}
```

* Manipular propiedades del componente en html (ngModel)
- Se enlazan (bind) las propiedades del componente typescript con las propiedades del componente html (por ejemplo, button, label, input, etc.)
Ver `about.component.html`

```<input type="text" name="nombre" [(ngModel)]="nombre" readonly />```

y en el `about.component.ts`
```
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  imports: [FormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  nombre: string = "Lorena"

}
```
Se debe importar FormsModule y agregarlo en `imports` para que se pueda usar en el html.

* @defer y @placeholder son usados juntos para tener una carga de pagina lazy, por ejemplo cuando se cargan muchos datos y se esperan estos.
Ver `solicitarturno.component.html`:
```
@defer (when disponibles.length>0) {
  <tablaturnos [datosCompletos]="false" [turnos]="disponibles" (turnoSeleccionadoEvent)="turnoseleccionado($event)" ></tablaturnos>
} @placeholder {
    <p>Cargando datos...</p>
}
```
Mientras `disponibles.length>0` sea falso se va a estar mostrando lo del placeholder


* Pipe
- Los pipes son "funciones" que puedo utilizar en el html para transformar valores. Por ejemplo capitalizar textos.
Ver `app/common/capitalize.pipe.ts`
```
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
```
Este clase debe implementar la interface `PipeTransform` y la logica va en el unico metodo `transform`

* Validaciones personzalidas con expresiones regulares
- Ver `formturno.component.ts`
Defino la expresion regular: `telefonoPattern = /^(\+34|0034)?[6-9]\d{8}$/` y cuando creo el formulario en la lista de validators:

```
  turnoForm = new FormGroup({
      fecha: new FormControl(),
      hora: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.email]),
      motivo: new FormControl('', [Validators.required]),
      tipoMascota: new FormControl(TipoMascota.Otros),
      telefono: new FormControl('', [Validators.required, Validators.pattern(this.telefonoPattern)])
    })
```

* Navigate
Necesitamos inyectar Route:
```
import { Router } from '@angular/router';

...

  constructor(private service: TurnoService, private route: Router) { 

...

  this.router.navigate(['/printturno', 123])

```

