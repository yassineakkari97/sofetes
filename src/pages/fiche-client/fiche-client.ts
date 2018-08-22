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
import { AffFactPage } from '../aff-fact/aff-fact';
import { Page } from '../page/page';

import { ToastController } from 'ionic-angular';
import { BanquePage } from '../banque/banque';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
@Component({
  selector: 'page-fiche-client',
  templateUrl: 'fiche-client.html',
})
export class FicheClientPage {
  Image1 : string ;
  items: any = [];
  items0 : Array<any> = [] ; 
  items1 : Array<any> = [] ; 
  items2 : Array<any> = [] ; 
  result : Array<any> = [] ; 
  

  name : any ;
  depot :any ;
  virement : any ;
  montantch : any ;
  numcheque:any ;
  montantes : any ;
  payementDate:any ; 

  
  searchQuery: string = '';
public compteRef :firebase.database.Reference;
public chequeRef :firebase.database.Reference;
public numchequeRef :firebase.database.Reference;
public fournisseurRef :firebase.database.Reference;
public creditRef :firebase.database.Reference;
public especeRef :firebase.database.Reference;
public caiseRef :firebase.database.Reference;
public historiqueRef :firebase.database.Reference;


histoire : Array<any> =[];

caises : Array<any> =[] ;
caises1 : Array<any> =[] ;
caise : any ; 
k : any ;

test : boolean = true ; 
item : any ;

 reserClient :Array<any>=[] ;
   chequeClient :Array<any>=[] ;
   especeClient : Array<any>=[] ;
   credit : number = 0 ; 
   especePayer : number = 0 ;
   chequePayer : number = 0 ; 
   creditFinal : number = 0 ; 
   cheque :Array<any>=[] ;
   espece : Array<any>=[] ;


  public factureRef :firebase.database.Reference;

  constructor(private afdb: AngularFireDatabase,public toastCtrl: ToastController, private calendar:Calendar ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.item=this.navParams.get("item") ;
    this.cheque=this.navParams.get("cheque") ;
    this.espece=this.navParams.get("espece") ;
    this.reserClient=this.navParams.get("reserClient") ;
    this.creditFinal=this.navParams.get("creditFinal") ;
    this.chequePayer=this.navParams.get("chequePayer") ;
    this.especePayer=this.navParams.get("especePayer") ;




  console.log(this.item);
  
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
     
    this.compteRef = firebase.database().ref('/banque' );
    this.chequeRef = firebase.database().ref('/cheques' );
    this.numchequeRef = firebase.database().ref('/ncheque' );
    this.fournisseurRef = firebase.database().ref('/fournisseurs' );
    this.creditRef = firebase.database().ref('/credit' );
    this.especeRef = firebase.database().ref('/especes' );
    this.caiseRef = firebase.database().ref('/caises' );
    this.historiqueRef= firebase.database().ref('/historique' );




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



}
