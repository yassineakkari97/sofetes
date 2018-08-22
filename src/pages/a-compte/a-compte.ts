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
  selector: 'page-a-compte',
  templateUrl: 'a-compte.html',
})
export class AComptePage {
  gid : Array<any>=[] ;
  items : Array<any>=[] ;
id : any ;
banque : any ;
montant : any ; 

 

  Image1 : string ;
  public banqueRef :firebase.database.Reference;
  public historiqueRef :firebase.database.Reference;


  constructor(public toastCtrl: ToastController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
   this.banqueRef= firebase.database().ref('/banque' );
   this.historiqueRef= firebase.database().ref('/historique' );

   

   this.banqueRef.on('value', produitList => {
      
    produitList.forEach( produit => {
     this.gid.push(produit.val()) ;
      return false;
    });
    
  });


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

  
presentToast(msg : string) {
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

  Add() {

   if(this.montant==undefined) {
    this.presentToast("inserer le montant initial de votre compte ") ;
    return false ; 
   } else if (this.banque==undefined) {
    this.presentToast("inserer le banque de ce compte ") ;
    return false ; 
   } else {

    this.montant=Number(this.montant).toFixed(3) ;
    let ref = this.banqueRef.push({}) ;
    ref.set({
      id : this.id , 
      montant:this.montant ,
      banque:this.banque,
      key : ref.key
    })

    let msg ='Creation du compte CMP-'+this.id+' sous la banque '+this.banque+' avec le montant principal '+this.montant ;
    let tab= [] ;
    tab.push(msg) ;

    let ref1 = this.historiqueRef.push({}) ;
    ref1.set({
      hist : tab, 
      banque:this.banque,
      key : ref1.key
    })

    this.navCtrl.push(BanquePage);
  }}


}
