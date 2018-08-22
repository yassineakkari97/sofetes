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
import { AArgentPage } from '../a-argent/a-argent';


import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { BanquePage } from '../banque/banque';

@Component({
  selector: 'page-u-reservation',
  templateUrl: 'u-reservation.html',
})
export class UReservationPage {

  public reservationRef :firebase.database.Reference;
  public chequeRef :firebase.database.Reference;
  public especeRef :firebase.database.Reference;
  public clientRef :firebase.database.Reference;



  public caiseRef :firebase.database.Reference;


  caise : Array<any>=[] ;
  cp : any ;


  timeEnds1 : any ; 
  timeStarts1 : any ;
  eventDate1 : any ;
  notes1 : any ;
  prix1 : any ; 


  Image1 : string ;
  item : any ;
  client : any ;
  eventDate : any ;
  key : any ;
  cheque : any ;
  espece : any ; 
  timeEnds : any ; 
  timeStarts : any ;
  prix : any ;
  affcheque : any ;
  affespece :any ;
  depot : any ;
  virement :any ;
  Pcheque : any ;
  montantch: any ;
  items: any = [];
  especet : any= [] ; ;
  especetotal : number = 0 ;
  chequetotal : number = 0 ;
  numero : any ;
id : any ; 
  chequet : any =[] ;
 j : number = 0 ;
 payementDate : any ;
 items1 : any ;
 chequetab : any = [] ;
 reste : any ; 
 tab1 : any =[] ;
 articless : any =[] ;
 public stockRef :firebase.database.Reference;
 items5 : Array<any> = [] ;
 PAR : number = 0 ;
 notes : any ;

 public articleRef :firebase.database.Reference;


 test : boolean ;

