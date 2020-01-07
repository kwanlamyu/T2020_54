import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginRoutes } from './login.routing';
import { LoginComponent} from './login.component';
import { MatCardModule } from '@angular/material';
import {DemoMaterialModule} from '../demo-material-module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CdkTableModule} from '@angular/cdk/table';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    MatCardModule,
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ]
})
export class LoginModule { }
