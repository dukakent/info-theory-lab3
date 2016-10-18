import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EntropyService } from './entropy/entropy.service';
import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { OptimalTableComponent } from './optimalTable/optimalTable.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    OptimalTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ EntropyService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
