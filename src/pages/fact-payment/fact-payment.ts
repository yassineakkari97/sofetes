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
import { Page } from '../page/page';

import { ToastController } from 'ionic-angular';
import { BanquePage } from '../banque/banque';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';

@Component({
  selector: 'page-fact-payment',
  templateUrl: 'fact-payment.html',
})
export class FactPaymentPage {

  Image1 : string ;
  items: any = [];
  items0 : Array<any> = [] ; 
  items1 : Array<any> = [] ; 
  items2 : Array<any> = [] ; 
  result : Array<any> = [] ; 
  

  name : any ;
  depot :any ;
  virement : any ;
  montantch : any ;
  numcheque:any ;
  montantes : any ;
  payementDate:any ; 

  
  searchQuery: string = '';
public compteRef :firebase.database.Reference;
public chequeRef :firebase.database.Reference;
public numchequeRef :firebase.database.Reference;
public fournisseurRef :firebase.database.Reference;
public creditRef :firebase.database.Reference;
public especeRef :firebase.database.Reference;
public caiseRef :firebase.database.Reference;
public historiqueRef :firebase.database.Reference;


histoire : Array<any> =[];

caises : Array<any> =[] ;
caises1 : Array<any> =[] ;
caise : any ; 
k : any ;

test : boolean = true ; 
item : any ;

  public factureRef :firebase.database.Reference;

