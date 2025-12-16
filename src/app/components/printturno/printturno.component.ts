import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TurnoService } from '../../services/turno.service';
import { Turno } from '../../models';

@Component({
  selector: 'app-printturno',
  imports: [],
  templateUrl: './printturno.component.html',
  styleUrl: './printturno.component.css'
})
export class PrintturnoComponent {
  turnoId: string | null = null;
  turno!: Turno;

  constructor(private route: ActivatedRoute, private service: TurnoService) {
  }

  ngOnInit(): void {
    this.turnoId = this.route.snapshot.paramMap.get('turnoid')

    // TODO: Leer el turno
    //this.service.getTurno(this.turnoId)
    
  }
}
