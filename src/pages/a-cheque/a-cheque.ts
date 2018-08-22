import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase';
import {Calendar} from '@ionic-native/calendar'


import { HomePage } from '../home/home';
import { ArticlePage } from '../article/article';
import { ClientPage } from '../client/client';
import { FournisseurPage } from '../fournisseur/fournisseur';
import { CaisePage } from '../caise/caise';
import { ReservationPage } from '../reservation/reservation';
import { EprevisionPage } from '../eprevision/eprevision';
import { ReceptionPage } from '../reception/reception';
import { ToastController } from 'ionic-angular';

import{CReservationPage} from '../c-reservation/c-reservation';

import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';


@Component({
  selector: 'page-a-cheque',
  templateUrl: 'a-cheque.html',
})
export class AChequePage {
  Image1 : string ;


  event : any ;
  cheque : any ;
  quantite : any =0;
  nombre : number =0 ;
  nom :any ;
  eventDate : any ;
  timeStarts :any ;
  timeEnds : any ;
  prix :any ;
  fournisseur :any ;
  depot :any ;
  virement : any ;
  Pcheque :any ;
  montantch : any ;
  montantes : any ;
  items1 : any ;
  ArAjouter : any ;
  payementDate : any ;
  numero:any ;
  notes : any ;
  constructor( public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";

    this.eventDate =this.navParams.get("eventDate") ;
    this.timeStarts=this.navParams.get("timeStarts") ;
    this.timeEnds=this.navParams.get("timeEnds") ;
    this.fournisseur=this.navParams.get("fournisseur") ;
  
    this.depot=this.navParams.get("depot") ;
    this.prix=this.navParams.get("prix") ;
   this.virement= this.navParams.get("virement") ;
    this.Pcheque=this.navParams.get("Pcheque") ;
    this.montantch=this.navParams.get("montantch") ;
    this.montantes=this.navParams.get("montantes") ;
    this.payementDate =this.navParams.get("payementDate") ;
    this.notes=this.navParams.get("notes") ;
  }

  StayHere(){
    console.log("ok");
    
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  PushToGA(){
   this.navCtrl.push(ArticlePage) ;
  }

  PushToGC(){
this.navCtrl.push(ClientPage);
  }

  PushToFournisseurs(){
    this.navCtrl.push(FournisseurPage);
  }

  PushToReservation(){
this.navCtrl.push(ReservationPage);
  }

  PushToCaise(){
this.navCtrl.push(BanquePage);
  }

  PushToEP(){
this.navCtrl.push(EprevisionPage) ;
  }

  Logout(){
    firebase.auth().signOut() ;
    this.navCtrl.setRoot(HomePage);
  }

  pushToDashboard(){
     this.navCtrl.push(ReceptionPage) ;
  }

  
  ////////////////////////////////////////////

  
presentToast(msg:string) {
  const toast = this.toastCtrl.create({
    message: msg,
    duration: 3000
  });
  toast.present();
}


GoToService(){
  this.navCtrl.push(FichePage);

}

GoToFactures(){
  this.navCtrl.push(Page);

}


  add() {
    if ((this.numero==undefined ||this.Pcheque ==undefined || this.montantch==undefined || this.virement==undefined ||this.depot==undefined))

{
  this.presentToast("remplir tous les champs de chéque ");


} else {


    this.navCtrl.push(CReservationPage,{
      
        cheque : this.cheque ,
        eventDate : this.eventDate ,
        timeStarts :this.timeStarts ,
        timeEnds : this.timeEnds ,
        prix :this.prix, 
        fournisseur :this.fournisseur ,
        depot :this.depot ,
        virement : this.virement ,
        Pcheque :this.Pcheque ,
        montantch : this.montantch ,
        montantes : this.montantes,
        payementDate : this.payementDate,
        numero : this.numero,
        notes : this.notes
    })
    
  }}

 

}
