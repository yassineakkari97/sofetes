
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase';
import {Calendar} from '@ionic-native/calendar'
import { Component, ViewChild } from '@angular/core';

import { AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ArticlePage } from '../article/article';
import { ClientPage } from '../client/client';
import { FournisseurPage } from '../fournisseur/fournisseur';
import { CaisePage } from '../caise/caise';
import { ReservationPage } from '../reservation/reservation';
import { EprevisionPage } from '../eprevision/eprevision';
import { ReceptionPage } from '../reception/reception';
import { CReservationPage } from '../c-reservation/c-reservation';

import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';

import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';
@Component({
  selector: 'page-sd',
  templateUrl: 'sd.html',
})
export class SdPage {
  cheque : any ;
  eventDate : any ;
  timeStarts :any ;
  timeEnds : any ;
  prix :any ;
  fournisseur :any ;
  depot :any ;
  virement : any ;
  Pcheque :any ;
  montantch : any ;
  montantes : any ;
  table : any = [] ;
  monpayer : any ;
  ftotal : any = 0 ;
  reste : any = 0 ;
  Image1 : string ;
  esepeces : any =[] ;
  cheques : any = [] ;
  payementDate : any ;
  ind : any ;
 
  ChequeKey : any= undefined ;
EspeceKey : any = undefined ;
lenght : number = 1; 
notes : any ;

gid : Array<any> =[] ;
id : number ;
  public reservationRef :firebase.database.Reference;
  public chequeRef :firebase.database.Reference;
  public especeRef :firebase.database.Reference;
numero : any ;
public caiseRef :firebase.database.Reference;

public historiqueRef :firebase.database.Reference;

histoire : Array<any> =[];


caise : Array<any>=[] ;
cp : any ;
  constructor(private afdb: AngularFireDatabase,public alertCtrl: AlertController ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.caiseRef= firebase.database().ref('/caises' );

    this.eventDate =this.navParams.get("eventDate") ;
    this.timeStarts=this.navParams.get("timeStarts") ;
    this.timeEnds=this.navParams.get("timeEnds") ;
    this.fournisseur=this.navParams.get("fournisseur") ;
    this.numero=this.navParams.get("numero") ;

    this.depot=this.navParams.get("depot") ;
    this.prix=this.navParams.get("prix") ;
   this.virement= this.navParams.get("virement") ;
    this.Pcheque=this.navParams.get("Pcheque") ;
    this.montantch=this.navParams.get("montantch") ;
    this.montantes=this.navParams.get("montantes") ;
   this.table= this.navParams.get("table") ;
  this.payementDate= this.navParams.get("payementDate") ;
   this.reservationRef = firebase.database().ref('/reservations' );
     this.chequeRef = firebase.database().ref('/cheques' );
     this.especeRef = firebase.database().ref('/especes' );
   this.notes=this.navParams.get("notes") ;
   this.cp=this.navParams.get("cp") ;

   this.historiqueRef= firebase.database().ref('/historique' );


   if(this.cheque==undefined) {
    this.cheque=0 ;
  }
  if(this.montantch==undefined) {
    this.montantch=0 ;
  }  if(this.montantes==undefined) {
    this.montantes=0 ;
  }  


  this.reservationRef.on('value', produitList => {
      
    produitList.forEach( produit => {
     this.gid.push(produit.val()) ;
      return false;
    });
    
  });


  this.caiseRef.on('value', produitList => {
      
    produitList.forEach( produit => {
     this.caise.push(produit.val()) ;
      return false;
    });
    
  });

  console.log(this.cp);
  

//  console.log(this.gid[this.gid.lenght-1]);
 console.log(this.gid.length);
 console.log(this.gid[this.gid.length-1]);




   this.monpayer= Number(this.montantes)+ Number(this.montantch) ;

this.ftotal=Number(this.prix) ;
if (this.table!=undefined) {
for (var item of this.table) {
  this.ftotal=this.ftotal+Number(item.prix)*Number(item.quantite);
  }

  

  this.reste= this.ftotal - this.monpayer ;

  
  console.log("reste"+ this.reste);
  console.log("monpayer" + this.monpayer);
  

  }


  this.historiqueRef.on('value', produitList => {
  
    produitList.forEach( produit => {
      
        this.histoire.push(produit.val());
  
      return false;
    });
    
  });


}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SdPage');
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

  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

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

