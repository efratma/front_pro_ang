import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TopicSelectionComponent } from './topic-selection/topic-selection.component';
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
import { LogoutComponent } from './logout/logout.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TopicSelectionComponent,
    EquationSystemHardComponent,

    EquationSystemMediumComponent,
     EquationSystemEasyComponent,
     LawOfDivisionHardComponent,
     LawOfDivisionEasyComponent,
     EquationInOneVanishingHardComponent,
     EquationInOneVanishingMediumComponent,
     EquationInOneVanishingEasyComponent,
     PythagorasEasyComponent,
     PythagorasHardComponent,
     LinearLineComponent,
     CuttingPointsComponent,
     MeetingPointsComponent,
     EasyTriangularAreaComponent,
     LogoutComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,


  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
