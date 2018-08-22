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
import { AStockPage } from '../a-stock/a-stock';
import { DStockPage } from '../d-stock/d-stock';
import { DetailsPage } from '../details/details';

import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';

@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html',
})
export class StockPage {

  Image1 : string ;
  quantite : number = 0 ; 
  public stockRef :firebase.database.Reference;
  public articleRef :firebase.database.Reference;

  item : any= {
    nom : "" ,
    quantite : ""
  } ;
  items : any = [] ; 

  stock : any =[] ;
  articles : any =[] ;
  q : any  = 0 ;

  test : boolean=false ;


  constructor( public afdb: AngularFireDatabase,private calendar:Calendar ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";

  this.stockRef = firebase.database().ref('/stock' );
  this.articleRef = firebase.database().ref('/articles' );

   this.test = this.navParams.get("test") ;

  if(this.stockRef!=undefined) {

  this.stockRef.on('value', produitList => {
    produitList.forEach( produit => {
      this.stock.push({ id :produit.val().article , quantite :produit.val().quantite , etat :produit.val().etat }) ;
      return false;
    });
    
  });

}


  


if (this.articleRef!=undefined) {
  this.articleRef.on('value', produitList => {
    produitList.forEach( produit => {
      this.articles.push({ id :produit.val().id ,nom :produit.val().nom, quantite : 0}) ;
      return false;
    });
    
  });
}


console.log(this.stock[0]);


  
  for(var i of this.articles) {
    
    for(var j of this.stock) {
      
      if (j.id==i.id) { 
        console.log(true);
        
        if(j.etat=="entrer") {  i.quantite=i.quantite+j.quantite ;}
        else if(j.etat=="sortir") {  i.quantite=i.quantite-j.quantite ;}
        
            }
    }
  
  }

  if(this.test==undefined) {
    this.test=false 
  }
  
  if(this.test==false) {
this.navCtrl.setRoot(StockPage,{
  test : true 
})}
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

  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

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


importer(){
  this.navCtrl.push(AStockPage) ;

}

exporter() {
  this.navCtrl.push(DStockPage) ;

}

}