  PushToDashboard(){
     this.navCtrl.push(ReceptionPage) ;
  }


/////////////////////////////////////////


Add() {
 
  
  if (this.gid.length==0) {
    this.id=1 ;
  }
  else {
    this.id=Number(this.gid[this.gid.length-1].id)+1
  }
  
  
  if (this.montantch>0) {

    this.montantch=Number(this.montantch).toFixed(3) ;
    this.montantes=Number(this.montantes).toFixed(3) ;

  this.ChequeKey = this.chequeRef.push({});
  this.ChequeKey.set({
    montant : this.montantch ,
    DateVirement : this.virement ,
    DateDepot : this.depot ,
    proprietaire : this.Pcheque,
    etat : false,
    key :this.ChequeKey.key,
    numero : this.numero ,
    source :  this.id
  });

  }

  if (this.montantes>0) {
    let montant=0 ;
    ////// historique
    if(this.cp!=undefined)
{     montant = Number(this.cp.montant)+Number(this.montantes) ;
  this.afdb.object('/caises/'+this.cp.key).update({
    montant:montant 
   });
}
    
    

    this.EspeceKey = this.especeRef.push() ;
    this.montantch=Number(this.montantch).toFixed(3) ;
    this.montantes=Number(this.montantes).toFixed(3) ;

    this.EspeceKey.set({
      montant : this.montantes ,
      client : this.fournisseur,
      key :this.EspeceKey.key,
      payementDate : this.payementDate
    });

 
let kkk : any ;
let tab : any =  [] ;
for(var z of this.histoire) {
if (z.caise=="Caise Principal") {
 kkk=z.key ;
 tab=z.hist ;

}
}

if (tab==undefined) {
  tab=[] ;
}
this.montantch=Number(this.montantch).toFixed(3) ;
    this.montantes=Number(this.montantes).toFixed(3) ;

    
let msg =this.payementDate+": Ajout d'un montant '"+this.montantes+"' pour la reservation EVT-"+this.id ;
tab.push(msg) ;

this.afdb.object('/historique/'+kkk).update({ hist : tab});

  }

  this.reservationRef.on('value', produitList => {
      
    produitList.forEach( produit => {
     this.gid.push(produit.val()) ;
      return false;
    });
    
  });


  

  let ref =this.reservationRef.push({});
  if (this.ChequeKey==undefined && this.EspeceKey!=undefined ) {
    this.esepeces.push(this.EspeceKey.key);
    console.log(this.EspeceKey);
    console.log(this.ChequeKey);
  ref.set({
    eventDate : this.eventDate ,
    timeStarts : this.timeStarts ,
    timeEnds : this.timeEnds ,
    client : this.fournisseur,
    prix : this.prix,
    payement : { cheque :false ,
                 espece : this.esepeces },
    key :ref.key,
    id : this.id
    ,notes:this.notes
  });}
  else  if (this.EspeceKey==undefined && this.ChequeKey!=undefined) {
    this.cheques.push(this.ChequeKey.key);

    console.log(this.EspeceKey);
    console.log(this.ChequeKey);
    ref.set({
      eventDate : this.eventDate ,
      timeStarts : this.timeStarts ,
      timeEnds : this.timeEnds ,
      client : this.fournisseur,
      prix : this.prix,
      payement : { cheque :this.cheques ,
                   espece : false },
  
      key :ref.key,
      id : this.id
      ,notes:this.notes


    });}
    else  if ((this.EspeceKey==undefined)&&(this.ChequeKey==undefined)) {
      console.log(this.EspeceKey);
      console.log(this.ChequeKey);
      ref.set({
        eventDate : this.eventDate ,
        timeStarts : this.timeStarts ,
        timeEnds : this.timeEnds ,
        client : this.fournisseur,
        prix : this.prix,
        payement : { cheque :false ,
                     espece : false },
    
        key :ref.key,
        id :this.id
        ,notes:this.notes

      });}
      else  if ((this.EspeceKey!=undefined)&&(this.ChequeKey!=undefined)) {

        this.esepeces.push(this.EspeceKey.key);
        this.cheques.push(this.ChequeKey.key);

       
        ref.set({
          eventDate : this.eventDate ,
          timeStarts : this.timeStarts ,
          timeEnds : this.timeEnds ,
          client : this.fournisseur,
          prix : this.prix,
          payement : { cheque :this.cheques ,
                       espece :this.esepeces} ,
      
          key :ref.key,
          id :this.id
          ,notes:this.notes

        });}

        console.log(this.EspeceKey);
        console.log(this.ChequeKey);

  this.navCtrl.push(ReservationPage) ;

}

ann() {

  this.navCtrl.push(CReservationPage) ;

}


}
