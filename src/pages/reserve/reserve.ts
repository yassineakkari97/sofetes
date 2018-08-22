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
import { CaisePage } from '../caise/caise';
import { AlertController } from 'ionic-angular';
import { AComptePage } from '../a-compte/a-compte';
import { AcChequePage } from '../ac-cheque/ac-cheque';

import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';

import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';

@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html',
})
export class ReservePage {

  public compteRef :firebase.database.Reference;
  public chequeRef :firebase.database.Reference;
  public numchequeRef :firebase.database.Reference;
  public fournisseurRef :firebase.database.Reference;
  public creditRef :firebase.database.Reference;


  Image1 : string ;
item : any ;

items0 : Array<any> = [] ; 
items1 : Array<any> = [] ; 
items2 : Array<any> = [] ; 
result : Array<any> = [] ; 

name : any ;
depot :any ;
virement : any ;
montantch : any ;
numcheque:any ;

searchQuery: string = '';
items: string[];


  constructor(private afdb: AngularFireDatabase,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.compteRef = firebase.database().ref('/banque' );
    this.chequeRef = firebase.database().ref('/cheques' );
    this.numchequeRef = firebase.database().ref('/ncheque' );
    this.fournisseurRef = firebase.database().ref('/fournisseurs' );
    this.creditRef = firebase.database().ref('/credit' );

    this.item=this.navParams.get("item") ;
    console.log(this.item);

    this.compteRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.items0.push(produit.val());
        return false;
      });
      
    });

    this.numchequeRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.items1.push(produit.val());
        return false;
      });
      
    });

    this.chequeRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        if(produit.val().proprietaire=="sofetes")
        this.items2.push(produit.val().numero);
        return false;
      });
      
    });



console.log(this.items2);
console.log(this.items1);
console.log(this.items0);



    for(var i of this.items1) {



       for(var j of this.items0) {
   
            if(Number(i.compte)==Number(j.id)) {
               
                 
               

                    for(var z=Number(i.debut) ;z<Number(i.fin);z++) {
                       if(this.verif(z)) {

                       }
                       else {
                        let variable = ""+j.banque+"-"+z
                        this.result.push(variable) ;
                       }
                        

                    }
            }
           }
    }

    this.initializeItems();

    

  }

  initializeItems() {
    this.items=this.result ;
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.result = this.result.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  verif(n:any) {
      for(var item of this.items2) {
       
        
         if (Number(item)==Number(n)) {
           return true ;
           
         }
       }



       return false ;

  }

  /*
  kinkhalis cheque , yyit7atli fi wost enum ta3 credit key ta3 cheque ali zotoo bism fornisseur 
  ali khdha cheque o wa9tili yitsaref cheque yitna7aw floss mil compte , yitzad lil fornisseur 
  floss ta3 cheque , o yitna7a cheque mil base donnes 
  */
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


  PushToEspece(){

this.navCtrl.push(EspecePage) ;
  }

  PushToST(){
this.navCtrl.push(SdPage);
  }

  PushToDashboard(){
    this.navCtrl.push(ReceptionPage) ;
  }
  ////////////////////////////////



  add(){

    let chnum=this.numcheque+"" ;
    let f = this.item.fournisseur+"" ;
    let final= chnum.substr(chnum.indexOf("-")+1,Number(chnum.length)-4) ;
    let ffinal1=f.substr(0,f.indexOf(" ")) ;
    let ffinal2=f.substr(f.indexOf(" ")+1,Number(f.length)-ffinal1.length) ;
  

    let idbanque =this.numcheque+"" ;
    idbanque=idbanque.substr(0,idbanque.indexOf("-")) ;

    console.log(idbanque);
    
    let k : any ;
    this.fournisseurRef.on('value', produitList => {
  
      produitList.forEach( produit => {
       if((produit.val().nom==ffinal1)&&(produit.val().prenom==ffinal2))
       k=produit.val().key ;
        return false;
      });
      
    });


    this.compteRef.on('value', produitList => {
  
      produitList.forEach( produit => {
      if(produit.val().banque==idbanque)
      idbanque=produit.val().key ;
        return false;
      });
      
    });



    console.log(idbanque);
    
    this.montantch=Number(this.montantch).toFixed(3) ;
    
   
  let ref = this.chequeRef.push({});
  ref.set({
    montant : this.montantch ,
    DateVirement : this.virement ,
    DateDepot : this.depot ,
    proprietaire : "sofetes",
    etat : false,
    key :ref.key,
    numero : final,
    banque:idbanque,
    dest : k
  });


    
   
  let ref1 = this.creditRef.push({});
  ref1.set({
    fournisseur: k ,
    key: ref1.key,
    montant: ref.key
  
  });



  this.navCtrl.push(CaisePage) ;


  }

  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }

}
