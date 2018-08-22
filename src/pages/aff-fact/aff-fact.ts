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
import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';



@Component({
  selector: 'page-aff-fact',
  templateUrl: 'aff-fact.html',
})
export class AffFactPage {
  Image1 : string ;
  items: any = [];
item : any ;

id : any ;
date : any ;
fournisseur : any ;
prix: any ;
reste : any ; 

especes : Array<any>= [] ; 
  especetotal : number = 0 ;

  
  cheques : Array<any>= [] ; 
  chequetotal : number = 0 ;



  public factureRef :firebase.database.Reference;

  isValid1 : boolean=true ;
  isValid : boolean = true ; 

  constructor(private calendar:Calendar ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
     this.item=this.navParams.get("item") ;


     this.cheques=this.navParams.get("cheques") ;
     this.chequetotal=this.navParams.get("chequetotal") ;
     this.especetotal=this.navParams.get("especetotal") ;
     this.especes=this.navParams.get("especes") ;

     console.log(this.especes);
     console.log(this.especetotal);
     
     

    this.items=this.item.item.articles ;
     console.log(this.item.item.articles);
    /*
       this.factureRef = firebase.database().ref('/factures' );

       this.factureRef.on('value', produitList => {
      
        produitList.forEach( produit => {
          this.items.push(produit.val());
          return false;
        });
        
      });
*/

      this.id=this.item.item.id ; 
      this.date=this.item.item.date ; 
      this.fournisseur=this.item.item.fournisseur ; 
      this.prix=this.item.item.prix ; 
      this.reste=this.item.reste ;

      if (this.cheques.length==0) {
this.isValid=false ;
      }
      if (this.especes.length==0) {
this.isValid1=false ;
      }
      
console.log(this.isValid);
console.log(this.isValid1);


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


  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }

/////////////////////////////////////////////



}
