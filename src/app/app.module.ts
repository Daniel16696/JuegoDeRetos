import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// los cuatro tabs del menú
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { RankingPage } from '../pages/ranking/ranking';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
// fin de los cuatro tabs del menú



import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SugerirCategoriaPage } from '../pages/sugerir-categoria/sugerir-categoria';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { InicioDelJuegoPage } from '../pages/inicio-del-juego/inicio-del-juego';



@NgModule({
  declarations: [
    MyApp,
    ConfiguracionPage,
    PerfilPage,
    HomePage,
    TabsPage,
    RankingPage,
    SugerirCategoriaPage,
    AyudaPage,
    InicioDelJuegoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConfiguracionPage,
    PerfilPage,
    HomePage,
    TabsPage,
    RankingPage,
    SugerirCategoriaPage,
    AyudaPage,
    InicioDelJuegoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
