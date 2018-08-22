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
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  Image1 : string ;
  item : any ; 
  public historiqueRef :firebase.database.Reference;
  tab :Array<any>=[] ; 


  constructor(private afdb: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.historiqueRef= firebase.database().ref('/historique' );
    this.item = this.navParams.get("item") ; 

    this.historiqueRef.on('value', produitList => {
  
      produitList.forEach( produit => {
      
        
        
        if(this.item.banque==produit.val().banque) 
        {console.log(true);
        console.log(produit.val().hist);
        
          this.tab=produit.val().hist ;
        }
             console.log(this.tab);
             
        return false;
      });
      
    });    
  console.log(true);
  
    console.log(this.tab);
    
  
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

  
  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }
  ////////////////////////////////////////////

 
 
}


