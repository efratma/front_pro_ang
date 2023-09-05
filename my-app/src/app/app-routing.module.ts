import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EquationSystemHardComponent } from './equation-system-hard/equation-system-hard.component';
import { EquationSystemMediumComponent } from './equation-system-medium/equation-system-medium.component';
import { EquationSystemEasyComponent } from './equation-system-easy/equation-system-easy.component';
import { LawOfDivisionHardComponent } from './law-of-division-hard/law-of-division-hard.component';
import { LawOfDivisionEasyComponent } from './law-of-division-easy/law-of-division-easy.component';
import { EquationInOneVanishingHardComponent } from './equation-in-one-vanishing-hard/equation-in-one-vanishing-hard.component';
import { EquationInOneVanishingMediumComponent } from './equation-in-one-vanishing-medium/equation-in-one-vanishing-medium.component';
import { EquationInOneVanishingEasyComponent } from './equation-in-one-vanishing-easy/equation-in-one-vanishing-easy.component';
import { PythagorasEasyComponent } from './pythagoras-easy/pythagoras-easy.component';
import { PythagorasHardComponent } from './pythagoras-hard/pythagoras-hard.component';
import { LinearLineComponent } from './linear-line/linear-line.component';
import { CuttingPointsComponent } from './cutting-points/cutting-points.component';
import { MeetingPointsComponent } from './meeting-point/meeting-point.component';
import { EasyTriangularAreaComponent } from './easy-triangular-area/easy-triangular-area.component';
import { TopicSelectionComponent } from './topic-selection/topic-selection.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'themes/equation-system-hard', component: EquationSystemHardComponent },
  { path: 'themes/equation-system-medium', component: EquationSystemMediumComponent },
  { path: 'themes/equation-system-easy', component: EquationSystemEasyComponent },
  { path: 'themes/law-of-division-hard.component', component: LawOfDivisionHardComponent },
  { path: 'themes/law-of-division-easy.component', component: LawOfDivisionEasyComponent },
  { path: 'themes/equation-in-one-vanishing-hard', component: EquationInOneVanishingHardComponent },
  { path: 'themes/equation-in-one-vanishing-medium', component: EquationInOneVanishingMediumComponent },
  { path: 'themes/equation-in-one-vanishing-easy', component: EquationInOneVanishingEasyComponent },
  { path: 'themes/pythagoras-easy', component: PythagorasEasyComponent },
  { path: 'themes/pythagoras-hard', component: PythagorasHardComponent },
  { path: 'themes/linear-line', component: LinearLineComponent },
  { path: 'themes/cutting-points', component: CuttingPointsComponent },
  { path: 'themes/meeting-point', component: MeetingPointsComponent },
  { path: 'themes/easy-triangular-area', component: EasyTriangularAreaComponent },
  { path: 'topic-selection', component: TopicSelectionComponent },
  { path: 'logged-out', component: LogoutComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
