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
import { FactPaymentPage } from '../fact-payment/fact-payment';
import { BanquePage } from '../banque/banque';
import { FichClientPage } from '../fich-client/fich-client';


@Component({
  selector: 'page-page',
  templateUrl: 'page.html',
})
export class Page {
  Image1 : string ;
  items: any = [];

  public factureRef :firebase.database.Reference;
  public compteRef :firebase.database.Reference;
  public chequeRef :firebase.database.Reference;
  public especeRef :firebase.database.Reference;

  public numchequeRef :firebase.database.Reference;
  public fournisseurRef :firebase.database.Reference;
  public creditRef :firebase.database.Reference;
  
  items0 : Array<any> = [] ; 
  items1 : Array<any> = [] ; 
  items2 : Array<any> = [] ; 
  result : Array<any> = [] ; 
    

  mmmm : Array<any>=[] ;
  nnnn : Array<any>=[] ;


  payer : number=0 ;  

  test : boolean = true ; 


  /////////////////////////

  especet : any= [] ; ;
  especetotal : number = 0 ;

  
  chequet : any= [] ; ;
  chequetotal : number = 0 ;



  constructor(private calendar:Calendar ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
     

    this.test=this.navParams.get("test") ;

    if (this.test!=true) {
      this.test=true ;
    this.navCtrl.setRoot(Page,{
      test: this.test

    });
  }

       this.factureRef = firebase.database().ref('/factures' );
       this.especeRef = firebase.database().ref('/especes' );
       this.chequeRef = firebase.database().ref('/cheques' );

       this.factureRef.on('value', produitList => {

        let d : number = 0 ; 
      
        produitList.forEach( produit => {

          this.especeRef.on('value', especeList => {
      
            especeList.forEach( espece => {
              
                 console.log(true);
                 
                d=0;
              d=d+Number(espece.val().montant) ;
                
            
                   this.mmmm.push({montant : d , id :espece.val().fact });
              return false;
            });
            
          });
        
let p : number = 0 ; 
          this.chequeRef.on('value', chequeList => {
         
            chequeList.forEach( cheque => {
              
               
                 p=0 ;
              p=p+Number(cheque.val().montant) ;
            
            this.nnnn.push({montant : p , id :cheque.val().fact });

             return false;
           });
           
         });
         console.log(this.mmmm);
         console.log(this.nnnn);
         this.payer =0 ;
         
         
         for (var  i of this.mmmm) {
           if (i.id==produit.val().id) {
             this.payer=this.payer +Number(i.montant) ;
           }
         }
         console.log(this.payer);


         for (var  j of this.nnnn) {
          if (j.id==produit.val().id) {
            this.payer=this.payer +Number(j.montant) ;
          }
        }


        console.log(this.payer);
        

         
          this.items.push({
            item: produit.val() ,
            reste :Number( Number(produit.val().prix) - this.payer).toFixed(3)  
          })
          return false;
        });
        
      });

      console.log(this.items);
      
      this.compteRef = firebase.database().ref('/banque' );
      this.chequeRef = firebase.database().ref('/cheques' );
      this.especeRef = firebase.database().ref('/especes' );

      this.numchequeRef = firebase.database().ref('/ncheque' );
      this.fournisseurRef = firebase.database().ref('/fournisseurs' );
      this.creditRef = firebase.database().ref('/credit' );
  

      //////////////////////////

      
    this.chequeRef = firebase.database().ref('/cheques' );
    this.especeRef = firebase.database().ref('/especes' );

  
    var sortedArray: string[] = this.items.sort((n1,n2) => {
      if (n1.item.id > n2.item.id) {
          return -1;
      }
    
      if (n1.item.id < n2.item.id) {
          return 1;
      }
    
      return 0;
    });

 
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


GoToFiche(item:any){

  console.log(item);


  this.chequeRef.on('value', produitList => {
    produitList.forEach( produit => {
       console.log((produit.val().fact));
       console.log(item.id);
       
       
     
        if(produit.val().fact==item.item.id){
      this.chequet.push(produit.val());
      this.chequetotal=this.chequetotal+Number(produit.val().montant) ; 
      console.log(this.chequetotal);
      
        }
      return false;
    });
    
  });

  this.especeRef.on('value', produitList => {
    produitList.forEach( produit => {
     
       
        if(produit.val().fact==item.item.id){
          this.especet.push(produit.val());
          this.especetotal=this.especetotal+Number(produit.val().montant) ;     
    }
     
      return false;
    });

 
    
  });




  console.log(this.especet);
  console.log(this.chequet);
  
  
  
  this.navCtrl.push(AffFactPage,{
    especetotal: this.especetotal,
    especes:this.especet,
    chequetotal:this.chequetotal,
    cheques:this.chequet,
    item:item
  })
}




GoToPayement(item:any){

 
 

console.log(this.payer);


  this.navCtrl.push(FactPaymentPage,{
    item:item
  })
}

Create() {
  this.navCtrl.push(FichClientPage);
}
}