  constructor( public afdb: AngularFireDatabase,private calendar:Calendar ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.item= this.navParams.get("item") ;
    this.stockRef = firebase.database().ref('/stock' );

    this.clientRef = firebase.database().ref('/clients' );
    this.chequeRef = firebase.database().ref('/cheques' );
    this.articleRef = firebase.database().ref('/articles' );

    this.test =this.navParams.get("test") ;
    this.caiseRef= firebase.database().ref('/caises' );



   this.items=[];
   this.clientRef.on('value', produitList => {
 
     produitList.forEach( produit => {
       this.items.push(produit.val());
       return false;
     });
     
   });

   if(this.item.payement.espece==false) {
    this.affcheque=[] ;
  }else {
    this.affcheque=this.item.payement.cheque ;
  }

  console.log(this.item.id);
  
 
if (this.stockRef!=undefined) {
  this.stockRef.on('value', produitList => {
    produitList.forEach( produit => {
      console.log(produit.val());
      
    
      if(produit.val().etat=="sortir" && produit.val().source==this.item.id )
      this.items5.push(produit.val()) ;
      return false;
    });
    
  });
}
if (this.articleRef!=undefined) {

this.articleRef.on('value', produitList => {
 
  produitList.forEach( produit => {
    
    this.articless.push(produit.val());
    return false;
  });
  
});}

console.log(this.items5);


for(var i of this.items5) {

  for (var j of this.articless) {
    if(Number(i.article)==j.id) {
  
      
      this.PAR=this.PAR+(Number(i.quantite)*Number(j.prixv)) ;
    }

  }

}

console.log(this.PAR);




   this.chequeRef.on('value', produitList => {
    produitList.forEach( produit => {
    this.tab1.push(produit.val()) ;
      return false;
    });
    
  });


   
   this.id=this.item.id ;
     this.client = this.item.client ;
     this.eventDate = this.item.eventDate ;
     this.key = this.item.key ;
     this.cheque = this.item.payement.cheque ;
     this.espece = this.item.payement.espece ;
     this.timeEnds = this.item.timeEnds ;
     this.timeStarts = this.item.timeStarts ;
     this.prix=this.item.prix ;
     this.notes=this.item.notes ;
     

     if(this.cheque==false) {
      this.affcheque=[] ;
    } else {
      this.affcheque=this.cheque;
    }

    if(this.espece==false) {
      this.affespece=[] ;
    }else {
      this.affespece=this.espece ;
    }
     console.log(this.item);
     
    console.log(this.cheque);
    console.log(this.affcheque);
    
    

    this.reservationRef = firebase.database().ref('/reservations' );
    this.chequeRef = firebase.database().ref('/cheques' );
    this.especeRef = firebase.database().ref('/especes' );

    this.chequeRef.on('value', produitList => {
      produitList.forEach( produit => {
            console.log(this.affcheque) 
        for(var item of this.affcheque){
       {   
        
       
          if(produit.val().key==item)
        this.chequet.push(produit.val());}}
       
        return false;
      });
    
    
      
    });

    this.especeRef.on('value', produitList => {
      produitList.forEach( produit => {
        for(var item of this.affespece)
       { //     console.log(produit.val());
    //    console.log(item);
         
         
          if(produit.val().key==item)
        this.especet.push(produit.val());}
       
        return false;
      });

   
      
    });



if(this.test==undefined) {
  this.navCtrl.setRoot(UReservationPage , {
    test : true ,
    item : this.item
  })
}

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
this.navCtrl.setRoot(ReservationPage);
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


getItems(searchbar) {
  // Reset items back to all of the items

  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;


  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }
 this.items1 = this.items ;
 
  this.items1 = this.items1.filter((v) => {
    if(v.nom && q) {
      if (v.nom.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      this.items1=this.items;
      return false;
    }
  });     


}



Update() {
  if(this.eventDate1!=undefined) {
    this.eventDate=this.eventDate1 ; 
  }
  if(this.prix1!=undefined) {
    this.prix=this.prix1 ; 
  } if(this.timeStarts1!=undefined) {
    this.timeStarts=this.timeStarts1 ; 
  } if(this.timeEnds1!=undefined) {
    this.timeEnds1=this.timeEnds1 ; 
  } if(this.notes1!=undefined) {
    this.notes=this.notes1 ; 
  }
  this.afdb.object("reservations/"+this.item.key).update({
    eventDate : this.eventDate ,
    timeEnds : this.timeEnds ,
    timeStarts : this.timeStarts ,
    prix:this.prix,
    notes:this.notes
  
   });

   this.navCtrl.push(ReservationPage) ;
}
 
Addmoney(){
this.chequet=[] ;
  for (var i of this.tab1) {

    for (var z of this.affcheque) {
      if (z==i.key) {
        this.chequet.push(i) ;
      }
    }
  }

  

  this.chequeRef.on('value', produitList => {
    produitList.forEach( produit => {
      for(var item of this.affcheque)
     { //     console.log(produit.val());
  //    console.log(item);
      
     
        if(produit.val().key==item)
      this.chequetab.push(produit.val());}
     
      return false;
    });
    
  });



  
  
  
while(this.especet[this.j]!=undefined) {  
  this.especetotal=this.especetotal + Number(this.especet[this.j].montant) ;
  this.j ++ ;
}

this.j=0 ;
while(this.chequetab[this.j]!=undefined) {  
  this.chequetotal=this.chequetotal + Number (this.chequetab[this.j].montant) ;
  this.j ++ ;
}


this.reste=Number (this.item.prix)-Number(this.chequetotal)-Number(this.especetotal)-this.PAR ;




  
this.navCtrl.push(AArgentPage , {
  item : this.item  ,
 especet : this.especet ,
 chequet:this.chequetab ,
 chequetotal : this.chequetotal ,
 especetotal : this.especetotal ,
 reste : this.reste ,
 tabcheque : this.item.payement.cheque ,
 tabespece : this.item.payement.espece ,
 par : this.PAR,
 cp:this.cp ,
 id : this.id,
 affcheque : this.affcheque ,
 affespece:this.affespece 


})

}

GoToService(){
  this.navCtrl.push(FichePage);

}

GoToFactures(){
  this.navCtrl.push(Page);

}
}
