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
  selector: 'page-fich-client',
  templateUrl: 'fich-client.html',
})
export class FichClientPage {
  Image1 : string ;

  f : any ;
  credit : any ; 
  prix : any  ;

  cr : Array<any>=[] ;

    affarticles : Array<any> =[];
  article : any ;
  reservation : any ;
  quantite : any ;
  items0 : Array<any> = [] ;
  items1 : Array<any> = [] ;

  gid : Array<any> =[] ;
  num : any ; 
  prixa : any ; 

  facture:Array<any> =[]; 

  public  factureRef :firebase.database.Reference;

  public stockRef :firebase.database.Reference;
  public articleRef :firebase.database.Reference;
  public fournisseursRef :firebase.database.Reference;
  public creditRef :firebase.database.Reference;
id : number = 0 ;

today : any  = new Date();


yyyy : any = this.today.getFullYear();
dd : any  = this.today.getDate();
  mm : any  = this.today.getMonth()+1; //January is 0!

  constructor( public afdb: AngularFireDatabase,private calendar:Calendar ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";


    this.stockRef = firebase.database().ref('/stock' );
    this.articleRef = firebase.database().ref('/articles' );
    this.fournisseursRef = firebase.database().ref('/fournisseurs' );
    this.creditRef = firebase.database().ref('/credit' );
    this.factureRef = firebase.database().ref('/factures' );

  
    
this.today = this.mm + '/' + this.dd + '/' + this.yyyy;


/*
  
if (this.articleRef!=undefined) {
  this.articleRef.on('value', produitList => {
    produitList.forEach( produit => {
      this.items0.push(produit.val()) ;
      return false;
    });
    
  });
}

if (this.fournisseursRef!=undefined) {
  this.fournisseursRef.on('value', produitList => {
    produitList.forEach( produit => {
      this.items1.push(produit.val()) ;
      return false;
    });
    
  });}
*/ 




  



  if(this.factureRef!=undefined) {
  this.factureRef.on('value', produitList => {
      
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
  

  this.initializeItems();
  this.initializeItems1();

  console.log(this.items0);
  console.log(this.items1);
  
  

  
  }


  initializeItems() {

    this.items0=null ;
    this.items0=[] ;
  
    
if (this.articleRef!=undefined) {
  this.articleRef.on('value', produitList => {
    produitList.forEach( produit => {
      this.items0.push(produit.val()) ;
      return false;
    });
    
  });
}
    
  }
  initializeItems1() {
  
    this.items1=null ;
    this.items1=[] ;
  
if (this.fournisseursRef!=undefined) {
  this.fournisseursRef.on('value', produitList => {
    produitList.forEach( produit => {
      this.items1.push(produit.val()) ;
      return false;
    });
    
  });
    
  }

}

  
getItems(ev: any) {
  // Reset items back to all of the items
  this.initializeItems();

  // set val to the value of the searchbar
  const val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.items0 = this.items0.filter((data) => {
      return (data.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}


getItems1(ev: any) {
  // Reset items back to all of the items
  this.initializeItems1();

  // set val to the value of the searchbar
  const val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.items1 = this.items1.filter((data) => {
      return (data.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}



  onChangeTime(data) : void {
   let id = data.substr(4,1);
   let p : any ;

   for(var i of this.items0) {
     if (i.id==id) {
        p =i.prixa ;
     }
   }

   this.prixa=p ;

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
  let p : number ;
  
  charticle = this.article+"" ;
  chreservation = this.reservation+"" ;

  for (var i of this.items0) {
    if (i.id==(charticle.substr(charticle.indexOf("-")+1,charticle.indexOf(":")-4))) { 
        p=i.prixa ;
    }
  }

  for (var j of this.facture) {
    if(j.article==charticle){
      j.prix=(Number(j.quantite)+Number(this.quantite))*Number(this.prixa) ;
      j.quantite=Number(j.quantite)+Number(this.quantite) ;
      return false ;
    }
    
  }
    this.facture.push({article : charticle, fournisseur :chreservation,quantite :Number(this.quantite) , prix :Number(this.prixa)*Number(this.quantite)  }) ;
 

console.log(this.facture);


  /*
*/



  }


  end() {

let ar : Array<any>= [] ;

    for (var f of this.facture) {

      let charticle : string ;
  let chreservation : string ; 

  charticle = f.article ;
  chreservation=f.fournisseur ;


  let ref = this.stockRef.push( {}) ;
  ref.set( {
     aff : this.article ,
      article : charticle.substr(charticle.indexOf("-")+1,charticle.indexOf(":")-4) ,
      source : chreservation.substr(chreservation.indexOf(" ")+1,Number(chreservation.length)-7) ,
      quantite :Number(this.quantite) ,
      etat : "entrer" ,
      key : ref.key
    })

    ar.push({article: charticle , quantite :Number(this.quantite) })  ;
  
let ida=    charticle.substr(charticle.indexOf("-")+1,charticle.indexOf(":")-4) ;
let idf=    chreservation.substr(chreservation.indexOf(" ")+1,Number(chreservation.length)-6)  ;


for(var i of this.items0) {

     if(i.id == ida) {
       this.prix=Number(i.prixa)*Number(this.quantite) ;
     }
}


for(var i of this.items1) {
  console.log(i.cin);

  if(i.cin == idf) {
    
    this.f=i.key ;
  }  
}




let test = false ;
let kk : any ;
let m : number=0 ;
   
if (this.creditRef!=undefined) {
  this.creditRef.on('value', produitList => {
    produitList.forEach( produit => {
      if(produit.val().fournisseur==this.f) {
        test=true ;
        kk = produit.val().key ;
        m =produit.val().montant ;
      }
      this.cr.push(produit.val()) ;
      return false;
    });
    
  });
}

console.log(m);
console.log(this.prix);



    }

    
let somme : any=0 ;

for (var j of this.facture) {
      somme=somme+Number(j.prix) ;
  }
  



somme=Number(somme).toFixed(3) ;

let  ref = this.factureRef.push( {}) ;
ref.set( {
   id : this.id ,
    fournisseur :this.reservation ,
    key : ref.key ,
    prix : somme ,
    date : this.today ,
    articles: ar ,
    numero : this.num

  })





    this.navCtrl.setRoot(Page) ;

  }

  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }


 


}
