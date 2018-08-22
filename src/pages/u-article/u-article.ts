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

import { ToastController } from 'ionic-angular';

import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';
@Component({
  selector: 'page-u-article',
  templateUrl: 'u-article.html',
})
export class UArticlePage {

  public articleRef :firebase.database.Reference;
  public fournisseurRef :firebase.database.Reference;

  Image1 : string ;
   item : any ;
   nom : any ;
   unite : any ;
   prixa : any ; 
   prixv : any ; 
   fournisseur : any ;
   items: any = [];

   nomm : any ;
   unitee : any ;
   prixaa : any ; 
   prixvv : any ; 



  constructor(public toastCtrl: ToastController, public afdb: AngularFireDatabase,private calendar:Calendar ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.item= this.navParams.get("item") ;
    this.fournisseurRef = firebase.database().ref('/fournisseurs' );

    this.items=[];
    this.fournisseurRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.items.push(produit.val());
        return false;
      });
      
    });
     this.nomm = this.item.nom ;
     this.unitee=this.item.unite;
     this.prixaa=this.item.prixa ;
     this.prixvv=this.item.prixv ;

    this.articleRef = firebase.database().ref('/articles' );

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

  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }
/////////////////////////////////////////////


presentToast(msg:string) {
  const toast = this.toastCtrl.create({
    message: msg,
    duration: 3000
  });
  toast.present();
}

Update() {

  if(this.nom==undefined) {
    this.nom =this.item.nom ;
  }
  if(this.unite==undefined) {
    this.unite =this.item.unite ;
  }
  if(this.prixa==undefined) {
    this.prixa =this.item.prixa ;
  }
  if(this.prixv==undefined) {
    this.prixv =this.item.prixv ;
  }

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


  this.prixa=Number(this.prixa).toFixed(3) ;
  this.prixv=Number(this.prixv).toFixed(3) ; 

  this.afdb.object("articles/"+this.item.key).update({
    nom : this.nom ,
    unite : this.unite ,
    prixa:this.prixa ,
    prixv:this.prixv ,
   });

   this.navCtrl.push(ArticlePage) ;
}}
}



