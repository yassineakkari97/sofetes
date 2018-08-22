import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyApp } from './app.component';



import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { ReceptionPage } from '../pages/reception/reception';
import { ArticlePage } from '../pages/article/article';
import { ClientPage } from '../pages/client/client';
import { FournisseurPage } from '../pages/fournisseur/fournisseur';
import { CaisePage } from '../pages/caise/caise';
import { ReservationPage } from '../pages/reservation/reservation';
import { SdPage } from '../pages/sd/sd';
import { EspecePage } from '../pages/espece/espece';
import { BanquePage } from '../pages/banque/banque';
import { EprevisionPage } from '../pages/eprevision/eprevision';
import { CArticlePage } from '../pages/c-article/c-article';
import { CReservationPage } from '../pages/c-reservation/c-reservation';
import { CFournisseurPage } from '../pages/c-fournisseur/c-fournisseur';
import { CClientPage } from '../pages/c-client/c-client';
import { UArticlePage } from '../pages/u-article/u-article';
import { UFournisseurPage } from '../pages/u-fournisseur/u-fournisseur';
import { UClientPage } from '../pages/u-client/u-client';
import { UReservationPage } from '../pages/u-reservation/u-reservation';
import { DetailsPage } from '../pages/details/details';
import { AChequePage } from '../pages/a-cheque/a-cheque';
import { ReservePage } from '../pages/reserve/reserve';
import { AArgentPage } from '../pages/a-argent/a-argent';
import { StockPage } from '../pages/stock/stock';
import { AStockPage } from '../pages/a-stock/a-stock';
import { DStockPage } from '../pages/d-stock/d-stock';
import { AComptePage } from '../pages/a-compte/a-compte';
import { AcChequePage } from '../pages/ac-cheque/ac-cheque';
import { ImpPage } from '../pages/imp/imp';


import {File} from '@ionic-native/file' ;
import {FileOpener} from '@ionic-native/file-opener' ;

import { Printer, PrintOptions } from '@ionic-native/printer';
import { FicheClientPage } from '../pages/fiche-client/fiche-client';
import { FicheFournisseurPage } from '../pages/fiche-fournisseur/fiche-fournisseur';
import { Page } from '../pages/page/page';
import { FichePage } from '../pages/fiche/fiche';
import { AffFactPage } from '../pages/aff-fact/aff-fact';
import { FactPaymentPage } from '../pages/fact-payment/fact-payment';

import { CServicePage } from '../pages/c-service/c-service';
import { FServiePage } from '../pages/f-servie/f-servie';
import { UServicePage } from '../pages/u-service/u-service';
import { HistCaisePage } from '../pages/hist-caise/hist-caise';
import { FichClientPage } from '../pages/fich-client/fich-client';


import { Calendar } from '@ionic-native/calendar';
import { CustomEventTitleFormatterProvider } from '../providers/custom-event-title-formatter/custom-event-title-formatter';
import { CustomDateFormatterProvider } from '../providers/custom-date-formatter/custom-date-formatter';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { CalendarModule, CalendarDateFormatter, CalendarEventTitleFormatter } from 'angular-calendar';
 
import { CalendarWeekHoursViewModule } from 'angular-calendar-week-hours-view';
import { ChartsModule } from 'ng2-charts';


import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDe);


EspecePage
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    ReceptionPage,
    ArticlePage,
    ClientPage,
    FournisseurPage,
    CaisePage,
    ReservationPage,
    SdPage,
    EspecePage,
    BanquePage,
    EprevisionPage,
    CArticlePage,
    CReservationPage,
    CFournisseurPage,
    CClientPage,
    UArticlePage,
    UFournisseurPage,
    UClientPage,
    UReservationPage,
    DetailsPage,
    AChequePage,
    ReservePage,
    AArgentPage,
    StockPage,
    AStockPage,
    DStockPage,
    AComptePage,
    AcChequePage,
    ImpPage,
    FicheClientPage,
    FicheFournisseurPage,
    FichePage,
    Page,
    AffFactPage,
    FactPaymentPage,
    CServicePage,
    FServiePage,
    UServicePage,
    HistCaisePage,
    FichClientPage

  ],
  imports: [
    BrowserAnimationsModule,
    ChartsModule
,
    CalendarModule.forRoot(),
    CalendarWeekHoursViewModule,
   BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),AngularFireDatabaseModule, AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,ReceptionPage,ArticlePage,ClientPage,FournisseurPage,CaisePage,ReservationPage,SdPage,EspecePage,BanquePage,EprevisionPage,CArticlePage
  ,CReservationPage,CFournisseurPage,CClientPage,UArticlePage,UFournisseurPage,UClientPage,UReservationPage,DetailsPage,AChequePage
   ,ReservePage,AArgentPage ,StockPage,AStockPage,DStockPage,AComptePage,AcChequePage,ImpPage,FicheClientPage,FicheFournisseurPage
   ,FichePage,Page,AffFactPage,FactPaymentPage, CServicePage,FServiePage,UServicePage,HistCaisePage,FichClientPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},File,FileOpener,Printer,Calendar,
    CustomEventTitleFormatterProvider,
    CustomDateFormatterProvider,
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatterProvider
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatterProvider
    }
  ]
})
export class AppModule {}
