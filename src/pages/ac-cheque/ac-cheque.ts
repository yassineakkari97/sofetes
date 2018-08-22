import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase';

import { HomePage } from '../home/home';
import { ArticlePage } from '../article/article';
import { ClientPage } from '../client/client';
import { FournisseurPage } from '../fournisseur/fournisseur';
import { ReceptionPage } from '../reception/reception';
import { ReservationPage } from '../reservation/reservation';
import { EprevisionPage } from '../eprevision/eprevision';
import { SdPage } from '../sd/sd';
import { EspecePage } from '../espece/espece';
import { CaisePage } from '../caise/caise';
import { AlertController } from 'ionic-angular';
import { BanquePage } from '../banque/banque';

import { ToastController } from 'ionic-angular';


import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
@Component({
  selector: 'page-ac-cheque',
  templateUrl: 'ac-cheque.html',
})
export class AcChequePage {
  gid : Array<any>=[] ;
  items : Array<any>=[] ;

id : any ;
banque : any ;
debut : any ;
fin : any ; 

public numchequeRef :firebase.database.Reference;
public banqueRef :firebase.database.Reference;

  Image1 : string ;
  constructor(public toastCtrl: ToastController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
 
    this.numchequeRef= firebase.database().ref('/ncheque' );

    this.banqueRef= firebase.database().ref('/banque' );
 
    
 
    this.banqueRef.on('value', produitList => {
       
     produitList.forEach( produit => {
      this.items.push(produit.val()) ;
       return false;
     });
     
   });
 

   if(this.numchequeRef!=undefined) {
 
   
   this.numchequeRef.on('value', produitList => {
       
     produitList.forEach( produit => {
      this.gid.push(produit.val()) ;
       return false;
     });
     
   });
  }
 
   if (this.gid.length==0) {
     this.id=1 ;
   }
   else {
     this.id=Number(this.gid[this.gid.length-1].id)+1
   }
 
 
 

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


  PushToEspece(){

this.navCtrl.push(EspecePage) ;
  }

  PushToST(){
this.navCtrl.push(SdPage);
  }

  PushToDashboard(){
    this.navCtrl.push(ReceptionPage) ;
  }
  ////////////////////////////////

  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }
  
presentToast(msg : string) {
  const toast = this.toastCtrl.create({
    message: msg,
    duration: 3000
  });
  toast.present();
}



  Add(){
  
if (Number(this.debut)>Number(this.fin)) {
  this.presentToast("verifier vos donnes !") ;
    return false ; 
} else if (this.debut==undefined) {
  this.presentToast("inserer le premier numero de votre carnier de cheque !") ;
  return false ; 
}else if (this.fin==undefined) {
  this.presentToast("inserer le dernier numero de votre carnier de cheque !") ;
  return false ; 
} else if (this.banque==undefined) {
  this.presentToast("choisir le compte de ce carnier  !") ;
  return false ; 
}else {

  let chbanque : string ;

  chbanque = this.banque+"" ;
  
let ref = this.numchequeRef.push({}) ;
ref.set({
  id : this.id , 
  debut: this.debut ,
  fin:this.fin ,
  compte: chbanque.substr(chbanque.indexOf("-")+1,chbanque.indexOf(":")-4),
  key : ref.key
})

this.navCtrl.push(BanquePage);
}}



  }

