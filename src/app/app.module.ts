import { ToolsModule } from './tools/tools.module';
import { WEBSOCKET_URL } from './config';
import { LoginModule } from './login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, NativeDateModule } from '@angular/material/core';


const config: SocketIoConfig = { url: WEBSOCKET_URL, options: { origin: '*', transport: ['websocket'] } };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    NativeDateModule,
    SocketIoModule.forRoot(config),
    LoginModule,
    ToolsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