  constructor(private afdb: AngularFireDatabase,public toastCtrl: ToastController, private calendar:Calendar ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.item=this.navParams.get("item") ;
    this.test=this.navParams.get("test") ;

    if (this.test!=true) {
      this.test=true ;
    this.navCtrl.setRoot(FactPaymentPage,{
      item: this.item,
      test: this.test

    });
  }

  console.log(this.item);
  
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
     
    this.compteRef = firebase.database().ref('/banque' );
    this.chequeRef = firebase.database().ref('/cheques' );
    this.numchequeRef = firebase.database().ref('/ncheque' );
    this.fournisseurRef = firebase.database().ref('/fournisseurs' );
    this.creditRef = firebase.database().ref('/credit' );
    this.especeRef = firebase.database().ref('/especes' );
    this.caiseRef = firebase.database().ref('/caises' );
    this.historiqueRef= firebase.database().ref('/historique' );


    this.initializeItems();

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

    this.caiseRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.caises.push(produit.val().caise);
        this.caises1.push(produit.val()) ;
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

    
this.historiqueRef.on('value', produitList => {
  
  produitList.forEach( produit => {
    
      this.histoire.push(produit.val());

    return false;
  });
  
});

console.log(this.histoire);

    

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

  anncheque(){
    this.depot="" ;
  this.virement="" ;
  this.montantch="";
  this.numcheque="";
  }

  annespece(){
    this.montantes="" ;
    this.payementDate="";
  }


  
presentToast(msg : string) {
  const toast = this.toastCtrl.create({
    message: msg,
    duration: 3000
  });
  toast.present();
}


  
  add(){

    let chnum=this.numcheque+"" ;
    let f = this.item.item.fournisseur+"" ;

    
    console.log(chnum);
    
     console.log(f);
     


    let final= chnum.substr(chnum.indexOf("-")+1,Number(chnum.length)-4) ;
    let ffinal1=f.substr(0,f.indexOf(":")) ;
    let ffinal2=f.substr(f.indexOf(" ")+1,Number(f.length)-ffinal1.length+3) ;
  

    let idbanque =this.numcheque+"" ;
    idbanque=idbanque.substr(0,idbanque.indexOf("-")) ;

    console.log(idbanque);
    console.log(ffinal1);
    console.log(ffinal2);
    
    
  /*  
    this.fournisseurRef.on('value', produitList => {
  
      produitList.forEach( produit => {
       if((produit.val().nom==ffinal1)&&(produit.val().cin==ffinal2))
    
       
       
      this.k=produit.val().key ;
        return false;
      });

      console.log(this.k);
      

      
    });



    console.log(idbanque);

    if (this.k==undefined) {
     return false ;
  
    }*/

    
    
    if((this.depot!=undefined)&&((this.virement==undefined)||(this.montantch==undefined)||(this.numcheque==undefined))) {
      this.presentToast("remplir tous les champs de cheque ou annuler l'operation");
      return false ;
  
    }else if((this.virement!=undefined)&&((this.depot==undefined)||(this.montantch==undefined)||(this.numcheque==undefined))) {
      this.presentToast("remplir tous les champs de cheque ou annuler l'operation");
      return false ;
  
    }else if((this.montantch!=undefined)&&((this.virement==undefined)||(this.depot==undefined)||(this.numcheque==undefined))) {
      this.presentToast("remplir tous les champs de cheque ou annuler l'operation");
      return false ;
  
    }else if((this.numcheque!=undefined)&&((this.virement==undefined)||(this.montantch==undefined)||(this.depot==undefined))) {
      this.presentToast("remplir tous les champs de cheque ou annuler l'operation");
      return false ;
  
    }else if((this.numcheque==undefined)&&((this.virement==undefined)&&(this.montantch==undefined)&&(this.depot==undefined))) {

    } else {

      
    this.fournisseurRef.on('value', produitList => {
  
      produitList.forEach( produit => {
       if((produit.val().nom==ffinal1)&&(produit.val().cin==ffinal2))
    
       
       
      this.k=produit.val().key ;
        return false;
      });

      console.log(this.k);
      
      let ref = this.chequeRef.push({});
      this.montantch=Number(this.montantch).toFixed(3) ;
      this.montantes=Number(this.montantes).toFixed(3) ;
  ref.set({
    montant : this.montantch ,
    DateVirement : this.virement ,
    DateDepot : this.depot ,
    proprietaire : "sofetes",
    etat : false,
    key :ref.key,
    numero : final,
    banque:idbanque,
    dest : this.k,
    fact:this.item.item.id
  });


   

      
    });
  

}


  if((this.montantes!=undefined)&&(this.payementDate==undefined)||(this.montantes==undefined)&&(this.payementDate!=undefined)) {
    this.presentToast("remplir tous les champs de payement espece ou annuler l'operation");
    return false ;
  }else if ((this.payementDate==undefined)&&(this.montantes==undefined)){}
  else {

      
    this.fournisseurRef.on('value', produitList => {
  
      produitList.forEach( produit => {
       if((produit.val().nom==ffinal1)&&(produit.val().cin==ffinal2))
    
       
       
      this.k=produit.val().key ;
        return false;
      });

      console.log(this.k);
      

      let ref3 = this.especeRef.push({});
      
      this.montantes=Number(this.montantes).toFixed(3) ;
      this.montantch=Number(this.montantch).toFixed(3) ;


  ref3.set({
    montant : this.montantes ,
   client : this.k ,
   payementDate : this.payementDate,
    key :ref3.key,
    fact:this.item.item.id
  });


   


    });



    
  
let k:any ;
let montant : number ;
 for(var c of this.caises1) {
   if(this.caise==undefined) {
     if(c.key=="-LINATrnxGAFKYtHdO2B") {
       montant=c.montant ;
     }
   }
    if(c.caise==this.caise) {
      k=c.key ;
      montant = c.montant ;
    }
 }
 if(this.caise==undefined) {
   k="-LINATrnxGAFKYtHdO2B" ;
 }
console.log(Number(montant));
console.log(Number(this.montantes));


let fmontant = Number(montant)-Number(this.montantes) ;
console.log(fmontant);

fmontant=Number(Number(fmontant).toFixed(3)) ;
this.afdb.object('/caises/'+k).update({
  montant : fmontant
});

    
if(this.caise==undefined) {
  this.caise="Caise Principal" ;
}
let kkk : any ;
let tab : any =  [] ;

for(var z of this.histoire) {
if (z.caise==this.caise) {
 kkk=z.key ;
 tab=z.hist ;

}
}
if (tab==undefined) {
  tab=[] ;
}
this.montantes=Number(this.montantes).toFixed(3) ;
this.montantch=Number(this.montantch).toFixed(3) ;

let msg =this.payementDate+": Retrait d'un montant '"+this.montantes+"' pour la payement de service FACT-"+this.item.item.id ;
tab.push(msg) ;

this.afdb.object('/historique/'+kkk).update({ hist : tab});





}



  this.navCtrl.setRoot(Page) ;



  }



}
