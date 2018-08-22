import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase';

import { HomePage } from '../home/home';
import { ArticlePage } from '../article/article';
import { ReceptionPage } from '../reception/reception';
import { FournisseurPage } from '../fournisseur/fournisseur';
import { CaisePage } from '../caise/caise';
import { ReservationPage } from '../reservation/reservation';
import { EprevisionPage } from '../eprevision/eprevision';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import { UClientPage } from '../u-client/u-client';
import { CClientPage } from '../c-client/c-client';


import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';
import { fromEventPattern } from '../../../node_modules/rxjs';
import { FicheClientPage } from '../fiche-client/fiche-client';

@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {


  items: any = [];
  public clientRef :firebase.database.Reference;
  public reservationRef :firebase.database.Reference;
  public chequeRef :firebase.database.Reference;
  public especeRef :firebase.database.Reference;


  cheques :Array<any> =[];
  especes :Array<any>=[];
  reservation :Array<any>=[];


  Image1 : string ;
  constructor(private afdb: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.clientRef = firebase.database().ref('/clients' );
    this.especeRef = firebase.database().ref('/especes' );
    this.chequeRef = firebase.database().ref('/cheques' );
    this.reservationRef = firebase.database().ref('/reservations' );

    this.items=[];
        this.clientRef.on('value', produitList => {
      
          produitList.forEach( produit => {
            this.items.push(produit.val());
            return false;
          });
          
        });

        this.especeRef.on('value', produitList => {
      
          produitList.forEach( produit => {
            this.especes.push(produit.val());
            return false;
          });
          
        });

        this.chequeRef.on('value', produitList => {
      
          produitList.forEach( produit => {
            this.cheques.push(produit.val());
            return false;
          });
          
        });

        this.reservationRef.on('value', produitList => {
      
          produitList.forEach( produit => {
            this.reservation.push(produit.val());
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

  PushToDashboard(){
   this.navCtrl.push(ReceptionPage);
  }
/////////////////////


PushToCFournisseur(){
  this.navCtrl.push(CClientPage);




  }

  
  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }


  
 
  Delete(item :any ){
    
    this.afdb.object('/clients/'+item.key).remove();
    this.items=[];
      this.clientRef.on('value', produitList => {
    
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
  this.navCtrl.push(UClientPage ,{
    item:item
  });
}

details(item:any) {

  let reserClient :Array<any>=[] ;
  let chequeClient :Array<any>=[] ;
  let especeClient : Array<any>=[] ;
  let credit : number = 0 ; 
  let especePayer : number = 0 ;
  let chequePayer : number = 0 ; 
  let creditFinal : number = 0 ; 
  let cheque :Array<any>=[] ;
  let espece : Array<any>=[] ;


  for(var i of this.reservation) {
    
    console.log(item.nom+" "+item.prenom);
    console.log(i.client);
    
    console.log(i.client==item.nom+" "+item.prenom);
    
    if (i.client==item.nom+" "+item.prenom) {
      reserClient.push(i) ;
      credit =credit +Number(i.prix) ;

            for(var j of i.payement.cheque) {
              chequeClient.push(j);
            }
            for(var f of i.payement.espece) {
              especeClient.push(f);
            }
    }
  }


 
  
  
  
  for(var z of this.especes) {
       for (var z1 of especeClient) {
       
         
         if(z.key==z1) {
           espece.push(z) ;
           especePayer=especePayer+Number(z.montant) ;
         }
       }
  }
  

  for(var y of this.cheques) {
    for (var y1 of chequeClient) {
      if(y.key==y1) {
        cheque.push(y) ;
        chequePayer=chequePayer+Number(y.montant) ;
      }
    }
}




creditFinal=credit-chequePayer-especePayer;

console.log(espece);
console.log(cheque);



this.navCtrl.push(FicheClientPage, {
  item : item ,
  cheque:cheque,
  espece:espece,
  creditFinal:creditFinal, 
  reserClient:reserClient,
  chequePayer:chequePayer ,
  especePayer:especePayer
})



}

}
