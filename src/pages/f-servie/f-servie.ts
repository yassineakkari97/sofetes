import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
import { BanquePage } from '../banque/banque';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import { ReservePage } from '../reserve/reserve';
import { CaisePage } from '../caise/caise';
import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';








@Component({
  selector: 'page-f-servie',
  templateUrl: 'f-servie.html',
})
export class FServiePage {

 
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

k : any ;

test : boolean = true ; 
item : any ;

  public serviceRef :firebase.database.Reference;
  Image1: string;
  public caiseRef :firebase.database.Reference;

  caise : any ;
  id : any ;
  date : any ;
  reste : any ;
  cout : any ; 
  public historiqueRef :firebase.database.Reference;

  fournisseur : any ;
 
  caises : Array<any> =[] ;
  caises1 : Array<any> =[] ;

  cheques : Array<any> =[] ;
  especes : Array<any> =[];

  chequetotal : any ; 
  especetotal : any ; 

  histoire : Array<any> =[];



  constructor(private afdb: AngularFireDatabase,public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.item=this.navParams.get("item") ;
    this.test=this.navParams.get("test") ;
    
  
    this.cheques=this.navParams.get("chequet") ;
    this.chequetotal=this.navParams.get("chequetotal") ;
    this.especetotal=this.navParams.get("especetotal") ;
    this.especes=this.navParams.get("especet") ;
  

    if (this.test!=true) {
      this.test=true ;
    this.navCtrl.setRoot(FServiePage,{
      item: this.item,
      test: this.test,
      especetotal: this.especetotal,
      especet:this.especes,
    chequetotal:this.chequetotal,
    chequet:this.cheques,

    });
  }

  
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
     
    this.compteRef = firebase.database().ref('/banque' );
    this.chequeRef = firebase.database().ref('/cheques' );
    this.numchequeRef = firebase.database().ref('/ncheque' );
    this.fournisseurRef = firebase.database().ref('/fournisseurs' );
    this.creditRef = firebase.database().ref('/credit' );
    this.especeRef = firebase.database().ref('/especes' );
    this.caiseRef = firebase.database().ref('/caises' );

    this.id = this.item.item.id ;
    this.cout = this.item.item.cout ;
    this.fournisseur = this.item.item.fournisseur ;
    this.date = this.item.item.date ;
    this.reste = this.item.reste ;


  
    this.historiqueRef= firebase.database().ref('/historique' );


  console.log(this.item);
  console.log(this.cheques);
  console.log(this.chequetotal);
 console.log( this.especes);
 console.log(this.especetotal);
 
    

this.historiqueRef.on('value', produitList => {
  
  produitList.forEach( produit => {
    
      this.histoire.push(produit.val());

    return false;
  });
  
});


    this.initializeItems();

    this.caiseRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.caises.push(produit.val().caise);
        this.caises1.push(produit.val()) ;
        return false;
      });
      
    });

    console.log(this.caises);
    
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

    
    console.log(this.result);
    console.log(this.caises);
    
    

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

  pushToDashboard(){
    this.navCtrl.push(ReceptionPage);
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

  

    let final= chnum.substr(chnum.indexOf("-")+1,Number(chnum.length)-4) ;
   
  

    let idbanque =this.numcheque+"" ;
    idbanque=idbanque.substr(0,idbanque.indexOf("-")) ;

  
    
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

      
   

      console.log(this.k);
      
      let ref = this.chequeRef.push({});
      this.montantch=Number(this.montantch).toFixed(3) ;

  ref.set({
    montant : this.montantch ,
    DateVirement : this.virement ,
    DateDepot : this.depot ,
    proprietaire : "sofetes",
    etat : false,
    key :ref.key,
    numero : final,
    banque:idbanque,
    dest : this.item.item.fournisseur,
    fact:"s"+this.item.item.id
  });


}
    
  




  if((this.montantes!=undefined)&&(this.payementDate==undefined)||(this.montantes==undefined)&&(this.payementDate!=undefined)) {
    this.presentToast("remplir tous les champs de payement espece ou annuler l'operation");
    return false ;
  }else if ((this.payementDate==undefined)&&(this.montantes==undefined)){}
  else {

      
          

      let ref3 = this.especeRef.push({});
      this.montantes=Number(this.montantes).toFixed(3) ; 
  ref3.set({
    montant : this.montantes ,
   client : this.item.item.fournisseur ,
   payementDate : this.payementDate,
    key :ref3.key,
    fact:"s"+this.item.item.id
  });

   
if(this.caise==undefined) {
  this.caise="Caise Principal" ;
}


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

let fmontant = Number(montant)-Number(this.montantes) ;
fmontant=Number(Number(fmontant).toFixed(3)) ;
this.afdb.object('/caises/'+k).update({
  montant : fmontant
});


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

let msg =this.payementDate+": Retrait d'un montant '"+this.montantes+"' pour la payement de service SRV-"+this.id ;
tab.push(msg) ;

this.afdb.object('/historique/'+kkk).update({ hist : tab});


}


 

this.navCtrl.setRoot(FichePage);
    }
  
  
  }
  
  
  
  