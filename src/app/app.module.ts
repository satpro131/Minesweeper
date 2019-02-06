import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MinesComponent } from './mines.component';

@NgModule({
  declarations: [
    AppComponent,
    MinesComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [MinesComponent]
})
export class AppModule { }
