import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { OpenweathermapService } from './services/openweathermap.service';
import {AppRoutingModule} from "./app-routing.module";
import { HeaderComponent } from './components/header/header.component';
import { HourlyTableComponent } from './components/hourly-table/hourly-table.component';
import { DailyTableComponent } from './components/daily-table/daily-table.component'
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
	declarations: [AppComponent, HeaderComponent, HourlyTableComponent, DailyTableComponent],
	imports: [
		BrowserModule, 
		HttpClientModule,
		AppRoutingModule,
		ReactiveFormsModule
	],
	providers: [OpenweathermapService],
	bootstrap: [AppComponent],
})
export class AppModule {}
