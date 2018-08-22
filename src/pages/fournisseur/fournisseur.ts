import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';

import { HomePage } from '../home/home';
import { ArticlePage } from '../article/article';
import { ClientPage } from '../client/client';
import { ReceptionPage } from '../reception/reception';
import { CaisePage } from '../caise/caise';
import { ReservationPage } from '../reservation/reservation';
import { EprevisionPage } from '../eprevision/eprevision';
import { UFournisseurPage } from '../u-fournisseur/u-fournisseur';
import { CFournisseurPage } from '../c-fournisseur/c-fournisseur';
import { FicheFournisseurPage } from '../fiche-fournisseur/fiche-fournisseur';


import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';


@Component({
  selector: 'page-fournisseur',
  templateUrl: 'fournisseur.html',
})
export class FournisseurPage {
  Image1 : string ;
  items: any = [];
  public fournisseursRef :firebase.database.Reference;

  public chequeRef :firebase.database.Reference;
  public especeRef :firebase.database.Reference;
  public stockRef :firebase.database.Reference;
  public factureRef :firebase.database.Reference;

  credit : number=0  ; 
  cheques : Array<any>=[] ;
  especes:Array<any>=[] ;
  stock : Array<any> =[];
  credittotal : number=0 ;
  scheque : number = 0 ;
  sespece : number = 0 ;  

  
facture: Array<any>=[] ;
  factures : Array<any>=[] ;
  constructor(private afdb: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.fournisseursRef = firebase.database().ref('/fournisseurs' );

    this.chequeRef = firebase.database().ref('/cheques' );
    this.especeRef = firebase.database().ref('/especes' );
    this.stockRef = firebase.database().ref('/stock' );
    this.factureRef = firebase.database().ref('/factures' );

    this.items=[];
        this.fournisseursRef.on('value', produitList => {
      
          produitList.forEach( produit => {
            this.items.push(produit.val());
            return false;
          });
          
        });

        var sortedArray: string[] = this.items.sort((n1,n2) => {
          if (n1.id > n2.id) {
              return -1;
          }
        
          if (n1.id < n2.id) {
              return 1;
          }
        
          return 0;
        });

        this.factureRef.on('value', produitList => {
      
          produitList.forEach( produit => {
            this.factures.push(produit.val());
            return false;
          });
          
        });


        this.chequeRef.on('value', produitList => {
      
          produitList.forEach( produit => {
            this.cheques.push(produit.val());
            return false;
          });
          
        });

        this.especeRef.on('value', produitList => {
      
          produitList.forEach( produit => {
            this.especes.push(produit.val());
            return false;
          });
          
        });

        this.stockRef.on('value', produitList => {
      
          produitList.forEach( produit => {
            this.stock.push(produit.val());
            return false;
          });
          
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

  PushToDashboard(){
    this.navCtrl.push(ReceptionPage);
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

  /////////////////////////////////////////////


  PushToCFournisseur(){
  this.navCtrl.push(CFournisseurPage);




  }
 
  Delete(item :any ){
    
    this.afdb.object('/fournisseurs/'+item.key).remove();
    this.items=[];
      this.fournisseursRef.on('value', produitList => {
    
        produitList.forEach( produit => {
          this.items.push(produit.val());
          return false;
        });
        
      });

      var sortedArray: string[] = this.items.sort((n1,n2) => {
        if (n1.id > n2.id) {
            return -1;
        }
      
        if (n1.id < n2.id) {
            return 1;
        }
      
        return 0;
      });
      
  }

  
Update(item :any ){
  this.navCtrl.push(UFournisseurPage ,{
    item:item
  });
}

GoToFiche(item : any) {
let chequess : Array<any>=[] ;
let especess : Array<any>=[] ;




for(var i of this.cheques) {
  if (i.dest==item.key) {      
          chequess.push(i) ;

  }
}



for(var i of this.especes) {

  let client = item.nom+" "+item.prenom ;


  
  let c=this.keyy(client) ;
  
  console.log(item);
  console.log(i);
  

  if (item.key==i.client) {   
    

  especess.push(i) ;

  }
}

console.log(chequess);
console.log(especess);



  for(var i of chequess) {
    if (i.dest==item.key) {      
      this.scheque=this.scheque+Number(i.montant) ;

    }
  }

  
  //console.log(this.scheque);
  
  

  for(var i of especess) {
    let resulat = this.keyy(i.client) ;

    

    if (i.client==item.key) {
      this.sespece=this.sespece+Number(i.montant) ;
    }
  }


//console.log(this.sespece);

  
  for(var i of this.factures) {
    if ((item.nom+":"+" "+item.cin)==i.fournisseur) {
      
      this.facture.push(i) ;
      this.credit=Number(this.credit)+Number(i.prix) ;
    }
  }

//console.log(this.credit);


  this.credittotal=Number(this.credit)-Number(this.scheque)-Number(this.sespece)  ;
  

  //console.log(this.credittotal);
  


  this.navCtrl.push(FicheFournisseurPage ,{
    item:item ,
    scheque : this.scheque,
    sespece: this.sespece ,
    cheque : chequess ,
    especes : especess ,
    credit : this.credit ,
    credittotal:this.credittotal ,
    facture: this.facture
  });
}


keyy(name : string) {
 let result1 : string ;
 let result2 : string ;
 let result : string ;

 result1=name.substr(0,Number(name.indexOf(" "))) ;
 result2=name.substr(Number(name.indexOf(" ")+1),Number(name.length)) ;

 this.fournisseursRef.on('value', produitList => {
      
  produitList.forEach( produit => {
if((produit.val().nom==result1)&&(produit.val().prenom==result2)){
  result= produit.val().key ;
}    return false;
  });
  
});


return result ;

}


GoToService(){
  this.navCtrl.push(FichePage);

}

GoToFactures(){
  this.navCtrl.push(Page);

}




}
