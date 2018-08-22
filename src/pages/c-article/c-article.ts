import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase';
import {Calendar} from '@ionic-native/calendar'

import { Observable } from 'rxjs/Observable';

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
  selector: 'page-c-article',
  templateUrl: 'c-article.html',
})
export class CArticlePage {
  public articleRef :firebase.database.Reference;
  gid : Array<any> =[] ;
  id : number ;


  Image1 : string ;
  items: any = [];
  public fournisseurRef :firebase.database.Reference;

  
   nom : any ;
   unite : any ;
   prixa : any ; 
   prixv : any ; 

   fournisseur : any ;

  constructor(public toastCtrl: ToastController,private calendar:Calendar ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
     
    this.articleRef = firebase.database().ref('/articles' );
    this.fournisseurRef = firebase.database().ref('/fournisseurs' );

    this.items=[];
    this.fournisseurRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.items.push(produit.val());
        return false;
      });
      
    });


   

    this.articleRef.on('value', produitList => {
      
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

    console.log(this.gid.length);

    console.log(this.gid);
    
    


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


GoToService(){
  this.navCtrl.push(FichePage);

}

GoToFactures(){
  this.navCtrl.push(Page);

}


Add(){
  console.log(this.nom==undefined);
  

  if(this.nom==undefined) {
        this.presentToast("le champ nom n'est pas rempli");
        return false ;
  }
  if(this.unite==undefined) {
    this.presentToast("le champ unité n'est pas rempli");
    return false ;

  }
  if(this.prixv==undefined) {
    this.presentToast("le prix de vente nom n'est pas rempli");
    return false ;

  }
  if(this.prixa==undefined) {
    this.presentToast("le champ prix d'achat n'est pas rempli");
    return false ;

  } else {

  
  if (this.gid.length==0) {
    this.id=1 ;
  }
  else {
    this.id=Number(this.gid[this.gid.length-1].id)+1
  }

  this.prixa=Number(this.prixa).toFixed(3) ;
  this.prixv=Number(this.prixv).toFixed(3) ;

  let ref =this.articleRef.push({});
  ref.set({
    nom : this.nom ,
    unite : this.unite ,
    prixa:this.prixa ,
    prixv:this.prixv ,
    key :ref.key,
    id : this.id

  });
  this.navCtrl.push(ArticlePage) ;

}}



}
