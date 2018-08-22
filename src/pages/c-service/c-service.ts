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
import { BanquePage } from '../banque/banque';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import { ReservePage } from '../reserve/reserve';
import { ToastController } from 'ionic-angular';
import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';



@Component({
  selector: 'page-c-service',
  templateUrl: 'c-service.html',
})
export class CServicePage {

  public compteRef :firebase.database.Reference;
  public chequeRef :firebase.database.Reference;
  public numchequeRef :firebase.database.Reference;
item : any ;

it : Array<any> = [] ; 



items0 : Array<any> = [] ; 
items1 : Array<any> = [] ; 
items2 : Array<any> = [] ; 
result : Array<any> = [] ; 
name : any ;
today : any  = new Date();
yyyy : any = this.today.getFullYear();
dd : any  = this.today.getDate();
mm : any  = this.today.getMonth()+1; //January is 0!

aff:Array<any>=[] ;

fournisseur : any ;
NF : any ;
phone : any ; 
cout : any ;
eventDate : any ;
note : any ; 
gid : Array<any> =[] ;
id : number ;





  public serviceRef :firebase.database.Reference;
  Image1 : string ;
  items : Array<any> =[] ;
  constructor(public toastCtrl: ToastController,private afdb: AngularFireDatabase,public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.serviceRef = firebase.database().ref('/services' );
   

    if(this.serviceRef!=undefined) {
      this.serviceRef.on('value', produitList => {
          
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

  PushToBnaque(){
this.navCtrl.push(BanquePage);
  }

  PushToEspece(){

this.navCtrl.push(EspecePage) ;
  }

  PushToST(){
this.navCtrl.push(SdPage);
  }

  pushToDashboard(){
    this.navCtrl.push(ReceptionPage);
    
  }

  ////////////////////////////////////////

  
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


 
  cree(){


    if(this.eventDate==undefined) {
      this.presentToast("il faut remplir le date de service");
      return false ;
    
    } else if (this.fournisseur==undefined) {
      this.presentToast("il faut specifier un fournisseur de service ");
      return false ;
    
    } else if (this.cout==undefined) {
      this.presentToast("il faut remplir le cout de service");
      return false ;
    
    
    } 
    if (this.note== undefined) {this.note="";} 
    if (this.NF==undefined) {this.NF="";}
    if (this.phone==undefined) {this.phone="";}


    let ref =this.serviceRef.push({});
    this.cout=Number(this.cout).toFixed(3) ;
  ref.set({
    id : this.id,
    fournisseur : this.fournisseur ,
    cout : this.cout ,
    phone : this.phone ,
    date : this.eventDate,
    note : this.note,
    NF : this.NF,
    key :ref.key
  });

  this.navCtrl.push(FichePage) ;




  }

}
