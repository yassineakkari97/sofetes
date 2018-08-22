import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';

import { HomePage } from '../home/home';
import { ReceptionPage } from '../reception/reception';
import { ClientPage } from '../client/client';
import { FournisseurPage } from '../fournisseur/fournisseur';
import { CaisePage } from '../caise/caise';
import { ReservationPage } from '../reservation/reservation';
import { EprevisionPage } from '../eprevision/eprevision';
import { CArticlePage } from '../c-article/c-article';
import { UArticlePage } from '../u-article/u-article';
import { StockPage } from '../stock/stock';

import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';


@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {
  public articleRef :firebase.database.Reference;

  items: any = [];

  Image1 : string ;
  constructor(private afdb: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.articleRef = firebase.database().ref('/articles' );
this.items=[];
    this.articleRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.items.push(produit.val());
        return false;
      });
      
    });

    console.log(this.items);
    
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

  PushToRP(){
   this.navCtrl.push(ReceptionPage) ;
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

  pushtostock() {
    this.navCtrl.push(StockPage) ;
  }
/////////////////////////////////////////////////////////////////

PushToCArticle(){
  this.navCtrl.push(CArticlePage);
}


GoToService(){
  this.navCtrl.push(FichePage);

}

GoToFactures(){
  this.navCtrl.push(Page);

}
Delete(item :any ){
  console.log(item);
  
  this.afdb.object('/articles/'+item.key).remove();
  this.items=[];
    this.articleRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.items.push(produit.val());
        return false;
      });
      
    });
}

Update(item :any ){
   this.navCtrl.push(UArticlePage ,{
     item:item
   });
}

}
