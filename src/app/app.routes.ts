import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ListarturnosComponent } from './pages/listarturnos/listarturnos.component';
import { SolicitarturnoComponent } from './pages/solicitarturno/solicitarturno.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PrintturnoComponent } from './components/printturno/printturno.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'listarturnos', component: ListarturnosComponent },
  { path: 'solicitarturno', component: SolicitarturnoComponent },
  { path: 'printturno/:turnoid', component: PrintturnoComponent },
  { path: '**', component: PageNotFoundComponent }
];
