import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
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
import { BanquePage } from '../banque/banque';
import { CaisePage } from '../caise/caise';


import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';

@Component({
  selector: 'page-fiche-fournisseur',
  templateUrl: 'fiche-fournisseur.html',
})
export class FicheFournisseurPage {

  item : any ; 
nom : any ; 
prenom : any ; 
phone : any ; 
cin : any ; 

 email : any ; 
 adresse : any ; 
 ville : any ; 
 code : any ; 
  Image1 : string ;

  credit : number=0  ; 
  cheques : Array<any>=[] ;
  especes:Array<any>=[] ;
  stock : Array<any> =[];
  credittotal : number=0 ;
  scheque : number = 0 ;
  sespece : number = 0 ;  

facture: Array<any>=[] ;
  factures : Array<any>=[] ;

  constructor(public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
   this.item = this.navParams.get('item') ; 
   this.credittotal= this.navParams.get("credittotal") ;


    this.scheque=this.navParams.get("scheque") ;
    this.sespece =this.navParams.get("sespece") ; 
   this.cheques =this.navParams.get("cheque") ;
    this.especes =this.navParams.get("especes") ;
   this.credit = this.navParams.get("credit") ; 
    this.credittotal =this.navParams.get("credittotal") ;
    this.facture=this.navParams.get("facture") ;


    console.log( this.scheque);
    console.log( this.sespece);
    console.log( this.cheques);
    console.log(this.especes);
    console.log( this.credit);
    console.log(this.credittotal);
    console.log( this.facture);

    

   if (this.item.email=="") {
           this.email ="email :"+"-----------" ;
   }else {
      this.email="email: "+this.item.email ;
   }

   if (this.item.adresse=="") {
    this.adresse ="adresse: " +"-----------" ;

  }else {
    this.adresse= "adresse: " +this.item.adresse ;

  }

  if (this.item.code=="") {
    this.code ="code postal :"+"-----------" ;

  }else {
    this.code="code postal :" +this.item.code ;

  }

  if (this.item.ville=="") {
    this.ville ="ville :" +"-----------" ;

  }else {
    this.ville="ville :" +this.item.ville ;

  }
   

  this.cin = this.item.cin ; 
  this.nom = this.item.nom ; 
  this.prenom=this.item.prenom ;
  this.phone=this.item.phone ; 
   
       
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

  

  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }
  PushToBnaque(){

this.navCtrl.push(BanquePage) ;
  }

  PushToST(){
this.navCtrl.push(SdPage);
  }

  PushToDashboard(){
    this.navCtrl.push(ReceptionPage) ;
  }


}
