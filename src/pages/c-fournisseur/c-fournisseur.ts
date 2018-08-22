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

import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';


@Component({
  selector: 'page-c-fournisseur',
  templateUrl: 'c-fournisseur.html',
})
export class CFournisseurPage {
  Image1 : string ;



  nom : any ;
  prenom : any ;
  phone : any ;
  cin : any ;
  email : any ; 
  adresse : any ;
  code : any ; 
  ville : any ;




  public fornisseurRef :firebase.database.Reference;


  constructor(public toastCtrl: ToastController,private calendar:Calendar ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.fornisseurRef = firebase.database().ref('/fournisseurs' );

   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceptionPage');
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

/////////////////////////////////////////////


presentToast(msg:string) {
  const toast = this.toastCtrl.create({
    message: msg,
    duration: 3000
  });
  toast.present();
}

Add(){

  if(this.nom==undefined) {
    this.presentToast("le champ nom n'est pas rempli");
    return false ;
}
if(this.prenom==undefined) {
  this.presentToast("le champ prenom n'est pas rempli");
  return false ;

}
if(this.cin==undefined) {
  this.presentToast("le champ Cin n'est pas rempli");
  return false ;

}
if(this.phone==undefined) {
  this.presentToast("le prix  numero de telephone nom n'est pas rempli");
  return false ;

} else {

  
if(this.ville==undefined) {
  this.ville="" ;
}
if(this.code==undefined) {
this.code="";

}
if(this.email==undefined) {
this.email="" ;
}
if(this.adresse==undefined) {
this.adresse="" ;
}

  
  let ref =this.fornisseurRef.push({});
  ref.set({
    nom : this.nom ,
    prenom : this.prenom ,
    phone : this.phone ,
    cin : this.cin,
    email : this.email,
    adresse : this.adresse,
    code : this.code ,
    ville : this.ville ,
    key :ref.key,
  });

  this.navCtrl.push(FournisseurPage) ;

}}


GoToService(){
  this.navCtrl.push(FichePage);

}

GoToFactures(){
  this.navCtrl.push(Page);

}

}
