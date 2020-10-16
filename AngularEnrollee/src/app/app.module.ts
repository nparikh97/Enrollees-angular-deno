import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrderModule } from 'ngx-order-pipe';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnrolleesComponent } from './components/enrollees/enrollees.component';
import { HomeComponent } from './components/home/home.component';
import { SearchEnrolleeComponent } from './components/search-enrollee/search-enrollee.component';
import { EnrolleesService } from './services/enrollees.service';


@NgModule({
  declarations: [
    AppComponent,
    EnrolleesComponent,
    HomeComponent,
    SearchEnrolleeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    OrderModule,
    BrowserAnimationsModule
  ],
  providers: [EnrolleesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
