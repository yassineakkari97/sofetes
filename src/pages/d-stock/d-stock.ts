import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase';
import {Calendar} from '@ionic-native/calendar'

import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';

import { HomePage } from '../home/home';
import { ArticlePage } from '../article/article';
import { ClientPage } from '../client/client';
import { FournisseurPage } from '../fournisseur/fournisseur';
import { CaisePage } from '../caise/caise';
import { ReservationPage } from '../reservation/reservation';
import { EprevisionPage } from '../eprevision/eprevision';
import { ReceptionPage } from '../reception/reception';
import { StockPage } from '../stock/stock';


import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';
@Component({
  selector: 'page-d-stock',
  templateUrl: 'd-stock.html',
})
export class DStockPage {
  Image1 : string ;

  article : any ;
  reservation : any ;
  quantite : any ;
  items0 : Array<any> = [] ;
  items1 : Array<any> = [] ;

  public stockRef :firebase.database.Reference;
  public articleRef :firebase.database.Reference;
  public reservationRef :firebase.database.Reference;


  constructor( public afdb: AngularFireDatabase,private calendar:Calendar ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    
    this.stockRef = firebase.database().ref('/stock' );
    this.articleRef = firebase.database().ref('/articles' );
    this.reservationRef = firebase.database().ref('/reservations' );

    
if (this.articleRef!=undefined) {
  this.articleRef.on('value', produitList => {
    produitList.forEach( produit => {
      this.items0.push(produit.val()) ;
      return false;
    });
    
  });
}
    
console.log(this.items0);


if (this.reservationRef!=undefined) {
  this.reservationRef.on('value', produitList => {
    produitList.forEach( produit => {
      this.items1.push(produit.val()) ;
      return false;
    });
    
  });

  
console.log(this.items1);


  }

}

  ionViewDidLoad() {
  }
  StayHere(){

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

Add() {
let charticle : string ;
let chreservation : string ; 

charticle = this.article+"" ;
chreservation = this.reservation+"" ;
let ref = this.stockRef.push( {}) ;
ref.set( {
   aff : this.article ,
    article : charticle.substr(charticle.indexOf("-")+1,charticle.indexOf(":")-4) ,
    source : chreservation.substr(chreservation.indexOf("-")+1,chreservation.indexOf(":")-4) ,
    quantite :Number(this.quantite) ,
    etat : "sortir" ,
    key : ref.key 
  })

  this.navCtrl.setRoot(StockPage) ;

  console.log(chreservation.substr(chreservation.indexOf("-")+1,chreservation.indexOf(":")-4));
  console.log(charticle.indexOf(":"));
  
}

GoToService(){
  this.navCtrl.push(FichePage);

}

GoToFactures(){
  this.navCtrl.push(Page);

}



}
