
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase';
import { Platform } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ArticlePage } from '../article/article';
import { ClientPage } from '../client/client';
import { FournisseurPage } from '../fournisseur/fournisseur';
import { CaisePage } from '../caise/caise';
import { ReceptionPage } from '../reception/reception';
import { EprevisionPage } from '../eprevision/eprevision';

import { CReservationPage } from '../c-reservation/c-reservation';
import { UReservationPage } from '../u-reservation/u-reservation';
import { DetailsPage } from '../details/details';

import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import {File} from '@ionic-native/file' ;
import {FileOpener} from '@ionic-native/file-opener' ;
import { Printer, PrintOptions } from '@ionic-native/printer';

import * as pdfmake from 'pdfmake/build/pdfmake';

import { ImpPage } from '../imp/imp';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})



export class ReservationPage {
   k : any ;
  Image1 : string ;
  items: any = [];
  items1 : any = [] ;

  

  public reservationsRef :firebase.database.Reference;
  public chequesRef :firebase.database.Reference;
  public especesRef :firebase.database.Reference;
  public clientRef :firebase.database.Reference;
test : any ;
  cheque : any ; 
  espece :any ;

  affespece :any ;
  affcheque :any ;
  clientpdf : any ;
  item : any ;
  client : any ;
  eventDate : any ;
  key : any ;

  timeEnds : any ; 
  timeStarts : any ;
  prix : any ;

  depot : any ;
  virement :any ;
  Pcheque : any ;
  montantch: any ;
  especet : any= [] ; ;
  especetotal : number = 0 ;
  chequetotal : number = 0 ;

  chequet : any =[] ;
 j : number = 0 ;
 payementDate : any ;
 chequetab : any = [] ;
 reste : any ; 
 tab1 : any =[] ;

 pdfObj : any = null ;

 lettreObj= {
  from:"simon" ,
  to:'paul' ,
  text:"here we are ! "
}

Prixtotal : number = 0 ; 

articles : Array<any>=[] ;

public stockRef :firebase.database.Reference;

public articlesRef :firebase.database.Reference;


today : any  = new Date();
yyyy : any = this.today.getFullYear();

it : any ;
docDefinition:any ;

Image: any ;
ite : any ;

  constructor(private printer: File, private print: FileOpener, private afdb: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.reservationsRef = firebase.database().ref('/reservations' );
    this.chequesRef = firebase.database().ref('/cheques' );
    this.especesRef = firebase.database().ref('/especes' );
    this.clientRef = firebase.database().ref('/clients' );
    this.stockRef = firebase.database().ref('/stock' );
    this.articlesRef = firebase.database().ref('/articles' );

  
    this.clientpdf=this.navParams.get("clientpdf");
   this.test=this.navParams.get("test");
   this.it=this.navParams.get("item");

   this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";

   
    this.items=[];
    this.especet=[];
    this.chequet= [] ;
    this.reservationsRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.items.push(produit.val());
        return false;
      });
      
    });

  



    
if(this.test==true) {
 
}


var sortedArray: string[] = this.items.sort((n1,n2) => {
  if (n1.id > n2.id) {
      return -1;
  }

  if (n1.id < n2.id) {
      return 1;
  }

  return 0;
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

  PushToGA(){
   this.navCtrl.push(ArticlePage) ;
  }

  PushToGC(){
this.navCtrl.push(ClientPage);
  }

  PushToFournisseurs(){
    this.navCtrl.push(FournisseurPage);
  }

  PushToDashboard(){
this.navCtrl.push(ReceptionPage);
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

  /////////////////////////////////////

  

  PushToCReservation(){
    this.navCtrl.push(CReservationPage);

    }

    Update(item : any) {

      console.log(item);
      

    if(item.payement.espece==false) {
      this.affespece=[] ;
    }else {
      this.affespece=item.payement.espece ;
    }

    if(item.payement.espece==false) {
      this.affcheque=[] ;
    }else {
      this.affcheque=item.payement.cheque ;
    }

           
    this.especesRef.on('value', produitList => {
      produitList.forEach( produit => {
        for(var item1 of this.affespece)
{    
    
   if(produit.val().key==item1)
   console.log(produit.val().montant);
   
        {  console.log(true );
        
           this.especet.push(Number(produit.val().montant)) ;
          
        }
        
      }
        return false;
      });
      
    });

    
    
    
    

this.navCtrl.setRoot(UReservationPage,{
  item : item ,
  especet : this.especet ,
  chequet : this.chequet 
})

    }

    Details(item : any) {
this.navCtrl.push(DetailsPage,{
  item:item 
})

    }


    Delete(item:any) {
      this.k=item.key ;
      console.log(item);
      if (item.payement!=undefined) {

      if(item.payement.cheque!=false) {
        console.log(true);
        if(item!=undefined) {

        this.items1=item.payement.cheque ;
         
        for (var item of this.items1) {
          this.afdb.object('/cheques/'+item).remove();
          }
        }
        console.log(this.items1);
       

      }
if(item.payement!=undefined) {
      if(item.payement.espece!=false) {
        console.log(true);
        if(item!=undefined) {

          this.items1=item.payement.espece ;
          console.log(this.items1);
          
          
        for (var item of this.items1) {
          this.afdb.object('/especes/'+item).remove();
          }
        }
        console.log(this.items1);


      }}}

      
      

      this.afdb.object('/reservations/'+this.k).remove();
      this.items=[];
        this.reservationsRef.on('value', produitList => {
      
          produitList.forEach( produit => {
            this.items.push(produit.val());
            return false;
          });
          
        });
          //tableau de cheques a suppriméé
    //  console.log(item.payement.cheque);

      //tableau d'especes a suppriméé

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

    Print(item:any) {

console.log(this.Prixtotal);


 
    
this.stockRef.on('value', produitList => {

  produitList.forEach( produit => {
if(produit.val().source==item.id)
{
    this.articles.push(produit.val()) ;
}
  return false;

  });
  

});



 
let a : Array<any> = [] ;

for(var i of this.articles) {

  this.articlesRef.on('value', produitList => {

    produitList.forEach( produit => {
  if(produit.val().id==i.article)
  {
           a.push({nom : produit.val().nom , quantite : i.quantite});
  }
    return false;
  
    });
    
  
  });

}



console.log(a);



 this.navCtrl.push(ImpPage,{
    item : item , 
    articles : this.articles 
    });
  }


  
  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }

}
