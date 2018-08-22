
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
import { SdPage } from '../sd/sd';
import { unescapeIdentifier } from '@angular/compiler';
import { ToastController } from 'ionic-angular';
import { AChequePage } from '../a-cheque/a-cheque';

import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';



@Component({
  selector: 'page-c-reservation',
  templateUrl: 'c-reservation.html',
})
export class CReservationPage {

  Image1 : string ;
  items: any = [];
  index : number = 0 ;
  ArAjouter : any = [] ;
  numbers : any = [] ;

  public clientRef :firebase.database.Reference;
  public articleRef :firebase.database.Reference;
  articles : any = [] ;

i : boolean=false ;
event : any ;
cheque : any ;
quantite : any =0;
nombre : number =0 ;
nom :any ;
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
items1 : any ;
payementDate : any ;
numero : any ;
notes : any ;


searchQuery: string = '';
clients:Array<string>=[];

test: boolean = true ; 

public caiseRef :firebase.database.Reference;
public historiqueRef :firebase.database.Reference;


caise : Array<any>=[] ;
cp : any ;

caises : Array<any> =[] ;
caises1 : Array<any> =[] ;



constructor(public toastCtrl: ToastController,public alertCtrl: AlertController ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
  this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
  this.clientRef = firebase.database().ref('/clients' );
    this.articleRef = firebase.database().ref('/articles' );
    this.caiseRef= firebase.database().ref('/caises' );

    this.eventDate =this.navParams.get("eventDate") ;
    this.timeStarts=this.navParams.get("timeStarts") ;
    this.timeEnds=this.navParams.get("timeEnds") ;
    this.fournisseur=this.navParams.get("fournisseur") ;
    this.numero=this.navParams.get("numero") ;
     this.notes=this.navParams.get("notes") ;
    this.depot=this.navParams.get("depot") ;
    this.prix=this.navParams.get("prix") ;
   this.virement= this.navParams.get("virement") ;
    this.Pcheque=this.navParams.get("Pcheque") ;
    this.montantch=this.navParams.get("montantch") ;
    this.montantes=this.navParams.get("montantes") ;
     this.payementDate=this.navParams.get("payementDate");
     this.historiqueRef= firebase.database().ref('/historique' );

     this.initializeItems();

     this.event = {
      month: '2018-02-07',
      timeStarts: '00:00',
      timeEnds: '00:00'
    }

    this.cheque = {
      month: '2018-02-07',
      timeStarts: '00:00',
      timeEnds: '00:00'
    }

    for (var _i = 0; _i < 1000; _i++) {

   this.numbers.push(_i) ;  
     }
     console.log(this.numbers);
     

    
    this.items=[];
    this.clientRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.index=this.index+1 ;
        this.items.push(produit.val());
        return false;
      });
      
    });
    console.log(this.index);
    console.log(this.items[0]);
    
    

    this.articles=[];
    this.articleRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.articles.push(produit.val());
        return false;
      });
      
    });

    console.log(this.articles);
    if (this.index==1) 
    {
      
      this.fournisseur=this.items[0].nom+this.items[0].prenom ;
    }

 this.items1 = this.items ; 

 let test : boolean=false ;
 this.caiseRef.on('value', produitList => {
      
  produitList.forEach( produit => {
      if(test==false)   
    {this.cp=produit.val();
    test=true ;
    }

return false;
  });
  
});

console.log(this.cp);

this.caiseRef.on('value', produitList => {
  
  produitList.forEach( produit => {
    this.caises.push(produit.val().caise);
    this.caises1.push(produit.val()) ;
    return false;
  });
  
});

console.log(this.caises);


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
     this.navCtrl.push(ReceptionPage) ;
  }

/////////////////////////////////////////////
verif () {

  
}

initializeItems() {

  this.clients=null ;
  this.clients=[] ;
  this.clientRef.on('value', produitList => {
    produitList.forEach( produit => {
      this.clients.push(produit.val().nom+" "+produit.val().prenom);
      return false;
    });
    
  });
  
}


getItems(ev: any) {
  // Reset items back to all of the items
  this.initializeItems();

  // set val to the value of the searchbar
  const val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.clients = this.clients.filter((data) => {
      return (data.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}



annuler(article : any ){

  let array=[] ;
  for (var item of this.ArAjouter) {
 
    if (item.article==article.key) 
    {    

      for (var item1 of this.ArAjouter) {

           if (item==item1) {

           }
           else {
             array.push(item1) ;
           }

      }

    
    }
    this.index++ ;
   }
this.ArAjouter=array ;
console.log(this.ArAjouter);
   
}
presentToast(msg : string) {
  const toast = this.toastCtrl.create({
    message: msg,
    duration: 3000
  });
  toast.present();
}

annch() {
  this.Pcheque =undefined ; 
  this.montantch=undefined ;
  this.virement=undefined ;
  this.depot=undefined;
}


GoToService(){
  this.navCtrl.push(FichePage);

}

GoToFactures(){
  this.navCtrl.push(Page);

}

AddCh(){
this.navCtrl.push(AChequePage, {
  cheque : this.cheque ,
  eventDate : this.eventDate ,
  timeStarts :this.timeStarts ,
  timeEnds : this.timeEnds ,
  prix :this.prix, 
  fournisseur :this.fournisseur ,
  depot :this.depot ,
  virement : this.virement ,
  Pcheque :this.Pcheque ,
  montantch : this.montantch ,
  montantes : this.montantes,
  payementDate: this.payementDate ,
  notes:this.notes
}) ;
}

Add(){
if(this.eventDate==undefined) {
  this.presentToast("il faut remplir le date de la reservation");

} else if (this.timeStarts==undefined) {
  this.presentToast("il faut remplir le temps de debut de la reservation");

} else if (this.timeEnds==undefined) {
  this.presentToast("il faut remplir le temps de fin de la reservation");


}else if (this.prix== undefined) {
  this.presentToast("il faut remplir le champs de prix de la reservation");


}else if (this.fournisseur==undefined) {
  this.presentToast("il faut choisir un client pour la reservation");


}else  if(this.notes==undefined){
  this.notes="" ;
}else  if((this.payementDate==undefined)&&(this.montantes==undefined)){
  this.payementDate="" ;
  this.montantes="" ;
}
else  if(((this.payementDate!=undefined)&&(this.montantes==undefined))||((this.payementDate==undefined)&&(this.montantes!=undefined))){

  this.presentToast("remplir tous les champs de payement en espece ou annuler l'operation")
}


else {
  this.navCtrl.push(SdPage,{
    cheque : this.cheque ,
    eventDate : this.eventDate ,
    timeStarts :this.timeStarts ,
    timeEnds : this.timeEnds ,
    prix :this.prix, 
    fournisseur :this.fournisseur ,
    depot :this.depot ,
    virement : this.virement ,
    Pcheque :this.Pcheque ,
    montantch : this.montantch ,
    montantes : this.montantes,
    payementDate : this.payementDate ,
    numero : this.numero ,
    notes:this.notes,
    cp:this.cp
  }) ;}
  
}


}
